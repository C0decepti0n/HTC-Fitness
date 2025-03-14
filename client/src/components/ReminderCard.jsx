import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';


const ReminderCard = ({users}) => {
  // set state to store reminders
  const [reminders, setReminders] = useState([]);
  // edit reminders
  //  const [editReminders, setEditReminders] = useState(null);
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
  const getReminders = (userId) => {

    axios
      .get(`/reminders/${userId}`)
      .then((response) => {
        // console.log('Fetched reminders:', response.data);
        setReminders(response.data);

      })
      .catch((err) => {
        console.error('Can not get all reminders:', err);
      });
  };



  // mounts fetched reminders
  useEffect(() => {
   
    getReminders();
  
}, []);

  // axios Post
  const postReminders = () => {
    if(!user?._id){
      (console.log(user._id, 'user'))
      console.error('User id is required');
      return;
    }
    axios
      .post('/reminders', {
        title: newReminders.title,
        description: newReminders.description,
        date: newReminders.date,
         userId: user._id,
      })
      .then((response) => {
        setReminders([...reminders, response.data]);
        setNewReminders({
          title: '',
          description: '',
          date: '',
        });
      })
      .catch((err) => {
        console.error('Can not create reminder:', err);
      });
  };
  // axios request to update
  const updateReminders = (id, updatedReminder) => {
    axios
      .patch(`/reminders/${id}`, updatedReminder)
      .then(() => {
        getReminders();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // axios DELETE reminder
  const deleteReminders = (id) => {
    axios
      .delete(`/reminders/${id}`)
      .then(() => {
        setReminders(reminders.filter((reminder) => reminder._id !== id)); // Remove deleted reminder from the state
      })
      .catch((err) => {
        console.error(err);
      });
  };

  
  return (

    <Box>
    <Typography variant="h4" gutterBottom>
      My Reminders
    </Typography>

    {/* Display reminders or show message if empty */}
    {reminders.length === 0 ? (
      <Typography>No reminders to display</Typography>
    ) : (
      reminders.map((reminder) => (
        <Card key={reminder._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{reminder.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {reminder.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(reminder.date).toLocaleString()}
            </Typography>
            <Box mt={2}>
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
                onClick={() => deleteReminders(reminder._id)} // Delete the reminder
                sx={{ marginTop: 2, marginBottom: 1 }}

              >
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))
    )}





<Box mt={4}>
        <Typography variant="h6">Create New Reminder</Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={newReminders.title}
          onChange={handleInputChange}
          name="title"
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={newReminders.description}
          onChange={handleInputChange}
          name="description"
          multiline
        />
        <TextField
          label="Date"
          variant="outlined"
          fullWidth
          value={newReminders.date}
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
        />
        <Button variant="contained" onClick={postReminders}>Create Reminder</Button>
      </Box>
    </Box>
  );
};

export default ReminderCard;
