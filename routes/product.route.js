const express = require("express");
const {
  getAllProducts,
  getProduct,
  addProduct,
} = require("../controllers/product.controller");
const { authenticate } = require("../middlewares/authentication.middleware");
const authorize = require("../middlewares/authorization.middleware");

const productRoute = express.Router();

productRoute.post("/", authenticate, authorize("admin"), addProduct);
productRoute.get("/", getAllProducts);
productRoute.get("/:id", getProduct);

module.exports = productRoute;
