import { Box } from '@mui/material'
import { useAppSelector } from '../../app/api/store'
import Avatar from '../common/Avatar';


const ChatHeader = () => {
    const { receiver } = useAppSelector(state => state.message);

    return (
        <Box component={'div'} sx={{
            display: 'flex',
            paddingX: '10px',
            paddingY: '20px',
            border: 'solid 1px #e5e5e5',
            alignItems: 'center'
        }}>
            <Avatar src={receiver?.imgUrl ? receiver.imgUrl : ''} height='50px' width='50px' />
            <Box sx={{ marginX: '10px' }}>
                <Box component={'p'} sx={{ fontSize: '18px' }}> {receiver?.fullName} </Box>
                <Box component={'div'}> <Box component={'div'}></Box>  Active </Box>
            </Box>

            <Box> Options</Box>

        </Box>
    )
}

export default ChatHeader