// src/App.js
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(prev => !prev);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {!user ? (
          <Routes>
            <Route path="*" element={<Login onLogin={setUser} />} />
          </Routes>
        ) : (
          <>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Movie Explorer
                  </Link>
                </Typography>
                <Link
                  to="/favorites"
                  style={{ color: 'inherit', textDecoration: 'none', marginRight: 16 }}
                >
                  Favorites
                </Link>
                <IconButton color="inherit" onClick={toggleTheme}>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Toolbar>
            </AppBar>

            <Container sx={{ mt: 3 }}>
              <Routes>
                <Route path="/" element={<Home setUser={setUser} />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Container>
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
