const express = require("express");
const router = express.Router();

const { restaurantLogin } = require("../controllers/authentication_controller");

const {
  isRestaurantAuthorized,
} = require("../middleware/authorization_middleware");

const {
  registerRestaurant,
  getCurrentRestaurant,
} = require("../controllers/registration_controller");

router.route("/restaurants/login").post(restaurantLogin);
router.route("/me").get(isRestaurantAuthorized, getCurrentRestaurant);
router.route("/register").post(registerRestaurant);

module.exports = router;
