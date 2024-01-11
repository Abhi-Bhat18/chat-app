import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Message {
    conversationId: string
    senderId: string,
    message: string,
    time: Date
}

interface Receiver {
    _id: string,
    fullName: string,
    imgUrl: string
    userName: string
}

interface MessagesState {
    conversationId: string | null,
    receiver: Receiver | null,
    messages: Message[],
    status: string,
    error: any
}

const initialState: MessagesState = {
    receiver: null,
    conversationId: null,
    messages: [
        {
            conversationId: '323',
            senderId: '232',
            message: "This is the message  hjhghhg",
            time: new Date()
        },
        {
            conversationId: '323',
            senderId: '232',
            message: "This is the message 2",
            time: new Date()
        },

    ],
    status: 'loading',
    error: null
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setReceiver: (state, action:
            PayloadAction<{ conversationId: string, receiver: Receiver }>
        ) => {
            state.receiver = action.payload.receiver,
                state.conversationId = action.payload.conversationId
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        addmessages: (state, action) => {
            state.messages = action.payload
        }
    }
})

export const { addMessage , setReceiver } = messageSlice.actions;
export default messageSlice.reducer;