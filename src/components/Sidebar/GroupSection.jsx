import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Collapse, ListGroup, Dropdown } from 'react-bootstrap';
import { FaUsers, FaEllipsisV } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { setModalContent, setShowModal } from '../../stores/slices/uiStateSlice';
import { selectClassrooms } from '../../stores/slices/classroomSlice';

function GroupsSection({
  groupDropdownOpen,
  setGroupDropdownOpen,
  activeMenuId,
  toggleMenu,
}) {
  const dispatch = useDispatch();
  const classrooms = useSelector(selectClassrooms)

  const handleAction = (action, id) => {
    dispatch(setModalContent({ name: id, type: "Group", action }));
    dispatch(setShowModal(true));
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
            {classrooms.map((classroom) => (
              <ListGroup.Item 
                key={classroom.classID} 
                className="d-flex justify-content-between align-items-center"
              >
                {/* Group info with separate click handler */}
                <Link 
                  to={`/k/${classroom.classID}`}
                  className="text-decoration-none text-reset"
                >
                  <div 
                    className="flex-grow-1" 
                    style={{ cursor: 'pointer' }}
                    // onClick={() => dispatch(setSelectedClassroom())}
                  >
                      <div>{classroom.className}</div>
                      <small className="text-muted">{classroom.classNickname}</small>
                  </div>
                </Link>

                {/* Dropdown with click prevention */}
                <Dropdown 
                  show={activeMenuId === classroom.classID} 
                  onToggle={(isOpen) => {
                    toggleMenu(isOpen ? classroom.classID : null);
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
                      toggleMenu(classroom.classID);
                    }}
                  >
                    <FaEllipsisV />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("manage", classroom.classID);
                      }}
                    >
                      Kelola
                    </Dropdown.Item>
                    <Dropdown.Item 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("delete", classroom.classID);
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