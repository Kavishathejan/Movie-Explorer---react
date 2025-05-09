import React from 'react';
import { Grid } from '@mui/material';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, onMovieClick }) => {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
          <MovieCard movie={movie} onClick={onMovieClick} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
