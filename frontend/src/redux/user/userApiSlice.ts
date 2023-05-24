import { userSliceState } from "../../types/user";
import { apiSlice } from "../api/apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserData: builder.query<userSliceState, void>({
            query: () => '/user',
        }),
        postUserData: builder.mutation<void, userSliceState>({
			query: movieLists => ({
				url: '/user',
				method: 'POST',
				body: {...movieLists}
			}) 
        })
    })
})

export const {
    useGetUserDataQuery,
    usePostUserDataMutation
} = userApiSlice