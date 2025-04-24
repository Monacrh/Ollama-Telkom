import PropTypes from 'prop-types';
import { Col, Button } from 'react-bootstrap';
import { FaAngleRight } from 'react-icons/fa';
import GroupChat from './GroupChat';
import AIChat from './AIChat';

import { useSelector, useDispatch } from 'react-redux';
import { setIsSidebarOpen } from '../../stores/slices/uiStateSlice';

function MainContent({
  aiChatContext,
  setAIChatContext,
}) {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.uiState.isSidebarOpen);
  const isGroupChatOpen = useSelector((state) => state.uiState.isGroupChatOpen);

  return (
    <Col 
      md={isSidebarOpen ? 9 : 12} 
      className="d-flex flex-column bg-white position-relative p-3"
      style={{
        minHeight: 'calc(100vh - 56px)',
        transition: 'all 0.3s ease'
      }}
    >
      {!isSidebarOpen && (
        <Button 
          variant="outline-secondary" 
          className="position-absolute start-0 m-2" 
          onClick={() => dispatch(setIsSidebarOpen(true))}
        >
          <FaAngleRight />
        </Button>
      )}
      
      {aiChatContext ? (
        <AIChat 
          aiChatContext={aiChatContext}
          setAIChatContext={setAIChatContext}
          // chatHistory={chatHistory}
          // setChatHistory={setChatHistory}
        />
      ) : isGroupChatOpen ? (
        <GroupChat />
      ) : (
        <div className="text-center w-100">
          <img 
            alt="Welcome Logo" 
            src="/telkom.png" 
            width="150" 
            height="150" 
            className="mb-4" 
          />
          <h1>Selamat Datang di PROJECT OLLAMA Universitas Telkom</h1>
        </div>
      )}
    </Col>
  );
}

MainContent.propTypes = {
  selectedGroup: PropTypes.object,
  setSelectedGroup: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  setGroups: PropTypes.func.isRequired,
  aiChatContext: PropTypes.object,
  setAIChatContext: PropTypes.func.isRequired,
};

export default MainContent;