import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { movieCommon } from '../../../types/movie'

interface SliceState {
    fav: number[];
    watched: number[];
}

const initialState: SliceState = { fav: [], watched: [] };

const movieSlice = createSlice({
    name: "movie",
    initialState: initialState,
    reducers: {
        movieAddFav(state, action: PayloadAction<number>) {
            state.fav.push(action.payload);
        },
        movieRemoveFav(state, action: PayloadAction<number>) {
            const index = state.fav.indexOf(action.payload);
            if (index > -1) { // only splice array when item is found
                state.fav.splice(index, 1); // 2nd parameter means remove one item only
            }
        },
        movieAddWathed(state, action: PayloadAction<number>) {
            state.watched.push(action.payload);
        },
        movieRemoveWatched(state, action: PayloadAction<number>) {
            const index = state.watched.indexOf(action.payload);
            if (index > -1) { // only splice array when item is found
                state.watched.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    }
});

export const { movieAddFav, movieRemoveFav, movieAddWathed, movieRemoveWatched } = movieSlice.actions;

export default movieSlice.reducer;