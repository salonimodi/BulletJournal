const mongoose = require('mongoose');

const stickyNoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  color: { type: String, default: '#ffcc00' }, // Default color: yellow
});

const StickyNote = mongoose.model('StickyNote', stickyNoteSchema);

module.exports = StickyNote;
