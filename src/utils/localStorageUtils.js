// Save the last search term
export const saveLastSearch = (term) => {
  localStorage.setItem('lastSearch', term);
};

// Get the last search term
export const getLastSearch = () => {
  return localStorage.getItem('lastSearch');
};

// Get all search history from localStorage
export const getSearchHistory = () => {
  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  return history;
};

// Add a new search term to the history
export const addSearchTerm = (term) => {
  const history = getSearchHistory();
  if (!history.includes(term)) {
    history.unshift(term); // Add at the beginning
  }
  localStorage.setItem('searchHistory', JSON.stringify(history));
};

// Remove a search term from history
export const removeSearchTerm = (term) => {
  let history = getSearchHistory();
  history = history.filter(item => item !== term); // Filter out the term to delete
  localStorage.setItem('searchHistory', JSON.stringify(history)); // Save updated history
};
