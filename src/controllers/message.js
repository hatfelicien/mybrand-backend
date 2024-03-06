const messages = require("../models/message");
const Joi = require("joi");

const newMessage = async (req, res) => {
  try {
    const { email, content } = req.body;
    if (!email || !content) {
      return res.status(400).json({
        status: "Bad request",
        Message: "missing fields",
        email,
        content,
      });
    }
    // save the message
    //message object
    const newMessage = {
      email,
      content,
    };
    //save
    await messages.create(newMessage);
    return res.status(201).json({
      Message: "message sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      Message: "Failed to send a message",
    });
  }
};
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
module.exports = { newMessage, allMessage };
