const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trackerName: { type: String,required: true},
  description: {type: String},
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'],required: true},
  selectedDay: { type: String },
  selectedDate: {type: Number },
  createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Tracker', trackerSchema);

