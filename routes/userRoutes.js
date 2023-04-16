const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const UserModel = require("../models/UserModel");

router.get("/get-users", userController.getUsers);

router.put("/update-user/:id", userController.updateUser);

router.delete("/delete-user/:id", userController.deleteUser);

module.exports = router;
