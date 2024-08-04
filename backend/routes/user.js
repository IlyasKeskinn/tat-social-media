const express = require("express");

const {
  registerUser,
  signIn,
  logout,
  getProfile,
  updateProfile,
  followUnfollowUser,
  fetchlikeUsers,
  searchUser,
} = require("../controller/user");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.get("/profile/:query", getProfile);
router.get("/logout", logout);
router.get("/searchuser", searchUser);
router.post("/fetchlikeduser/", fetchlikeUsers);

router.post("/register", registerUser);
router.post("/login", signIn);

router.put("/update/:id", isAuth, updateProfile);
router.put("/followUnfollow/:id", isAuth, followUnfollowUser);

module.exports = router;
