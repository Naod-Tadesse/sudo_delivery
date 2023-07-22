const jwt = require("jsonwebtoken");
const config = require("config");

exports.isUserAuthorized = function (req, res, next) {
  //this function is used to verify if user authorized to do somthing by verifying token
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("userPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

exports.isRestaurantAuthorized = function (req, res, next) {
  //this function is used to verify if restaurant is  authorized to do somthing by verifying token
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("restaurantPrivateKey"));
    req.restaurant = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

exports.verifyToken = (token) => {
  const decoded = jwt.verify(token, config.get("restaurantPrivateKey"));
  return decoded;
};
