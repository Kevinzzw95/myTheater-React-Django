import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface authSliceState {
    user: string | null;
    token: string | null;
    refresh: string | null;
}

var initialState: authSliceState = { user: null, token: null, refresh: null };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<authSliceState>) => {
            const{ user, token, refresh } = action.payload;
            state.user = user;
            state.token = token;
            state.refresh = refresh;
        },
        logOut: (state) => {
            state.refresh = null;
            state.user = null;
            state.token = null;
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRefresh = (state: RootState) => state.auth.refresh;