const categoryModel = require("../models/category.model");

async function addCategory(req, res, next) {
  try {
    // check if category is already available
    const isPresent = await categoryModel.find({ name: req.body.name });
    if (isPresent.length < 1) {
      const category = new categoryModel(req.body);
      await category.save();
      res.status(200).json({ msg: "category added successful" });
    } else {
      throw new Error("category already register");
    }
  } catch (error) {
    next(error);
  }
}

async function getCategories(req, res, next) {
  try {
    const categories = categoryModel.find({});
    res
      .status(200)
      .json({ msg: "Successfully get all categories", data: categories });
  } catch (error) {
    next(error);
  }
}

module.exports = { getCategories, addCategory };
