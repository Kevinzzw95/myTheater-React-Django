import { Fragment } from "react";
import Navigation from "../components/navigation/navigation.component";
import { Outlet } from "react-router-dom";
import MovieCard from "../components/movie-card/movie-card.component";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { useEffect } from "react";
import { movieCommon } from "../types/movie";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const test: movieCommon = {
    id: 1,
		name : "Pikachu",
    poster_path: "none",
    overview: "overview",
    genre_ids: [],
    vote_count: 1,
    original_language: "Chinese",
    vote_average: 1,
    popularity: 1,
    backdrop_path: "path",
  };

	const movieList: movieCommon[] = [test];

  const fetchMovies = async () => {
    try {
      const data: movieCommon[] = [test];
      
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <section>
      <div className="tab tabs-boxed flex flex-row space-x-4 items-center bg-transparent m-8">
        <a className="tab text-lg">Trending</a>
        <a className="tab text-lg tab-active">Action</a>
        <a className="tab text-lg">Horror</a>
        <a className="tab text-lg">Comedy</a>
      </div>
      <div className="m-10">
        <div className="m-10 sm:grid md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4">
          {movieList == null ? null : movieList.map((movie) =>
            <div className="place-self-center">
              <MovieCard movie={movie}/>
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
};

export default Home;
