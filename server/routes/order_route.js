const express = require("express");
const router = express.Router();

const { orderFood, getOrders, verifyOrder, getOrdersUser, getAllUserOrders } = require("../controllers/order_controller");

const {
  isUserAuthorized,
  isRestaurantAuthorized,
} = require("../middleware/authorization_middleware");

router.route("/order").post(isUserAuthorized, orderFood);
router.route("/order/getorders").get(isUserAuthorized, getOrdersUser)
router.route("/orders").get(isRestaurantAuthorized, getOrders);
router.route("/orders/delivered").post(isUserAuthorized, verifyOrder);
router.route("/orders/history").get(isUserAuthorized, getAllUserOrders);
module.exports = router;
