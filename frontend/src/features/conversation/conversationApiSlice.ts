import { apiSlice } from "../../app/api/apiSlice";


const conversationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser : builder.query({
            query : () => ( {
              url : '/user',
              method : "GET",
              credentials : 'include'  
            })
        }),
        getConversations: builder.query({
            query: () => ({
                url: '/conversation',
                method: "GET",
                credentials: 'include'
            })
        }),
        getOrCreateConversation: builder.mutation({
            query: ( receiverId ) => ({
                url: '/message/conversation',
                method: "POST",
                body: { receiverId },
                credentials: 'include'
            })
        }),
    })
})


export const { useGetConversationsQuery, useGetUserQuery, useGetOrCreateConversationMutation } = conversationApiSlice