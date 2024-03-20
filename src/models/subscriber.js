const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = subscriber;
