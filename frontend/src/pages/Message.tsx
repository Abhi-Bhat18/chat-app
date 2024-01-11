import Box from '@mui/system/Box';
import Chats from '../components/message/Chats';
import Conversations from '../components/message/Conversations';

// <--------------- Icons -------------------->
// import MenuIcon from '@mui/icons-material/Menu';

const Message = () => {

    return (
        <Box component={'main'} sx={(theme) => ({
            display: 'flex',
            maxWidth: "100vw",
            maxHeight: '100vh',
            overflowY : 'hidden',
            [theme.breakpoints.up('sm')]: {
                padding: '20px'
            }
        })}>
            <Box component={'section'} sx={(theme) => ({
                width: '100%',
                maxWidth: '1200px',
                marginX: 'auto',
                display: 'flex',
                backgroundColor: theme.palette.primary.main,
            })}>
                <Conversations />
                <Chats conversationId='someconversation id' />
            </Box>

        </Box>
    )
}

export default Message