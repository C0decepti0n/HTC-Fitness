import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReminderCard = () => {
  // set state to store reminders
  const [reminders, setReminders] = useState([]);
  // edit reminders
  // const [editReminders, setEditReminders] = useEffect();
  // set new reminders
  const [newReminders, setNewReminders] = useState({
    title: '',
    description: '',
    date: '',
  });

  // axios get request
  const getReminders = () => {
    axios
      .get('/reminders')
      .then((response) => {
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
    axios
      .post('/reminders', {
        title: newReminders.title,
        description: newReminders.description,
        date: newReminders.date,
        // user: userId,
      })
      .then((response) => {
        setReminders([...reminders, response.data]);
        setNewReminders({
          title: '',
          description: '',
          date: '',
          // userId:????
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
        getReminders();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // handle input change for the new reminders
  // const handleInputChange = (e){
  //   setNewReminders((previousState)=>{
  // ...
  //   })
  // }

  return (
    <div>
      <h2>Reminders</h2>
      <div>
        {reminders.map((reminder) => (
            <div key={reminder.id}>
              <h3>{reminder.title}</h3>
              <p>{reminder.description}</p>
              <p>{new Date(reminder.date).toLocaleString()}</p>
              <button
                onClick={() => updateReminders(reminder.id, { completed: true })}
              >
                Completed!
              </button>
              <button onClick={() => deleteReminders(reminder.id)}>
                Delete
              </button>
            </div>
        ))}
      </div>

      <div>
        <h3>Create New Reminder</h3>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={newReminders.title}
          // onChange={handleInputChange}
        />
        <input
          type='text'
          name='description'
          placeholder='Description'
          value={newReminders.description}
          // onChange={handleInputChange}
        />
        <input
          type='datetime-local'
          name='date'
          value={newReminders.date}
          // onChange={handleInputChange}
        />
        <button onClick={postReminders}>Create Reminder</button>
      </div>
    </div>
  );
};

export default ReminderCard;
