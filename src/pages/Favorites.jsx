import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import MovieGrid from '../components/MovieGrid';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <Container>
      <Typography variant="h4" mt={3} mb={2}>
        My Favorite Movies
      </Typography>

      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} onMovieClick={() => {}} />
      ) : (
        <Box mt={4}>
          <Typography variant="body1" color="text.secondary">
            No favorite movies added yet.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Favorites;
