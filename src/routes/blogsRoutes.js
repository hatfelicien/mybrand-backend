const express = require("express");
const blogsController = require("../controllers/Blogs");
const upload = require("../utils/upload");
const verifyAuth = require("../middlewares/auth");
const { blogValidation } = require("../middlewares/validation");

const route = express.Router();

route.post(
  "/new",
  verifyAuth,
  upload.single("image"),
  blogValidation,
  blogsController.newBlog
);
route.get("/all", blogsController.allblogs);
route.get("/single/:id", blogsController.getSingleBlog);
route.patch("/like/:id", verifyAuth, blogsController.likeBlog);
route.patch("/unlike/:id", verifyAuth, blogsController.unlikeBlog);
route.put(
  "/:id",
  verifyAuth,
  upload.single("image"),
  blogValidation,
  blogsController.updateBlog
);
route.delete("/:id", verifyAuth, blogsController.deleteBlog);

module.exports = route;
