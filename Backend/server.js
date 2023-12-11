const mongoose = require("mongoose");
const express = require("express");
const User = require("./modules/User");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://krushantkoshti:OQnwogfHNmTILx1V@cluster0.aqjrjys.mongodb.net/RegisterPage"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not Connected", err));

app.post("/user", (req, res) => {
  const {
    name,
    email,
    password,
    confirmpassword,
    date,
    gender,
    Reading,
    Writeing,
    Dancing,
    OnlineGame,
  } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.json("Already have an account");
      } else {
        User.create({
          name: name,
          email: email,
          password: password,
          confirmpassword: confirmpassword,
          date: date,
          // selectedOption: selectedOption,
          hobbies: { Reading, Writeing, Dancing, OnlineGame },
          gender,
        })
          .then((result) => res.json("Account created"))
          .catch((err) => res.json(err));
      }
    })
    .catch((err) => res.json(err));
});

const Port = 3001;
app.listen(Port, () => console.log(`Server is running in ${Port} Port`)); // Fix here
