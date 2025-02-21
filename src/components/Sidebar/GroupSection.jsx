import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Collapse, ListGroup, Dropdown } from 'react-bootstrap';
import { FaUsers, FaEllipsisV } from 'react-icons/fa';

function GroupsSection({
  groups,
  groupDropdownOpen,
  setGroupDropdownOpen,
  activeMenuId,
  toggleMenu,
  setModalContent,
  setShowModal,
  setSelectedGroup
}) {
  const handleAction = (action, id) => {
    setModalContent({ name: id, type: "Group", action });
    setShowModal(true);
  };

  return (
    <>
      <Button 
        variant="light" 
        className="w-100 text-start mb-2" 
        onClick={() => setGroupDropdownOpen(!groupDropdownOpen)}
      >
        <FaUsers className="me-2" /> My Groups
      </Button>
      <Collapse in={groupDropdownOpen}>
        <div style={{}}>
          <ListGroup>
            {groups.map((group) => (
              <ListGroup.Item 
                key={group.id} 
                className="d-flex justify-content-between align-items-center"
              >
                {/* Group info with separate click handler */}
                <Link to={`/k/${group.id}`}>
                  <div 
                    className="flex-grow-1" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedGroup(group)}
                  >
                      <div>{group.name}</div>
                      <small className="text-muted">{group.members.length} members</small>
                  </div>
                </Link>

                {/* Dropdown with click prevention */}
                <Dropdown 
                  show={activeMenuId === group.id} 
                  onToggle={(isOpen) => {
                    toggleMenu(isOpen ? group.id : null);
                  }}
                  align="end"
                >
                  <Dropdown.Toggle 
                    bsPrefix="custom-dropdown-toggle" 
                    as={Button} 
                    variant="light" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(group.id);
                    }}
                  >
                    <FaEllipsisV />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("manage", group.id);
                      }}
                    >
                      Kelola
                    </Dropdown.Item>
                    <Dropdown.Item 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("delete", group.id);
                      }}
                      className="text-danger"
                    >
                      Hapus
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Collapse>
    </>
  );
}

GroupsSection.propTypes = {
  groups: PropTypes.array.isRequired,
  groupDropdownOpen: PropTypes.bool.isRequired,
  setGroupDropdownOpen: PropTypes.func.isRequired,
  activeMenuId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  toggleMenu: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setSelectedGroup: PropTypes.func.isRequired
};

export default GroupsSection;