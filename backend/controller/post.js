require("express-async-errors");
const mongoose = require("mongoose");
const { User } = require("../models/user");
const { Post } = require("../models/post");
const cloudinary = require("cloudinary");
const { Notification } = require("../models/notification");


// post start
const getPostById = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  const currentUserId = req.user._id;

  if (!post) {
    return res.status(404).json({ error: " Post not found!" });
  }

  const postOwnerId = post.postedBy;
  const user = await User.findById(postOwnerId);


  const currentUser = await User.findById(currentUserId);

  if (user._id.toString() === currentUserId.toString()) {
    return res.status(200).json(post);
  }

  if (currentUser.blockedBy.includes(user._id)) {
    return res.status(403).json({ error: `You are blocked by ${user.userName}.` });
  }

  if (currentUser.blockedUsers.includes(user._id)) {
    return res.status(403).json({ error: `You have blocked ${user.userName}.` });
  }

  if (user.privateProfile && !user.followers.includes(currentUserId)) {
    return res.status(403).json({ error: "This profile is private." });
  }


  res.status(200).json(post);
};

const getUserPost = async (req, res) => {
  const { query } = req.params;
  const currentUserId = req.user._id;

  let user;
  if (mongoose.Types.ObjectId.isValid(query)) {
    user = await User.findOne({ _id: query })
      .select("-password")
      .select("-updateAt");
  } else {
    user = await User.findOne({ userName: query })
      .select("-password")
      .select("updateAt");
  }

  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  const currentUser = await User.findById(currentUserId);
  const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 });

  if (user._id.toString() === currentUserId.toString()) {
    return res.status(200).json({ status: "self ", posts: posts });
  }

  if (currentUser.blockedBy.includes(user._id)) {
    return res.status(200).json({
      status: "blocked",
      error: `You are blocked by ${user.userName}.`,
      posts: [],
    });
  }

  if (currentUser.blockedUsers.includes(user._id)) {
    return res.status(200).json({
      status: "blocked",
      error: `You have blocked ${user.userName}.`,
      posts: [],
    });
  }

  if (user.privateProfile && !user.followers.includes(currentUserId)) {
    return res.status(200).json({
      status: "private",
      error: "This profile is private.",
      posts: [],
    });
  }

  return res.status(200).json({
    status: "public",
    posts: posts,
  });

};

const getFeedPosts = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query; // Default page to 1 and limit to 10

  const currentUser = await User.findById(userId);

  if (!currentUser) {
    return res.status(403).json({ error: "Unauthorized!" });
  }

  const followingUsers = currentUser.following;

  const skip = (page - 1) * limit;
  const feedPosts = await Post.find({ postedBy: { $in: followingUsers } })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  res.status(200).json(feedPosts);
};

const createPost = async (req, res) => {
  const { postedBy, text, tatmoji } = req.body;
  let { images } = req.body;
  const signUser = req.user;
  if (!postedBy) {
    return res.status(400).json({ error: "UserId is required!" });
  }

  const user = await User.findById(postedBy);
  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  if (user._id.toString() !== signUser._id.toString()) {
    return res.status(401).json({ error: "Unauthorized to create post!" });
  }

  if (!tatmoji) {
    return res.status(400).json({ error: "Tatmoji is required!" });
  }

  if (!images) {
    return res.status(400).json({ error: "Image is required!" });
  }
  const SECURE_URL = (await cloudinary.v2.uploader.upload(images)).secure_url;
  images = [SECURE_URL];
  const newPost = await Post({ postedBy, text, tatmoji, images });
  await newPost.save();

  res.status(201).json(newPost);
};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  if (!postId) {
    return res.status(400).json({ error: "Post is required" });
  }
  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found!" });
  }

  if (post.postedBy.toString() !== req.user._id.toString()) {
    returnres.status(401).json({ error: "Unauthorized to delete this post!" });
  }
  const postImage = post.images[0];

  await Post.findOneAndDelete({ _id: postId });

  cloudinary.v2.uploader.destroy(postImage.split("/").pop().split(".")[0]);

  res.status(200).json({ messeage: "Post successfully deleted!" });
};

const likeUnlikePost = async (req, res) => {
  const postId = req.params.id;

  const userId = req.user._id;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(400).json({ error: "Post not found!" });
  }
  const user = await User.findById(userId);

  if (!user) {
    return res.status(403).json({ error: "Unauthorized!" });
  }

  const isLiked = post.likes.includes(userId);

  if (isLiked) {
    await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
    res.status(200).json({ messeage: "Post unliked successfully." });
  } else {
    post.likes.push(userId);
    await post.save();

    if (post.postedBy.toString() !== userId.toString()) {
      const newNotification = new Notification({
        sender: userId,
        receiver: post.postedBy,
        relatedPost: postId,
        type: "like"
      });

      await newNotification.save();

    }
    res.status(200).json({ messeage: "Post liked succesfully." });
  }
};

const updatePost = async (req, res) => { };

//post end

//comnent start
const postComment = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ error: "Text is required!" });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found!" });
  }

  const comment = {
    commentBy: userId,
    comment: text,
  };

  post.comments.push(comment);

  await post.save();

  const createdComment = post.comments[post.comments.length - 1];

  if (post.postedBy.toString() !== userId.toString()) {
    const newNotification = new Notification({
      sender: userId,
      receiver: post.postedBy,
      relatedPost: postId,
      comment: createdComment._id,
      type: "comment"
    });

    await newNotification.save();

  }
  res.status(201).json(createdComment);
};

