const express = require("express");
const {
  addCategory,
  getCategories,
} = require("../controllers/category.controller");

const categoryRoute = express.Router();

categoryRoute.post("/", addCategory);
categoryRoute.get("/", getCategories);

module.exports = categoryRoute;
