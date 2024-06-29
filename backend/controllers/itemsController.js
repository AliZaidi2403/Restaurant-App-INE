const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");

const restrictTo = asyncHandler(async (req, res, next) => {
  const user = await req.user;
  const { role } = user;
  if (role === "admin") {
    next();
  }
  throw new Error("You are not allowed to visit this path");
});

const getItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await Item.findById(id);
  if (!id) {
    throw new Error("No items exist with this id");
  }
  res.status(200).json({
    item,
  });
});

const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  if (!items) {
    throw new Error("Error while fetching items");
  }
  res.status(200).json({
    items,
  });
});

const createItem = asyncHandler(async (req, res) => {
  const newItem = await Item.create(req.body);
  if (!newItem) {
    throw new Error("Error while creating item");
  }
  res.status(201).json({
    item: newItem,
  });
});

const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    throw new Error("No item found with that Id");
  }

  res.status(200).json({
    item,
  });
});

const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);

  if (!item) {
    throw new Error("No item exists with that id");
  }

  res.status(204).json({
    item: null,
  });
});

module.exports = {
  getAllItems,
  getItem,
  updateItem,
  createItem,
  deleteItem,
  restrictTo,
};
