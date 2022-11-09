const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  reminderType: {
    type: String,
    required: true,
  },
  remindAt: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

const Message = mongoose.model("Reminder", ReminderSchema);

module.exports = Message;
