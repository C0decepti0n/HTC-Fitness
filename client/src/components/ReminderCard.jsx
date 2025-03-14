import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';


const ReminderCard = ({user}) => {
  // set state to store reminders
  const [reminders, setReminders] = useState([]);
  // edit reminders
    const [editReminders, setEditReminders] = useState(null);
  // set new reminders
  const [newReminders, setNewReminders] = useState({
    title: '',
    description: '',
    date: '',
  });
  
  //handle input change for the new reminders
  const handleInputChange = (e) =>{
    setNewReminders({
  ...newReminders,
  [e.target.name]: e.target.value
    })
  }


  // axios get request
  const getReminders = async (userId) => {
    try {
      const response = await axios.get(`/api/reminders/${userId}`);
      setReminders(response.data);
    } catch (err) {
      console.error('Cannot get all reminders:', err);
      
    }
  };


  // mounts fetched reminders
  useEffect(() => {
    if (user?._id) {
      getReminders(user._id);
    }
  }, [user]);


  // axios Post
  const postReminders = async () => {
    if (!user?._id) {
      console.error('User is not authenticated');
      return;
    }
  
    try {
      const response = await axios.post(`/api/reminders/${user._id}`, {
        title: newReminders.title,
        description: newReminders.description,
        date: newReminders.date,
      });
  

      setReminders((prevReminders) => [...prevReminders, response.data.newReminder]);
      setNewReminders({
        title: '',
        description: '',
        date: '',
      });
    } catch (err) {
      console.error('Cannot create reminder:', err);
    }
  };
  


  // axios request to update
  const updateReminders = (id, updatedReminder) => {
    axios
      .patch(`/api/reminders/${id}`, updatedReminder)
      .then(() => {
        getReminders(user._id);
        setEditReminders(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // axios DELETE reminder
  const deleteReminders = (id) => {
    axios
      .delete(`/api/reminders/${id}`)
      .then(() => {
        setReminders(reminders.filter((reminder) => reminder._id !== id)); // Remove deleted reminder from the state
      })
      .catch((err) => {
        console.error(err);
      });
  };

  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh', // centering
        textAlign: 'center' // Centering
      }}
    >
      <Typography variant="h4" gutterBottom>
        My Reminders
      </Typography>
  
      {/* Display reminders or show message if empty */}
      {reminders.length === 0 ? (
        <Typography>No reminders to display</Typography>
      ) : (
        reminders.map((reminder) => (
          <Card key={reminder._id} sx={{ marginBottom: 2, width: '80%' }}>
            <CardContent>
              <Typography variant="h6">{reminder.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {reminder.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(reminder.date).toLocaleString()}
              </Typography>
              <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => console.log('Mark as completed')}
                  sx={{ marginRight: 1 }}
                >
                  Complete
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteReminders(reminder._id)}
                  sx={{ marginTop: 2, marginBottom: 1 }}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
  
      <Box mt={4} sx={{ width: '80%' }}>
        <Typography variant="h6">Create New Reminder</Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={newReminders.title}
          onChange={handleInputChange}
          name="title"
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={newReminders.description}
          onChange={handleInputChange}
          name="description"
          multiline
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Date"
          variant="outlined"
          fullWidth
          value={newReminders.date}
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={postReminders}>
            Create Reminder
          </Button>
        </Box>
      </Box>
    </Box>
  );
  
};

export default ReminderCard;
