import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams, Outlet, useLocation } from "react-router";

import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import ConfirmationModal from "../../components/ConfirmationModal";

import { useSelector, useDispatch } from "react-redux";
import { setShowModal } from "../../stores/slices/uiStateSlice";

function Kelas() {
  let { kelasId } = useParams();
  let { pathname } = useLocation();

  const dispatch = useDispatch();

  const modalContent = useSelector((state) => state.uiState.modalContent);
  const showModal = useSelector((state) => state.uiState.showModal);
  
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
    dispatch(setShowModal(false));
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>      
      <Container fluid className="flex-grow-1">
        <Row className="h-100" style={{ minHeight: "calc(100vh - 56px)" }}>
          { pathname === `/k/${kelasId}` ? (
            <>
              <Sidebar
                groups={groups}
                chats={chats}
                setGroups={setGroups}
                setChats={setChats}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                aiChatContext={aiChatContext}
                setAIChatContext={setAIChatContext}
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
              />
              
              <MainContent 
                selectedGroup={selectedGroup}
                aiChatContext={aiChatContext}
                setAIChatContext={setAIChatContext}
                groups={groups}
                setGroups={setGroups}
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                setSelectedGroup={setSelectedGroup}
              />
            </>
            ) : (<Outlet />)
          }
        </Row>
      </Container>

      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        content={modalContent}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

export default Kelas;