const comments = require("../models/comment");
const Joi = require("joi");

// Validation schema for new comment
const newCommentSchema = Joi.object({
  email: Joi.string().required(),
  comment: Joi.string().required(),
});

// Validation schema for updating a comment
const updateCommentSchema = Joi.object({
  email: Joi.string().required(),
  comment: Joi.string().required(),
});

const newComment = async (req, res) => {
  try {
    // Validate request body
    const { error } = newCommentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "Bad request",
        Message: error.details[0].message,
      });
    }

    // Save the comment
    const { email, comment } = req.body;
    const newComment = {
      email,
      comment,
    };

    // Save
    await comments.create(newComment);

    return res.status(201).json({
      Message: "Comment added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Failed to add a comment",
    });
  }
};

//get all comments
const allComments = async (req, res) => {
  try {
    const comment = await comments.find();
    if (!comment) {
      return res.status(404).json({
        status: "Not found",
        Message: "No comment found :)",
      });
    }

    // comments found
    return res.status(200).json({
      status: "OK",
      message: comment,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Fail to comment :)",
    });
  }
};
//delete a comment
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    // check if message exist
    const comment = await comments.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({
        Message: "Failed to delete a comment",
      });
    }

    return res.status(200).json({
      Message: "comment deleted",
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Failed to delete a comment",
    });
  }
};
//udate a comment
const updateComment = async (req, res) => {
  try {
    // Validate request body
    const { error } = updateCommentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "Bad request",
        Message: error.details[0].message,
      });
    }

    const { email, comment } = req.body;
    const { id } = req.params;

    // Check if comment exists
    const myComment = await comments.findByIdAndUpdate(
      id,
      { email, comment },
      { new: true }
    );
    if (!myComment) {
      return res.status(404).json({
        Message: "Comment is not updated",
      });
    }

    return res.status(200).json({
      Message: "Comment updated",
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Fail to update the comment",
    });
  }
};

module.exports = { newComment, allComments, deleteMessage, updateComment };
