import { createSlice } from "@reduxjs/toolkit";

interface Conversation {
    conversations: any[]
}

const initialState: Conversation = {
    conversations: []
}

const conversationSlice = createSlice({
    'name': 'conversation',
    initialState,
    reducers: {
        setConversation: (state, action) => {
            state.conversations = action.payload;
        },
        addConversation: (state, action) => {
            state.conversations.push(action.payload);
        }
    }
})

export const { setConversation, addConversation } = conversationSlice.actions

export default conversationSlice.reducer