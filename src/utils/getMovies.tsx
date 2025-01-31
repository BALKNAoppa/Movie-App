import axios from "axios";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export const getMovieData = async (category: string) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${category}?language=en-US&page=1`,
      {
        headers: {
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
