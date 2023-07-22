const express = require("express");
const router = express.Router();

const { isUserAuthorized } = require("../middleware/authorization_middleware");
const { userLogin } = require("../controllers/authentication_controller");

const {
  registerUser,
  getCurrentUser,
} = require("../controllers/registration_controller");

const {
  getARestaurantsMenusToUser,
  getAllRestaurantsForUser,
} = require("../controllers/restaurant_controller");

router.route("/users/login").post(userLogin);
router.route("/register").post(registerUser);
router.use("/me", isUserAuthorized).route("/me").get(getCurrentUser);

router
  .route("/restaurants/getAllRestaurants")
  .get(isUserAuthorized, getAllRestaurantsForUser);

router
  .route("/restaurants/getArestaurantMenus")
  .get(isUserAuthorized, getARestaurantsMenusToUser);

module.exports = router;
