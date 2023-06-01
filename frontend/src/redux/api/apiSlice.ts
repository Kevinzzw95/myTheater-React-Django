import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../auth/authSlice';
import { RootState } from '../store/store';
import axios from 'axios';
import { selectCurrentRefresh } from '../auth/authSlice';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { useSelector } from 'react-redux';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if(token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
})

const refreshApi = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({
        updateToken: builder.mutation({
            query: ({ refresh }) => ({
              url: '/login/refresh/',
              method: 'POST',
              body: refresh,
            }),
        }),
    })
})

const baseQueryReauth: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if(result?.error?.status === 401) {
        console.log('sending refersh token');
        const refresh = (api.getState() as RootState).auth.refresh;
        const refreshResult = await axios.post<{access: string}>('http://localhost:8000/api/login/refresh/', {"refresh": refresh});
        console.log(refreshResult);
        const newToken = refreshResult?.data.access;
        if(newToken) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch(setCredentials({ token: newToken, refresh: refresh, user }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    } 
    
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryReauth,
    endpoints: builder => ({})
})

export default apiSlice.reducer;