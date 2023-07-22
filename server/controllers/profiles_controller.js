const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const { Restaurant } = require("../models/restaurant_model");
const { User } = require("../models/user_model");

exports.editUserProfile = async (req, res) => {
  req.body.changes = JSON.parse(req.body.changes);
  if (req.body.profilePicture === '') {
    req.body = _.pick(req.body,[
      "userId",
      "email",
      "changes",
      "image"
    ])
    req.body.changes.profilePicture = []
  }
  // Validate user profile update
  const { error } = validateUserProfile(req.body);
  if (error) {
    res.status(400).json({
      message: error.details.map((errorObject) => errorObject.message),
    });
    return;
  }

  // Check for body's restaurants id and token's restaurant id are equal
  if (req.body.userId !== req.user._id)
    return res.status(400).send("invalid user id");

  //  Find if user exists
  let user = await User.findOne({
    _id: req.body.userId,
    email: req.body.email,
  });
  if (!user) return res.status(400).send("no user found");

  if (req.body.image.length !== 0)req.body.changes.profilePicture = req.body.image;

  //update(edit) user profile
  // Change token if password is changed
  if ("password" in req.body.changes) {
    const salt = await bcrypt.genSalt(10);

    req.body.changes.password = await bcrypt.hash(
      req.body.changes.password,
      salt
    );
    user.set(req.body.changes);

    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(user);
  } else {
    user.set(req.body.changes);

    await user.save();
    res.send(user);
  }
};

exports.deleteUserProfile = async (req, res) => {
  // Check for user for deleting
  const { userId } = req.query;
  if (!userId) return res.status(400).send("user id not provided");

  // Check and delete user
  let user = await User.findByIdAndDelete(userId);
  if (!user) return res.status(400).send("user does not exist");

  res.send({ userDeleted: user });
};

exports.editRestaurantProfile = async (req, res) => {
  req.body.changes = JSON.parse(req.body.changes);

  //Validate restaurant update
  const { error } = validateRestaurantProfile(req.body);
  if (error)
    return res.status(400).json({
      message: error.details.map((errorObject) => errorObject.message),
    });

  // Check if body's restaurantId and token's restaurant id match
  if (req.body.restaurantId !== req.restaurant._id) {
    return res.status(400).send("invalid restaurant id");
  } 

  //check if restaurant exists
  let restaurant = await Restaurant.findOne({
    _id: req.body.restaurantId,
    email: req.body.email,
  });

  if (!restaurant) return res.status(400).send("no restaurant found");

  if (req.body.image){
  req.body.changes.profilePicture = req.body.image;
  }
  // Update restaurant profile
  // generate token if restaurant changed password
  if ("password" in req.body.changes) {
    const salt = await bcrypt.genSalt(10);

    req.body.changes.password = await bcrypt.hash(
      req.body.changes.password,
      salt
    );

    restaurant.set(req.body.changes);

    await restaurant.save();

    const token = restaurant.generateAuthToken();
    res.header("x-auth-token", token).send(restaurant);
  } else {
    restaurant.set(req.body.changes);

    await restaurant.save();
    res.send(restaurant);
  }
};

exports.deleteRestaurantProfile = async (req, res) => {
  // Check for id in query
  const { restaurantId } = req.query;
  if (!restaurantId) return res.status(100).send("restaurant id not provided");

  // Check and Delete restaurant
  let restaurant = await Restaurant.findByIdAndDelete(restaurantId);
  if (!restaurant) return res.status(400).send("restaurant not found");

  res.send({ restaurantDeleted: restaurant });
};

//validating schema for registering user
function validateUserProfile(body) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    email: Joi.string().min(5).max(255).required().email(),
    changes: Joi.object().required(),
    image: Joi.array(),
  });

  return schema.validate(body, { abortEarly: false });
}

//validating schema for registering restaurant
function validateRestaurantProfile(body) {
  const schema = Joi.object({
    restaurantId: Joi.objectId().required(),
    email: Joi.string().min(5).max(255).required().email(),
    changes: Joi.object().required(),
    image: Joi.array()
  });

  return schema.validate(body, { abortEarly: false });
}
