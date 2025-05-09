import React from 'react';
import { Box, TextField, Button, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ value, onChange, onSearch, lastSearch, onHistoryClick }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={3}>
      <Box display="flex" width="100%" maxWidth={600}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search your favs..."
          value={value}
          onChange={onChange}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ cursor: 'pointer' }} onClick={onSearch} />
              </InputAdornment>
            ),
          }}
        />
        
      </Box>

      {lastSearch && (
        <Box mt={2}>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => onHistoryClick(lastSearch)}
          >
            Last Search: {lastSearch}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
