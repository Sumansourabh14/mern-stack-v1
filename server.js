const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const port = process.env.PORT || 6001;

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
