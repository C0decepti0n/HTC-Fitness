import React from 'react';
import {
  Box,
  Button,
  Grid2,
  Typography,
} from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AppProvider } from '@toolpad/core/AppProvider';
import ExerciseCard from './ExerciseCard.jsx';

const HomePage = ({ user, exercises, fetchRandomExercises }) => {
  const userName = user ? user.nameFirst : '';

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center" marginTop="2rem">
      {`Welcome, ${userName}, to the Hyperbolic Time Chamber`}
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} margin="20px 0">
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
      </Box>
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
    </div>
  );
};

export default HomePage;
