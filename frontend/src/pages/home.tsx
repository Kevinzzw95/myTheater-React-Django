import { Fragment, useState } from "react";
import Navigation from "../components/navigation/navigation.component";
import { Outlet } from "react-router-dom";
import MovieCard from "../components/movie-card/movie-card.component";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { useEffect, useContext } from "react";
import { movieCommon, movieGenre } from "../types/movie";
import { GenreContext } from "../context/genre.context";
import classnames from 'classnames';
import axios from "axios";
import url from "../config/url";
import API_KEY from "../config/api";

interface MovieListProps {
  page: number,
  results: movieCommon[]
}

const Home = () => {
  const [ curGenre, setCurGenre ] = useState<movieGenre>({id: -1, name: "Trending"});
  const [ movieList, setMovieList ] = useState<movieCommon[]>([]);
  const { genres } = useContext(GenreContext);
  const dispatch: AppDispatch = useDispatch();
  const trending_url = url.base_url + url.trending_url;

  useEffect(() => {
    axios.get<MovieListProps>
    (curGenre.name === "Trending" ? trending_url : url.base_url + url.findby_genre_list + `${curGenre.id}`)
    .then(
      res => {
        setMovieList(res.data.results)
      },
      err => {
        console.log(err)
      }
    )
  }, [curGenre]);

  return (
    <section className="p-8">
      <div className="tab tabs-boxed space-x-4 space-y-4 bg-transparent flex h-[20%]">
        <div className="space-x-2 space-y-4">
          <a onClick={() => setCurGenre({id: -1, name: "Trending"})} className={classnames("tab text-lg", curGenre.name === "Trending" ? "tab-active" : "")}>Trending</a>
          { genres.map((genre) => 
            <a key={genre.id} onClick={() => setCurGenre({id: genre.id, name: genre.name})} className={classnames("tab text-lg", curGenre.name === genre.name ? "tab-active" : "")}>{ genre.name }</a>
          ) }
        </div>
        
      </div>
      
        <div className="m-10 sm:grid md:grid-cols-4 xl:grid-cols-4 3xl:grid-cols-5 gap-8">
          {movieList == null ? null : movieList.map((movie) =>
            <div key={movie.id} className="self-start">
              <MovieCard movie={ movie }/>
            </div>
          )}
          
        </div>
      
    </section>
  );
};

export default Home;
