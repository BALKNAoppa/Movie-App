import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export const getCategoryMovieData = async (segment: string) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${segment}?language=en-US&page=1`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Axios Error shuu", error);
    return error;
  }
};