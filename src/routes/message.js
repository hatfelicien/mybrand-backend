const express = require("express");
const messageController = require("../controllers/message");
const verifyAuth = require("../middlewares/auth");
const validateMessage = require("../middlewares/validateMessage");

const route = express.Router();

route.post("/new", messageController.newMessage);
route.get("/all", verifyAuth, messageController.allMessage);
route.delete("/delete/:id", verifyAuth, messageController.deleteMessage);
module.exports = route;
