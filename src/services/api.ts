import axios from 'axios';

const API_KEY = '2bc561d1';

export async function getMovieList(movieTitle: string, pageNumber: number) {
  const response = await axios.get(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${movieTitle}&page=${pageNumber}`
  );
  const errorSearch = response.data.Error;
  if (errorSearch) {
    return [];
  }
  const movieList = response.data.Search.map(
    (movie: {
    }) => ({
      ...movie,
    })
  );
  return movieList;
}

export async function getMovieDetails(movieId: string) {
  const response = await axios.get(
    `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
  );
  const movieDetails = response.data;
  return movieDetails;
}
