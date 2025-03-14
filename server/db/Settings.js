const mongoose = require ('mongoose');

const settingsSchema = new mongoose.Schema({
  preferredName: String,
  dashboard: Array,
  user_id: String
});
const Settings = mongoose.model('Settings', settingsSchema);

 module.exports = {Settings};