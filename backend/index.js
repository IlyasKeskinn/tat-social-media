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
  origin: process.env.FRONTEND_SERVER || "http://localhost:5173",
  credentials: true,
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//custom middlewares
const errorMiddlewares = require("./middlewares/erros.js");

//routes import
const userRoute = require("./routes/user.js");
const postRoute = require("./routes/post.js");
const bookmarksRoute = require("./routes/bookmarks.js");
const followRequest = require("./routes/followRequest.js");
const profilePrivacy = require("./routes/profilePrivacy.js");
const notificationsRoute = require("./routes/notifications.js")

//routes
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/bookmarks", bookmarksRoute);
app.use("/api/followRequest", followRequest);
app.use("/api/profilePrivacy", profilePrivacy);
app.use("/api/notifications/", notificationsRoute);

app.use(errorMiddlewares);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
