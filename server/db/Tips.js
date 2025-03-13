const mongoose = require('mongoose');

const TipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  intensity: { type: Number, required: true },
  tips: { type: [String], required: true },
});

module.exports = mongoose.model('Tip', TipSchema);
