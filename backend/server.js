const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const app = express();
const userRouter = require("./routes/userRoutes");
const itemRouter = require("./routes/itemRoutes");
const orderRouter = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
dotenv.config();
connectDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/orders", orderRouter);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
