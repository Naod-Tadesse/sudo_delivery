const express = require("express");
const router = express.Router();

const {
  parse
} = require("../middleware/imageParser_middleware");

const {
  upload
} = require("../middleware/imageUpload_middleware");

const {storageSetup} = require("../middleware/storageSetupMiddleware")

const {
  isUserAuthorized,
  isRestaurantAuthorized,
} = require("../middleware/authorization_middleware");

const {
  editUserProfile,
  editRestaurantProfile,
  deleteRestaurantProfile,
  deleteUserProfile,
} = require("../controllers/profiles_controller");


router
  .route("/user/profile/editProfile")
  .put(isUserAuthorized,upload.array("profilePicture", 15), parse,editUserProfile);

router
  .route("/user/profile/deleteProfile")
  .delete(isUserAuthorized, deleteUserProfile);

router
  .route("/restaurant/profile/editProfile")
  .put(isRestaurantAuthorized,upload.array("profilePicture",15), parse,editRestaurantProfile);

router
  .route("/restaurant/profile/deleteProfile")
  .delete(isRestaurantAuthorized, deleteRestaurantProfile);

module.exports = router;

// storageSetup(type="restaurant"),upload.array("images", 15), parse