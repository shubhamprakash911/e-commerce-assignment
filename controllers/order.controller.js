const orderModel = require("../models/order.model");

async function placeOder(req, res, next) {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
}

async function getOrderHistory(req, res, next) {
  try {
    const userId = req.body.userId;

    // Find all orders for the specified user
    const orders = await orderModel.find({ userId });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

// Route for fetching order details by order ID
async function getOderDetail(req, res, next) {
  try {
    const orderId = req.params.orderId;

    // Find the order by its ID
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

module.exports = { placeOder, getOrderHistory, getOderDetail };
