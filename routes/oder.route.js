const express = require("express");
const {
  placeOder,
  getOderDetail,
  getOrderHistory,
} = require("../controllers/order.controller");
const { authenticate } = require("../middlewares/authentication.middleware");
const orderRoutes = express.Router();

orderRoutes.post("/", authenticate, placeOder);
orderRoutes.get("/history", authenticate, getOrderHistory);
orderRoutes.get("/detail/:orderId", authenticate, getOderDetail);

module.exports = orderRoutes;
