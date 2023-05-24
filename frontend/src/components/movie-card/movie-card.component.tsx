import { movieCommon } from "../../types/movie";
import { useSelector, useDispatch } from "react-redux";
import { movieAddFav, movieRemoveFav, movieAddWathed, movieRemoveWatched, getFavList, getWatchedList } from "../../redux/user/userSlice";
import Detail from "../movie-detail/detail";
import url from "../../config/url";
import { useEffect, useState } from "react";
import { StarIcon, EyeIcon, HeartIcon } from "@heroicons/react/24/solid";
import { selectCurrentToken } from "../../redux/auth/authSlice";
import { useGetUserDataQuery, usePostUserDataMutation } from "../../redux/user/userApiSlice";

type Props = {
    movie: movieCommon;
}

const MovieCard = ({ movie }: Props) => {
    
    const fav = useSelector(getFavList);
	const watched = useSelector(getWatchedList);
    const dispatch = useDispatch();

	const token = useSelector(selectCurrentToken);
	const [ postUserData, {isSuccess} ] = usePostUserDataMutation();

	const removeFav = (movie: movieCommon) => {
		if(false) {
			const newFav = fav.filter((f) => f.id !== movie.id);
			postUserData({ fav: newFav, watched }).unwrap();
			if(isSuccess) {
				dispatch(movieRemoveFav(movie));
			}
		} else {
			dispatch(movieRemoveFav(movie));
		}
		
	}

	const addFav = (movie: movieCommon) => {
		if(false) {
			const newFav = [...fav, movie];
			postUserData({ fav: newFav, watched }).unwrap();
			if(isSuccess) {
				dispatch(movieAddFav(movie));
			}
		} else {
			dispatch(movieAddFav(movie));
		}
		
	}

	const removeWatched = (movie: movieCommon) => {
		if(false) {
			const newWatched = fav.filter((w) => w.id !== movie.id);
			postUserData({ fav, watched: newWatched }).unwrap();
			if(isSuccess) {
				dispatch(movieRemoveWatched(movie));
			}
		} else {
			dispatch(movieRemoveWatched(movie));
		}
		
	}

	const addWatched = (movie: movieCommon) => {
		if(false) {
			const newWatched = [...watched, movie];
			postUserData({ fav, watched: newWatched }).unwrap();
			if(isSuccess) {
				dispatch(movieAddWathed(movie));
			}
		} else {
			dispatch(movieAddWathed(movie));
		}
		
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
					watched.some(watchedMovie => watchedMovie.id === movie.id) ? 
						<button className="flex-none mx-2" onClick={() => removeWatched(movie)}>
							<EyeIcon fill="currentColor" className="w-6 h-6" color="hsl(var(--af))"/>
						</button> 
						:
						<button className="flex-none mx-2" onClick={() => addWatched(movie)}>
							<EyeIcon fill="currentColor" className="w-6 h-6"/>
						</button>
				}
				{
					fav.some(favMovie => favMovie.id === movie.id) ?
						<button className="flex-none" onClick={() => removeFav(movie)}>
							<HeartIcon fill="currentColor" className="w-6 h-6" color="hsl(var(--af))"/>
						</button> 
						:
						<button className="flex-none" onClick={() => addFav(movie)}>
							<HeartIcon fill="currentColor" className="w-6 h-6"/>
						</button>
				}				
          </div>
        </div>
        
    );
}

export default MovieCard;