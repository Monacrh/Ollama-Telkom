import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";

import NavbarComponent from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import ConfirmationModal from "../../components/ConfirmationModal";

function Anggota() {
  let { kelasId, anggotaId } = useParams();
  
  // Group and Chat State
  const [groups, setGroups] = useState([
    { 
      id: 1, 
      name: "Sample Group", 
      members: ["student1@telkom.com", "student2@telkom.com"],
      messages: []
    }
  ]);
  
  const [chats, setChats] = useState(["General Chat"]);
  
  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ 
    type: "", 
    name: "", 
    action: "" 
  });
  const [showCreateClass, setShowCreateClass] = useState(false);
  
  // AI Chat State
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [aiChatContext, setAIChatContext] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      title: "Quantum Physics Basics",
      timestamp: new Date().toISOString(),
      messages: [
        { 
          text: "Explain quantum entanglement", 
          sender: "user", 
          timestamp: new Date().toISOString() 
        },
        { 
          text: "Quantum entanglement is a physical phenomenon that occurs when...", 
          sender: "ai", 
          timestamp: new Date().toISOString() 
        }
      ]
    }
  ]);

  const handleConfirmAction = () => {
    const { name, type, action } = modalContent;
    if (action === "delete") {
      if (type === "Group") {
        setGroups(groups.filter((g) => g.id !== name));
        setSelectedGroup(null);
      } else {
        setChats(chats.filter((c) => c !== name));
      }
    }
    setShowModal(false);
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div>
        <h1>Kelas {kelasId} {anggotaId}</h1>
      </div>

      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        content={modalContent}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

export default Anggota;