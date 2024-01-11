
import { Box } from "@mui/material"
import MessageCard from "./MessageCard"
import { useAppSelector } from "../../app/api/store";

const Messages = () => {

    const messages = useAppSelector( state => state.message.messages );

    return (
        <Box component={'div'} sx={{
            display : 'flex',
            height : '70vh',
            overflowY: 'scroll',
            background: 'white',
            padding: '10px',
        }}>
            <Box component={'div'} sx={{
            }}>
                {
                  messages && messages.length > 0 &&  messages.map( (message,index) => (
                    <MessageCard message={message.message} key={index} direction="row" justify="flex-start" />
                  ))
                }
            </Box>
        </Box>
    )
}

export default Messages