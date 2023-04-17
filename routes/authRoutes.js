const express = require("express");
const router = express.Router();

const {
  signUpController,
  loginController,
  logoutController,
} = require("../controllers/authController");

router.post("/sign-up", signUpController);

router.post("/login", loginController);

router.post("/logout", logoutController);

module.exports = router;
