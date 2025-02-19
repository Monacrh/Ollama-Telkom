import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, ListGroup, Form, InputGroup } from 'react-bootstrap';
import GroupsSection from './GroupSection';
import ChatsSection from './ChatSection';
import CreateButton from './CreateButton';
import CreateClassForm from './CreateKelas';
import { FaAngleLeft, FaRobot, FaSearch } from 'react-icons/fa';

const dummyUser = {
  name: "John Doe",
  email: "john.doe@telkom.university"
  // avatar: "👨💻"
};

function Sidebar({
  groups,
  chats,
  isOpen,
  setGroups,
  setChats,
  setIsOpen,
  setModalContent,
  setShowModal,
  showCreateClass,
  setShowCreateClass,
  selectedGroup,
  setSelectedGroup,
  aiChatContext,
  setAIChatContext,
  chatHistory,
  setChatHistory
}) {
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(true);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const filteredChats = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.messages.some(msg => 
      msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleNewAIChat = () => {
    const newChat = {
      id: Date.now(),
      title: `New Chat ${chatHistory.length + 1}`,
      timestamp: new Date().toISOString(),
      messages: []
    };
    
    setChatHistory([newChat, ...chatHistory]);
    setAIChatContext({
      activeChat: newChat,
      user: dummyUser
    });
  };

  return (
    <Col 
      md={isOpen ? 3 : 0} 
      className={`bg-light border-end p-3 d-flex flex-column position-relative ${isOpen ? "d-block" : "d-none"}`}
      style={{ 
        minWidth: '300px', 
        height: 'calc(100vh - 56px)',
        overflowY: 'auto' 
      }}
    >
      {aiChatContext ? (
        <div className="d-flex flex-column h-100">
          {/* User Profile Section */}
          <div className="border-bottom pb-3 mb-3">
            <div className="d-flex align-items-center">
              <Button 
                variant="link" 
                className="p-0 me-2"
                onClick={() => setAIChatContext(null)}
              >
                <FaAngleLeft />
              </Button>
              <div>
                <div className="fw-bold">{dummyUser.name}</div>
                <small className="text-muted">{dummyUser.email}</small>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-3 px-2">
            <InputGroup>
              <Form.Control
                placeholder="Search chat history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-pill"
              />
              <InputGroup.Text className="bg-transparent border-0">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
            </InputGroup>
          </div>

          {/* Chat History */}
          <div className="flex-grow-1 overflow-auto">
            <ListGroup variant="flush">
              {filteredChats.map((chat) => (
                <ListGroup.Item 
                  key={chat.id}
                  action
                  onClick={() => setAIChatContext(prev => ({
                    ...prev,
                    activeChat: chat
                  }))}
                  className="d-flex justify-content-between align-items-center"
                  active={chat.id === aiChatContext.activeChat?.id}
                >
                  <div>
                    <div>{chat.title}</div>
                    <small className="text-muted">
                      {new Date(chat.timestamp).toLocaleDateString()}
                    </small>
                  </div>
                </ListGroup.Item>
              ))}
              {filteredChats.length === 0 && (
                <ListGroup.Item className="text-muted text-center">
                  No matching chats found
                </ListGroup.Item>
              )}
            </ListGroup>
          </div>

          {/* New Chat Button */}
          <Button 
            variant="primary" 
            className="position-absolute bottom-0 end-0 m-3 rounded-circle"
            style={{ width: '50px', height: '50px' }}
            onClick={handleNewAIChat}
          >
            +
          </Button>
        </div>
      ) : selectedGroup ? (
        <div className="d-flex flex-column h-100">
          <div className="d-flex align-items-center mb-3">
            <Button 
              variant="link" 
              className="me-2 p-0" 
              onClick={() => setSelectedGroup(null)}
            >
              <FaAngleLeft />
            </Button>
            <h5 className="mb-0">{selectedGroup.name}</h5>
          </div>

          <div className="border-top pt-3">
            <h6>Group Members</h6>
            <ListGroup>
              {selectedGroup.members.map((member, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>{member}</div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          <Button 
            variant="primary" 
            className="position-absolute bottom-0 end-0 m-3 rounded-circle"
            style={{ width: '50px', height: '50px' }}
            onClick={() => setAIChatContext({
              user: dummyUser,
              activeChat: null
            })}
          >
            <FaRobot />
          </Button>
        </div>
      ) : (
        <>
          <Button 
            variant="outline-secondary" 
            className="position-absolute top-0 end-0 m-2" 
            onClick={() => setIsOpen(false)}
          >
            <FaAngleLeft />
          </Button>

          {showCreateClass ? (
            <CreateClassForm
              setGroups={setGroups}
              setShowCreateClass={setShowCreateClass}
            />
          ) : (
            <>
              <GroupsSection
                groups={groups}
                groupDropdownOpen={groupDropdownOpen}
                setGroupDropdownOpen={setGroupDropdownOpen}
                activeMenuId={activeMenuId}
                toggleMenu={toggleMenu}
                setModalContent={setModalContent}
                setShowModal={setShowModal}
                setSelectedGroup={setSelectedGroup}
              />

              <ChatsSection
                chats={chats}
                chatDropdownOpen={chatDropdownOpen}
                setChatDropdownOpen={setChatDropdownOpen}
                activeMenuId={activeMenuId}
                toggleMenu={toggleMenu}
                setModalContent={setModalContent}
                setShowModal={setShowModal}
              />

              <CreateButton 
                setChats={setChats}
                setShowCreateClass={setShowCreateClass}
              />
            </>
          )}
        </>
      )}
    </Col>
  );
}

Sidebar.propTypes = {
  groups: PropTypes.array.isRequired,
  chats: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setGroups: PropTypes.func.isRequired,
  setChats: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  showCreateClass: PropTypes.bool.isRequired,
  setShowCreateClass: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object,
  setSelectedGroup: PropTypes.func.isRequired,
  aiChatContext: PropTypes.object,
  setAIChatContext: PropTypes.func.isRequired,
  chatHistory: PropTypes.array.isRequired,
  setChatHistory: PropTypes.func.isRequired,
};

export default Sidebar;