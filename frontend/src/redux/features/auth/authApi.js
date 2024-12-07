import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';



// query :  whn get method 
// mutation : when others method

const authApi = createApi({

    reducerPath: 'authAPi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`,
        credentials: 'include'
    }),
    tagTypes: ["Users"], 

    endpoints: (builder) => ({


        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: "POST",
                body: newUser
            })
        }),


        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "login",
                method: "POST",
                body: credentials

            })
        }),


        logoutUser : builder.mutation({
            query:(credentials)=>({
                url: '/logout',
                method: 'POST',
                body: credentials

            })

        }), 
        
        updateHighScore: builder.mutation({
            query:({userId,highScore})=>({
                url: `/high-score/${userId}`,
                method: 'PUT',
                body: {highScore}
            }),
            refetchOnMount: true,
            invalidatesTags: ['Users']
        }),
       getHighScore: builder.query({
            query:(userId)=>({
                url: `/gethigh-score/${userId}`,
                method: 'GET',
                
            }),
            providesTags: ["Users"]
        }),



    }),


});


export const{  useRegisterUserMutation , useLoginUserMutation , useLogoutUserMutation , useUpdateHighScoreMutation , useGetHighScoreQuery} = authApi;

export default authApi;