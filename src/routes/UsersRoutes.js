const express = require("express");
const userController = require("../controllers/Users");
const verifyAuth = require("../middlewares/auth");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation");

const route = express.Router();

route.post("/register", registerValidation, userController.Register);
route.post("/login", loginValidation, userController.Login);
route.get("/all", verifyAuth, userController.getAllUsers);

module.exports = route;
