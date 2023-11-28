const _ = require("lodash");
const mongoose = require("mongoose");
const Joi = require("joi");

const { Food, validateFood } = require("../models/food_model");
const { Restaurant } = require("../models/restaurant_model");

exports.storeFood = async (req, res) => {
  // Check for body's restaurants id and token's restaurant id are equal
  if (req.body.restaurant !== req.restaurant._id) {
    return res.status(400).send("invalid restaurant id");
  }

  //validating the food properties
  const { error } = validateFood(req.body);
  if (error)
    return res.status(400).json({
      message: error.details.map((errorObject) => errorObject.message),
    });

  //check for restaurant
  let restaurant = await Restaurant.findById(req.body.restaurant);
  if (!restaurant) return res.status(400).send("'llllnvalid restaurant id");

  //check if food exists
  let food = await Food.findOne({
    name: req.body.name,
    restaurant: restaurant._id,
  });
  if (food) return res.status(400).send("the food is already stored");

  //storing food
  food = new Food({
    name: req.body.name,
    image: req.body.image,
    ingredients: req.body.ingredients,
    price: req.body.price,
    restaurant: restaurant._id,
    description: req.body.description,
  });

  await food.save();

  res.send(food);
};

exports.editFood = async (req, res) => {
  // Food update parameters validation
  req.body.changes = JSON.parse(req.body.changes)

  const { error } = validateFoodUpdate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details.map((errorObject) => errorObject.message),
    });
  
  // Check for body's restaurants id and token's restaurant id are equal
  if (!req.restaurant._id) {
    return res.status(400).send("invalid restaurant id");
  }
  
  // Check if restaurant exists
  let restaurant = await Restaurant.findById(req.restaurant._id);
  if (!restaurant) return res.status(400).send("no restaurant registered");

  // Check if food exists
  let food = await Food.findOne({
    _id: req.body.foodId,
    restaurant: restaurant._id,
  });
  if (!food) return res.status(400).send("no food registered");

  req.body.changes.image = req.body.image.concat(req.body.changes.images);

  // updatef food
  food.set(req.body.changes);

  await food.save();

  res.send(food);
};

exports.deleteFood = async (req, res) => {
  // Check if the food to update exists
  const { foodId } = req.query;
  if (!foodId) return res.status(400).send("please provide food Id");

  // Delete food
  let food = await Food.findByIdAndDelete(foodId);
  res.send({ foodDeleted: food });
};

exports.getMenusForRestaurant = async (req, res) => {
  //  Query params restaurant holds the restaurant id only
  let { pageNumber, pageSize, sort, search } = req.query;

  // page number assignment
  pageNumber = Number(pageNumber) || 1;
  pageSize = Number(pageSize) || 10;

  // Check for token
  if (!req.restaurant._id) return res.status(400).send("no token provided");

  // Check for body's restaurants id and token's restaurant id are equal
  // if (restaurant !== req.restaurant._id) {
  //   return res.status(400).send("invalid restaurant id");
  // }

  // Check if restaurant exists
  let restaurantsFound = await Restaurant.findById(req.restaurant._id);

  // search for foods
  let restaurantFinder = _.pick(restaurantsFound, ["_id"]);
  const queryObject = {
    restaurant: restaurantFinder._id,
  };

  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  let result = Food.find(queryObject).collation({ locale: 'en' });

  if (sort === "a-z") {
    result = result.sort("name");
  }
  if (sort === "z-a") {
    result = result.sort("-name");
  }

  result = result.skip((pageNumber - 1) * pageSize).limit(pageSize);

  const foods = await result;

  // counting the number of total foods and page sizes
  const totalFoods = await Food.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalFoods / pageSize);

  // send search result
  res.status(200).json({ foods, totalFoods, numOfPages });
};

exports.getUserFoods = async (req, res) => {
  //  Query params
  let { pageNumber, pageSize, search, sort } = req.query;

  // page number assignment
  pageNumber = Number(pageNumber) || 1;
  pageSize = Number(pageSize) || 10;

  // search for foods
  const queryObject = {};

  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  let result = Food.find(queryObject).collation({ locale: 'en' });

  if (sort === "a-z") {
    result = result.sort("name");
  }
  if (sort === "z-a") {
    result = result.sort("-name");
  }

  result = result
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .populate("restaurant", "name address phoneNumber");

  const foods = await result;

  // counting the number of total foods and page sizes
  const totalFoods = await Food.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalFoods / pageSize);

  // send search results
  res.status(200).json({ foods, totalFoods, numOfPages });
};

// Validating Schema for food update
function validateFoodUpdate(body) {
  const schema = Joi.object({
    foodId: Joi.objectId().required(),
    changes: Joi.object().required(),
    image: Joi.array()
  });
  return schema.validate(body, { abortEarly: false });
}
