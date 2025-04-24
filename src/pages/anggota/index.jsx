import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import ConfirmationModal from "../../components/ConfirmationModal";

import { useSelector, useDispatch } from "react-redux";
import { setShowModal } from "../../stores/slices/uiStateSlice";

function Anggota() {
  const dispatch = useDispatch();

  const modalContent = useSelector((state) => state.uiState.modalContent);
  const showModal = useSelector((state) => state.uiState.showModal);
  
  // Group and Chat State
  // const [groups, setGroups] = useState([
  //   { 
  //     id: 1, 
  //     name: "Sample Group", 
  //     members: ["student1@telkom.com", "student2@telkom.com"],
  //     messages: []
  //   }
  // ]);
  
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
    <>
      <Sidebar
        chats={chats}
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
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
      />

      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        content={modalContent}
        onConfirm={handleConfirmAction}
      />
    </>
  );
}

export default Anggota;