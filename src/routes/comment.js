const express = require("express");
const commentControler = require("../controllers/comment");
const verifyAuth = require("../middlewares/auth");

const route = express.Router();

route.post("/new", commentControler.newComment);
route.get("/all", commentControler.allComments);
route.delete("/delete/:id", commentControler.deleteMessage);
route.put("/update/:id", commentControler.updateComment);
module.exports = route;
