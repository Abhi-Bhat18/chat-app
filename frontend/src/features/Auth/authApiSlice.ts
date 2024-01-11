import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        checkLogin: builder.query({
            query: () => ({
                url: '/auth/check',
                method: "GET",
                credentials: 'include'
            })
        }),
        login: builder.mutation({
            query: (credential) => (
                {
                    url: '/auth/login',
                    method: 'POST',
                    body: credential,
                    credentials: 'include'
                }
            )
        }),
        logout: builder.query({
            query: () => '/auth/logout'
        })
    })
})

export const { useCheckLoginQuery, useLoginMutation, useLogoutQuery } = authApiSlice;
