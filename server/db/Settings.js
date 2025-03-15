const mongoose = require ('mongoose');

const settingsSchema = new mongoose.Schema({
  preferredName: String,
  dashboard: [],
  gender: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
// const Settings = mongoose.model('Settings', settingsSchema);

 module.exports = settingsSchema;