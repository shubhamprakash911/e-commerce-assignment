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

      const userDetail = UserModel.find({ _id: decoded.userId });
      req.body.role = userDetail[0].role;

      next();
    } else {
      res.status(401).json({
        status: false,
        msg: "error in the token",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: "error while authentication" });
  }
};

module.exports = { authenticate };
