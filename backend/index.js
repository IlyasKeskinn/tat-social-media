const express = require("express");
const dotenv = require("dotenv");
const connectMongoDB = require("./db/connectDB.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

const app = express();

dotenv.config();
connectMongoDB();

//cloudinary config
const cloudinary = require("./config/cloudinaryConfig.js");



const corsOptions = {
  // origin: process.env.FRONTEND_SERVER,
  origin : "http://localhost:5173",
  credentials: true, 
};


//middlewares
app.use(express.json({limit : "20mb"}));
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cors(corsOptions));
app.use(cookieParser());

//custom middlewares
const errorMiddlewares = require("./middlewares/erros.js");

//routes import
const userRoute = require("./routes/user.js");
const postRoute = require("./routes/post.js");

//routes
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use(errorMiddlewares);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
