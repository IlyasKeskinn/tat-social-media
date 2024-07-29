const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies.io;

    if (!token || token === undefined) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      console.log(`Error in isAuth middlewares : ${error.message}`);
    }
  }
};
