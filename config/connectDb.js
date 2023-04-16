const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Database connected! ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDatabase;
