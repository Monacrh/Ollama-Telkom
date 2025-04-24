import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import NavbarComponent from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import ConfirmationModal from "../../components/ConfirmationModal";

import { Outlet, useLocation } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { setShowModal } from "../../stores/slices/uiStateSlice";
import { getUserAsync } from "../../stores/slices/userSlice";
import { getClassroomsAsync } from "../../stores/slices/classroomSlice";

function Home() {
  const location = useLocation();

  const dispatch = useDispatch();

  const modalContent = useSelector((state) => state.uiState.modalContent);
  const showModal = useSelector((state) => state.uiState.showModal);

  // Get user
  useEffect(() => {
    dispatch(getUserAsync());
    dispatch(getClassroomsAsync());
  }, [dispatch])
  
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
        // setGroups(groups.filter((g) => g.id !== name));
        setSelectedGroup(null);
      } else {
        setChats(chats.filter((c) => c !== name));
      }
    }
    dispatch(setShowModal(false));
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <NavbarComponent />
      {location.pathname === "/" ? (
        <Container fluid className="flex-grow-1">
          <Row className="h-100" style={{ minHeight: "calc(100vh - 56px)" }}>
            <Sidebar
              chats={chats}
              setChats={setChats}
              aiChatContext={aiChatContext}
              setAIChatContext={setAIChatContext}
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
            />
            
            <MainContent
              aiChatContext={aiChatContext}
              setAIChatContext={setAIChatContext}
            />
          </Row>
        </Container>
      ) : (<Outlet />)  
    }

      <ConfirmationModal
        show={showModal}
        onHide={() => dispatch(setShowModal(false))}
        content={modalContent}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

export default Home;