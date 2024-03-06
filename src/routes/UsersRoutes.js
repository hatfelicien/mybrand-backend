const express = require('express');
const userController = require('../controllers/Users');
const verifyAuth = require('../middlewares/auth');



const route = express.Router()

route.post('/register', userController.Register);
route.post('/login', userController.Login);
route.get('/all', verifyAuth,  userController.getAllUsers);

module.exports = route;