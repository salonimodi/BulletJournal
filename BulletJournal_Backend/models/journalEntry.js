// const mongoose = require('mongoose');

// const journalEntrySchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

// module.exports = JournalEntry;


// journal.js
const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  content: { type: String, required: true },
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;

