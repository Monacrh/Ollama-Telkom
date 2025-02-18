import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

function ConfirmationModal({ show, onHide, content, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {content.action === "delete" ? "Confirm Deletion" : `Manage ${content.type}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content.action === "delete"
          ? `Are you sure you want to delete ${content.type}: ${content.name}?`
          : `Manage ${content.type}: ${content.name}`}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button 
          variant={content.action === "delete" ? "danger" : "primary"} 
          onClick={onConfirm}
        >
          {content.action === "delete" ? "Delete" : "Manage"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  content: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    action: PropTypes.string
  }).isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ConfirmationModal;