const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: "10d",
  });
  res.cookie("io", token, {
    httpOnly: true,
    maxAge: 10 * 24 * 60 * 60 * 1000,
		sameSite: "None", 
  });

  return token;
};

module.exports = { generateTokenAndCookie };
