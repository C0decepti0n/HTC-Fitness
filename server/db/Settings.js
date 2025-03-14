const mongoose = require ('mongoose');
//reminder schema
const settingsSchema = new mongoose.Schema({
  dashboard: Array,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  }
});
const Settings = mongoose.model('Settings', settingsSchema);

 module.exports = {Settings};