const express = require("express");
const {
  userRegistration,
  userLogin,
  logout,
} = require("../controllers/user.controller");

const userRoute = express.Router();

userRoute.post("/register", userRegistration);
userRoute.post("/login", userLogin);
userRoute.get("/logout", logout);

module.exports = { userRoute };
