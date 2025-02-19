import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, Form, ListGroup, Spinner } from 'react-bootstrap';
import { FaPaperPlane, FaRobot, FaPaperclip, FaMicrophone, FaPlay } from 'react-icons/fa';

function AIChat({ aiChatContext, setAIChatContext, chatHistory, setChatHistory }) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (!aiChatContext.activeChat && chatHistory.length > 0) {
      setAIChatContext(prev => ({
        ...prev,
        activeChat: chatHistory[0]
      }));
    }
  }, [aiChatContext, chatHistory, setAIChatContext]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreview({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file)
      });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current);
        // Handle audio blob here (e.g., send to server)
        console.log('Audio recorded:', audioBlob);
        audioChunksRef.current = [];
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!message.trim() && !filePreview) || !aiChatContext.activeChat) return;

    // Create message object
    const userMessage = {
      text: message,
      sender: "user",
      timestamp: new Date().toISOString(),
      file: filePreview
    };

    // Update chat history
    const updatedChat = {
      ...aiChatContext.activeChat,
      messages: [...aiChatContext.activeChat.messages, userMessage]
    };

    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === updatedChat.id ? updatedChat : chat
      )
    );
    
    setAIChatContext(prev => ({
      ...prev,
      activeChat: updatedChat
    }));
    
    setMessage('');
    setFilePreview(null);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        text: "This is a simulated AI response. In a real implementation, this would be connected to an AI API.",
        sender: "ai",
        timestamp: new Date().toISOString()
      };

      const updatedWithAI = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiResponse]
      };

      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === updatedWithAI.id ? updatedWithAI : chat
        )
      );
      
      setAIChatContext(prev => ({
        ...prev,
        activeChat: updatedWithAI
      }));
      
      setIsLoading(false);
    }, 1500);
  };

  if (!aiChatContext.activeChat) return null;

  return (
    <div className="d-flex flex-column h-100">
      {/* Chat Header */}
      <div className="d-flex align-items-center mb-3 border-bottom pb-2">
        <FaRobot className="me-2" size={24} />
        <div>
          <h4 className="mb-0">{aiChatContext.activeChat.title}</h4>
          <small className="text-muted">
            {new Date(aiChatContext.activeChat.timestamp).toLocaleString()}
          </small>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow-1 overflow-auto mb-3">
        <ListGroup variant="flush">
          {aiChatContext.activeChat.messages.map((msg, index) => (
            <ListGroup.Item key={index} className="border-0 bg-transparent">
              <div className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                <div 
                  className={`p-3 mb-2 rounded-4 ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-light'
                  }`}
                  style={{ maxWidth: '75%' }}
                >
                  {msg.file && (
                    <div className="mb-2">
                      {msg.file.type.startsWith('image/') ? (
                        <img 
                          src={msg.file.url} 
                          alt="Attachment" 
                          className="img-fluid rounded-3"
                        />
                      ) : (
                        <div className="d-flex align-items-center p-2 bg-light rounded-3">
                          <FaPaperclip className="me-2" />
                          <div>
                            <div className="small">{msg.file.name}</div>
                            <div className="text-muted small">
                              {(msg.file.size / 1024).toFixed(1)} KB
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {msg.text && <div>{msg.text}</div>}
                  
                  <div className={`small mt-1 ${msg.sender === 'user' ? 'text-white-50' : 'text-muted'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
          {isLoading && (
            <ListGroup.Item className="border-0 bg-transparent">
              <div className="d-flex justify-content-start">
                <div className="p-3 mb-2 rounded-4 bg-light">
                  <Spinner animation="border" size="sm" className="me-2" />
                  AI is thinking...
                </div>
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>

      {/* File Preview */}
      {filePreview && (
        <div className="p-2 border-top bg-light">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <FaPaperclip className="me-2" />
              <span className="small">{filePreview.name}</span>
            </div>
            <Button 
              variant="link" 
              size="sm" 
              className="text-danger"
              onClick={() => setFilePreview(null)}
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-2 border-top bg-light">
        <Form onSubmit={handleSendMessage}>
          <InputGroup>
            <Button 
              variant="link" 
              onClick={() => fileInputRef.current.click()}
              disabled={isLoading}
            >
              <FaPaperclip />
            </Button>
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleFileUpload}
              disabled={isLoading}
            />

            {isRecording ? (
              <Button
                variant="danger"
                onClick={stopRecording}
                className="rounded-pill"
              >
                <FaMicrophone /> Stop
              </Button>
            ) : (
              <Form.Control
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-pill mx-1"
                onFocus={() => setIsRecording(false)}
                disabled={isLoading}
              />
            )}

            {(message || filePreview) ? (
              <Button 
                variant="primary" 
                type="submit"
                className="rounded-circle"
                disabled={isLoading}
              >
                <FaPaperPlane />
              </Button>
            ) : (
              <Button
                variant={isRecording ? 'danger' : 'link'}
                onClick={isRecording ? stopRecording : startRecording}
                className="rounded-circle"
                disabled={isLoading}
              >
                {isRecording ? <FaPlay /> : <FaMicrophone />}
              </Button>
            )}
          </InputGroup>
        </Form>
      </div>
    </div>
  );
}

AIChat.propTypes = {
  aiChatContext: PropTypes.object.isRequired,
  setAIChatContext: PropTypes.func.isRequired,
  chatHistory: PropTypes.array.isRequired,
  setChatHistory: PropTypes.func.isRequired,
};

export default AIChat;