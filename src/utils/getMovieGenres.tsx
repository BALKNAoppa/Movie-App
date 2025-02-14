import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export const getMovieGenres = async () => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/genre/movie/list?language=en`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      }
    );
    console.log("Genre api response",response);
    
    return response.data;
  } catch (error) {
    console.log("Axios Error shuu", error);
    return error;
  }
};

