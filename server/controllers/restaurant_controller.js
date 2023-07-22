const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { Restaurant } = require("../models/restaurant_model");
const { Food } = require("../models/food_model");
const { query } = require("express");

exports.getAllRestaurantsForUser = async (req, res) => {
  //send restaurants their menu
  let { pageNumber, pageSize, search, sort } = req.query;

  pageNumber = Number(pageNumber) || 1;
  pageSize = Number(pageSize) || 10;

  // Check for token
  if (!req.user._id) return res.status(400).send("no token provided");

  const queryObject = {};

  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  // Find restaurant
  let result = Restaurant.find(queryObject);

  if (sort === "a-z") {
    result = result.sort("name");
  }
  if (sort === "z-a") {
    result = result.sort("-name");
  }

  result = result
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .select("-password");

  const restaurants = await result;

  const totalRestaurants = await Restaurant.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalRestaurants / pageSize);

  res.send({ restaurants, totalRestaurants, numOfPages });
};

exports.getARestaurantsMenusToUser = async (req, res) => {
  // Check for query params
  const { restaurantId, pageNumber, pageSize } = req.query;

  // Check for token
  if (!req.user._id) return res.status(400).send("no token provided");

  // Find the restaurant
  let restaurant = await Restaurant.findById(restaurantId);
  if(!restaurant) return res.status(400).send("restaurant not found")

  let restaurantFinder = _.pick(restaurant, ["_id"]);

  // Find food
  const foods = await Food.find({ restaurant: restaurantFinder._id })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 });
  if (!foods) return res.status(400).send("food not found");

  const totalRestaurants = await Food.countDocuments({restaurant: restaurantFinder._id});
  const numOfPages = Math.ceil(totalRestaurants / pageSize);

  res.send({foods, totalRestaurants, numOfPages});
};
