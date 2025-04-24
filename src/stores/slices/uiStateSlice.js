import { createSlice } from '@reduxjs/toolkit';

const initialModalContent = {
    type: '',
    name: '',
    action: '',
}

export const uiStateSlice = createSlice({
    name: 'uiState',
    initialState: {
        isSidebarOpen: true,
        isGroupChatOpen: false,
        showCreateClass: false,
        showModal: false,
        modalContent: initialModalContent,
    },
    reducers: {
        setIsSidebarOpen: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
        setIsGroupChatOpen: (state, action) => {
            state.isGroupChatOpen = action.payload;
        },
        setShowCreateClass: (state, action) => {
            state.showCreateClass = action.payload;
        },
        setShowModal: (state, action) => {
            state.showModal = action.payload;
        },
        setModalContent: (state, action) => {
            state.modalContent = { ...initialModalContent, ...action.payload };
        },
        resetModalContent: (state) => {
            state.modalContent = initialModalContent;
        },
    }
});

export const {
    setIsSidebarOpen,
    setIsGroupChatOpen,
    setShowCreateClass,
    setShowModal,
    setModalContent,
    resetModalContent
} = uiStateSlice.actions;

export default uiStateSlice.reducer;