import { postAuth } from "../../types/user";
import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<void, postAuth>({
			query: credentials => ({
				url: '/auth',
				method: 'POST',
				body: {...credentials}
			}) 
        })
        
    })
})

export const {
	useLoginMutation
} = authApiSlice