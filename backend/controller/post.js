require("express-async-errors");
const mongoose = require("mongoose");
const { User } = require("../models/user");
const { Post } = require("../models/post");
const cloudinary = require("cloudinary");

const getPostById = async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: " Post not found!" });
  }

  res.status(200).json(post);
};

const getUserPost = async (req, res) => {
  const { query } = req.params;

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

  const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 });
  res.json(posts);
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
    res.status(200).json({ messeage: "Post liked succesfully." });
  }
};

const updatePost = async (req, res) => {};

const postComment = async (req, res) => {
  const postId = req.params.id;
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

  const comment = {
    commentBy: userId,
    comment: text,
  };

  post.comments.push(comment);

  await post.save();

  const createdComment = post.comments[post.comments.length - 1];
  res.status(201).json(createdComment);
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

const postReply = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const user = req.user;
  const text = req.body.text;

  if (!user) {
    return res.status(403).json({ error: "Unauthorized!" });
  }

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

  const reply = {
    replyBy: user._id,
    reply: text,
  };

  comment.replies.push(reply);
  await post.save();

  const createdReply = comment.replies[comment.replies.length - 1];

  res.status(201).json(createdReply);
};

const getRepliesByCommentId = async (req, res) => {
  const commentId = req.params.id;

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
module.exports = {
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
};
