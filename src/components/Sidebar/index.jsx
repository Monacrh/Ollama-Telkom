import { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, ListGroup, Form, InputGroup } from 'react-bootstrap';
import { useLocation, useParams, Link, useNavigate } from 'react-router';
import GroupsSection from './GroupSection';
import ChatsSection from './ChatSection';
import CreateButton from './CreateButton';
import CreateClassForm from './CreateKelas';
import { FaAngleLeft, FaRobot, FaSearch } from 'react-icons/fa';
import { BsSearch } from "react-icons/bs";

import { useSelector, useDispatch } from 'react-redux';
import { setIsSidebarOpen, setModalContent, setShowCreateClass, setShowModal } from '../../stores/slices/uiStateSlice';
import { selectSelectedClassroom } from '../../stores/slices/classroomSlice';
import { selectUser } from '../../stores/slices/userSlice';

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
    }
  ]
};

function Sidebar({
  chats,
  setChats,
  aiChatContext,
  setAIChatContext,
  chatHistory,
  setChatHistory
}) {
  const { pathname } = useLocation();
  const { kelasId, anggotaId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isSidebarOpen = useSelector((state) => state.uiState.isSidebarOpen);
  const showCreateClass = useSelector((state) => state.uiState.showCreateClass);
  const selectedClassroom = useSelector(selectSelectedClassroom);
  const user = useSelector(selectUser);
  
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(true);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [memberSearchQuery, setMemberSearchQuery] = useState('');

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const filteredChats = dummyChat.chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.messages.some(msg => 
      msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredMembers = selectedClassroom.listOfStudent.filter(student =>
    student.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(memberSearchQuery.toLowerCase())
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
      user
    });
    navigate(`/k/${selectedClassroom.classID}/a/ai`);
  };

  return (
    <Col 
      md={isSidebarOpen ? 3 : 0} 
      className={`bg-light border-end p-3 d-flex flex-column position-relative ${isSidebarOpen ? "d-block" : "d-none"}`}
      style={{ 
        minWidth: '300px', 
        height: 'calc(100vh - 56px)',
        overflowY: 'auto' 
      }}
    >
      {pathname === '/' && (
        <>
          <Button 
            variant="outline-secondary" 
            className="position-absolute top-0 end-0 m-2" 
            onClick={() => dispatch(setIsSidebarOpen(false))}
          >
            <FaAngleLeft />
          </Button>

          {showCreateClass ? (
            <CreateClassForm
              // setGroups={setGroups}
              setShowCreateClass={setShowCreateClass}
            />
          ) : (
            <>
              <GroupsSection
                groupDropdownOpen={groupDropdownOpen}
                setGroupDropdownOpen={setGroupDropdownOpen}
                activeMenuId={activeMenuId}
                toggleMenu={toggleMenu}
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
          <div className="d-flex flex-column h-100">
            <div className="d-flex align-items-center mb-3">
              <Link 
                to="/"
                variant="link" 
                className="me-2 p-0" 
              >
                <FaAngleLeft />
              </Link>
              <div>
                <h5 className="mb-0">{selectedClassroom.className}</h5>
                <p className='mb-0'>{selectedClassroom.classNickname}</p>
              </div>
            </div>

            <div className="border-top pt-3">
              <Form className="d-flex mb-3">
                <Form.Control
                  type="search"
                  placeholder="Cari Nama/Email"
                  value={memberSearchQuery}
                  onChange={(e) => setMemberSearchQuery(e.target.value)}
                />
                <Button variant="outline-success">
                  <BsSearch />
                </Button>
              </Form>

              <h6>Group Members</h6>
              <ListGroup>
                {filteredMembers.map((member) => (
                  <ListGroup.Item key={member.id}>
                    <Link 
                      to={`a/${member.id}`} 
                      className="text-decoration-none text-reset"
                    >
                      <div className="d-flex flex-column">
                        <div>{member.name}</div>
                        <small className="text-muted">{member.email}</small>
                      </div>
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            <Button 
              variant="primary" 
              className="position-absolute bottom-0 end-0 m-3 rounded-circle"
              style={{ width: '50px', height: '50px' }}
              onClick={handleNewAIChat}
            >
              <FaRobot />
            </Button>
          </div>

          <Button 
            variant="outline-secondary" 
            className="position-absolute top-0 end-0 m-2" 
            onClick={() => dispatch(setIsSidebarOpen(false))}
          >
            <FaAngleLeft />
          </Button>
        </>
      )}

      {(pathname === `/k/${kelasId}/a/${anggotaId}` || pathname === `/k/${kelasId}/a/ai`) && (
        <div className="d-flex flex-column h-100">
          <div className="border-bottom pb-3 mb-3">
            <div className="d-flex align-items-center">
              <Link 
                to={`/k/${kelasId}`}
                className="p-0 me-2"
                onClick={() => setAIChatContext(null)}
              >
                <FaAngleLeft />
              </Link>
              <div>
                <div className="fw-bold">
                  {pathname.includes('ai') ? user.name : dummyChat.name}
                </div>
                <small className="text-muted">
                  {pathname.includes('ai') ? user.email : dummyChat.email}
                </small>
              </div>
            </div>
          </div>

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
                  active={aiChatContext?.activeChat?.id === chat.id}
                >
                  <div>
                    <div>{chat.title}</div>
                    <small className="text-muted">
                      {new Date(chat.timestamp).toLocaleDateString()}
                    </small>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          {user.role === 'student' && (
            <Button 
              variant="primary" 
              className="position-absolute bottom-0 end-0 m-3 rounded-circle"
              style={{ width: '50px', height: '50px' }}
              onClick={handleNewAIChat}
            >
              +
            </Button>  
          )}
        </div>
      )}
    </Col>
  );
}

Sidebar.propTypes = {
  groups: PropTypes.array.isRequired,
  chats: PropTypes.array.isRequired,
  setGroups: PropTypes.func.isRequired,
  setChats: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object,
  setSelectedGroup: PropTypes.func.isRequired,
  aiChatContext: PropTypes.object,
  setAIChatContext: PropTypes.func.isRequired,
  chatHistory: PropTypes.array.isRequired,
  setChatHistory: PropTypes.func.isRequired,
};

export default Sidebar;