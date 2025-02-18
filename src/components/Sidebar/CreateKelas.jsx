import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, ListGroup, Stack, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const dummyMembers = [
  { id: 1, name: 'John Doe', email: 'john@telkom.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@telkom.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@telkom.com' },
  { id: 4, name: 'Alice Brown', email: 'alice@telkom.com' },
];

function CreateClassForm({ setGroups, setShowCreateClass }) {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      setGroups(prev => [...prev, {
        name: groupName,
        members: selectedMembers,
        id: Date.now()
      }]);
      setShowCreateClass(false);
    }
  };

  const toggleMember = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const filteredMembers = dummyMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-3">
      <h5 className="mb-4">Create New Class</h5>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Add Members</Form.Label>
          
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          <ListGroup style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {filteredMembers.length === 0 ? (
              <ListGroup.Item className="text-muted">
                No members found
              </ListGroup.Item>
            ) : (
              filteredMembers.map((member) => (
                <ListGroup.Item
                  key={member.id}
                  as="div"
                  role="button"
                  active={selectedMembers.includes(member.id)}
                  onClick={() => toggleMember(member.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div>{member.name}</div>
                      <small className="text-muted">{member.email}</small>
                    </div>
                    {selectedMembers.includes(member.id) && (
                      <span className="text-primary">✓</span>
                    )}
                  </div>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Form.Group>

        <Stack gap={2} direction="horizontal" className="justify-content-end">
          <Button
            variant="secondary"
            onClick={() => setShowCreateClass(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Class
          </Button>
        </Stack>
      </Form>
    </div>
  );
}

CreateClassForm.propTypes = {
  setGroups: PropTypes.func.isRequired,
  setShowCreateClass: PropTypes.func.isRequired
};

export default CreateClassForm;