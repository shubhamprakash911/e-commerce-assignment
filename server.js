const express = require("express");
const connectionDb = require("./config/db");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const app = express();

app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome e-commerce backend" });
  } catch (error) {
    console.log(error.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await connectionDb;
    console.log("DB connected to server");
    console.log("server is runnig at port ", PORT);
  } catch (error) {
    next(error);
  }
});
