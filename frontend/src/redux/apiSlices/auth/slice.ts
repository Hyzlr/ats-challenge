import { UserLoginSchema, UserSignupSchema } from '@/zod/user.z';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApiSlice = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: "",
        prepareHeaders: (headers) => {
            const jwtToken = window.localStorage.getItem("jwt");

            if (!jwtToken) {
                throw new Error("User not logged in!");
            }

            headers.set("Authorization", `Bearer ${jwtToken}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        signup: builder.mutation<void, UserSignupSchema>({
            query: (user) => ({
                url: '/signup',
                method: 'POST',
                body: user
            })
        }),

        login: builder.mutation<void, UserLoginSchema>({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user
            })
        })
    })
});

export const {
    useSignupMutation,
    useLoginMutation
} = authApiSlice;

export default authApiSlice.reducer;
