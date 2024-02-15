const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

const router = express.Router();
const url =
  "mongodb+srv://salonimodi:admin@atlascluster.d9rzbhp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
  console.log("Connected");
});

router.get("/", (req, res) => {
  res.send("From API Route");
});


router.post("/register", (req, res) => {
  let userData = req.body; // Get the data from request body
  let user = new Users(userData); // Update model reference
  user
    .save()
    .then((registeredUser) => {
      let payload = {subject: registeredUser.id}
      let token = jwt.sign(payload, "secretkey")
      res.status(200).send({token});
    })
    .catch((err) => {
      res.status(400).send(err);
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
        }
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error logging in user");
    });
});

module.exports = router;
