import apiSlice from "@/lib/api";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkLogin: builder.query({
      query: () => ({
        url: "/auth/check",
        method: "GET",
      }),
    }),

    login: builder.mutation({
      query: (credential) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: credential,
      }),
    }),

    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
    }),

    logout: builder.query({
      query: () => "/auth/logout",
    }),
  }),
});

export const {
  useCheckLoginQuery,
  useLoginMutation,
  useLogoutQuery,
  useSignupMutation,
} = authApiSlice;
