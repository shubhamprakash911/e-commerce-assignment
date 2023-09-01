const express = require("express");
const {
  userRegistration,
  userLogin,
} = require("../controllers/user.controller");

const userRoute = express.Router();

userRoute.post("/register", userRegistration);
userRoute.post("/login", userLogin);

module.exports = { userRoute };
