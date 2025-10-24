import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export const getMovieGenreDetails = async (genreIds: number, page: number) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreIds}&page=${page}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
