const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true, 
  },
  content: {
    type: String,
    required: true,
  },
});

const messages = mongoose.model("messages", messageSchema);

module.exports = messages;
