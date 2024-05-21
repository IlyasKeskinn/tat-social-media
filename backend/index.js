const express = require("express");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cors);


app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
