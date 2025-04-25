import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchChatItems, 
  sendChatMessage, 
  clearCurrentChatItems 
} from '../../stores/slices/chatSlice';
import './ChatPage.css';

function ChatPage() {
  const { chatID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);
  
  // Redux state
  const { 
    currentChatItems = [], 
    loading: chatLoading, 
    error: chatError 
  } = useSelector((state) => state.chat);

  // Local state for optimistic updates
  const [optimisticItems, setOptimisticItems] = useState([]);

  // Fetch chat items and clean up on chatID change
  useEffect(() => {
    const initializeChat = async () => {
      dispatch(clearCurrentChatItems());
      setOptimisticItems([]);
      
      if (chatID) {
        try {
          await dispatch(fetchChatItems(chatID)).unwrap();
        } catch (error) {
          console.error('Error loading chat:', error);
        }
      }
    };

    initializeChat();

    return () => {
      dispatch(clearCurrentChatItems());
    };
  }, [chatID, dispatch]);

  // Sync optimistic items with Redux state
  useEffect(() => {
    setOptimisticItems(currentChatItems);
  }, [currentChatItems]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [optimisticItems]);

  // Handle message submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || chatLoading) return;

    const tempId = Date.now();
    try {
      // Optimistic update
      const tempMessage = {
        ItemID: tempId,
        message: trimmedMessage,
        typeItem: 'request',
        createdAt: new Date().toISOString(),
        isOptimistic: true
      };

      setOptimisticItems(prev => [...prev, tempMessage]);
      setNewMessage('');

      // Send to server
      await dispatch(sendChatMessage({ 
        chatID, 
        message: trimmedMessage 
      })).unwrap();

      // Refresh messages after successful send
      await dispatch(fetchChatItems(chatID));
    } catch (err) {
      console.error('Message send failed:', err);
      // Rollback optimistic update
      setOptimisticItems(prev => 
        prev.filter(item => item.ItemID !== tempId)
      );
    }
  };

  // Loading state
  if (chatLoading && optimisticItems.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading chat history...</p>
      </Container>
    );
  }

  // Error state
  if (chatError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Error loading chat: {chatError}
          <Button 
            variant="outline-danger"
            onClick={() => dispatch(fetchChatItems(chatID))}
            className="ms-3"
          >
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-3 chat-page-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate(-1)}
          disabled={chatLoading}
        >
          &larr; Back
        </Button>
        <h4 className="mb-0">Chat Session</h4>
        <div style={{ width: '100px' }}></div>
      </div>

      <div className="chat-box">
        {optimisticItems.map((item) => (
          <div
            key={item.ItemID}
            className={`chat-bubble ${
              item.typeItem === 'request' ? 'right' : 'left'
            } ${item.isOptimistic ? 'optimistic' : ''}`}
          >
            <div className="bubble-content">{item.message}</div>
            <div className="bubble-time">
              {new Date(item.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
              {item.isOptimistic && ' (Sending...)'}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <Form 
        className="chat-input d-flex mt-3" 
        onSubmit={handleSendMessage}
      >
        <Form.Control
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={chatLoading}
        />
        <Button
          variant="primary"
          type="submit"
          className="ms-2"
          disabled={!newMessage.trim() || chatLoading}
        >
          {chatLoading ? 'Sending...' : 'Send'}
        </Button>
      </Form>
    </Container>
  );
}

export default ChatPage;