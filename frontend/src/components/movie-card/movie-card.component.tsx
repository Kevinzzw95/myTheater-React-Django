import { Button } from "antd";
import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { movieCommon } from "../../types/movie";
import { RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { movieAddFav, movieRemoveFav, movieAddWathed, movieRemoveWatched } from "../../redux/store/movie/movieSlice";
import Detail from "../movie-detail/detail";
import url from "../../config/url";
import { useState } from "react";

type Props = {
    movie: movieCommon;
}

const MovieCard = ({ movie }: Props) => {
    
    const favList = useSelector((state: RootState) => state.movie.fav);
		const watchedList =useSelector((state: RootState) => state.movie.watched)
    const dispatch = useDispatch();
		const [ curMovie, setCurMovie ] = useState<movieCommon>(movie);

    return (
        <div className="card">
            <div className="group relative">
                <img className="rounded-lg opacity-90 group-hover:opacity-70" src={ url.org_url + movie.poster_path }/>
                <div className="absolute box rounded-lg w-16 h-8 bg-accent top-2 left-2 flex items-stretch">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5 m-1.5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <h1 className="text-white text-lg self-center">{ movie.vote_average.toFixed(1) }</h1>
                </div>
                <label htmlFor={`my-modal-${movie.id}`} onClick={() => setCurMovie(movie)} className="absolute inset-x-10 bottom-5 btn btn-primary align-middle opacity-0 group-hover:opacity-100">
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
            <h1 className="xl:text-lg text-primary-content">{ movie.title }</h1>
            <div className="flex">
                <div className="flex-1">
                  <h1 className="xl:text-lg">2021</h1>
                </div> 
								{
									favList.some(id => id === movie.id) ? 
										<button className="flex-none mx-2" onClick={() => dispatch(movieRemoveFav(movie.id))}>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" color="hsl(var(--af))">
													<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
													<path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
											</svg>
										</button> 
									:
									<button className="flex-none mx-2" onClick={() => dispatch(movieAddFav(movie.id))}>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
												<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
												<path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
										</svg>
									</button>
								}
								{
									watchedList.some(id => id === movie.id) ?
									<button className="flex-none" onClick={() => dispatch(movieRemoveWatched(movie.id))}>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" color="hsl(var(--af))">
											<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
										</svg>
									</button> 
									:
									<button className="flex-none" onClick={() => dispatch(movieAddWathed(movie.id))}>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
													<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
											</svg>
									</button>
								}
                
            </div>
            

        </div>
        
    );
}

export default MovieCard;