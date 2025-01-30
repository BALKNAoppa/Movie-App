import axios from "axios";

// const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export const getMovieData = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`,
      {
        headers: {
          // Authorization: `Bearer ${TMDB_API_TOKEN}`,
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTQxMmUzNjQ1MWY5NDQ1NzAwZDAyZTk3NDYxMjQzZiIsIm5iZiI6MTczODA0MTgyOC40MDgsInN1YiI6IjY3OTg2OWU0YzdiMDFiNzJjNzI0MmJlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.llMyLufjUPS5vLzA4m4YtOusSRESPVk0-cF3lI9ua2U",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Axios Error shuu", error);
  }
};
