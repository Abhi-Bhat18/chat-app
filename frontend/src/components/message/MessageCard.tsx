import { Box } from "@mui/material"
import React from "react"
const profile = 'https://media.licdn.com/dms/image/C4E03AQH68VrGQpaVtw/profile-displayphoto-shrink_400_400/0/1622128506029?e=1709164800&v=beta&t=kirua4ucKeiNs_-g-HJ5sc3zHnRs6VF74sfuEJKF_1w'

interface Props {
    message : string,   
    justify: 'flex-end' | 'flex-start',
    direction: 'row' | 'row-reverse'
}

const MessageCard: React.FC<Props> = ({ justify, direction,message }) => {

    console.log('justify', justify);

    return (
        <Box component={'div'} sx={{
            marginY: "20px",
            display: 'flex',
            width: '100%',
            justifyContent: justify
        }}>
            <Box component={'div'} sx={{
                display: 'flex',
                flexDirection: direction
            }}>
                <Box component={'img'} src={profile} sx={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                    borderRadius: "100%"
                }} />
                <Box component={'div'} sx={{
                    marginX: '10px',
                    display : 'flex',
                    flexDirection :'column',
                    alignItems : direction === 'row-reverse' ? 'flex-end' : 'flex-start',
                    maxWidth : '70%'
                }}>
                    <Box component={'p'} sx={{
                        paddingY: "10px",
                        paddingX: '10px',
                        backgroundColor: 'whitesmoke',
                        borderTopRightRadius: '8px',
                        borderBottomRightRadius: "8px",
                        borderBottomLeftRadius: '8px',
                    }}>
                        {message}
                    </Box>
                    <Box component={'p'} sx={{
                        margin : "5px",
                        fontSize : '12px'
                    }}>8:39 pm</Box>
                </Box>
            </Box>

        </Box>
    )
}

export default MessageCard