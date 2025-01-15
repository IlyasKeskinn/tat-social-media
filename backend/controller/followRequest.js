require("express-async-errors");
const { mongoose } = require("mongoose");
const { FollowRequest } = require("../models/followRequest");
const { User } = require("../models/user");


const createFollowRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    const existingFollowRequest = await FollowRequest.findOne({
        sender: senderId,
        receiver: receiverId,
        status: "pending"
    })

    if (existingFollowRequest) {
        return res.status(400).json({ error: "You have already sent a follow request to this user." });
    }

    const followRequest = new FollowRequest({
        sender: senderId,
        receiver: receiverId
    });

    await followRequest.save();
    res.status(201).json({ message: "Follow request sent successfully." });
}

const acceptFollowRequest = async (req, res) => {
    const { followRequestId } = req.params;

    const followRequest = await FollowRequest.findById(followRequestId);

    if (!followRequest) {
        return res.status(404).json({ error: "Follow request not found." });
    }

    const sender = followRequest.sender;
    const receiver = followRequest.receiver;

    await User.findByIdAndUpdate(sender, { $push: { following: receiver } });
    await User.findByIdAndUpdate(receiver, { $push: { followers: sender } });
    await FollowRequest.findByIdAndUpdate(followRequestId, { status: "accepted" });

    res.status(200).json({ message: "Follow request accepted successfully." });
}

const rejectFollowRequest = async (req, res) => {
    const { followRequestId } = req.params;

    const followRequest = await FollowRequest.findById(followRequestId);

    if (!followRequest) {
        return res.status(404).json({ error: "Follow request not found." });
    }

    await FollowRequest.findByIdAndDelete(followRequestId);

    res.status(200).json({ message: "Follow request rejected successfully." });
}


module.exports = {
    createFollowRequest,
    acceptFollowRequest,
    rejectFollowRequest
}   