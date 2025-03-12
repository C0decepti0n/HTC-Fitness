import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Routines = ({ userId }) => {
  const [routineData, setRoutineData] = useState([]);

  const fetchSavedExercises = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setRoutineData(
        response.data.map((exercise) => ({
          ...exercise,
          sets: exercise.sets || null,
          reps: exercise.reps || null,
        }))
      );
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  useEffect(() => {
    fetchSavedExercises();
  }, [userId]);

  const handleChange = (index, field, value) => {
    const updatedData = [...routineData];
    updatedData[index][field] = value;
    setRoutineData(updatedData);
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`/api/users/${userId}/saved-exercises`, {
        exercises: routineData,
      });
      alert('Routine updated successfully!');
      fetchSavedExercises();
    } catch (error) {
      console.error('Error updating routine:', error);
      alert('Failed to update routine.');
    }
  };

  const handleDeleteExercise = async (exerciseId) => {
    try {
      await axios.delete(`/api/users/${userId}/saved-exercises/${exerciseId}`);

      alert('Exercise deleted successfully!');
      fetchSavedExercises();
    } catch (error) {
      console.error('Error deleting exercise:', error);
      alert('Failed to delete exercise.');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">
        My Workout Routine
      </Typography>
      <Grid container spacing={2} justify="center">
        {routineData.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={4} key={exercise._id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5">{exercise.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {`Muscle: ${exercise.muscle.charAt(0).toUpperCase() + exercise.muscle.slice(1)}`}
                </Typography>
                <TextField
                  type="number"
                  label="Sets"
                  value={exercise.sets || ''}
                  onChange={(e) => handleChange(index, 'sets', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  type="number"
                  label="Reps"
                  value={exercise.reps || ''}
                  onChange={(e) => handleChange(index, 'reps', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </CardContent>
              <CardActions>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => handleDeleteExercise(exercise._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Save Routine
      </Button>
    </div>
  );
};

export default Routines;
