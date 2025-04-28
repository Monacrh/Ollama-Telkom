import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, ListGroup, Dropdown } from 'react-bootstrap';
import { FaComments, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChats } from '../../stores/slices/chatSlice';

function ChatsSection({
  chatDropdownOpen,
  setChatDropdownOpen,
  activeMenuId,
  toggleMenu,
  setModalContent,
  setShowModal
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chats, loading, error } = useSelector((state) => state.chat);
  // const { chats, loading, error } = useSelector((state) => ({
  //   chats: state.chat.chats, // Should be array of chat objects
  //   loading: state.chat.loading,
  //   error: state.chat.error
  // }));

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const handleAction = (action, name) => {
    setModalContent({ name, type: "Chat", action });
    setShowModal(true);
  };

  if (error) return (
    <div className="alert alert-danger mt-3">
      Error: {error}
      <Button 
        variant="link" 
        onClick={() => dispatch(fetchChats())}
        className="ms-2"
      >
        Retry
      </Button>
    </div>
  );

  return (
    <>
      <Button 
        variant="light" 
        className="w-100 text-start mt-3" 
        onClick={() => setChatDropdownOpen(!chatDropdownOpen)}
      >
        <FaComments className="me-2" /> My Chat
      </Button>
      <Collapse in={chatDropdownOpen}>
        <ListGroup>
          {loading ? (
            <ListGroup.Item>Loading chats...</ListGroup.Item>
          ) : !chats || chats.length === 0 ? (
            <ListGroup.Item>No chats available</ListGroup.Item>
          ) : (
            chats.map((chat) => (
              <ListGroup.Item 
                key={chat.chatID} 
                className="d-flex justify-content-between align-items-center" 
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/chat/${chat.chatID}`)}
              >
                {chat.chatTitle}
                <Dropdown 
                  show={activeMenuId === chat.chatID} 
                  onToggle={() => toggleMenu(chat.chatID)} 
                  align="end"
                >
                  <Dropdown.Toggle 
                    bsPrefix="custom-dropdown-toggle" 
                    as={Button} 
                    variant="light" 
                    size="sm"
                  >
                    <FaEllipsisV />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleAction("manage", chat.chatTitle)}>
                      Kelola
                    </Dropdown.Item>
                    <Dropdown.Item 
                      onClick={() => handleAction("delete", chat.chatTitle)} 
                      className="text-danger"
                    >
                      Hapus
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Collapse>
    </>
  );
}

ChatsSection.propTypes = {
  chatDropdownOpen: PropTypes.bool.isRequired,
  setChatDropdownOpen: PropTypes.func.isRequired,
  activeMenuId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  toggleMenu: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired
};

export default ChatsSection;