const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authmiddleware");
const { restrictTo } = require("../controllers/itemsController");
const {
  createOrder,
  getAllOrders,
  getOrders,
} = require("../controllers/orderController");
router.get("/", protect, restrictTo, getAllOrders);
router.get("/user/:id", protect, getOrders);
router.post("/", protect, createOrder);

module.exports = router;
