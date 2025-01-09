const RegisterUser = require("../models/register.model");

async function registerUser(req, res) {
  const { name, email, contact, college, department } = req.body;

  try {
    // Call the static method to register the user
    const user = await RegisterUser.register(
      name,
      email,
      contact,
      college,
      department
    );

    // Send success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    if (error.message.includes("email")) {
      res.status(400).json({
        success: false,
        message: "This email address is already registered.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = { registerUser };
