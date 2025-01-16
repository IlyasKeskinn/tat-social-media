const express = require("express");
const router = express.Router();

const isAuth = require("../middlewares/isAuth");

const { setPrivateProfile } = require("../controller/profilePrivacy")


router.put("/setProfilePrivate", isAuth, setPrivateProfile);

module.exports = router;