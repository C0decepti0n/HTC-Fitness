const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
  in_progress: Boolean,
  quality: { type: Number, min: 0, max: 7 },
  goal: Number,
  hours_slept: Number,
  sleep_aid: String,
  disturbances: Number,
  disturbance_notes: String,
  day: Date,
  begin_sleep: Date,
  stop_sleep: Date,
  user_id: Number,
});

module.exports = sleepSchema;
