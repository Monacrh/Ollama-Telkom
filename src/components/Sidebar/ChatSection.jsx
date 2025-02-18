import React from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, ListGroup, Dropdown } from 'react-bootstrap';
import { FaComments, FaEllipsisV } from 'react-icons/fa';

function ChatsSection({
  chats,
  chatDropdownOpen,
  setChatDropdownOpen,
  activeMenuId,
  toggleMenu,
  setModalContent,
  setShowModal
}) {
  const handleAction = (action, name) => {
    setModalContent({ name, type: "Chat", action });
    setShowModal(true);
  };

  return (
    <>
      <Button 
        variant="light" 
        className="w-100 text-start mt-3" 
        onClick={() => setChatDropdownOpen(!chatDropdownOpen)}
      >
        <FaComments className="me-2" /> My Chats
      </Button>
      <Collapse in={chatDropdownOpen}>
        <ListGroup>
          {chats.map((chat, index) => (
            <ListGroup.Item 
              key={index} 
              className="d-flex justify-content-between align-items-center" 
              style={{ cursor: "pointer" }}
            >
              {chat}
              <Dropdown 
                show={activeMenuId === chat} 
                onToggle={() => toggleMenu(chat)} 
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
                  <Dropdown.Item onClick={() => handleAction("manage", chat)}>
                    Kelola
                  </Dropdown.Item>
                  <Dropdown.Item 
                    onClick={() => handleAction("delete", chat)} 
                    className="text-danger"
                  >
                    Hapus
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Collapse>
    </>
  );
}

ChatsSection.propTypes = {
  chats: PropTypes.array.isRequired,
  chatDropdownOpen: PropTypes.bool.isRequired,
  setChatDropdownOpen: PropTypes.func.isRequired,
  activeMenuId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  toggleMenu: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired
};

export default ChatsSection;