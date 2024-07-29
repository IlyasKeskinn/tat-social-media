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
  getCommentsByPostId,
  postReply,
  getRepliesByCommentId,
} = require("../controller/post");

router.get("/getPost/:id", getPostById);
router.get("/getuserPost/:query", getUserPost);
router.get("/feedPosts", isAuth, getFeedPosts);
router.get("/getcomments/:id", getCommentsByPostId);
router.get("/getreplies/:id", getRepliesByCommentId);

router.put("/likeUnlikePost/:id", isAuth, likeUnlikePost);
router.put("/makecomment/:id", isAuth, postComment);
router.put("/:id/comments/:commentId", isAuth, postReply);

router.post("/createpost", isAuth, createPost);
router.delete("/deletepost/:id", isAuth, deletePost);

module.exports = router;
