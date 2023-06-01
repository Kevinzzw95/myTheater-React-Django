import { Fragment, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { movieGenre } from "../types/movie";
import { GenreContext } from "../context/genre.context";
import classnames from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { getEmail, getFavList, getUserName, getWatchedList, setUserInfo } from "../redux/user/userSlice";
import { useGetUserDataQuery, userApiSlice } from "../redux/user/userApiSlice";
import { selectCurrentToken } from "../redux/auth/authSlice";
import Genre from "../components/genre/genre";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const Home = () => {
	const { genres, updateCurGenre, curGenre } = useContext(GenreContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [skip, setSkip] = useState<boolean>(true);
	const token = useSelector(selectCurrentToken);


	const [getUserData] = userApiSlice.useLazyGetUserDataQuery();
	useEffect(() => {
		if(token) {
			getUserData().unwrap().then((data) => dispatch(setUserInfo(data)));
		}
		
	}, [token])

	const switchGenre = (genre: movieGenre) => {
		updateCurGenre(genre);
	}

	let content = <Fragment></Fragment>;
    // if (isLoading) {
    //     content = <div className="text-xl">Loading...</div>;
    // } else {
		content = (
			<section className="p-8">
			{ 
				<Fragment>
					<div className="tab tabs-boxed space-x-4 space-y-4 bg-transparent flex h-[20%]">
						{genres && (
						<div className="space-x-2 space-y-4">
							<a onClick={() => updateCurGenre({id: null, name: "Trending"})} className={classnames("tab text-lg", curGenre.name === "Trending" ? "tab-active" : "")}>Trending</a>
							{ genres.map((genre, index) => 
							<a key={index} onClick={ () => switchGenre(genre) } className={classnames("tab text-lg", curGenre.name === genre.name ? "tab-active" : "")}>{ genre.name }</a>
							) }
						</div>
						)}
					</div>
					<div className="m-10 sm:grid md:grid-cols-4 xl:grid-cols-4 gap-8">
						<Genre />
					</div>
				</Fragment>
				
			}
			
			
		</section>
		)
	//}

	return content;
}

export default Home;
