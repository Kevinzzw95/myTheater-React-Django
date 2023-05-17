export interface movieCommon {
    adult: boolean,
		backdrop_path: string,
		genre_ids: string[],
		id: number,
		media_type: string,
		original_language: string,
		original_title: string,
		overview: string,
		popularity: number,
		poster_path: string,
		release_date: Date,
		title: string,
		video: boolean,
		vote_average: number,
		vote_count: number
}

export interface movieGenre {
    id: number,
    name: string,
}
