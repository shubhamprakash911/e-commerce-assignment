const express = require("express");
const {
  addCategory,
  getCategories,
} = require("../controllers/category.controller");
const { authenticate } = require("../middlewares/authentication.middleware");
const authorize = require("../middlewares/authorization.middleware");

const categoryRoute = express.Router();

categoryRoute.post("/", authenticate, authorize(["admin"]), addCategory);
categoryRoute.get("/", getCategories);

module.exports = categoryRoute;
