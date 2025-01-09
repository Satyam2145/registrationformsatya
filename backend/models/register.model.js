const mongoose = require("mongoose");
const validator = require("validator");

const registerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    contact: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    college: { type: String, required: true },
    department: { type: String, required: true },
  },
  { timestamps: true }
);

// Static method to handle user registration and included validation also

registerSchema.statics.register = async function (
  name,
  email,
  contact,
  college,
  department
) {
  if (!name || !email || !contact || !college || !department) {
    throw Error("All fields are required.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email Address");
  }
  if (contact.length !== 10) {
    throw Error("Contact number must be 10 characters long");
  }
  const foundEmail = await this.findOne({ email });
  if (foundEmail) {
    throw Error("This email address already in use");
  }
  const newUser = await this.create({
    name,
    email,
    contact,
    college,
    department,
  });
  return newUser;
};

const RegisterUser = mongoose.model("RegisterUser", registerSchema);

module.exports = RegisterUser;
