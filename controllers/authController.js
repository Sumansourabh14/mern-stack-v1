const UserModel = require("../models/UserModel");

const signUpController = async (req, res) => {
  const { firstName, email } = req.body;

  console.log(req.body);

  if (!firstName || !email) {
    res.status(400);
    throw new Error("All fields are required!");
  } else {
    const user = await UserModel.create({ firstName, email });
    console.log(user);

    res.send("User created!");
  }
};

module.exports = { signUpController };
