const express = require("express");
const {
  authUser,
  registerUser,
  updatePassword,
  deleteUser,
} = require("../controllers/userController");
const protect = require("./../middlewares/authmiddleware");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", authUser);

router.patch("/updatePassword", protect, updatePassword);
router.delete("/delete", protect, deleteUser);
module.exports = router;
