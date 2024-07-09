require("express-async-errors");
const { User } = require("../modules/user");
const bcrypt = require("bcrypt");
const { generateTokenAndCookie } = require("../helpers/generateTokenAndCookie");
const isValidEmail = require("../helpers/emailController");
const { mongoose } = require("mongoose");
const cloudinary = require("cloudinary");

const getProfile = async (req, res) => {
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

  res.status(200).json(user);
};

const registerUser = async (req, res) => {
  const { firstName, lastName, userName, password, email } = req.body;

  let fullName = `${firstName} ${lastName}`;

  const existingUserName = await User.findOne({ userName });
  const existingEmail = await User.findOne({ email });
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
    fullName: fullName,
    userName: userName,
    email: email,
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
    });
  } else {
    res.status(400).json({ error: "Invalid user data" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

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

  const existingUserName = await User.findOne({ userName: userName });

  if (
    existingUserName &&
    existingUserName._id.toString() !== user._id.toString()
  ) {
    return res.status(400).json({ error: "Username already taken!" });
  }

  if (profilePic) {
    if (user.profilePic) {
      await cloudinary.v2.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
    }
    const uploadResponse = await cloudinary.v2.uploader.upload(profilePic);
    profilePic = uploadResponse.secure_url;
  }

  user.fullName = fullName || user.fullName;
  user.bio = bio || user.bio;
  user.profilePic = profilePic || user.profilePic;
  user.userName = userName || user.userName;

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

  const isFollowing = currentUser.following.includes(id);

  if (isFollowing) {
    await User.findByIdAndUpdate(id, { $pull: { followers: currentUserId } });
    await User.findByIdAndUpdate(currentUserId, { $pull: { following: id } });
    res.status(200).json({ message: "User unfollowed successfully!" });
  } else {
    await User.findByIdAndUpdate(id, { $push: { followers: currentUserId } });
    await User.findByIdAndUpdate(currentUser, { $push: { following: id } });
    res.status(200).json({ message: "User followed successfuly!" });
  }
};

module.exports = {
  registerUser,
  signIn,
  updateProfile,
  getProfile,
  logout,
  followUnfollowUser,
};
