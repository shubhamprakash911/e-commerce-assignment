const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      req.body.userId = decoded.userId;
      req.body.role = decoded.role;

      next();
    } else {
      throw new Error("error in token");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate };
