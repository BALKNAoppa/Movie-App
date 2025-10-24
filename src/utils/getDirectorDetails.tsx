import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export const getDirectorDetails = async (id: number) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}//movie/${id}/credits?language=en-US`,
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
