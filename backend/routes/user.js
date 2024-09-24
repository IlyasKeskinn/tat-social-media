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
  suggestUsers,
  blockUnblockUser,
  getBlockedUsers,
} = require("../controller/user");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.get("/profile/:query", isAuth, getProfile);
router.get("/getBlockedUsers", isAuth, getBlockedUsers);
router.get("/suggestUsers", isAuth, suggestUsers);
router.get("/logout", logout);
router.get("/searchuser", isAuth, searchUser);
router.post("/fetchlikeduser/", fetchlikeUsers);

router.post("/register", registerUser);
router.post("/login", signIn);

router.put("/update/:id", isAuth, updateProfile);
router.put("/followUnfollow/:id", isAuth, followUnfollowUser);
router.put("/blockUnblock/:id", isAuth, blockUnblockUser);

module.exports = router;
