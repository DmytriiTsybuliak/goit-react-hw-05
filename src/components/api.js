import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const options = {
    headers: {
        // Замість api_read_access_token вставте свій токен
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTRhZmQxZDVkNTdiZTY3OWE5MzI4MzU3MWMzYTVmMyIsInN1YiI6IjY2MWY0MmM2NTI4YjJlMDE3ZDQwMTI4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sGsosBQkBz_InFEWck73LFH_aRCFp19xkfDWyzON9d4'
    }
};

export const getTrendingMovies = async () => {
    const response = await axios.get("trending/movie/day?language=en-US", options);
    // const response = await axios.get("trending/movie/day?language=en-US", {
    //     params: {
    //         api_key: "914afd1d5d57be679a93283571c3a5f3",
    //     },
    // });
    console.log(response.data.results);
    return response.data.results;
};