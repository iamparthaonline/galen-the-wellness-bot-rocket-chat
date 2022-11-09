const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  messageId: {
    type: String,
    required: true,
  },
  messageTime: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  messageType: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
