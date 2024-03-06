const mongoose = require("mongoose");

const messaSchema = new mongoose.Schema({
  email: {
    type: String,
    reuired: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const messages = mongoose.model("messages", messaSchema);

module.exports = messages;
