import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { movieGenre } from "../types/movie";
import { GenreContext } from "../context/genre.context";
import classnames from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { getFavList, getWatchedList, setMovieList } from "../redux/user/userSlice";

const Home = () => {
	const [ curGenre, setCurGenre ] = useState<movieGenre>({id: null, name: "Trending"});
	const { genres } = useContext(GenreContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const fav = useSelector(getFavList);
	const watched = useSelector(getWatchedList);
	const data = {fav, watched};

	useEffect(() => {
		dispatch(setMovieList(data));
	}, [])
	

	useEffect(() => {
		if(curGenre.id === null) {
			navigate(`/trending`);
		} else {
			navigate(`/${curGenre.id}`);
		}
		
	}, [curGenre])

	const switchGenre = (genre: movieGenre) => {
		setCurGenre({id: genre.id, name: genre.name});
	}

	return (
		<section className="p-8">
			<div className="tab tabs-boxed space-x-4 space-y-4 bg-transparent flex h-[20%]">
				{genres && (
				<div className="space-x-2 space-y-4">
					<a onClick={() => setCurGenre({id: null, name: "Trending"})} className={classnames("tab text-lg", curGenre.name === "Trending" ? "tab-active" : "")}>Trending</a>
					{ genres.map((genre, index) => 
					<a key={index} onClick={ () => switchGenre(genre) } className={classnames("tab text-lg", curGenre.name === genre.name ? "tab-active" : "")}>{ genre.name }</a>
					) }
				</div>
				)}
			</div>
			<div className="m-10 sm:grid md:grid-cols-4 xl:grid-cols-4 gap-8">
				<Outlet />
			</div>
			
		</section>
		
	);
}

export default Home;
