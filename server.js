require("dotenv").config();
const express = require("express");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const { connectDB } = require("./config/db");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const productRoute = require("./routes/product.route");
const app = express();

// connection to db
connectDB();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);

app.use(errorHandler);

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome e-commerce backend" });
  } catch (error) {
    console.log(error.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is listing at port ", PORT);
});
