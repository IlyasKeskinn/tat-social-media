const express = require("express");

const router = express.Router();

const isAuth = require("../middlewares/isAuth");

const {
  createCollection,
  postBookmark,
} = require("../controller/bookmarksCollection");

router.post("/createCollection", isAuth, createCollection);
router.post("/postBookmark/:id", isAuth, postBookmark);


module.exports = router;
