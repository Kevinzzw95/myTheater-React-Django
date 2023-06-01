import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieCommon, movieGenreRes } from "../types/movie";
import url from "../config/url";
import MovieCard from "../components/movie-card/movie-card.component";


const Search = () => {
    const params = useParams();
    const [ movieList, setMovieList ] = useState<movieCommon[]>([]);
    const [ totalPages, setTotalPages ] = useState<number>(0);
    const [ curPage, setCurPage ] = useState<number>(1);
    useEffect(() => {
        axios.get<movieGenreRes>(url.base_url + url.search_url + params.keyword + `&page=${curPage}`)
            .then(
                res => {
                    setMovieList(res.data.results)
                    setTotalPages(res.data.total_pages)
                    console.log(totalPages)
                },
                err => console.log(err)
            )
    }, [params, curPage])

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
        <section className="p-8">
            <div className="m-10 sm:grid md:grid-cols-4 xl:grid-cols-4 gap-8">
                {movieList == null ? null : movieList.map((movie, index) =>
                    <div key={index} className="self-start">
                        <MovieCard movie={ movie }/>
                    </div>
                )}
                <div className="btn-group grid grid-cols-2 col-span-4 place-self-center">
                    <button className="btn btn-primary btn-outline" onClick={prevPage}>Previous page</button>
                    <button className="btn btn-primary btn-outline" onClick={nextPage}>Next</button>
                </div>
            </div>
        </section>
        
    )
}

export default Search;