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
  },
  createdAt: {
    type: Date,
    default() {
      return new Date();
    },
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  medicineReminderHours: {
    type: [Number],
  },
});

const Message = mongoose.model("Reminder", ReminderSchema);

module.exports = Message;