const likeUnlikeComment = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const userId = req.user._id;


  if (!userId) {
    return res.status(403).json({ error: "Unauthorized!" });
  }
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found!" });
  }
  const comment = post.comments.id(commentId);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found!" });
  }
  const isLiked = comment.likes.includes(userId);
  if (isLiked) {
    comment.likes.pull(userId);
    await post.save();
    res.status(200).json({ messeage: "Comment unliked successfully." });
  } else {
    comment.likes.push(userId);
    await post.save();
    res.status(200).json({ messeage: "Comment liked successfully." });
  }
};
const deleteComment = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const userId = req.user._id;

  if (!postId) {
    return res.status(400).json({ error: "Post id is required!" });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found!" });
  }

  const comment = post.comments.id(commentId);

  if (!comment) {
    return res.status(404).json({ error: "Comment not found!" });
  }

  if (
    post.postedBy.toString() !== userId.toString() &&
    comment.commentBy.toString() !== userId.toString()
  ) {

    return res.status(401).json({ error: "Unauthorized to delete this comment!" });
  }

  post.comments.pull(commentId);
  await post.save();

  res.status(200).json({ message: "Comment deleted successfully." });
};

const updateComment = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const userId = req.user._id;
  const text = req.body.text;

  if (!userId) {
    return res.status(403).json({ error: "Unauthorized!" });
  }

  if (!text) {
    return res.status(400).json({ error: "Text is required!" });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found!" });
  }

  const comment = post.comments.id(commentId);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found!" });
  }

  if (comment.commentBy.toString() !== userId.toString()) {
    return res.status(401).json({ error: "Unauthorized to update this comment!" });
  }

  comment.comment = text;

  await post.save();

  res.status(200).json(comment);
};

const getCommentsByPostId = async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findById(postId)
    .populate({
      path: "comments",
      populate: {
        path: "replies.user",
        select: "userName fullName profilePic",
      },
    })
    .populate("comments.commentBy", "userName fullName profilePic");

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  const comments = post.comments;

  res.status(200).json(comments);
};
//comnet end


// reply start
const getRepliesByCommentId = async (req, res) => {
  const commentId = req.params.commentId;

  const post = await Post.findOne({ "comments._id": commentId }).populate({
    path: "comments.replies.replyBy",
    select: "userName fullName profilePic",
  });
  if (!post) {
    return res.status(404).json({ error: "Comment not found" });
  }
  // Find the specific comment and its replies
  const comment = post.comments.id(commentId);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  // Return the replies
  res.status(200).json(comment.replies);
};

const addReplyToComment = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const userId = req.user._id;
  const text = req.body.text;

  if (!postId || !commentId) {
    return res.status(400).json({ error: "Both postId and commentId are required" });
  }

  if (!text) {
    return res.status(400).json("Reply area is required");
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found!" });
  }

  const comment = post.comments.id(commentId);


  if (!comment) {
    return res.status(404).json({ error: "Comment not found!" });
  }

  const reply = {
    replyBy: userId,
    reply: text,
  };

  comment.replies.push(reply);
  await post.save();

  const createdReply = comment.replies[comment.replies.length - 1];
  res.status(201).json(createdReply);


}

const deleteReply = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const replyId = req.params.replyId;
  const userId = req.user._id;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found!" });
  }

  const comment = post.comments.id(commentId);

  if (!comment) {
    return res.status(404).json({ error: "Comment not found!" });
  }

  const reply = comment.replies.id(replyId);

  if (!reply) {
    return res.status(404).json({ error: "Reply not found!" });
  }

  if (
    post.postedBy.toString() !== userId.toString() && reply.replyBy.toString() !== userId.toString()) {
    return res.status(401).json({ error: "Unauthorized to delete this reply!" });
  }

  comment.replies.pull(replyId);

  await post.save();

  res.status(200).json({ message: "Reply deleted successfully." });
}

const updateReply = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const replyId = req.params.replyId;
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ error: "Reply area is required" });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found!" });
  }

  const comment = post.comments.id(commentId);

  if (!comment) {
    return res.status(404).json({ error: "Comment not found!" });
  }

  const reply = comment.replies.id(replyId);

  if (!reply) {
    return res.status(404).json({ error: "Reply not found!" });
  }

  if (reply.replyBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({ error: "Unauthorized to update this reply!" });
  }

  reply.reply = text;

  await post.save();

  res.status(200).json(reply);
}

const replyLikeUnlike = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const replyId = req.params.replyId;
  const userId = req.user._id;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found!" });
  }

  const comment = post.comments.id(commentId);

  if (!comment) {
    return res.status(404).json({ error: "Comment not found!" });
  }

  const reply = comment.replies.id(replyId);

  if (!reply) {
    return res.status(404).json({ error: "Reply not found!" });
  }

  if (reply.likes.includes(userId)) {
    reply.likes = reply.likes.filter((id) => id.toString() !== userId.toString());
  } else {
    reply.likes.push(userId);
  }

  await post.save();

  res.status(200).json(reply);
}

// reply end

module.exports = {
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
  replyLikeUnlike
};
