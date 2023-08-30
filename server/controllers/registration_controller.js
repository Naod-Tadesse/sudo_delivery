const _ = require("lodash");
const bcrypt = require("bcryptjs");
const {
  Restaurant,
  validateRestaurant,
} = require("../models/restaurant_model");
const { User, validateUser } = require("../models/user_model");

exports.registerUser = async (req, res) => {
  //validating the registering user's properties
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).json({
      errorMessage: error.details.map((errorObject) => errorObject.message),
    });
    
    return;
  }

  //check if user is registered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  //registering user
  user = new User(
    _.pick(req.body, [
      "username",
      "email",
      "password",
      "phoneNumber",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  //Generate and set user token
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(
      _.pick(user, [
        "_id",
        "username",
        "email",
        "phoneNumber",
        "profilePicture",
      ])
    );
};

exports.registerRestaurant = async (req, res) => {
  //validating the registering restaurant's properties
  const { error } = validateRestaurant(req.body);
  if (error) {
    res.status(400).json({
      message: error.details.map((errorObject) => errorObject.message),
    });
    return;
  }

  //check if restaurant is registered
  let restaurant = await Restaurant.findOne({ email: req.body.email });
  if (restaurant) return res.status(400).send("Restaurant already registered");

  //registering restaurant
  restaurant = new Restaurant(
    _.pick(req.body, ["name", "address", "email", "password", "phoneNumber", "description"])
  );
  const salt = await bcrypt.genSalt(10);
  restaurant.password = await bcrypt.hash(restaurant.password, salt);

  await restaurant.save();

  //Generate and set restaurant token
  const token = restaurant.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(
      _.pick(restaurant, [
        "_id",
        "name",
        "address",
        "email",
        "phoneNumber",
        "profilePicture",
        "description"
      ])
    );
};

exports.getCurrentUser = async (req, res) => {
  //getting the current user
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

exports.getCurrentRestaurant = async (req, res) => {
  //getting the current restaurant
  const restaurant = await Restaurant.findById(req.restaurant._id).select(
    "-password"
  );

  res.send(restaurant);
};
