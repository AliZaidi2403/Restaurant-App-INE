const asyncHandler = require("express-async-handler");
const Order = require("../models/order");
const createOrder = asyncHandler(async (req, res) => {
  const { items, amount, address, phoneNumber } = req.body;
  const userId = req.user._id;
  const newOrder = await Order.create({
    items,
    userId,
    amount,
    address,
    phoneNumber,
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
  const order = await Order.find({ userId: id }).populate("userId").populate({
    path: "items.item",
    model: "Item",
  });
  if (!order) {
    throw new Error("No order exists with this user Id");
  }
  res.status(200).json({
    order,
  });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("userId").populate({
    path: "items.item",
    model: "Item",
  });
  if (!orders) {
    throw new Error("Error while fetching orders");
  }
  res.status(200).json({
    orders,
  });
});

const updateOrder = asyncHandler(async (req, res) => {
  console.log("Hello");
  const item = await Order.findById(req.params.id);
  console.log(item);
  item.status = true;
  console.log(item);
  await item.save();
  const updatedOrder = await Order.findById(req.params.id)
    .populate("userId")
    .populate({
      path: "items.item",
      model: "Item",
    });
  console.log(updateOrder);
  res.status(200).json({
    order: updatedOrder,
  });
});
module.exports = { createOrder, getAllOrders, getOrders, updateOrder };
