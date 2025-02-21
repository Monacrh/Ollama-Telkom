import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams, Link } from 'react-router';
import { Col, Button, ListGroup } from 'react-bootstrap';

import GroupsSection from './GroupSection';
import ChatsSection from './ChatSection';
import CreateButton from './CreateButton';
import CreateClassForm from './CreateKelas';

import { FaAngleLeft, FaRobot } from 'react-icons/fa';
import { BsSearch } from "react-icons/bs";

const dummyUser = {
  name: "John Doe",
  email: "john.doe@telkom.university",
  // avatar: "👨💻"
};

const dummyKelas = {
  id: 1,
  name: "Kelas IFX-47-01",
  members: [
    {
      id: '1',
      name: "103012380496",
      email: "coder11atgmail.com"
    },
    {
      id: '2',
      name: "103012380497",
      email: "coder12atgmail.com"
    }
  ],
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
  const { pathname } = useLocation();
  const { kelasId, anggotaId } = useParams();

  const [groupDropdownOpen, setGroupDropdownOpen] = useState(true);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

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
          <div>
            {`/k/${kelasId}`}
          </div>

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
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
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
          {`/k/${kelasId}/a/${anggotaId}`}
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