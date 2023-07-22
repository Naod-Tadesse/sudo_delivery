const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

// User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  phoneNumber: {
    type: Number,
    minlength: 10,
  },
  profilePicture: {
    type: Array,
    minlength: 3,
    maxlength: 100,
    default: [],
  },
});

//generating token for authenticated or registred user
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("userPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  //validating schema for registering user
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    phoneNumber: Joi.string().min(10).required(),
  });

  return schema.validate(user, { abortEarly: false });
};

exports.User = User;
exports.validateUser = validateUser;
