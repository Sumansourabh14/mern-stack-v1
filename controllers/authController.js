const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpController = asyncHandler(async (req, res, next) => {
  const { firstName, email, password } = req.body;

  if (!firstName || !email || !password) {
    res.status(400);
    return next(new Error("All fields are required!"));
  }

  const userAvailable = await UserModel.findOne({ email: email });

  if (userAvailable) {
    res.status(400);
    return next(new Error("User already registered!"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log({ hashedPassword });

  const user = await UserModel.create({
    firstName,
    email,
    password: hashedPassword,
  });
  console.log(user);

  if (user) {
    res.status(201).json({ success: true, id: user._id, email: user.email });
  } else {
    res.status(400);
    return next(new Error("User data is not valid"));
  }
});

const loginController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    return next(new Error("All fields are required!"));
  }

  const user = await UserModel.findOne({ email: email });

  // compare password with the hashed password (stored in database)
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          firstName: user.firstName,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );

    res
      .status(200)
      .json({ success: true, accessToken, message: "User logged in!" });
  } else {
    res.status(401);
    return next(new Error("Incorrect email or password"));
  }
});

const logoutController = asyncHandler(async (req, res, next) => {
  res.json({
    success: true,
    message: "User logged out!",
  });
});

module.exports = { signUpController, loginController, logoutController };
