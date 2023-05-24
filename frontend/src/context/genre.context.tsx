import { createContext, useEffect, useState } from "react";
import { movieGenre } from "../types/movie";
import axios from "axios";
import url from "../config/url";
import API_KEY from "../config/api";

export const GenreContext = createContext({} as GenreListProps);

interface Props {
    children?: React.ReactNode;
}

interface GenreListProps {
    genres: movieGenre[];
}

const GenreProvider = ({children} : Props) => {
    const[ genres, setGenres ] = useState<movieGenre[]>([]);
    const genreUrl = url.base_url + url.genre_list_url + `api_key=${API_KEY}`;
    useEffect(() => {
        axios.get<GenreListProps>(genreUrl).then(
          res => {
            setGenres(res.data.genres);
          },
          err => {
						setGenres([]);
            console.log(err);
          }
        )
    },[]);

    return (
        <GenreContext.Provider 
            value={{genres}}
        >
            {children}
        </GenreContext.Provider>
    )
}

export default GenreProvider;