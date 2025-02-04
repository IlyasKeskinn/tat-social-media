const express = require("express");
const router = express.Router();

const isAuth = require("../middlewares/isAuth");

const { setPrivateProfile, getPrivacyStatus } = require("../controller/profilePrivacy")


router.put("/setProfilePrivate", isAuth, setPrivateProfile);
router.get("/getPrivacyStatus", isAuth, getPrivacyStatus);

module.exports = router;