import React from 'react';
import { Box } from '@mui/material'
import { useGetUserQuery } from '../../features/conversation/conversationApiSlice'
import ProfileCard from './ProfileCard';


interface Props {

}

const CommonUsers: React.FC<Props> = () => {
    const { data, isLoading, isError } = useGetUserQuery({});

    if (isLoading)
        return (<Box component={'div'}> Loading...</Box>)
    else if (isError) return (<Box component={'div'}> Something went wrong</Box>)

    return (<Box component={'section'} sx={{ marginY : '10px' }}>
        <Box component={'p'} sx={{ width: '100%', textAlign: 'center' }}> Users you might know </Box>
        {
            data && data.map((user: any, index: number) => <ProfileCard key={index} _id={user._id} fullName={user.fullName} userName={user.userName} email={user.email} imgUrl={user.imgUrl} />)
        }
    </Box>)

}

export default CommonUsers