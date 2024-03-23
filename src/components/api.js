import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const searchImages = async (searchQuery, page = 1) => {
    const response = await axios.get("/search/photos", {
        params: {
            query: searchQuery,
            page: page,
            client_id: "wIDwUD0m4mvx7YqvWlwIlyH9sUhZbhgt8kdg4AaE-Y4",
        },
    });
    // console.log(response.data.results);
    return response.data.results;
};

// export const searchImg = async (id) => {
//     const response = await axios.get("/photos/" + id, {
//         params: {
//             client_id: "wIDwUD0m4mvx7YqvWlwIlyH9sUhZbhgt8kdg4AaE-Y4",
//         },
//     });
//     return response.data;
// };