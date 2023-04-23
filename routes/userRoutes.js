const express = require("express");
const router = express.Router();
const {
  getUsers,
  getCurrentUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const UserModel = require("../models/UserModel");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/get-users", getUsers);

router.get("/current-user", isAuthenticated, getCurrentUser);

router.put("/update-user/:id", updateUser);

router.delete("/delete-user/:id", deleteUser);

module.exports = router;
