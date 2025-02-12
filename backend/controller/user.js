require("express-async-errors");
const { User } = require("../models/user");
const { FollowRequest } = require("../models/followRequest");
const bcrypt = require("bcrypt");
const { generateTokenAndCookie } = require("../helpers/generateTokenAndCookie");
const isValidEmail = require("../helpers/emailController");
const { mongoose } = require("mongoose");
const cloudinary = require("cloudinary");
const { Notification } = require("../models/notification");

const getProfile = async (req, res) => {
  const { query } = req.params;
  const currentUserId = req.user._id;

  let user;
  if (mongoose.Types.ObjectId.isValid(query)) {
    user = await User.findOne({ _id: query }).select("-password");
  } else {
    user = await User.findOne({ userName: query }).select("-password");
  }

  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  const currentUser = await User.findById(currentUserId);

  if (user._id.toString() === currentUserId.toString()) {
    return res.status(200).json({
      ...user._doc,
      blocked: false,
      private: false,
    });
  }

  if (currentUser.blockedBy.includes(user._id)) {
    return res.status(404).json({ error: `You are blocked by ${user.userName}.` });
  }

  if (currentUser.blockedUsers.includes(user._id)) {
    return res.status(200).json({
      _id: user._id,
      profilePic: user.userName,
      userName: user.userName,
      fullName: user.fullName,
      bio: "",
      followers: [],
      following: [],
      post: [],
      blocked: true,
    });
  }

  if (user.privateProfile && !Array.isArray(user.followers)) {
    return res.status(200).json({
      _id: user._id,
      profilePic: user.profilePic,
      userName: user.userName,
      fullName: user.fullName,
      bio: user.bio,
      followers: user.followers.length,
      following: user.following.length,
      post: [],
      private: true,
    });
  }

  res.status(200).json({ ...user._doc, blocked: false, private: false });
};



const suggestUsers = async (req, res) => {
  const currentUserId = req.user._id;

  if (!currentUserId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const currentUser = await User.findById(currentUserId);

  if (!currentUserId) {
    return res.status(404).json({ message: "Current user not found!" });
  }

  const followingIds = currentUser.following.map(
    (id) => new mongoose.Types.ObjectId(id)
  );
  const blockedByIds = currentUser.blockedBy.map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  const blockedUserIds = currentUser.blockedUsers.map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  const suggestedUsers = await User.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $not: {
                $in: [
                  "$_id",
                  [...followingIds, ...blockedByIds, ...blockedUserIds],
                ],
              },
            },
            { $ne: ["$_id", currentUserId] },
          ],
        },
      },
    },
    { $sample: { size: 3 } },

    {
      $project: {
        _id: 1,
        profilePic: 1,
        userName: 1,
        fullName: 1,
        followers: 1,
        following: 1,
        bio: 1,
      },
    },
  ]);

  res.status(200).json(suggestedUsers);
};

