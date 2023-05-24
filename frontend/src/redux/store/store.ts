import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../user/userSlice'
import authReducer from '../auth/authSlice'
import apiReducer, { apiSlice } from '../api/apiSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    api: apiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
