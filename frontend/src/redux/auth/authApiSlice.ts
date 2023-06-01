import { loginRes, postAuth } from "../../types/user";
import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<loginRes, postAuth>({
			query: credentials => ({
				url: '/login/',
				method: 'POST',
				body: {...credentials}
			})
        })
        
    })
})

export const {
	useLoginMutation
} = authApiSlice