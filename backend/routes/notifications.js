const express = require("express");
const router = express.Router();

const isAuth = require("../middlewares/isAuth");
const { getNotifications, getUnreadNotificationCount } = require("../controller/notifications");

router.get("/getNotifications", isAuth, getNotifications);
router.get("/getUnreadNotificationCount", isAuth, getUnreadNotificationCount);

module.exports = router;