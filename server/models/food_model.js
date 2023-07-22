const Joi = require("joi");
const mongoose = require("mongoose");

const { Comment } = require("../models/comment_model");
const { Restaurant } = require("../models/restaurant_model");

//this restaurnat Schema is used in foodmodel only
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
});

//food schema
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  image: {
    type: Array,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  ingredients: {
    type: Array,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  price: {
    type: Number,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  description:{
    type: String,
    maxlength: 400,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Food = mongoose.model("Food", foodSchema);

function validateFood(food) {
  //validating schema for storing food details
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    ingredients: Joi.array().min(1).max(30).required(),
    image: Joi.array().required(),
    price: Joi.number().required(),
    restaurant: Joi.objectId().required(),
    description: Joi.string()
  });
  return schema.validate(food, { abortEarly: false });
}

exports.Food = Food;
exports.validateFood = validateFood;
