import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store';
import { userSliceState } from '../../types/user';
import { movieCommon } from '../../types/movie';

var initialState: userSliceState = { fav: [], watched: [] };

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setMovieList(state, action: PayloadAction<userSliceState>) {
            const{ fav, watched } = action.payload;
            state.fav = fav;
            state.watched = watched;
        },
        movieAddFav(state, action: PayloadAction<movieCommon>) {
            state.fav.push(action.payload);
        },
        movieRemoveFav(state, action: PayloadAction<movieCommon>) {
            const index = state.fav.findIndex((f) => f.id === action.payload.id);
            if (index > -1) { // only splice array when item is found
                state.fav.splice(index, 1); // 2nd parameter means remove one item only
            }
        },
        movieAddWathed(state, action: PayloadAction<movieCommon>) {
            state.watched.push(action.payload);
        },
        movieRemoveWatched(state, action: PayloadAction<movieCommon>) {
            const index = state.watched.findIndex((w) => w.id === action.payload.id);;
            if (index > -1) { // only splice array when item is found
                state.watched.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    }
});

export const { setMovieList ,movieAddFav, movieRemoveFav, movieAddWathed, movieRemoveWatched } = userSlice.actions;

export default userSlice.reducer;

export const getFavList = (state: RootState) => state.user.fav;
export const getWatchedList = (state: RootState) => state.user.watched;