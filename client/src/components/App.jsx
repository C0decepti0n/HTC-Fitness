import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';

import NavBar from './NavBar.jsx';
import HomePage from './HomePage.jsx';
import Goals from './Goals.jsx';
import Routines from './Routines.jsx';
import Login from './Login.jsx';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {

      default: 'white',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
    },
  },
});

const App = () => {
  // detect user color preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  const [exercises, setExercises] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/check-auth');
        setIsAuthenticated(response.data.isAuthenticated);

        // Fetch user profile if authenticated
        if (response.data.isAuthenticated) {
          const profileResponse = await axios.get('/me');
          setUserProfile(profileResponse.data);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        throw new Error('Error checking auth', error);
      }
    };

    checkAuth();
  }, []);

  const fetchRandomExercises = async (endpoint = '/api/exercises') => {
    try {
      const response = await axios.get(endpoint);
      const shuffleData = response.data.sort(() => 0.5 - Math.random());
      const selectExercises = shuffleData.slice(0, 3);
      setExercises(selectExercises);
    } catch (error) {
      console.error('Error Fetching');
    }
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <AppProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {isAuthenticated && <NavBar setIsAuthenticated={setIsAuthenticated} />}
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DashboardLayout>
                <HomePage
                  user={userProfile}
                  exercises={exercises}
                  fetchRandomExercises={fetchRandomExercises}
                />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/routines" element={
              <ProtectedRoute>
                <Routines savedExercises={userProfile?.saved_exercises || []} userId={userProfile?._id} />
              </ProtectedRoute>
            } />
            <Route path="/goals" element={
              <ProtectedRoute>
                <Goals user={userProfile}/>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
    </AppProvider>
  );
};

export default App;
