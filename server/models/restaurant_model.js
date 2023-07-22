const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 60,
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
    maxlength: 100,
    default: [],
  },
  description: {
    type: String,
    maxlength: 400,
    default: ""
  }
});

// token for authenticated or registered restaurants
restaurantSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("restaurantPrivateKey"));
  return token;
};

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

function validateRestaurant(restaurant) {
  //validating schema for registering restaurant
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    address: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    phoneNumber: Joi.string().min(10).required(),
    description: Joi.string()
  });
  return schema.validate(restaurant, { abortEarly: false });
}

exports.restaurantSchema = restaurantSchema;
exports.Restaurant = Restaurant;
exports.validateRestaurant = validateRestaurant;
