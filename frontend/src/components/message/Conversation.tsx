import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  firstName: string,
  lastName: string,
  imgUrl: string,
  message: string,
}

const profile = "https://media.licdn.com/dms/image/C4E03AQH68VrGQpaVtw/profile-displayphoto-shrink_400_400/0/1622128506029?e=1709164800&v=beta&t=kirua4ucKeiNs_-g-HJ5sc3zHnRs6VF74sfuEJKF_1w"

const Conversation: React.FC<Props> = () => {
  return (
    <Box component={'div'} sx={(theme) => ({
      backgroundColor: theme.palette.third.main,
      paddingX: '5px',
      marginY: '20px',
      display: 'flex',
      alignItems: 'center',
      cursor: "pointer"
    })}>
      <Box component={'img'} src={profile} sx={{ width: "50px", height: '50px', borderRadius: '100%' }} />
      <Box sx={{ width: '100%', marginX: "5px", paddingBottom: "5px", borderBottom: "solid 1px" }}>
        <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
          <Typography component='h4'>Abhishek Bhat</Typography>
          <Typography component='p' fontSize={'12px'}> 8:39 pm </Typography>
        </Box>
        <Typography component={'p'} fontSize={'10px'}>
          This is fucking message
        </Typography>
      </Box>
    </Box>
  )
}

export default Conversation