const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

async function userRegistration(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await UserModel.find({ email });

    if (user.length === 0) {
      const hashPassword = bcrypt.hashSync(password, +process.env.SALT_ROUND);
      const newUser = new UserModel({
        username,
        email,
        password: hashPassword,
      });
      await newUser.save();
      res.status(200).json({
        status: true,
        msg: "User register successfully",
      });
    } else {
      return new Error("Email-Id already exists");
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user[0]._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
          );
          res.status(200).json({
            status: true,
            token,
            msg: "Login successful",
            username: user[0].username,
          });
        } else {
          return new Error("Wrong Credentails");
        }
      });
    } else {
      return new Error("Wrong Credentails");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { userRegistration, userLogin };
