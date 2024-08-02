const express = require("express");

const router = express.Router();

const isAuth = require("../middlewares/isAuth");

const {
  createCollection,
  postBookmark,
  getSavedPost,
} = require("../controller/bookmarksCollection");

router.post("/createCollection", isAuth, createCollection);
router.post("/postBookmark/:id", isAuth, postBookmark);
router.get("/getsavedPost", isAuth, getSavedPost);

module.exports = router;
