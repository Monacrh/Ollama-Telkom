import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, ListGroup, Form, InputGroup } from 'react-bootstrap';
import { useLocation, useParams, Link } from 'react-router';

import GroupsSection from './GroupSection';
import ChatsSection from './ChatSection';
import CreateButton from './CreateButton';
import CreateClassForm from './CreateKelas';

import { FaAngleLeft, FaRobot, FaSearch } from 'react-icons/fa';
import { BsSearch } from "react-icons/bs";

const dummyUser = {
  name: "John Doe",
  email: "john.doe@telkom.university"
  // avatar: "👨💻"
};

const dummyKelas = {
  id: 1,
  name: "Kelas IFX-47-01",
  members: [
    {
      id: '1',
      name: "103012380496",
      email: "coder11at@gmail.com"
    },
    {
      id: '2',
      name: "103012380497",
      email: "coder12at@gmail.com"
    }
  ],
};

const dummyChat = {
  user_id: 1,
  group_id: 1,
  name: "103012380496",
  email: "coder11at@gmail.com",
  chats: [
    {
      id: 1,
      title: "General Chat",
      timestamp: new Date().toISOString(),
      messages: [
        {
          text: "Hello, everyone!",
          sender: "user",
          timestamp: new Date().toISOString()
        },
        {
          text: "Hi, John!",
          sender: "ai",
          timestamp: new Date().toISOString()
        }
      ]
    },
    {
      id: 2,
      title: "What is Quantum Physics?",
      timestamp: new Date().toISOString(),
      messages: [
        {
          text: "Explain quantum entanglement",
          sender: "user",
          timestamp: new Date().toISOString()
        },
        {
          text: "Quantum entanglement is a physical phenomenon that occurs when...",
          sender: "ai",
          timestamp: new Date().toISOString()
        }
      ]
    }
]};

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
  const { pathname } = useLocation();
  const { kelasId, anggotaId } = useParams();

  const [groupDropdownOpen, setGroupDropdownOpen] = useState(true);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  // const filteredChats = chatHistory.filter(chat =>
  //   chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   chat.messages.some(msg => 
  //     msg.text.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // );

  const filteredChats = dummyChat.chats.filter(chat => {
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.messages.some(msg => {
      msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    })
  })

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
      {pathname === `/` && (
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

      {pathname === `/k/${kelasId}` && (
        <>
          {/* What it shows when a group is selected */}
          <div className="d-flex flex-column h-100">
            <div className="d-flex align-items-center mb-3">
              <Button 
                variant="link" 
                className="me-2 p-0" 
                onClick={() => setSelectedGroup(null)}
              >
                <Link to="/">
                  <FaAngleLeft />
                </Link>
              </Button>
              <h5 className="mb-0">{dummyKelas.name}</h5>
            </div>

            {/* Search Bar */}
            <div className="border-top pt-3">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Cari Nama/Email" aria-label="Cari Nama/Email"></input>
                <button className="btn btn-outline-success" type="submit">
                  <BsSearch />
                </button>
              </form>

              <h6>Group Members</h6>
              <ListGroup>
                {dummyKelas.members.map((member, index) => (
                  <ListGroup.Item key={index}>
                    <Link to={`a/${member.id}`} className='text-decoration-none text-reset'>
                      <div className="d-flex flex-column justify-content-between align-items-center">
                        <div>{member.name}</div>
                        <div>{member.email}</div>
                      </div>
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>

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
              <CreateButton 
                setChats={setChats}
                setShowCreateClass={setShowCreateClass}
              />
            </>
          )}
        </>
      )}

      {pathname === `/k/${kelasId}/a/${anggotaId}` && (
        <>
          {/* What it shows when a user is selected */}
          <div className="d-flex flex-column h-100">
            {/* User Profile Section */}
            <div className="border-bottom pb-3 mb-3">
              <div className="d-flex align-items-center">
                <Link 
                  to={`/k/${dummyChat.group_id}`}
                  className="p-0 me-2"
                  onClick={() => setAIChatContext(null)}
                >
                  <FaAngleLeft />
                </Link>
                <div>
                  <div className="fw-bold">{dummyChat.name}</div>
                  <small className="text-muted">{dummyChat.email}</small>
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

          <Button 
            variant="outline-secondary" 
            className="position-absolute top-0 end-0 m-2" 
            onClick={() => setIsOpen(false)}
          >
            <FaAngleLeft />
          </Button>
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