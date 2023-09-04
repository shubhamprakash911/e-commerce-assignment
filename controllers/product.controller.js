const productModel = require("../models/product.model");

async function addProduct(req, res, next) {
  try {
    const { price, title, categoryId, availability } = req.body;
    const product = new productModel({
      title,
      price,
      category: categoryId,
      availability,
    });
    await product.save();
    res.status(200).json({ msg: "product added successful", data: product });
  } catch (error) {
    next(error);
  }
}

async function getAllProducts(req, res, next) {
  try {
    const products = await productModel.find();
    res
      .status(200)
      .json({ msg: "Successfully get all products", data: products });
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const product = await productModel.find({ _id: req.params.id });
    res.status(200).json({ msg: "Successfully get a product", data: product });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllProducts, addProduct, getProduct };
