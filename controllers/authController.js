const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");

const signUpController = asyncHandler(async (req, res, next) => {
  const { firstName, email } = req.body;

  console.log(req.body);

  if (!firstName || !email) {
    res.status(400);
    return next(new Error("All fields are required!"));
  } else {
    const user = await UserModel.create({ firstName, email });
    console.log(user);

    res.json({
      success: true,
      message: "User created in the database",
    });
  }
});

module.exports = { signUpController };