const getBlockedUsers = async (req, res) => {
  const currentUserId = req.user._id;

  if (!currentUserId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const currentUser = await User.findById(currentUserId)
    .select("blockedUsers")
    .populate("blockedUsers", "profilePic userName fullName ");

  if (!currentUser) {
    return res.status(404).json({ error: "Current user not found!" });
  }

  res.status(200).json(currentUser.blockedUsers);
};

const registerUser = async (req, res) => {
  const { firstName, lastName, userName, password, email } = req.body;

  let fullName = `${firstName} ${lastName}`;

  const existingUserName = await User.findOne({
    userName: { $regex: new RegExp(`^${userName}$`, "i") },
  });
  const existingEmail = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  });
  if (existingUserName) {
    return res.status(400).json({
      error: "This username is already taken. Please choose a different one.",
    });
  }

  if (existingEmail) {
    return res.status(400).json({
      error: "This email is already taken. You can log in to your account.",
    });
  }

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullName: fullName.trim().toLowerCase(),
    userName: userName.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
  });

  await newUser.save();
  if (newUser) {
    generateTokenAndCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
      fullName: newUser.fullName,
      bio: newUser.bio,
      profilePic: newUser.profilePic,
      bookmarksCollection: newUser.bookmarksCollection[0].bookmarks,
    });
  } else {
    res.status(400).json({ error: "Invalid user data" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const lowerCaseEmail = email.toLowerCase();

  const user = await User.findOne({
    email: { $regex: new RegExp(`^${lowerCaseEmail}$`, "i") },
  }).populate("bookmarksCollection");

  if (!user) {
    return res
      .status(404)
      .json({ error: "There is no user associated with this email!" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  generateTokenAndCookie(user._id, res);

  res.status(200).json({
    _id: user._id,
    userName: user.userName,
    fullName: user.fullName,
    bio: user.bio,
    profilePic: user.profilePic,
    bookmarksCollection: user.bookmarksCollection[0].bookmarks,
  });
};

const logout = async (req, res) => {
  res.cookie("io", "", { maxAge: 1 });
  res.status(200).json({ message: "User logout succesfully." });
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { fullName, bio, userName } = req.body;
  let { profilePic } = req.body;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  if (id !== userId.toString()) {
    return res
      .status(400)
      .json({ error: "You cannot edit othes user's profile!" });
  }

  const existingUserName = await User.findOne({
    userName: { $regex: new RegExp(`^${userName}$`, "i") },
  });

  if (
    existingUserName &&
    existingUserName._id.toString() !== user._id.toString()
  ) {
    return res.status(400).json({ error: "Username already taken!" });
  }

  if (profilePic) {
    if (user.profilePic) {
      await cloudinary.v2.uploader.destroy(
        user.profilePic.split("/").pop().split(".")[0]
      );
    }
    const uploadResponse = await cloudinary.v2.uploader.upload(profilePic);
    profilePic = uploadResponse.secure_url;
  }

  user.fullName = fullName.trim().toLowerCase() || user.fullName;
  user.bio = bio.trim();
  user.profilePic = profilePic || user.profilePic;
  user.userName = userName.trim() || user.userName;

  await user.save();

  user.password = null;

  res.status(200).json(user);
};

const followUnfollowUser = async (req, res) => {
  const { id } = req.params;
  const currentUserId = req.user._id;

  if (id === currentUserId.toString()) {
    return res.status(400).json({ error: "You cannot follow yoursefl! " });
  }

  const userToModify = await User.findOne({ _id: id });
  const currentUser = await User.findOne({ _id: currentUserId });

  if (!userToModify || !currentUser) {
    return res.status(400).json({ error: "Users not found!" });
  }

  const isBlockingUser = currentUser.blockedUsers.includes(id);
  const isBlockedByUser = currentUser.blockedBy.includes(id);
  const isFollowing = currentUser.following.includes(id);

  if (isBlockedByUser || isBlockingUser) {
    return res.status(400).json({
      error: "Cannot follow/unfollow a blocked user!",
    });
  }

  if (isFollowing) {
    // Unfollow the user
    await User.findByIdAndUpdate(id, { $pull: { followers: currentUserId } });
    await User.findByIdAndUpdate(currentUserId, { $pull: { following: id } });
    res.status(200).json({ message: "User unfollowed successfully!" });
  } else {
    if (userToModify.privateProfile) {
      // Send a follow request
      const existingFollowRequest = await FollowRequest.findOne({
        sender: currentUserId,
        receiver: id,
        status: "pending"
      });

      if (existingFollowRequest) {
        return res.status(400).json({ error: "You have already sent a follow request to this user." });
      }

      const followRequest = new FollowRequest({
        sender: currentUserId,
        receiver: id,
      });

      const newNotification = new Notification({
        sender: currentUserId,
        receiver: id,
        type: "followRequest",
        followRequestId: followRequest._id
      });

      await newNotification.save();

      await followRequest.save();
      return res.status(201).json({ message: "Follow request sent successfully!" });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: currentUserId } });
      await User.findByIdAndUpdate(currentUser, { $push: { following: id } });
      res.status(200).json({ message: "User followed successfuly!" });
    }
  }
};

const blockUnblockUser = async (req, res) => {
  const currentUserId = req.user._id;
  const { id } = req.params;

  if (id === currentUserId.toString()) {
    return res.status(400).json({ error: "You cannot block yoursefl! " });
  }

  const currentUser = await User.findById(currentUserId);
  const modifyUser = await User.findById(id);

  if (!currentUser || !modifyUser) {
    return res.status(404).json({ error: "Users not found!" });
  }

  const isAlreadyBlocked = currentUser.blockedUsers.includes(id);

  if (isAlreadyBlocked) {
    modifyUser.blockedBy = modifyUser.blockedBy.filter(
      (userId) => userId.toString() !== currentUserId.toString()
    );
    currentUser.blockedUsers = currentUser.blockedUsers.filter(
      (userId) => userId.toString() !== id.toString()
    );
    
    await currentUser.save();
    await modifyUser.save();

    res.status(200).json({
      message: `${modifyUser.userName} was removed from the blocked list.`,
    });
  } else {
    currentUser.blockedUsers.push(id);
    modifyUser.blockedBy.push(currentUserId);

    if (currentUser.following.includes(id)) {
      currentUser.following = currentUser.following.filter(
        (userId) => userId.toString() !== id.toString()
      );
      modifyUser.followers = modifyUser.followers.filter(
        (userId) => userId.toString() !== currentUserId.toString()
      );
    }
    if (modifyUser.following.includes(currentUserId)) {
      currentUser.followers = currentUser.followers.filter(
        (userId) => userId.toString() !== id.toString()
      );
      modifyUser.following = modifyUser.following.filter(
        (userId) => userId.toString() !== currentUserId.toString()
      );
    }

    await currentUser.save();
    await modifyUser.save();
    res
      .status(200)
      .json({ message: `Added to ${modifyUser.userName}'s blocked list. ` });
  }
};

const fetchlikeUsers = async (req, res) => {
  const likedUsersArray = req.body;

  const likedUsers = await User.find({ _id: { $in: likedUsersArray } }).select(
    `profilePic userName fullName followers following`
  );

  if (!likedUsers) {
    return res.status(404).json({ message: "No likes" });
  }

  res.status(200).json(likedUsers);
};

const searchUser = async (req, res) => {
  const { query, limit = 10, page = 1 } = req.query;
  const currentUserId = req.user._id;

  const currentUser = await User.findById(currentUserId);

  const blockedIds = currentUser.blockedBy.map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  const skip = (page - 1) * limit;

  const users = await User.find({
    $or: [
      {
        userName: { $regex: query.trim().toLowerCase(), $options: "i" },
      },
      {
        fullName: { $regex: query.trim().toLowerCase(), $options: "i" },
      },
    ],
    $expr: {
      $and: [
        { $not: { $in: ["$_id", blockedIds] } },
        { $ne: ["$_id", currentUserId] },
      ],
    },
  })
    .sort({
      userName: 1,
      fullName: 1,
    })
    .skip(skip)
    .limit(parseInt(limit));

  res.status(200).json(users);
};



module.exports = {
  registerUser,
  signIn,
  updateProfile,
  getProfile,
  logout,
  followUnfollowUser,
  fetchlikeUsers,
  searchUser,
  suggestUsers,
  blockUnblockUser,
  getBlockedUsers,
};
