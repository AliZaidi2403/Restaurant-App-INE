const asyncHandler = require("express-async-handler");
const Order = require("../models/order");
const createOrder = asyncHandler(async (req, res) => {
  const { itemIds, amount, address } = req.body;
  const userId = req.user._id;
  const newOrder = await Order.create({
    items: itemIds,
    userId,
    amount,
    address,
  });
  if (!newOrder) {
    throw new Error("Error while creating order");
  }
  res.status(201).json({
    newOrder,
  });
});

//order from specific user
const getOrders = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.find({ userId: id })
    .populate("userId")
    .populate("items");
  if (!order) {
    throw new Error("No order exists with this user Id");
  }
  res.status(200).json({
    order,
  });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  if (!orders) {
    throw new Error("Error while fetching orders");
  }
  res.status(200).json({
    orders,
  });
});

module.exports = { createOrder, getAllOrders, getOrders };
