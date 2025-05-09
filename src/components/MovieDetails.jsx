import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  CircularProgress
} from '@mui/material';
import { getMovieDetails, getMovieVideos } from '../api/tmdb';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

import { saveToFavorites } from '../utils/favoritesUtils';

const handleAddToFavorites = (movie) => {
  saveToFavorites(movie);
  alert('Movie added to favorites!');
};



const MovieDetails = ({ open, onClose, movie }) => {
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState('');
  <IconButton onClick={() => handleAddToFavorites(movie)}>
  <FavoriteIcon color="error" />
  </IconButton>

  useEffect(() => {
    if (movie) {
      getMovieDetails(movie.id).then((res) => setDetails(res.data));
      getMovieVideos(movie.id).then((res) => {
        const trailer = res.data.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) setTrailerKey(trailer.key);
      });
    }
  }, [movie]);

  if (!details) {
    return open ? (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    ) : null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{details.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>{details.overview}</Typography>
        <Typography variant="body2">Genres: {details.genres.map(g => g.name).join(', ')}</Typography>
        <Typography variant="body2" mt={1}>Rating: {details.vote_average}</Typography>
        {trailerKey && (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetails;
