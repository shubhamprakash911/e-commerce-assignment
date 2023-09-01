const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "seller"], default: "user" },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
