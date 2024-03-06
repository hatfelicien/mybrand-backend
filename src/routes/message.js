const express = require("express");
const messageController = require("../controllers/message");
const verifyAuth = require("../middlewares/auth");

const route = express.Router();

route.post("/new", messageController.newMessage);
route.get("/all", verifyAuth, messageController.allMessage);

module.exports = route;
