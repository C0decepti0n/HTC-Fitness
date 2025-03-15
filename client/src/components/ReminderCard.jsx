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
  const getReminders = async () => {
    try {
      const response = await axios.get(`/api/reminders/${user._id}`);
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



  // Function to mark reminder as complete
  const handleComplete = async (id) => {
    try {
      await axios.patch(`/api/reminders/complete/${id}`);
      setReminders(reminders.map(reminder => 
        reminder._id === id ? { ...reminder, completed: true } : reminder
      ));
    } catch (err) {
      console.error('Error marking reminder as complete:', err);
    }
  };


    // Function to handle delete with double-check confirmation
    const handleDelete = (id) => {
      const isConfirmed = window.confirm('Delete this reminder?');
      if (isConfirmed) {
        deleteReminders(id);
      }
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
    justifyContent: 'center', // Center content 
    alignItems: 'flex-start',  // Align items to the top
    paddingTop: '40px',
    width: '100%',
    maxWidth: '1200px', 
    margin: '0 auto',  
  }}
>
  {/* "My Reminders" Section */}
  <Box
    sx={{
      width: '48%',
      marginRight: '4%', 
    }}
  >
    <Box
      sx={{
        border: '2px solid #1976d2',
        borderRadius: '8px',
        padding: '8px 16px',
        marginBottom: '20px',
        textAlign: 'center',
        backgroundColor: '#e3f2fd',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h4" gutterBottom>
        My Reminders
      </Typography>
    </Box>

    {/* Scrollable Reminders List */}
    <Box
      sx={{
        maxHeight: '400px',
        overflowY: 'auto',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {reminders.length === 0 ? (
        <Typography textAlign="center">No reminders to display</Typography>
      ) : (
        reminders.map((reminder) => (
          <Card key={reminder._id} sx={{ marginBottom: 2, width: '100%' }}>
            <CardContent>
              <Typography variant="h6" textAlign="center">
                {reminder.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" textAlign="center">
                {reminder.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" textAlign="center">
                {new Date(reminder.date).toLocaleString()}
              </Typography>
              
              {/* Display the completion message */}
              {reminder.completed && (
                <Typography variant="body2" sx={{ color: '#1976d2' }} textAlign="center">
                  This reminder is completed!
                </Typography>
              )}

              <Box mt={2} display="flex" justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleComplete(reminder._id)}
                  sx={{ width: '120px' }}
                >
                  Complete
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(reminder._id)}
                  sx={{ width: '120px' }}
                >
                  Delete
                </Button>
              




              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  </Box>

  {/* "Create New Reminder" Section */}
  <Box
    sx={{
      width: '48%',
      marginLeft: '4%', 
    }}
  >
    <Typography variant="h6" textAlign="center" sx={{ marginBottom: 2 }}>
      Create New Reminder
    </Typography>
    <TextField
      label="Title"
      variant="outlined"
      fullWidth
      value={newReminders.title}
      onChange={handleInputChange}
      name="title"
      required
      sx={{ mt: 2 }}
    />
    <TextField
      label="Description"
      variant="outlined"
      fullWidth
      value={newReminders.description}
      onChange={handleInputChange}
      name="description"
      multiline
      sx={{ mt: 2 }}
    />
    <TextField
      label="Date"
      variant="outlined"
      fullWidth
      value={newReminders.date}
      onChange={handleInputChange}
      name="date"
      type="datetime-local"
      sx={{ mt: 2 }}
    />
    <Button variant="contained" color="primary" onClick={postReminders} sx={{ mt: 2 }}>
      Create Reminder
    </Button>
  </Box>
</Box>








  );
};

export default ReminderCard;
