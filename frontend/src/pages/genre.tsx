import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/movie-card/movie-card.component";
import { useEffect } from "react";
import { movieCommon, movieRes } from "../types/movie";
import axios from "axios";
import url from "../config/url";

const Genre = () => {
    const [ curGenreId, setCurGenreId ] = useState<string>("");
    const [ movieList, setMovieList ] = useState<movieCommon[]>([]);
    const params = useParams();
    const [ curPage, setCurPage ] = useState<number>(1);
    const [ totalPages, setTotalPages ] = useState<number>(0);
    const trending_url = url.base_url + url.trending_url;

    useEffect(() => {
        const curId: string = params.genre!;
        if(curId != curGenreId) {
            setCurPage(1);
            setCurGenreId(curId);
        }
        axios.get<movieRes>
        (curId === "trending" ? trending_url + `&page=${curPage}`: url.base_url + url.findby_genre_list +`${curId}` + `&page=${curPage}`)
            .then(
            res => {
                setMovieList(res.data.results);
                setTotalPages(res.data.total_pages);
            },
            err => {
                console.log(err);
            }
        )
    }, [params, curPage]);

    const nextPage = () => {
        if(curPage < totalPages) {
            setCurPage(curPage + 1);
        }
        
    }

    const prevPage = () => {
        if(curPage > 1) {
            setCurPage(curPage - 1);
        }
        
    }

    return (
        <Fragment>
            {movieList == null ? null : movieList.map((movie, index) =>
                <div key={index} className="self-start">
                    <MovieCard movie={ movie }/>
                </div>
            )}
            <div className="btn-group grid grid-cols-2 col-span-4 place-self-center">
                <button className="btn btn-primary btn-outline" onClick={prevPage}>Previous page</button>
                <button className="btn btn-primary btn-outline" onClick={nextPage}>Next</button>
            </div>
        </Fragment>
        
    )
}

export default Genre;