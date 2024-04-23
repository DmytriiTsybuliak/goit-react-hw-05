import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const options = {
    method: 'GET',
    params: { language: 'en-US' },
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTRhZmQxZDVkNTdiZTY3OWE5MzI4MzU3MWMzYTVmMyIsInN1YiI6IjY2MWY0MmM2NTI4YjJlMDE3ZDQwMTI4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sGsosBQkBz_InFEWck73LFH_aRCFp19xkfDWyzON9d4'
    }
};

export const getTrendingMovies = async () => {
    const response = await axios.get("trending/movie/day", options);
    return response.data.results;
};

export const getMovieByID = async (movieID) => {
    const response = await axios.get(`movie/${movieID}`, options);
    return response.data.results;
}