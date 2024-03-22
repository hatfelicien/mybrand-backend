const Blogs = require("../models/Blogs");

const newBlog = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const image = req.file ? req.file.path : null;

    if (!title || !desc || !image) {
      return res.status(400).json({
        status: "Bad request",
        Message: "Missing fields",
        title,
        desc,
        image,
      });
    }

    // blog object
    const newBlog = {
      title,
      image,
      desc,
    };

    await Blogs.create(newBlog);

    return res.status(201).json({
      Message: "Blog is created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      Message: "Fail to create blog :)",
    });
  }
};

const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId;

    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ Message: "Blog not found" });
    }

    if (!blog.likes.includes(userId)) {
      const result = await Blogs.findByIdAndUpdate(id, {
        $push: { likes: userId },
      });

      if (result) {
        console.log(`Blog liked successfully. Updated document:`, result);
        return res.status(200).json({ Message: "Blog liked successfully" });
      } else {
        console.error("Failed to update blog. Update result is null.");
        return res.status(500).json({ Message: "Failed to like the blog" });
      }
    } else {
      console.warn("User has already liked this blog.");
      return res
        .status(400)
        .json({ Message: "User has already liked this blog" });
    }
  } catch (error) {
    console.error("Error during likeBlog operation:", error);
    return res.status(500).json({ Message: "Failed to like the blog" });
  }
};

// unlike a blog
const unlikeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId;

    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ Message: "Blog not found" });
    }

    if (blog.likes.includes(userId)) {
      await Blogs.findByIdAndUpdate(id, { $pull: { likes: userId } });
      return res.status(200).json({ Message: "Blog unliked successfully" });
    } else {
      return res.status(400).json({ Message: "User has not liked this blog" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Failed to unlike the blog" });
  }
};
//update a blog
const updateBlog = async (req, res) => {
  try {
    const { title, desc, image } = req.body;
    const { id } = req.params;

    // check if blog exist
    const blog = await Blogs.findByIdAndUpdate(
      id,
      { title, desc, image },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({
        Message: "Blog not updated",
      });
    }

    return res.status(200).json({
      Message: "Blog updated",
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Fail to update Blog ",
    });
  }
};
//delete a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // check if blog exist
    const blog = await Blogs.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({
        Message: "Blog not deleted",
      });
    }

    return res.status(200).json({
      Message: "Blog deleted",
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Fail to delete Blog ",
    });
  }
};
//get all blogs
const allblogs = async (req, res) => {
  try {
    const myBlog = await Blogs.find();
    if (!myBlog) {
      res.status(404).send({
        status: "Not found",
        Message: "No blog found :)",
      });
      return;
    }

    // blog found
    res.status(200).send({
      status: "OK",
      Message: myBlog,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Fail to retireve the blogs :)",
    });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ Message: "Blog not found" });
    }
    return res.status(200).json({ Message: "Blog found", blog });
  } catch (error) {
    console.error("Error while fetching the blog:", error);
    return res.status(500).json({ Message: "Failed to fetch the blog" });
  }
};

module.exports = {
  newBlog,
  updateBlog,
  deleteBlog,
  allblogs,
  likeBlog,
  unlikeBlog,
  getSingleBlog,
};
