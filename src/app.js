const connectDB = require("./config/database");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const projectRoutes = require("./routes/projectRoutes");
const messageRoutes = require("./routes/messageRoutes");
const socialRoutes = require("./routes/socialRoutes");
require("dotenv").config();

// const { sequelize, initializeDatabase } = require('./config/database');

connectDB();
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
// app.use("/api/project", projectRoutes);
// app.use("/api/message", messageRoutes);
// app.use("/api/social", socialRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the E-healthcare backend");
});
