const express = require("express");
const {
  restrictTo,
  getAllItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
} = require("./../controllers/itemsController");
const protect = require("../middlewares/authmiddleware");
const router = express.Router();

router.get("/", protect, getAllItems);
router
  .route("/:id")
  .get(protect, getItem)
  .post(protect, restrictTo, createItem)
  .patch(protect, restrictTo, updateItem)
  .delete(protect, restrictTo, deleteItem);

module.exports = router;
