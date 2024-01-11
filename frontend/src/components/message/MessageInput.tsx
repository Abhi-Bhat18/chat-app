
import { Box } from '@mui/material'
import { MdOutlineEmojiEmotions } from "react-icons/md"
import { AiOutlineSend } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addMessage } from '../../features/Message/messageSlice';

const MessageInput = () => {

    const dispath = useDispatch();

    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message === '') return
        dispath(addMessage({ 'message': message }))
    }

    return (
        <Box component={'div'} sx={{
            display: 'flex',
            alignItems: 'center',
            paddingX: '10px',
            paddingY: '20px',
            borderTop: 'solid 1px #e5e5e5'
        }}>
            <Box component={'div'} sx={{
                fontSize: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <MdOutlineEmojiEmotions />
            </Box>
            <Box
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                component={'input'} sx={{
                    width: '100%',
                    paddingX: '5px',
                    paddingY: '8px',
                    outline: 'none',
                    marginX: "10px",
                    borderRadius: '8px'
                }} />
            <Box
                onClick={sendMessage}
                component={'div'} sx={{
                    paddingX: '10px',
                    borderRadius: "5px",
                    outline: 'none',
                    cursor: 'pointer',
                    fontSize: '30px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <AiOutlineSend />
            </Box>
        </Box>
    )
}

export default MessageInput