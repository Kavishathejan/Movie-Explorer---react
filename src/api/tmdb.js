import axios from 'axios';

const API_KEY = 'Your tmdb api';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US'
  }
});

// Accept `page` parameter for pagination
export const getTrendingMovies = (page = 1) =>
  api.get('/trending/movie/week', { params: { page } });

export const searchMovies = (query, page = 1) =>
  api.get('/search/movie', { params: { query, page } });

export const getMovieDetails = (movieId) =>
  api.get(`/movie/${movieId}`);

export const getGenres = () =>
  api.get('/genre/movie/list');

export const getMovieVideos = (movieId) =>
  api.get(`/movie/${movieId}/videos`);
