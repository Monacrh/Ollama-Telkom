import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import ConfirmationModal from "../../components/ConfirmationModal";

import { useSelector, useDispatch } from "react-redux";
import { setShowModal } from "../../stores/slices/uiStateSlice";
import { setClassrooms, selectClassrooms } from "../../stores/slices/classroomSlice";

function Anggota() {
  const dispatch = useDispatch();

  const modalContent = useSelector((state) => state.uiState.modalContent);
  const showModal = useSelector((state) => state.uiState.showModal);
  const classrooms = useSelector(selectClassrooms);
  
  const [chats, setChats] = useState(["General Chat"]);
  
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

  const handleConfirmAction = () => {
    const { name, type, action } = modalContent;
    if (action === "delete") {
      if (type === "Group") {
        dispatch(setClassrooms(classrooms.filter((c) => c.classID !== name)));
      } else {
        setChats(chats.filter((c) => c !== name));
      }
    }
    dispatch(setShowModal(false));
  };

  return (
    <>
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

      <ConfirmationModal
        show={showModal}
        onHide={() => dispatch(setShowModal(false))}
        content={modalContent}
        onConfirm={handleConfirmAction}
      />
    </>
  );
}

export default Anggota;