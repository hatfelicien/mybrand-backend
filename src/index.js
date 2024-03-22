const express = require("express");
const connectDB = require("./config/Db");
const userRoutes = require("./routes/UsersRoutes");
const blogsRoutes = require("./routes/blogsRoutes");
const messageRoutes = require("./routes/message");
const commentRoutes = require("./routes/comment");
const subscriberRoutes = require("./routes/subscriber");
const swaggerdocs = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

const cors = require("cors");
const dotenv = require("dotenv");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Personal Portfolio API documentation",
      version: "1.0.0",
      description:
        "This documentation serves as a comprehensive guide to all the APIs utilized in constructing my professional profile. From essential endpoints to intricate functionalities, this reference offers insights into the underlying architecture powering my digital presence. Explore the endpoints, parameters, and responses that shape the interactive experience, curated by Hategekimana Felicien. in constructing my professional profile. From essential endpoints to intricate functionalities, this reference offers insights into the underlying architecture powering my digital presence. Explore the endpoints, parameters, and responses that shape the interactive experience, curated by Hategekimana Felicien.",
      contact: {
        name: "Hategekimana Felicien",
      },
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "Bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
      {
        url: "https://mybrand-backend-s7by.onrender.com",
      },
    ],
  },
  schemes: ["http", "https"],
  apis: ["./src/docs/*.yaml"],
};
const swaggerSpec = swaggerdocs(options);

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerSpec));
app.use("/subscriber", subscriberRoutes);
app.use("/users", userRoutes);
app.use("/blogs", blogsRoutes);
app.use("/message", messageRoutes);
app.use("/comment", commentRoutes);

connectDB;
let server = app.listen(8080, () => {
  console.log("Server is running ....");
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "welcome to my portfolio",
  });
});
module.exports = server;
