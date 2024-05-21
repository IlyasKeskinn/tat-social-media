const express = require("express");
const dotenv = require("dotenv");
const connectMongoDB = require("./db/connectDB.js");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();

dotenv.config();
connectMongoDB();

//middlewares
app.use(express.json());
app.use(cors);
const errorMiddlewares = require("./middlewares/erros.js");

//routes
app.use(errorMiddlewares);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
