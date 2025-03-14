const mongoose = require('mongoose');
const { Exercise, User, Sleep } = require('./index');

mongoose.connect('mongodb://localhost:27017/HTC-Fitness');

const exercises = [
  {
    name: 'Push Ups',
    type: 'basic',
    muscle: 'forearms',
    equipment: 'none',
    difficulty: 'beginner',
    instructions: 'Place both palms on the ground, straighten back and legs, lower your body with your shoulders and then push up with your arms.',
  },
  {
    name: 'Sprinting',
    type: 'basic',
    muscle: 'legs',
    equipment: 'shoes',
    difficulty: 'beginner',
    instructions: 'Run as fast as you can for 100 yards, rest for 20 seconds, repeat.',
  },
  {
    name: 'Sit ups',
    type: 'basic',
    muscle: 'abdominal',
    equipment: 'none',
    difficulty: 'beginner',
    instructions: 'Sit on the floor and lay back, place the soles of your feet on the ground with your knees bent. Then push your body up without using your arms so that your face becomes even with your knees. Then lay back and repeat.',
  },
];

const users = [
  {
    _id: 'skotbotblipbloop27',
    googleId: 'plo1',
    nameFirst: 'Bob',
    nameLast: 'Ross',
    email: 'bungholio@beavis',
    goal_weight: 69,
    weights: [],
    saved_exercises: [],
  },
  {
    _id: 'skotbotblipbloop28',
    googleId: 'plo2',
    nameFirst: 'aaa',
    nameLast: 'Ross',
    email: 'bungholio@beavis',
    goal_weight: 69,
    weights: [],
    saved_exercises: [],
  },
  {
    _id: 'skotbotblipbloop29',
    googleId: 'plo3',
    nameFirst: 'tut',
    nameLast: 'Ross',
    email: 'bungholio@beavis',
    goal_weight: 69,
    weights: [],
    saved_exercises: [],
  },
]

const sleepRecords = [
  {
    in_progress: true,
    quality: 0,
    goal: 8,
    hours_slept: 0,
    sleep_aid: '',
    disturbances: 0,
    disturbance_notes: '',
    day: new Date(),
    begin_sleep: new Date(),
    stop_sleep: null,
    user_id: 'skotbotblipbloop27',
  },
  {
    in_progress: false,
    quality: 7,
    goal: 6,
    hours_slept: 8,
    sleep_aid: 'rain sounds',
    disturbances: 0,
    disturbance_notes: 'none',
    day: 'Wed Mar 12 2025 12:04:49 GMT-0500 (Central Daylight Time)',
    begin_sleep: new Date(),
    stop_sleep: new Date(),
    user_id: 'skotbotblipbloop28',
  },
  {
    in_progress: true,
    quality: 7,
    goal: 6,
    hours_slept: 8,
    sleep_aid: 'none',
    disturbances: 1,
    disturbance_notes: 'none',
    day: 'Wed Mar 12 2025 12:04:49 GMT-0500 (Central Daylight Time)',
    begin_sleep: new Date(),
    stop_sleep: null,
    user_id: 'skotbotblipbloop29',
  },
];

Exercise.insertMany(exercises)
  .then(() => {
    console.log('Exercises inserted successfully!');
    // mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting exercises:', err);
    mongoose.connection.close();
  });

Sleep.insertMany(sleepRecords)
  .then(() => {
    console.log('Sleep records inserted successfully!');
    // mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting sleep records:', err);
    mongoose.connection.close();
  });

User.insertMany(users)
  .then(() => {
    console.log('Users inserted successfully!');
    // mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting users:', err);
    mongoose.connection.close();
  });
