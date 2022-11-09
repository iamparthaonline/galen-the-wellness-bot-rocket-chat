const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "en",
  },
  nickname: {
    type: String,
    required: false,
  },
  workHours: {
    type: String,
    default: "9AM - 6PM",
  },
  takeBreakCron: {
    type: Object,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
