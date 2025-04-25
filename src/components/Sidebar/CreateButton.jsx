// CreateButton.jsx
import PropTypes from 'prop-types';
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createChat, fetchChats } from '../../stores/slices/chatSlice';
import { createClassroomAsync, getClassroomsAsync } from '../../stores/slices/classroomSlice';
import { setShowCreateClass } from '../../stores/slices/uiStateSlice';

function CreateButton() {
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatTitle, setChatTitle] = useState('');

  const [classroomName, setClassroomName] = useState('');
  const [classroomNickname, setClassroomNickname] = useState('');
  const [classroomDesc, setClassroomDesc] = useState('');

  const dispatch = useDispatch();

  const showCreateClass = useSelector((state) => state.uiState.showCreateClass);

  const handleCreateChat = async () => {
    try {
      const resultAction = await dispatch(createChat(chatTitle));
      const newChat = resultAction.payload;
      
      if (newChat && newChat.length > 0) {
        // Optional: Force refresh the list
        await dispatch(fetchChats());
      }
      
      setShowChatModal(false);
      setChatTitle('');
    } catch (error) {
      console.error('Failed to create chat:', error);
    }
  };

  const handleCreateClassroom = async () => {
    let newClassroom = {
      className: classroomName,
      classNickname: classroomNickname,
      classDescription: classroomDesc
    }
    try {
      dispatch(createClassroomAsync(newClassroom));
      
      dispatch(getClassroomsAsync());
      
      setShowCreateClass(false);
      setClassroomName('');
      setClassroomNickname('');
      setClassroomDesc('');
    } catch (error) {
      console.error('Failed to create classroom:', error);
    }
  };

  return (
    <>
      <Dropdown className="position-absolute bottom-0 end-0 m-3">
        <Dropdown.Toggle
          variant="primary"
          className="rounded-0 p-3 d-flex align-items-center justify-content-center"
          bsPrefix="custom-dropdown-toggle"
          style={{ width: "60px", height: "60px" }}
        >
          <FaPlus />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(setShowCreateClass(true))}>
            Create Class
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowChatModal(true)}>
            Create Chat
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={showChatModal} onHide={() => setShowChatModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="chatTitle">
            <Form.Label>Chat Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter chat title"
              value={chatTitle}
              onChange={(e) => setChatTitle(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChatModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateChat} disabled={!chatTitle.trim()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateClass} onHide={() => dispatch(setShowCreateClass(false))} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="classroomName">
            <Form.Label>Classroom Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter classroom name"
              value={classroomName}
              onChange={(e) => setClassroomName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="classroomNickname">
            <Form.Label>Classroom Nickname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter classroom nickname"
              value={classroomNickname}
              onChange={(e) => setClassroomNickname(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="classroomDesc">
            <Form.Label>Classroom Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter classroom description"
              value={classroomDesc}
              onChange={(e) => setClassroomDesc(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(setShowCreateClass(false))}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateClassroom} disabled={!classroomName.trim() || !classroomNickname.trim() || !classroomDesc.trim()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CreateButton.propTypes = {
  setShowCreateClass: PropTypes.func.isRequired
};

export default CreateButton;