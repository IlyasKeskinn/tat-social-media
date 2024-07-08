require("express-async-errors");
const mongoose = require("mongoose");
const { User } = require("../modules/user");
const { Post } = require("../modules/post");

const getPostById = async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: " Post not found!" });
  }

  res.json(post);
};

const getUserPost = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ userName: username });

  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  const posts = await Post.find({ postedBy: user._id }).sort({ createtAt: -1 });
  res.json(posts);
};

const getFeedPosts = async (req, res) => {
  const userId = req.user._id;

  const currentUser = await User.find(userId);

  if (!currentUser) {
    return res.status(403).json({ error: "Unauthorized!" });
  }

  const followingUsers = currentUser.following;

  const feedPosts = await Post.find({ postedBy: { $in: followingUsers } }).sort(
    { createdAt: -1 }
  );

  res.status(200).json(feedPosts);
};

const createPost = async (req, res) => {
  const { postedBy, text, tatmoji } = req.body;
  let images = req.body;
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

  if (!text || !tatmoji) {
    return res.status(400).json({ error: "Text and tatmoji is required!" });
  }

  if (!images) {
    return res.status(400).json({ error: "Image is required!" });
  }

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

  await Post.findByIdAndDelete(postId);
  res.json({ messeage: "Post is successfully deleted!" });
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

const postComment = async (req, res) => {
  const postId = req.params.id;
  const { text } = req.body;
  const userId = req.user._id;
  const profilePic = req.user.profilePic;
  const username = req.user.username;

  if (!text) {
    return res.status(400).json({ error: "Text is required!" });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found!" });
  }

  const comment = {
    userId: userId,
    comment: text,
    profilePic: profilePic,
    username: username,
  };

  post.comments.push(comment);

  await post.save();

  res.status(201).json(comment);
};

const updatePost = async (req, res) => {};

module.exports = {
  getPostById,
  getUserPost,
  getFeedPosts,
  createPost,
  deletePost,
  likeUnlikePost,
  postComment,
};
