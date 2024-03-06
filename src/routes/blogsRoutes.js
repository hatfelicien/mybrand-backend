// https://www.npmjs.com/package/multer

const express = require('express')
const blogsController = require('../controllers/Blogs');
const upload = require('../utils/upload');
const verifyAuth = require('../middlewares/auth');



const route = express.Router()


route.post("/new", upload.single('image'), verifyAuth, blogsController.newBlog);
route.put("/update/:id", blogsController.updateBlog);
route.delete("/delete/:id", blogsController.deleteBlog);



module.exports = route