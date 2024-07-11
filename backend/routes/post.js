const express = require("express");

const router = express.Router();

const isAuth = require("../middlewares/isAuth");

const {
  getPostById,
  getUserPost,
  getFeedPosts,
  createPost,
  deletePost,
  likeUnlikePost,
  postComment,
} = require("../controller/post");

router.get("/getPost/:id", getPostById);
router.get("/getuserPost/:query", getUserPost);
router.get("/feedPosts", isAuth, getFeedPosts);

router.put("/likeUnlikePost/:id", isAuth, likeUnlikePost);
router.put("/makecomment/:id", isAuth, postComment);

router.post("/createpost", isAuth, createPost);
router.delete("/deletepost/:id", isAuth, deletePost);

module.exports = router;
