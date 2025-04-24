import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, Form, ListGroup } from 'react-bootstrap';
import { FaArrowLeft, FaPaperPlane, FaPaperclip, FaMicrophone, FaPlay } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
import { setClassrooms, selectSelectedClassroom, selectClassrooms, clearClassroom } from '../../stores/slices/classroomSlice';

function GroupChat({setIsGroupChatOpen}) {
  const [newMessage, setNewMessage] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  // const recorderRef = useRef(null);
  
  const dispatch = useDispatch();
  const classrooms = useSelector(selectClassrooms);
  const selectedClassroom = useSelector(selectSelectedClassroom);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() || filePreview) {
      const messageContent = {
        text: newMessage,
        sender: "You",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        file: filePreview
      };

      const updatedGroups = classrooms.map(c => {
        if (c.classID === selectedClassroom.classID) {
          return {
            ...c,
            messages: [...c.messages, messageContent]
          };
        }
        return c;
      });
      
      dispatch(setClassrooms(updatedGroups));
      setNewMessage('');
      setFilePreview(null);
    }
  };

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

  const startRecording = () => {
    setIsRecording(true);
    // Implement actual recording logic using MediaRecorder API
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Implement saving recorded audio
  };

  return (
    <div className="d-flex flex-column h-100">
      {/* Header */}
      <div className="d-flex align-items-center py-2 border-bottom bg-light">
        <Button 
          variant="link" 
          onClick={() => setIsGroupChatOpen(false)}
          className="me-2 text-dark"
        >
          <FaArrowLeft />
        </Button>
        <div className="flex-grow-1">
          <h5 className="mb-0">{selectedClassroom.className}</h5>
          <small className="text-muted">Online</small>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow-1 overflow-auto p-3 bg-chat">
        <ListGroup variant="flush">
          {/* {selectedClassroom.messages.map((message, index) => (
            <ListGroup.Item 
              key={index}
              className="border-0 bg-transparent p-1"
            >
              <div className={`d-flex ${message.sender === "You" ? 'justify-content-end' : 'justify-content-start'}`}>
                <div 
                  className={`p-2 rounded-4 mb-2 ${message.sender === "You" 
                    ? 'bg-primary text-white' 
                    : 'bg-white border'}`}
                  style={{ maxWidth: '75%' }}
                >
                  {message.file && (
                    <div className="mb-2">
                      {message.file.type.startsWith('image/') ? (
                        <img 
                          src={message.file.url} 
                          alt="Attachment" 
                          className="img-fluid rounded-3"
                        />
                      ) : (
                        <div className="d-flex align-items-center p-2 bg-light rounded-3">
                          <FaPaperclip className="me-2" />
                          <div>
                            <div className="small">{message.file.name}</div>
                            <div className="text-muted small">
                              {(message.file.size / 1024).toFixed(1)} KB
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {message.text && <div>{message.text}</div>}
                  
                  <div className={`d-flex justify-content-between small ${message.sender === "You" ? 'text-white-50' : 'text-muted'}`}>
                    <span>{message.timestamp}</span>
                    {message.sender === "You" && (
                      <span className="ms-2">✓✓</span>
                    )}
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))} */}
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
            >
              <FaPaperclip />
            </Button>
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleFileUpload}
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
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="rounded-pill mx-1"
                onFocus={() => setIsRecording(false)}
              />
            )}

            {newMessage || filePreview ? (
              <Button 
                variant="primary" 
                type="submit"
                className="rounded-circle"
              >
                <FaPaperPlane />
              </Button>
            ) : (
              <Button
                variant={isRecording ? 'danger' : 'link'}
                onClick={isRecording ? stopRecording : startRecording}
                className="rounded-circle"
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

const styles = `
.bg-chat {
  background-color: #ece5dd;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-4v-1h4v-4h1v4zm-7 4h4v1h-4v4h-1v-4h-4v-1h4v-4h1v4zm-7-8h4v1h-4v4h-1v-4h-4v-1h4v-4h1v4zM40 50h4v1h-4v4h-1v-4h-4v-1h4v-4h1v4zm-7 4h4v1h-4v4h-1v-4h-4v-1h4v-4h1v4zm-7-8h4v1h-4v4h-1v-4h-4v-1h4v-4h1v4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
`;

// Add the style tag to your component
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

GroupChat.propTypes = {
  group: PropTypes.object.isRequired,
  setSelectedGroup: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  setGroups: PropTypes.func.isRequired
};

export default GroupChat;