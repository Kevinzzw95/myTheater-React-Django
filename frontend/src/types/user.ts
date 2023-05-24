import { movieCommon } from "./movie";

export interface user {
    id: number;
    name: string;
    fav: number[];
    watched: number[];
}

interface Post {
    user: user;
    token: string;
}

export interface userSliceState {
    fav: movieCommon[];
    watched: movieCommon[];
}

export interface postAuth {
	user: string;
	pwd: string;
}