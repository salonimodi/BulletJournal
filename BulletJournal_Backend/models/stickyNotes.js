const mongoose = require('mongoose');

const stickyNoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, default: '' },
  color: { type: String, default: '#ffcc00' }, // Default color: yellow
  position: {type: Number}
});

const StickyNote = mongoose.model('StickyNote', stickyNoteSchema);

module.exports = StickyNote;
