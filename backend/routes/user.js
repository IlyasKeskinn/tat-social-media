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
} = require("../controller/user");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.get("/profile/:query", getProfile);
router.get("/suggestUsers", isAuth, suggestUsers);
router.get("/logout", logout);
router.get("/searchuser", searchUser);
router.post("/fetchlikeduser/", fetchlikeUsers);

router.post("/register", registerUser);
router.post("/login", signIn);

router.put("/update/:id", isAuth, updateProfile);
router.put("/followUnfollow/:id", isAuth, followUnfollowUser);
router.put("/blockUnblock/:id", isAuth, blockUnblockUser);

module.exports = router;
