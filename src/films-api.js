import axios from "axios";

const KEY = "2798893091472a697cccc4305da2cb62";

axios.defaults.baseURL = `https://api.themoviedb.org/3`;

export const getTrendingFilms = async () => {
  const response = await axios.get(
    `/trending/movie/day?language=en-US&api_key=${KEY}`
  );
  return response.data;
};

export const getDetailsFilm = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}?language=en-US&api_key=${KEY}`
  );
  return response.data;
};

export const getCastFilm = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/credits?language=en-US&api_key=${KEY}`
  );
  return response.data;
};

export const getReviewsFilm = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?language=en-US&&api_key=${KEY}&page=1`
  );
  return response.data;
};
