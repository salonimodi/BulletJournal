const mongoose = require('mongoose');

const trackerEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data: [{
    trackerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tracker' },
    isChecked: { type: Boolean, default: false },
    value: { type: String, default: '' }
  }],
  date: { type: Date, required: true },
});

const TrackerEntry = mongoose.model('TrackerEntry', trackerEntrySchema);

module.exports = TrackerEntry;
