const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const Users = require('../models/user');
const Todo = require('../models/todo')
const StickyNote = require('../models/stickyNotes')
const Journal = require('../models/journalEntry')

const router = express.Router();
const url =
  "mongodb+srv://salonimodi:admin@atlascluster.d9rzbhp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
  console.log("Connected");
});

router.get("/", (req, res) => {
  res.send("From API Route");
});

//  User APIs
router.post("/register", (req, res) => {
  let userData = req.body; 
  let user = new Users(userData); 
  user
    .save()
    .then((registeredUser) => {
      let payload = {subject: registeredUser.id}
      let token = jwt.sign(payload, "secretkey")
      res.status(200).send({token});
      console.log("Success regiter")
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log("error in req")
    });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  Users.findOne({ email: userData.email })
    .then((user) => {
      if (!user) {
        res.status(401).send("Invalid Email");
      } else {
        if (user.password !== userData.password) {
          res.status(401).send("Invalid password");
        } else {
          let payload = {subject: user.id}
          let token = jwt.sign(payload, "secretkey")
          res.status(200).send({token});
          console.log("login success")
        }
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error logging in user");
    });
});

// To Do APIs
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  jwt.verify(token, 'secretkey', (err, decodedToken) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }
    req.userId = decodedToken.subject;
    next();
  });
};

// Get todos for a specific user
router.get("/todos", authenticateUser, (req, res) => {
  Todo.find({ userId: req.userId })
    .then(todos => {
      res.status(200).json(todos);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error fetching todos");
    });
});

// Add a new todo
router.post("/todos", authenticateUser, (req, res) => {
  const { description, completed }  = req.body;
  const newTodo = new Todo({
    userId: req.userId,
    description: description,
    completed: completed
  });
  newTodo.save()
    .then(todo => {
      res.status(201).json(todo);
    })
    .catch(error => {
      console.error(error);
      res.status(400).send("Error adding todo");
    });
});

// Update a todo
router.put("/todos/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndUpdate(id, req.body, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send('Todo not found');
      }
      res.status(200).json(todo);
    })
    .catch(error => {
      console.error(error);
      res.status(400).send("Error updating todo");
    });
});

// Delete a todo
router.delete("/todos/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndDelete(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send('Todo not found');
      }
      res.status(200).json(todo);
    })
    .catch(error => {
      console.error(error);
      res.status(400).send("Error deleting todo");
    });
});

// Sticky Notes
router.get("/sticky-notes", authenticateUser, (req, res) => {
  StickyNote.find({ userId: req.userId })
    .then(stickyNotes => {
      res.status(200).json(stickyNotes);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error fetching sticky notes");
    });
});

// Add a new sticky note
router.post("/sticky-notes", authenticateUser, (req, res) => {
  const { content, color, position } = req.body;
  const newStickyNote = new StickyNote({
    userId: req.userId,
    content,
    color,
    position,
  });
  newStickyNote.save()
    .then(stickyNote => {
      res.status(201).json(stickyNote);
    })
    .catch(error => {
      console.error(error);
      res.status(400).send("Error adding sticky note");
    });
});

// Update a sticky note
router.put("/sticky-notes/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  StickyNote.findByIdAndUpdate(id, req.body, { new: true })
    .then(stickyNote => {
      if (!stickyNote) {
        return res.status(404).send('Sticky note not found');
      }
      res.status(200).json(stickyNote);
    })
    .catch(error => {
      console.error(error);
      res.status(400).send("Error updating sticky note");
    });
});

// Delete a sticky note
router.delete("/sticky-notes/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  StickyNote.findByIdAndDelete(id)
    .then(stickyNote => {
      if (!stickyNote) {
        return res.status(404).send('Sticky note not found');
      }
      res.status(200).json(stickyNote);
    })
    .catch(error => {
      console.error(error);
      res.status(400).send("Error deleting sticky note");
    });
});


// Journal APIs
// Get journals for a specific user and date
router.get("/journals/:date", authenticateUser, (req, res) => {
  const { date } = req.params;
  Journal.find({ userId: req.userId, date })
    .then(journals => {
      res.status(200).json(journals);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error fetching journals");
    });
});

// Add a new journal entry for a specific date
// router.post("/journals/:date", authenticateUser, (req, res) => {
//   const { date } = req.params;
//   const { content } = req.body;
//   const newJournal = new Journal({
//     userId: req.userId,
//     date: new Date(date),
//     content,
//   });
//   newJournal.save()
//     .then(journal => {
//       res.status(201).json(journal);
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(400).send("Error adding journal entry");
//     });
// });

// router.post("/journals/:date", authenticateUser, (req, res) => {
//   const { date } = req.params;
//   const { content } = req.body;
  
//   Journal.findOneAndUpdate(
//     { userId: req.userId, date },
//     { userId: req.userId, date, content },
//     { upsert: true, new: true }
//   )
//   .then(journal => {
//     res.status(201).json(journal);
//   })
//   .catch(error => {
//     console.error(error);
//     res.status(400).send("Error adding or updating journal entry");
//   });
// });

// Add or update a journal entry for a specific date
router.post("/journals/:date", authenticateUser, (req, res) => {
  const { date } = req.params;
  const { content } = req.body;

  // Check if a journal entry exists for the given date
  Journal.findOne({ userId: req.userId, date })
    .then((existingJournal) => {
      if (existingJournal) {
        // If an entry exists, update its content
        existingJournal.content = content;
        return existingJournal.save();
      } else {
        // If no entry exists, create a new one
        const newJournal = new Journal({
          userId: req.userId,
          date,
          content,
        });
        return newJournal.save();
      }
    })
    .then((journal) => {
      res.status(201).json(journal);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("Error adding or updating journal entry");
    });
});


// Update a journal entry for a specific date
// router.put("/journals/:id", authenticateUser, (req, res) => {
//   const { id } = req.params;
//   Journal.findByIdAndUpdate(id, req.body, { new: true })
//     .then(journal => {
//       if (!journal) {
//         return res.status(404).send('Journal entry not found');
//       }
//       res.status(200).json(journal);
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(400).send("Error updating journal entry");
//     });
// });

// // Delete a journal entry
// router.delete("/journals/:id", authenticateUser, (req, res) => {
//   const { id } = req.params;
//   Journal.findByIdAndDelete(id)
//     .then(journal => {
//       if (!journal) {
//         return res.status(404).send('Journal entry not found');
//       }
//       res.status(200).json(journal);
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(400).send("Error deleting journal entry");
//     });
// });

//  Tracker APIs
module.exports = router;

