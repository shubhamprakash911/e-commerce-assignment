const express = require("express");
const {
  getAllProducts,
  getProduct,
  addProduct,
} = require("../controllers/product.controller");

const productRoute = express.Router();

productRoute.post("/", addProduct);
productRoute.get("/", getAllProducts);
productRoute.get("/:id", getProduct);
