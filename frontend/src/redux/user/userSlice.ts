import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store';
import { userSliceState } from '../../types/user';
import { movieCommon } from '../../types/movie';

var initialState: userSliceState = { username: "", email: "", fav_list: [], watched_list: [] };

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<userSliceState>) {
            const{ username, email, fav_list, watched_list } = action.payload;
            state.username = username;
            state.email = email;
            state.fav_list = fav_list;
            state.watched_list = watched_list;
        },
        movieAddFav(state, action: PayloadAction<number>) {
            state.fav_list.push(action.payload);
        },
        movieRemoveFav(state, action: PayloadAction<number>) {
            const index = state.fav_list.findIndex((f) => f === action.payload);
            if (index > -1) { // only splice array when item is found
                state.fav_list.splice(index, 1); // 2nd parameter means remove one item only
            }
        },
        movieAddWathed(state, action: PayloadAction<number>) {
            state.watched_list.push(action.payload);
        },
        movieRemoveWatched(state, action: PayloadAction<number>) {
            const index = state.watched_list.findIndex((w) => w === action.payload);;
            if (index > -1) { // only splice array when item is found
                state.watched_list.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    }
});

export const { setUserInfo ,movieAddFav, movieRemoveFav, movieAddWathed, movieRemoveWatched } = userSlice.actions;

export default userSlice.reducer;

export const getUserName = (state: RootState) => state.user.username;
export const getEmail = (state: RootState) => state.user.email;
export const getFavList = (state: RootState) => state.user.fav_list;
export const getWatchedList = (state: RootState) => state.user.watched_list;