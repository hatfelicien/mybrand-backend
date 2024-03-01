const express = require("express");
const Contact = require("../models/contact");
const router = express.Router();

// Get all posts
router.post("/contact", async (req, res) => {
  const post = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  await post.save();
  res.send(post);
});

router.get("/contact/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch {
    res.status(404);
    res.send({ error: "Posts doesn't exist!" });
  }
});
router.get("/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id });
    res.send(contact);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.put("/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      id,
      { name, email, message },
      { new: true }
    );
    console.log(contact);
    return res.status(201).send(contact);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.delete("/contact/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await Contact.findByIdAndDelete(id);
    if (deletedMessage)
      return res.status(200).send({
        message: "message deleted successfully",
        data: deletedMessage,
      });
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

module.exports = router;
