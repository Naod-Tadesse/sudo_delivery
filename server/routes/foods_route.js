const express = require("express");
const router = express.Router();

const { parse } = require("../middleware/imageParser_middleware");
const { upload } = require("../middleware/imageUpload_middleware");
const { commentFoodUser } = require("../controllers/comments_controller");
const { storageSetup } = require("../middleware/storageSetupMiddleware");
const {
  isRestaurantAuthorized,
  isUserAuthorized,
} = require("../middleware/authorization_middleware");

const {
  storeFood,
  editFood,
  deleteFood,
  getUserFoods,
  getMenusForRestaurant,
} = require("../controllers/food_controller");

router.route("/user/foods/getFoods").get(isUserAuthorized, getUserFoods);
router.route("/user/foods/commentFood").post(isUserAuthorized, commentFoodUser);

router
  .route("/restaurants/foods/storeFood")
  .post(
    isRestaurantAuthorized,
    upload.array("images"),
    parse,
    storeFood
  );

router
  .route("/restaurants/foods/getFoods")
  .get(isRestaurantAuthorized, getMenusForRestaurant);

router
  .route("/restaurants/foods/editFood")
  .put(
    isRestaurantAuthorized,
    upload.array("images", 15),
    parse,
    editFood
  );

router
  .route("/restaurants/foods/removeFood")
  .delete(isRestaurantAuthorized, deleteFood);

module.exports = router;
