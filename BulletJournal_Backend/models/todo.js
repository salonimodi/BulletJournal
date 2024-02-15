// const mongoose = require('mongoose');

// const todoSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   description: { type: String },
//   dueDate: { type: Date },
//   completed: { type: Boolean, default: false },
// });

// const Todo = mongoose.model('Todo', todoSchema);

// module.exports = Todo;


// todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  done: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
