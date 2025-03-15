const mongoose = require('mongoose');

const TipsSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tipsId: String,
  gender: String,
  intensity: Number,
  tips:  [],
  disabled: Boolean
});

module.exports = TipsSchema;
