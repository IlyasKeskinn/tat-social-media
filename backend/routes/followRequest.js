const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

const { createFollowRequest
    , acceptFollowRequest,
    rejectFollowRequest
} = require("../controller/followRequest");

router.put("/acceptFollowRequest/:followRequestId", isAuth, acceptFollowRequest);
router.delete("/rejectFollowRequest/:followRequestId", isAuth, rejectFollowRequest);

module.exports = router;