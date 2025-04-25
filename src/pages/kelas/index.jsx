import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams, Outlet, useLocation } from "react-router";

import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import ConfirmationModal from "../../components/ConfirmationModal";

import { useSelector, useDispatch } from "react-redux";
import { setShowModal } from "../../stores/slices/uiStateSlice";
import { setClassrooms, selectClassrooms, getClassroomAsync, getClassroomsAsync, selectSelectedClassroom } from "../../stores/slices/classroomSlice";
import { fetchSelectedChats } from '../../stores/slices/chatSlice';

function Kelas() {
  let { kelasId } = useParams();
  let { pathname } = useLocation();

  const dispatch = useDispatch();

  const modalContent = useSelector((state) => state.uiState.modalContent);
  const showModal = useSelector((state) => state.uiState.showModal);
  const classrooms = useSelector(selectClassrooms);
  const classroom = useSelector(selectSelectedClassroom);

  const { chats, currentChatItems, loading, error } = useSelector((state) => state.chat);
  
  // const [chats, setChats] = useState(["General Chat"]);
  
  // AI Chat State
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

  // const handleConfirmAction = () => {
  //   const { name, type, action } = modalContent;
  //   if (action === "delete") {
  //     if (type === "Group") {
  //       dispatch(setClassrooms(classrooms.filter((c) => c.classID !== name)));
  //     } else {
  //       setChats(chats.filter((c) => c !== name));
  //     }
  //   }
  //   dispatch(setShowModal(false));
  // };

  useEffect(() => {
    if (classrooms.length === 0) {
      dispatch(getClassroomsAsync());
      return;
    }

    if (kelasId) {
      try {
        const selected = classrooms.find((classroom) => classroom.classID === kelasId);
        dispatch(getClassroomAsync(selected.classID));
      } catch (error) {
        console.log("Error fetching classroom data: ", error);
      }
    }
  }, [kelasId, dispatch, classrooms]);

  useEffect(() => {
    dispatch(fetchSelectedChats(classroom.chat.chatID));
    console.log(chats);
  }, [dispatch, classroom]);

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>      
      <Container fluid className="flex-grow-1">
        <Row className="h-100" style={{ minHeight: "calc(100vh - 56px)" }}>
          { pathname === `/k/${kelasId}` ? (
            <>
              <Sidebar
                aiChatContext={aiChatContext}
                setAIChatContext={setAIChatContext}
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
              />
              
              <MainContent 
                aiChatContext={aiChatContext}
                setAIChatContext={setAIChatContext}
              />
            </>
            ) : (<Outlet />)
          }
        </Row>
      </Container>

      <ConfirmationModal
        show={showModal}
        onHide={() => dispatch(setShowModal(false))}
        content={modalContent}
        // onConfirm={handleConfirmAction}
      />
    </div>
  );
}

export default Kelas;