const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `Database connected! ${connect.connection.host} | Db Name: ${connect.connection.name}`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDatabase;
