const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    user1: {
      type: String,
    },
    user2: {
      type: String,
    },
    roomId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = chatSchema;
