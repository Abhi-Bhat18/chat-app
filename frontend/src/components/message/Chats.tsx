import React from 'react'
import { Box } from '@mui/material'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import Messages from './Messages'


interface Props {
    conversationId: string
}

const Chats: React.FC<Props> = ({ }) => {
    return (
        <Box component="section" sx={(theme) => ({
            display: 'none',
            position: 'relative',
            border : 'solid',
            borderRadius : '5px',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
                flexBasis: '60%'
            },
            [theme.breakpoints.up('md')]: {
                flexBasis: '70%',
            }
        })}>
            <ChatHeader />
            <Messages/>
            <MessageInput />
        </Box>
    )
}

export default Chats