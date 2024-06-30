const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authmiddleware");
const { restrictTo } = require("../controllers/itemsController");
const {
  createOrder,
  getAllOrders,
  getOrders,
  updateOrder,
} = require("../controllers/orderController");
router.get("/", protect, restrictTo, getAllOrders);
router.get("/user/:id", protect, getOrders);
router.post("/", protect, createOrder);
router.patch("/:id", protect, restrictTo, updateOrder);

module.exports = router;
