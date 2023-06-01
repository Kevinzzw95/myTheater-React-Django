export interface movieCommon {
    adult: boolean,
	backdrop_path: string,
	genre_ids: number[],
	id: number,
	media_type: string,
	original_language: string,
	original_title: string,
	overview: string,
	popularity: number,
	poster_path: string,
	release_date: string,
	title: string,
	video: boolean,
	vote_average: number,
	vote_count: number
}

export interface movieGenre {
    id: number | null,
    name: string,
}

export interface actor {
	adult: boolean,
	gender: number,
	id: number,
	known_for_department: string,
	name: string,
	original_name: string,
	popularity: number,
	profile_path: string,
	cast_id: number,
	character: string,
	credit_id: string,
	order: number,
}

export interface movieGenreRes {
    results: movieCommon[];
    total_pages: number;
}

