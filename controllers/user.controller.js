const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

async function userRegistration(req, res, next) {
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
      throw new Error("Email-Id already exists");
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
}

async function userLogin(req, res, next) {
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

          //set token in cookies with 30d expire
          res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
          });

          res.status(200).json({
            status: true,
            msg: "Login successful",
            username: user[0].username,
          });
        } else {
          throw new Error("Wrong Credentails");
        }
      });
    } else {
      throw new Error("Wrong Credentails");
    }
  } catch (error) {
    next(error);
  }
}

function logout(req, res, next) {
  try {
    res.clearCookie("token");
    res.status(200).json({ msg: "successfully logout" });
  } catch (error) {
    next(error);
  }
}

module.exports = { userRegistration, userLogin, logout };
