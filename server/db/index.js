const mongoose = require('mongoose');
<<<<<<< HEAD
const TipSchema = require('./tipSchema');
=======
//update
const RoutineSchema = require('./routineSchema');

>>>>>>> bac222a463c1ecd940df2ef47a4c68f0bcebcc2a

// Exercise schema
const exerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
  muscle: String,
  equipment: String,
  difficulty: String,
  instructions: String,
});

const weightSchema = new mongoose.Schema({
  weight: Number,
  date: Date,
});

const SavedExerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
  muscle: String,
  equipment: String,
  difficulty: String,
  instructions: String,
  sets: { type: Number, default: null },
  reps: { type: Number, default: null },
});

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  nameFirst: String,
  nameLast: String,
  email: String,
  goal_weight: Number,
  weights: [weightSchema],
  saved_exercises: [SavedExerciseSchema],
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
const User = mongoose.model('User', userSchema);

<<<<<<< HEAD
module.exports = { Exercise, User, TipSchema };
=======
module.exports = { Exercise, User, RoutineSchema };
>>>>>>> bac222a463c1ecd940df2ef47a4c68f0bcebcc2a
