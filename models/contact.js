const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("contact", schema);
