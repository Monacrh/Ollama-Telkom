import React, { useState } from "react";
import { Navbar, Container, Row, Col, Dropdown, Button, ListGroup, Collapse, Modal } from "react-bootstrap";
import { FaUser, FaPlus, FaComments, FaUsers, FaEllipsisV, FaAngleLeft, FaAngleRight } from "react-icons/fa";

function App() {
  const [groups, setGroups] = useState(["Group 1", "Group 2", "Group 3"]);
  const [chats, setChats] = useState(["Chat 1", "Chat 2", "Chat 3"]);
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(true);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ type: "", name: "", action: "" });

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  // Open Modal for Confirmation
  const openModal = (name, type, action) => {
    setModalContent({ name, type, action });
    setShowModal(true);
  };

  // Handle Confirmed Action
  const handleConfirmAction = () => {
    const { name, type, action } = modalContent;
    if (action === "delete") {
      if (type === "Group") {
        setGroups(groups.filter((g) => g !== name));
      } else {
        setChats(chats.filter((c) => c !== name));
      }
    } else if (action === "manage") {
      alert(`Managing ${type}: ${name}`);
    }
    setShowModal(false);
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      {/* Top Navbar */}
      <Navbar style={{ backgroundColor: "red" }} variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img alt="Logo" src="/telkom.png" width="30" height="30" className="d-inline-block align-top" />
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <Dropdown align="end">
              <FaUser className="me-2" />
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      {/* Full Screen Container */}
      <Container fluid className="flex-grow-1">
        <Row className="h-100" style={{ minHeight: "calc(100vh - 56px)" }}>
          {/* Sidebar */}
          <Col md={isSidebarOpen ? 3 : 0} className={`bg-light border-end p-3 d-flex flex-column position-relative ${isSidebarOpen ? "d-block" : "d-none"}`}>
            {/* Sidebar Toggle Button (Inside Sidebar) */}
            <Button variant="outline-secondary" className="position-absolute top-0 end-0 m-2" onClick={() => setIsSidebarOpen(false)}>
              <FaAngleLeft />
            </Button>

            {/* Groups Section */}
            <Button variant="light" className="w-100 text-start mb-2" onClick={() => setGroupDropdownOpen(!groupDropdownOpen)}>
              <FaUsers className="me-2" /> My Groups
            </Button>
            <Collapse in={groupDropdownOpen}>
              <ListGroup>
                {groups.map((group, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    {group}
                    <Dropdown show={activeMenuId === group} onToggle={() => toggleMenu(group)} align="end">
                      <Dropdown.Toggle bsPrefix="custom-dropdown-toggle" as={Button} variant="light" size="sm">
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => openModal(group, "Group", "manage")}>Kelolah</Dropdown.Item>
                        <Dropdown.Item onClick={() => openModal(group, "Group", "delete")} className="text-danger">Hapus</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Collapse>

            {/* Chats Section */}
            <Button variant="light" className="w-100 text-start mt-3" onClick={() => setChatDropdownOpen(!chatDropdownOpen)}>
              <FaComments className="me-2" /> My Chats
            </Button>
            <Collapse in={chatDropdownOpen}>
              <ListGroup>
                {chats.map((chat, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                    {chat}
                    <Dropdown show={activeMenuId === chat} onToggle={() => toggleMenu(chat)} align="end">
                      <Dropdown.Toggle bsPrefix="custom-dropdown-toggle" as={Button} variant="light" size="sm">
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => openModal(chat, "Chat", "manage")}>Kelolah</Dropdown.Item>
                        <Dropdown.Item onClick={() => openModal(chat, "Chat", "delete")} className="text-danger">Hapus</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Collapse>

            {/* Create Button - Positioned Bottom Right of Sidebar */}
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
                <Dropdown.Item onClick={() => setGroups([...groups, `Group ${groups.length + 1}`])}>
                  Buat Kelas
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setChats([...chats, `Chat ${chats.length + 1}`])}>
                  Buat Chat
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          {/* Main Chat Area */}
          <Col md={isSidebarOpen ? 9 : 12} className="d-flex align-items-center justify-content-center bg-white position-relative">
            {!isSidebarOpen && (
              <Button variant="outline-secondary" className="position-absolute start-0 m-2" onClick={() => setIsSidebarOpen(true)}>
                <FaAngleRight />
              </Button>
            )}
            <div className="text-center">
              <img alt="Welcome Logo" src="/telkom.png" width="150" height="150" className="mb-4" />
              <h1>Selamat Datang di PROJECT OLLAMA Universitas Telkom</h1>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalContent.action === "delete" ? "Confirm Deletion" : "Manage " + modalContent.type}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent.action === "delete"
            ? `Are you sure you want to delete ${modalContent.type}: ${modalContent.name}?`
            : `Manage ${modalContent.type}: ${modalContent.name}`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant={modalContent.action === "delete" ? "danger" : "primary"} onClick={handleConfirmAction}>
            {modalContent.action === "delete" ? "Delete" : "Manage"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
