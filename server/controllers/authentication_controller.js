const Joi = require("joi");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { Restaurant } = require("../models/restaurant_model");
const { User } = require("../models/user_model");

exports.restaurantLogin = async (req, res) => {
  //validate the properties of restaurant logging in
  const { error } = validateRestaurant(req.body);
  if (error)
    return res.status(400).json({
      errorMessage: error.details.map((errorObject) => errorObject.message),
    });

  //authenticating restaurant
  let restaurant = await Restaurant.findOne({ email: req.body.email });
  if (!restaurant) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(
    req.body.password,
    restaurant.password
  );
  if (!validPassword) return res.status(400).send("Invalid email or password");

  //Generating jwt token for restaurant
  const token = restaurant.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(restaurant, ["_id", "name", "address", "email", "profilePicture", "phoneNumber","description"]));
};

exports.userLogin = async (req, res) => {
  //validate the properties of user logging in
  const { error } = validateUser(req.body);
  if (error)
    return res.status(400).send({
      errorMessage: error.details.map((errorObject) => errorObject.message),
    });

  //authenticating user
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  //Generating jwt token for user
  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(
      _.pick(user, [
        "_id",
        "username",
        "email",
        "phoneNumber",
        "profilePicture"
      ])
    );
};

function validateRestaurant(restaurant) {
  //restaurant properties validation schema
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(restaurant, { abortEarly: false });
}

function validateUser(user) {
  //user properties validation schema
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user, { abortEarly: false });
}
