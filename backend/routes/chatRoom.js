const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

const {
    checkCreateDirectChatRoom,
    createGroupChatRoom,
    getUserChatRooms,
} = require("../controller/chatRoom");


router.post("/checkCreateDirectChatRoom", isAuth, checkCreateDirectChatRoom);
router.post("/createGroupChatRoom", isAuth, createGroupChatRoom);
router.get("/getUserChatRooms", isAuth, getUserChatRooms);


module.exports = router;









