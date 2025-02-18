import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, Form, ListGroup, Spinner } from 'react-bootstrap';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';

function AIChat({ aiChatContext, setAIChatContext, chatHistory, setChatHistory }) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!aiChatContext.activeChat && chatHistory.length > 0) {
      setAIChatContext(prev => ({
        ...prev,
        activeChat: chatHistory[0]
      }));
    }
  }, [aiChatContext, chatHistory, setAIChatContext]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !aiChatContext.activeChat) return;

    // Add user message
    const userMessage = {
      text: message,
      sender: "user",
      timestamp: new Date().toISOString()
    };

    const updatedChat = {
      ...aiChatContext.activeChat,
      messages: [...aiChatContext.activeChat.messages, userMessage]
    };

    // Update state
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
                  {msg.text}
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

      {/* Input Area */}
      <Form onSubmit={handleSendMessage} className="border-top pt-2">
        <InputGroup>
          <Form.Control
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-pill"
            disabled={isLoading}
          />
          <Button 
            variant="primary" 
            type="submit"
            className="rounded-circle ms-2"
            style={{ width: '40px', height: '40px' }}
            disabled={isLoading}
          >
            <FaPaperPlane />
          </Button>
        </InputGroup>
      </Form>
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