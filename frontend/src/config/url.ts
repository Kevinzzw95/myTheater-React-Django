import API_KEY from "./api";

export default { 
    base_url: "https://api.themoviedb.org/3", 
    genre_list_url: `/genre/movie/list?api_key=${API_KEY}`, 
    findby_genre_list: `/discover/movie?api_key=${API_KEY}&with_genres=`,
    trending_url: `/trending/movie/day?api_key=${API_KEY}`,
    org_url: "https://image.tmdb.org/t/p/w500",
};