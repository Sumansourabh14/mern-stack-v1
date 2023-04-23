const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");

const getUsers = async (req, res) => {
  const users = await UserModel.find();

  res.json({ success: true, users, totalUsers: users.length });
};

const getCurrentUser = asyncHandler(async (req, res) => {
  // get the user info (req.user) from the isAuthenticated (validate token) middleware
  res.json(req.user);
});

const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  //   if (id.match(/^[0-9a-fA-F]{24}$/)) {
  //     // Yes, it's a valid ObjectId, proceed with `findById` call.
  //   }

  const findUser = await UserModel.findById(id);

  if (!findUser) {
    console.log("okay");
    res.status(400);
    return next(new Error("User not found"));
  }

  const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

  res.json({
    success: true,
    message: "User updated!",
    user,
  });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);

  if (!user) {
    res.status(404);
    return next(new Error("User not found"));
  }

  const deletedUser = await UserModel.findByIdAndRemove(id);

  res.json({
    success: true,
    message: "User deleted!",
    deletedUser,
  });
});

module.exports = { getUsers, getCurrentUser, updateUser, deleteUser };
