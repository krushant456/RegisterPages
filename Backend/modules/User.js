const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
  },
  date: {
    type: Date,
  },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  hobbies: {
    Reading: { type: Boolean, default: false },
    Writeing: { type: Boolean, default: false },
    Dancing: { type: Boolean, default: false },
    OnlineGame: { type: Boolean, default: false },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
