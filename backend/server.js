const express = require("express");
const mongoose = require("mongoose");
const { registerUser } = require("./controllers/register.controller");
const RegisterUser = require("./models/register.model");
const cors = require("cors");
require("dotenv").config();

const app = express();
const router = express.Router();
const port = process.env.PORT || 8000;

// Middleware

app.use(cors());
app.use(express.json());

// MongoDB database connection

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB database.");
  })
  .catch((err) => {
    console.error("Failed to connnect to MongoDB database.", err);
  });

// Define routes

router.post("/register", registerUser);

// Get all registered users
router.get("/users", async (req, res) => {
  try {
    const users = await RegisterUser.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

app.use("/api", router);

// Start the server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
