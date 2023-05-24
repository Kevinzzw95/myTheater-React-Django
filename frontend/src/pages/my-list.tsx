import { useEffect, useState } from "react";
import MovieCard from "../components/movie-card/movie-card.component";
import { movieCommon } from "../types/movie";
import { useSelector } from "react-redux";
import { getFavList, getWatchedList } from "../redux/user/userSlice";
import classnames from 'classnames';
import axios from "axios";
import { useGetUserDataQuery } from "../redux/user/userApiSlice";

const MyList = () => {

    const [ curTag, setCurTag ] = useState<string>("fav");
    const [ movieList, setMovieList ] = useState<movieCommon[]>([]);
    const fav = useSelector(getFavList);
    const watched = useSelector(getWatchedList);

    // const {
    //     data
	// } = useGetUserDataQuery();

    useEffect(() => {
        setMovieList(curTag === "fav" ? fav : watched);
    }, [curTag]);

    return (
        <section className="p-8">
			<div className="tab tabs-boxed space-x-4 space-y-4 bg-transparent flex h-[20%]">
				<div className="space-x-2 space-y-4">
					<a onClick={() => setCurTag("fav")} className={classnames("tab text-lg", curTag === "fav" ? "tab-active" : "")}>Favourite</a>
                    <a onClick={() => setCurTag("watched")} className={classnames("tab text-lg", curTag === "watched" ? "tab-active" : "")}>Watched</a>
				</div>
			</div>
			<div className="m-10 sm:grid md:grid-cols-4 xl:grid-cols-4 gap-8">
                {movieList == null ? null : movieList.map((movie, index) =>
                    <div key={index} className="self-start">
                        <MovieCard movie={ movie }/>
                    </div>
                )}
			</div>
			
		</section>
    )
}

export default MyList;