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
  likeUnlikeComment,
  deleteComment,
  updateComment,
  getCommentsByPostId,
  commentReply,
  getRepliesByCommentId,
} = require("../controller/post");

router.get("/getPost/:id", getPostById);
router.get("/getuserPost/:query", getUserPost);
router.get("/feedPosts", isAuth, getFeedPosts);
router.get("/getcomments/:id", getCommentsByPostId);
router.get("/getreplies/:id", getRepliesByCommentId);

router.put("/likeUnlikePost/:id", isAuth, likeUnlikePost);
router.put("/likeUnlikeComment/:id/:commentId", isAuth, likeUnlikeComment);
router.put("/makecomment/:id", isAuth, postComment);
router.put("/deletecomment/:id/:commentId", isAuth, deleteComment);
router.put("/updatecomment/:id/:commentId", isAuth, updateComment);
router.put("/:id/comments/:commentId", isAuth, commentReply);

router.post("/createpost", isAuth, createPost);
router.delete("/deletepost/:id", isAuth, deletePost);

module.exports = router;
