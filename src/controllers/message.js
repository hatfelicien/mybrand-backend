// controllers/message.js

const messages = require("../models/message");
const Joi = require("joi");
const messageSchema = require("../validation/messageValidation"); // Adjust the path as necessary

const newMessage = async (req, res) => {
  try {
    // doing validations
    /*const { error } = messageSchema.validate(req.body);
    console.log(req.body)
    if (error) {
      return res.status(400).json({
        status: "Bad request",
        // Message: error.details[0].message,
      });
    }*/

    // If validation passes
    const { username, email, content } = req.body;
    const newMessage = { username, email, content };
    await messages.create(newMessage);
    return res.status(201).json({
      Message: "Message sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      Message: "Failed to send a message",
    });
  }
};

//get all messages
const allMessage = async (req, res) => {
  try {
    const message = await messages.find();
    if (!message) {
      return res.status(404).json({
        status: "Not found",
        Message: "No message found :)",
      });
    }

    // users found
    res.header("Access-Control-Expose-Headers", "authorization");
    return res.status(200).json({
      status: "OK",
      message: message,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Fail to fetch message :)",
    });
  }
};
//delete a message
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    // check if message exist
    const message = await messages.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({
        Message: "Failed to delete a blog",
      });
    }

    return res.status(200).json({
      Message: "message deleted",
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Failed to delete message",
    });
  }
};

module.exports = { newMessage, allMessage, deleteMessage };
