import { Fragment, useEffect, useState } from "react";
import MovieCard from "../components/movie-card/movie-card.component";
import { movieCommon } from "../types/movie";
import { useDispatch, useSelector } from "react-redux";
import { getEmail, getFavList, getUserName, getWatchedList, setUserInfo } from "../redux/user/userSlice";
import classnames from 'classnames';
import axios, { AxiosResponse } from "axios";
import url from "../config/url";
import API_KEY from "../config/api";
import { useGetUserDataQuery } from "../redux/user/userApiSlice";

const MyList = () => {

    const [ curTag, setCurTag ] = useState<string>("fav");
    const fav_list = useSelector(getFavList);
    const watched_list = useSelector(getWatchedList);
    const [ movieIdList, setMovieIdList ] = useState<number[]>(fav_list)
    const [ movieList, setMovieList ] = useState<movieCommon[]>([]);

    useEffect(() => {
        let tempList: movieCommon[] = [];
        let promises: Promise<AxiosResponse<movieCommon, any>>[] = [];
        movieIdList.forEach(id => {
            promises.push(
                axios.get<movieCommon>
                (url.base_url + url.movie_url +`${id}` + `?api_key=${API_KEY}`)
            )
        });
        
        Promise.all(promises).then((results) => {
            results.forEach((res) => {
                tempList.push(res.data)
            })
            setMovieList(tempList);
        });
        
    }, [curTag]);

    return (
        <section className="p-8">
            <div className="tab tabs-boxed space-x-4 space-y-4 bg-transparent flex h-[20%]">
                <div className="space-x-2 space-y-4">
                    <a onClick={() => {setCurTag("fav"); setMovieIdList(fav_list)}} className={classnames("tab text-lg", curTag === "fav" ? "tab-active" : "")}>Favourite</a>
                    <a onClick={() => {setCurTag("watched"); setMovieIdList(watched_list)}} className={classnames("tab text-lg", curTag === "watched" ? "tab-active" : "")}>Watched</a>
                </div>
            </div>
            <div className="m-10 sm:grid md:grid-cols-4 xl:grid-cols-4 gap-8">
                {
                    movieList ? (
                        movieList?.map((movie, index) => {
                                return (
                                    <div key={index} className="self-start">
                                        <MovieCard movie={ movie }/>
                                    </div>
                                )
                            
                        })
                    ) : <p>Loading...</p>
                }  
            </div> 
        </section>
    )
}

export default MyList;