import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

function CreateButton({ setChats, setShowCreateClass }) {
  return (
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
        <Dropdown.Item onClick={() => setShowCreateClass(true)}>
          Buat Kelas
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setChats(prev => [...prev, `Chat ${prev.length + 1}`])}>
          Buat Chat
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

CreateButton.propTypes = {
  setChats: PropTypes.func.isRequired,
  setShowCreateClass: PropTypes.func.isRequired
};

export default CreateButton;