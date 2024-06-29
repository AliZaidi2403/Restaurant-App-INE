const asyncHandler = require("express-async-handler");
const User = require("./../models/userModel");
const generateToken = require("./../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields ");
  }
  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(400);
    throw new Error("User with this email already exits ");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name,
      email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User with this email does not exist");
  } else if (await user.matchPassword(password)) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Incorrect Password");
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.matchPassword(req.body.passwordCurrent, user.password))) {
    throw new Error("Incorrect Password");
  }

  user.password = req.body.password;
  await user.save();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  authUser,
  registerUser,
  updatePassword,
  deleteUser,
};
