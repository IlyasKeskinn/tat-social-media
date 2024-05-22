const express = require("express");

const {
  registerUser,
  signIn,
  logout,
  getProfile,
  updateProfile,
  followUnfollowUser,
} = require("../controller/user");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.get("/user/profile/:query", getProfile);
router.get("/user/logout", logout);

router.post("/user/register", registerUser);
router.post("/user/login", signIn);

router.put("/user/update/:id", isAuth, updateProfile);
router.put("/user/followUnfollow/:id", isAuth, followUnfollowUser);

module.exports = router;
