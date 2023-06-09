const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = require("./config/connectDb");
connectDb();

const port = process.env.PORT || 6001;

// Routes
const homeRoute = require("./routes/homeRoute");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const errorHandler = require("./middlewares/errorMiddleware");

// Initialize express application
const app = express();

app.use(express.json());

app.use("/", homeRoute);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
