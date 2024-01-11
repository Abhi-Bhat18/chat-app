import { Box } from "@mui/material"
import React from "react"
import { useGetOrCreateConversationMutation } from "../../features/conversation/conversationApiSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setReceiver } from "../../features/Message/messageSlice";
import { AppDispatch } from "../../app/api/store";
import { useDispatch } from "react-redux";

const profile = "https://media.licdn.com/dms/image/C4E03AQH68VrGQpaVtw/profile-displayphoto-shrink_400_400/0/1622128506029?e=1709164800&v=beta&t=kirua4ucKeiNs_-g-HJ5sc3zHnRs6VF74sfuEJKF_1w"

interface Props {
    _id: string,
    fullName: string,
    imgUrl: string,
    userName: string,
    email: string
}

const ProfileCard: React.FC<Props> = ({ _id, fullName, userName }) => {

    const dispatch: AppDispatch = useDispatch()

    const [_createConversation, { }] = useGetOrCreateConversationMutation();

    const createOrGetConversation = async () => {
        try {
            const result = await _createConversation(_id);
            console.log("Result", result);

            if ('data' in result) {
                toast("Conversation created successfully");
                console.log("Data", result.data);
                dispatch(setReceiver({
                    conversationId: result.data._id, receiver: {
                        _id,
                        fullName,
                        imgUrl: profile,
                        userName
                    }
                }))
            }


            // dispatch(setReceiver({ conversationId :  }))
        } catch (error) {
            toast('Something went wrong');
            console.log("Error", error);
        }
    }

    return (
        <>
            <ToastContainer />
            <Box
                onClick={createOrGetConversation}
                component={'div'} sx={(theme) => ({
                    backgroundColor: theme.palette.third.main,
                    paddingX: '5px',
                    marginY: '20px',
                    width: "100%",
                    display: 'flex',
                    alignItems: 'center',
                    cursor: "pointer"
                })}>
                <Box component={'img'} src={profile} sx={{ width: "50px", height: '50px', borderRadius: '100%' }} />
                <Box sx={{ width: '100%', marginX: "5px", paddingBottom: "5px", borderBottom: "solid 1px" }}>
                    <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
                        <Box component='h4'>{fullName}</Box>

                    </Box>
                    <Box component={'p'} sx={{
                        fontSize: '14px'
                    }}> {userName} </Box>
                </Box>
            </Box>

        </>

    )

}

export default ProfileCard