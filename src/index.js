const express = require("express");
const connectDB = require("./config/Db");
const userRoutes = require("./routes/UsersRoutes");
const blogsRoutes = require("./routes/blogsRoutes");
const messageRoutes = require("./routes/message");
const commentRoutes = require("./routes/comment");
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);
app.use("/blogs", blogsRoutes);
app.use("/message", messageRoutes);
app.use("/comment", commentRoutes);
connectDB;
let server = app.listen(8080, () => {
  console.log("Server is running ....");
});

module.exports = server;
