import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid2,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ExerciseCard from './ExerciseCard.jsx';
import Settings from './Settings.jsx'


const HomePage = ({ user, exercises, fetchRandomExercises }) => {
  const userName = user ? user.nameFirst : '';
  const navigate = useNavigate();
  //* usersettings
  const [settings, setSettings] = useState([])

 // Call fetch request on page load
 useEffect(() => {
  getProfile();
}, [])

//* GET profile 
const getProfile = () => {
  axios.get(`/api/settings/${user._id}`)
  .then((response) => {
    // console.log(response.data)
  })
  .catch((err) => {
    console.log('Failed to find user data', err)
  })
}

  const handleSettings = () => {
    navigate('/settings', { state: { from: 'home' } });
  };

  return (
    <div>
      {/* Settings Icon */}
      <Grid2
          item
          container
          xs={6}
          direction="column"
          sx={{ alignItems: 'flex-end' }}
      >
        <Grid2 item>
          <Tooltip title="Dashboard Settings" placement="right-start" >
            <IconButton onClick={handleSettings}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Grid2>
      </Grid2>
      {/* Welcome Text */}
      <Typography variant="h4" gutterBottom align="center" marginTop="2rem">
      {`Welcome, ${userName}, to the Hyperbolic Time Chamber`}
      </Typography>
      {/* Exercise Buttons */}
      {}
    <Grid2 aria-label='exercises' >
        {(<Box display="flex" justifyContent="center" gap={2} margin="20px 0">
          <Button
            variant='contained'
            color='primary'
            onClick={() => fetchRandomExercises()}
            sx={{ display: 'block' }}
          >
            Get Some Exercises
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => fetchRandomExercises('/api/exercises/biceps')}
            sx={{ display: 'block' }}
          >
            Get Some Biceps Exercises
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => fetchRandomExercises('/api/exercises/quads')}
            sx={{ display: 'block' }}
          >
            Get Some Quads Exercises
          </Button>
        </Box>)}
        {exercises.length > 0 ? (
            <Grid2 container spacing={2} justifyContent="center" alignItems="stretch">
              {exercises.map((exercise, index) => (
                <Grid2 xs={12} sm={6} md={4} key={index}>
                  <ExerciseCard exercise={ exercise } user={ user }/>
                </Grid2>
              ))}
            </Grid2>
        ) : (
          <Typography variant="h6">
          Get Some Exercises!
        </Typography>
        )}
    </Grid2>
    </div>
  );
};

export default HomePage;
