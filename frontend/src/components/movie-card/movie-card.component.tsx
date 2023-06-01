import { movieCommon } from "../../types/movie";
import { useSelector, useDispatch } from "react-redux";
import { movieAddFav, movieRemoveFav, movieAddWathed, movieRemoveWatched, getFavList, getWatchedList } from "../../redux/user/userSlice";
import Detail from "../movie-detail/detail";
import url from "../../config/url";
import { StarIcon, EyeIcon, HeartIcon } from "@heroicons/react/24/solid";
import { selectCurrentToken } from "../../redux/auth/authSlice";
import { usePostMovieMutation } from "../../redux/user/userApiSlice";
import { useEffect, useState } from "react";

type Props = {
    movie: movieCommon;
}

const MovieCard = ({ movie }: Props) => {
    
    const fav = useSelector(getFavList);
	const watched = useSelector(getWatchedList);
    const dispatch = useDispatch();

	const token = useSelector(selectCurrentToken);
	const [ postMovie, {isSuccess} ] = usePostMovieMutation();

	const removeFav = (movieId: number) => {
		const newFav = fav.filter((f) => f !== movieId);
		postMovie({ fav_list: newFav, watched_list: watched }).unwrap().then(
			() => dispatch(movieRemoveFav(movieId)),
			err => console.log(err)
		);
	}

	const addFav = (movieId: number) => {
		const newFav = [...fav, movieId];
		postMovie({ fav_list: newFav, watched_list: watched }).unwrap().then(
			() => dispatch(movieAddFav(movieId)),
			err => console.log(err)
		);
		
	}

	const removeWatched = (movieId: number) => {
		const newWatched = watched.filter((w) => w !== movieId);
		postMovie({ fav_list: fav, watched_list: newWatched }).unwrap().then(
			() => dispatch(movieRemoveWatched(movieId)),
			err => console.log(err)
		);
	}

	const addWatched = (movieId: number) => {
		const newWatched = [...watched, movieId];
		postMovie({ fav_list: fav, watched_list: newWatched }).unwrap().then(
			() => dispatch(movieAddWathed(movieId)),
			err => console.log(err)
		);		
	}

    return (
        <div className="container">
          	<div className="group relative">
				<img className="rounded-lg opacity-90 group-hover:opacity-70" src={ url.org_url + movie.poster_path }/>
				<div className="absolute box rounded-lg w-[4.5rem] h-8 bg-accent top-2 left-2 flex items-stretch">
					<StarIcon fill="white" className="w-5 h-5 m-1.5" />
					<h1 className="text-white text-lg self-center">{ movie.vote_average.toFixed(1) }</h1>
				</div>
				<label htmlFor={`my-modal-${movie.id}`} className="absolute inset-x-10 bottom-5 btn btn-primary align-middle opacity-0 group-hover:opacity-100">
					Details									
				</label>
				<input type="checkbox" id={`my-modal-${movie.id}`} className="modal-toggle" />
				<div className="modal">
					<div className="modal-box relative min-w-[80%] max-h-[80%]">
						<label htmlFor={`my-modal-${movie.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
						<Detail movie={ movie }/>
					</div>
				</div>
          	</div>
			<h1 className="xl:text-lg text-primary-content truncate">{ movie.title }</h1>
			<div className="flex">
				<div className="flex-1">
					<h1 className="xl:text-lg">{ movie.release_date }</h1>
				</div> 
				{	
					token ? 
						watched.some(watchedMovie => watchedMovie === movie.id) ? 
							<button className="flex-none mx-2" onClick={() => removeWatched(movie.id)}>
								<EyeIcon fill="currentColor" className="w-6 h-6" color="hsl(var(--af))"/>
							</button> 
							:
							<button className="flex-none mx-2" onClick={() => addWatched(movie.id)}>
								<EyeIcon fill="currentColor" className="w-6 h-6"/>
							</button>
					:
					<div className="tooltip" data-tip="login to add to favourite">
						<button className="flex-none mx-2">
							<EyeIcon fill="currentColor" className="w-6 h-6"/>
						</button>
					</div>
				}
				{
					token ?
						fav.some(favMovie => favMovie === movie.id) ?
							<button className="flex-none" onClick={() => removeFav(movie.id)}>
								<HeartIcon fill="currentColor" className="w-6 h-6" color="hsl(var(--af))"/>
							</button> 
							:
							<button className="flex-none" onClick={() => addFav(movie.id)}>
								<HeartIcon fill="currentColor" className="w-6 h-6"/>
							</button>
					:
					<div className="tooltip" data-tip="login to add to watched">
						<button className="flex-none">
							<HeartIcon fill="currentColor" className="w-6 h-6"/>
						</button>
					</div>
				}				
          </div>
        </div>
        
    );
}

export default MovieCard;