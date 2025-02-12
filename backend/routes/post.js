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
  getRepliesByCommentId,
  addReplyToComment,
  updateReply,
  deleteReply,
  replyLikeUnlike,
} = require("../controller/post");



//post
router.get("/getPost/:id",isAuth , getPostById);
router.get("/getuserPost/:query", isAuth, getUserPost);
router.get("/feedPosts", isAuth, getFeedPosts);

router.put("/likeUnlikePost/:id", isAuth, likeUnlikePost);

router.post("/createpost", isAuth, createPost);

router.delete("/deletepost/:id", isAuth, deletePost);


//comments
router.get("/getcomments/:id", getCommentsByPostId);
router.put("/likeUnlikeComment/:id/:commentId", isAuth, likeUnlikeComment);
router.put("/makecomment/:id", isAuth, postComment);
router.put("/deletecomment/:id/:commentId", isAuth, deleteComment);
router.put("/updatecomment/:id/:commentId", isAuth, updateComment);


//replies
router.get("/getreplies/:commentId", getRepliesByCommentId);
router.put("/addreply/:id/:commentId", isAuth, addReplyToComment);
router.put("/deletereply/:id/:commentId/:replyId", isAuth, deleteReply);
router.put("/updatereply/:id/:commentId/:replyId", isAuth, updateReply);
router.put("/replylikeunlike/:id/:commentId/:replyId", isAuth, replyLikeUnlike);




module.exports = router;
