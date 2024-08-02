require("express-async-errors");
const { BookmarkCollection } = require("../models/bookmarksCollection");
const { Post } = require("../models/post");
const { User } = require("../models/user");

const createCollection = async (req, res) => {
  const title = req.body.title;
  const userId = req.user._id;

  const currentUser = await User.findById(userId);
  if (!currentUser) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const newCollection = await BookmarkCollection({
    user: currentUser._id,
    title: title,
  });

  await newCollection.save();

  res.status(201).json(newCollection);
};

const postBookmark = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;

  const currentUser = await User.findById(userId);

  if (!currentUser) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  const defaultColleciton = await BookmarkCollection.findOne({
    user: currentUser._id,
    isDefault: true,
  });

  if (!defaultColleciton) {
    return res.status(404).json({ error: "Collection not found!" });
  }
  const isBookmarked = defaultColleciton.bookmarks.includes(postId);

  if (!isBookmarked) {
    defaultColleciton.bookmarks.push(postId);
    await defaultColleciton.save();
    res.status(200).json({ message: "Post bookmarked." });
  } else {
    const index = defaultColleciton.bookmarks.indexOf(postId);
    if (index !== -1) {
      defaultColleciton.bookmarks.splice(index, 1);
      await defaultColleciton.save();
      res.status(200).json({ message: "Post unbookmarked." });
    }
  }
};

const getSavedPost = async (req, res) => {
  const currentUser = req.user;
  const { page = 1, limit = 5 } = req.query; // Default page to 1 and limit to 10
  const skip = (page - 1) * limit;

  const user = await User.findById(currentUser._id).populate({
    path: "bookmarksCollection",
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const postIds = user.bookmarksCollection[0].bookmarks;

  const posts = await Post.find({ _id: { $in: postIds } })
    .skip(skip)
    .limit(parseInt(limit));

  if (!posts) {
    return res.status(404).json({ error: "Posts not found!" });
  }
  res.status(200).json(posts);
};
module.exports = {
  createCollection,
  postBookmark,
  getSavedPost,
};
