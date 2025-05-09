import React, { useEffect, useState } from 'react';
import {Container,Typography,CircularProgress,Box,Alert,Button,FormControl,InputLabel,Select,MenuItem,} from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import MovieDetails from '../components/MovieDetails';
import { getTrendingMovies, searchMovies } from '../api/tmdb';
import { saveLastSearch, getLastSearch } from '../utils/localStorageUtils';

const Home = ({ setUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [minRating, setMinRating] = useState('');

  const fetchTrending = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const currentPage = reset ? 1 : page;
      const response = await getTrendingMovies(currentPage);
      const newMovies = response.data.results;
      setMovies(prev => (reset ? newMovies : [...prev, ...newMovies]));
      setPage(currentPage + 1);
      setErrorMsg('');
      setIsSearchActive(false);
      setHasMore(newMovies.length > 0);
      if (reset) setPage(2);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      setErrorMsg('Failed to load trending movies.');
    }
    setLoading(false);
  };

  const handleSearch = async (reset = false, term = searchTerm) => {
    if (!term.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const currentPage = reset ? 1 : page;
      const response = await searchMovies(term, currentPage);
      const newMovies = response.data.results;
      setMovies(prev => (reset ? newMovies : [...prev, ...newMovies]));
      saveLastSearch(term);
      setErrorMsg('');
      setIsSearchActive(true);
      setHasMore(newMovies.length > 0);
      if (reset) setPage(2);
      else setPage(currentPage + 1);
    } catch (error) {
      console.error('Error searching movies:', error);
      setErrorMsg('Something went wrong during search.');
    }
    setLoading(false);
  };

  useEffect(() => {
    const last = getLastSearch();
    if (last) {
      setSearchTerm(last);
      handleSearch(true, last);
    } else {
      fetchTrending(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser('');
  };

  const filteredMovies = movies.filter(movie => {
    const matchGenre = genre ? movie.genre_ids.includes(parseInt(genre)) : true;
    const matchYear = year ? movie.release_date?.startsWith(year) : true;
    const matchRating = minRating ? movie.vote_average >= parseFloat(minRating) : true;
    return matchGenre && matchYear && matchRating;
  });

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} mb={2}>
        <Typography variant="h4" color="gray" align="center">It's Movie Time... </Typography>
        <Button type="submit" variant="contained" color="black" onClick={handleLogout}>
          Logout 🔓
        </Button>
      </Box>

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={() => handleSearch(true)}
        lastSearch={getLastSearch()}
        onHistoryClick={(term) => {
          setSearchTerm(term);
          handleSearch(true, term);
        }}
      />

      {isSearchActive && (
        <Button
          variant="outlined"
          onClick={() => {
            setSearchTerm('');
            fetchTrending(true);
          }}
          sx={{ my: 2 }}
        >
          🔙 Back to Trending
        </Button>
      )}

      {/* Types o movies */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Genre</InputLabel>
          <Select value={genre} label="Genre" onChange={(e) => setGenre(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="28">Action</MenuItem>
            <MenuItem value="35">Comedy</MenuItem>
            <MenuItem value="18">Drama</MenuItem>
            <MenuItem value="10749">Romance</MenuItem>
            <MenuItem value="27">Horror</MenuItem>
          </Select>
        </FormControl>
        
        {/* Year filter*/}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} label="Year" onChange={(e) => setYear(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {[...Array(30)].map((_, i) => {
              const y = 2025 - i;
              return <MenuItem key={y} value={y}>{y}</MenuItem>;
            })}
          </Select>
        </FormControl>

        {/* Rating ilter*/}
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Min Rating</InputLabel>
          <Select value={minRating} label="Min Rating" onChange={(e) => setMinRating(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {[...Array(10)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>{i + 1}+</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {errorMsg && (
        <Alert severity="error" sx={{ my: 2 }}>
          {errorMsg}
        </Alert>
      )}

      <MovieGrid movies={filteredMovies} onMovieClick={setSelectedMovie} />

      {hasMore && !loading && (
        <Box textAlign="center" mt={3}>
          <Button variant="contained" onClick={() => {
            isSearchActive ? handleSearch(false) : fetchTrending(false);
          }}>
            Load More
          </Button>
        </Box>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      )}

      <MovieDetails
        open={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
        movie={selectedMovie}
      />
    </Container>
  );
};

export default Home;
