const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");

const signUpController = asyncHandler(async (req, res, next) => {
  const { firstName, email } = req.body;

  if (!firstName || !email) {
    res.status(400);
    return next(new Error("All fields are required!"));
  }

  const userAvailable = await UserModel.findOne({ email: email });

  if (userAvailable) {
    res.status(400);
    return next(new Error("User already registered!"));
  }

  const user = await UserModel.create({ firstName, email });
  console.log(user);

  res.json({
    success: true,
    message: "User created in the database",
  });
});

const loginController = asyncHandler(async (req, res, next) => {
  res.json({
    success: true,
    message: "User logged in!",
  });
});

const logoutController = asyncHandler(async (req, res, next) => {
  res.json({
    success: true,
    message: "User logged out!",
  });
});

module.exports = { signUpController, loginController, logoutController };
