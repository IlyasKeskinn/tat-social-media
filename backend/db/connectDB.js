const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectMongoDB = async () => {
  try {
    mongoose.connect(MONGO_URI);
    console.log("Succesful connect to mongoDb");
  } catch (error) {
    console.log(`Could not connect to mnngoDB : ${error}`);
  }
};

module.exports = connectMongoDB;
