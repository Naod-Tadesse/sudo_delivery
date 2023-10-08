const mongoose = require("mongoose");
const { sessionRestaurants } = require("../socket");
const { Food } = require("../models/food_model");
const { User } = require("../models/user_model")
const {
  Order,
  validateOrder,
  validateFoodObject,
} = require("../models/order_model");

exports.orderFood = async (req, res) => {
  // Initiating socket for realtime notification of order
  let connection = require("../socket.js").connection();

  let user = await User.findById(req.user._id);
  if(!user) {
    return res.status(400).send("user does not exist")
  }

  // Check for body's restaurants id and token's restaurant id are equal
  // if (req.body.userId != req.user._id) {
  //   return res.status(400).send("incorrect token");
  // }

  //validating the food properties
  const { error } = validateOrder(req.body);
  if (error)
    return res.status(400).json({
      message: error.details.map((errorObject) => errorObject.message),
    });

  // Validating every single order
  for (let x of req.body.food) {
    const { error } = validateFoodObject(x);
    if (error)
      return res.status(400).json({
        message: error.details.map((errorObject) => errorObject.message),
      });
  }

  // Save order and notify restaurants of order using socket
  for (const singleOrder of req.body.food) {
    const food = await Food.findById(singleOrder.foodId);
    if (!food) return res.status(400).send("food not found");
    let order = new Order({
      food: singleOrder.foodId,
      quantity: singleOrder.quantity,
      restaurant: food.restaurant,
      user: user._id
    });
  
    await order.save();
    if (sessionRestaurants[food.restaurantId]) {
      connection.sendEventToSpecificUser("new order", order);
    }
  }
  
  res.send("order success");
};

exports.getOrders = async (req, res) => {
  // Finds single Restaurants order
  const orders = await Order.find({
    restaurant: req.restaurant._id,
    orderDelivered: false,
  })
    .populate("restaurant","-password")
    .populate("user", "-password")
    .populate("food", "_id name price");

  if (!orders) return res.send("no orders received");

  res.send(orders);
};

exports.verifyOrder = async (req, res) => {
  const {foodId} = req.body
 
  const orderTobeVerified = await Order.findOne({
    food: foodId,
    orderDelivered: false,
    user: req.user._id
  })
  if (!orderTobeVerified){
    console.log("orer", orderTobeVerified) 
    return res.status(400).send("wring order id or no order registerd on database")
}
  orderTobeVerified.set({
    orderDelivered: true
  })
  await orderTobeVerified.save();
  res.status(200).json({message: "successful"})
};

exports.getOrdersUser = async (req, res) => {
  const ordersBySingleUser = await Order.find({
    user: req.user._id,
    orderDelivered: false
  })
    .populate("restaurant","-password")
    .populate("user", "-password")
    .populate("food", "_id name price");
  if (!ordersBySingleUser){
    return res.status(400).send("no orders pending")
}
  
  res.status(200).json({orders: ordersBySingleUser})
};
