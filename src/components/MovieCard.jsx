import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const MovieCard = ({ movie, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(storedFavorites.some(fav => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); 
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = storedFavorites.filter(fav => fav.id !== movie.id);
    } else {
      updatedFavorites = [...storedFavorites, movie];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Card onClick={() => onClick(movie)} sx={{ cursor: 'pointer', position: 'relative' }}>
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date?.split('-')[0]} | ⭐ {movie.vote_average}
        </Typography>
      </CardContent>

      {/* Favorite Button */}
      <IconButton
        onClick={toggleFavorite}
        sx={{ position: 'absolute', top: 8, right: 8, color: 'red' }}
        aria-label="add to favorites"
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Card>
  );
};

export default MovieCard;
