const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
  },
  { versionKey: false }
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
