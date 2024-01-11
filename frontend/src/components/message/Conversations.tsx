import { Box } from "@mui/material"
import SearchConversation from "./SearchConversation"
import { useEffect, useState } from "react"
import CommonUsers from "./CommonUsers"
import React from "react"
import { useGetConversationsQuery } from "../../features/conversation/conversationApiSlice"
import Conversation from "./Conversation"

interface Props {

}

const Conversations: React.FC<Props> = () => {

        return (
            <Box component="section" sx={(theme) => ({
                flexBasis: '100%',
                border : `solid ${theme.palette.third.main} 1px`,
                padding: '5px',
                overflowY: 'scroll',
                minHeight : '90vh',
                borderRadius: "5px",
                [theme.breakpoints.up('sm')]: {
                    flexBasis: '40%'
                },
                [theme.breakpoints.up('md')]: {
                    flexBasis: '30%',
                }
            })}>
                <SearchConversation />
                {

                }
                <CommonUsers />
            </Box>
        )
}

export default Conversations