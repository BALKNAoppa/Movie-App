import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export const getSimilarMovie = async (id: number) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}//movie/${id}/similar?language=en-US&page=1`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    return error;
  }
};
