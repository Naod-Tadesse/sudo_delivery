const Joi = require("joi");
const mongoose = require("mongoose");

const { Restaurant } = require("../models/restaurant_model");
const { User } = require("../models/user_model");
const { Food } = require("../models/food_model");

const orderSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
    quantity: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    orderDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

// Validating ordered food
function validateFoodObject(food) {
  const schema = Joi.object({
    foodId: Joi.objectId(),
    quantity: Joi.number(),
  });
  return schema.validate(food, { abortEarly: false });
}

//validating schema for storing food details
function validateOrder(order) {
  const schema = Joi.object({
    food: Joi.array(),
  });
  return schema.validate(order, { abortEarly: false });
}

exports.validateOrder = validateOrder;
exports.validateFoodObject = validateFoodObject;
exports.Order = Order;
