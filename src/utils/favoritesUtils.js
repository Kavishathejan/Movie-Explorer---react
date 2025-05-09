export const getFavorites = () => {
    const favs = localStorage.getItem('favorites');
    return favs ? JSON.parse(favs) : [];
  };
  
  export const saveToFavorites = (movie) => {
    const favs = getFavorites();
    const exists = favs.find((m) => m.id === movie.id);
    if (!exists) {
      favs.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favs));
    }
  };
  
  export const removeFromFavorites = (movieId) => {
    const favs = getFavorites().filter((m) => m.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favs));
  };
  