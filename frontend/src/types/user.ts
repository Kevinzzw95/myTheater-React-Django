import { movieCommon } from "./movie";



export interface loginRes {
    refresh: string;
    access: string;
}

export interface userSliceState {
    username: string;
    email: string;
    fav_list: number[];
    watched_list: number[];
}

export interface postMovie {
    fav_list: number[];
    watched_list: number[];
}

export interface postAuth {
	username: string;
	password: string;
}