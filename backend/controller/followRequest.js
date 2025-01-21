require("express-async-errors");
const { mongoose } = require("mongoose");
const { FollowRequest } = require("../models/followRequest");
const { User } = require("../models/user");
const { Notification } = require("../models/notification");

const acceptFollowRequest = async (req, res) => {
    const { followRequestId } = req.params;
    const userId = req.user._id;
    const followRequest = await FollowRequest.findById(followRequestId);

    if (!followRequest) {
        return res.status(404).json({ error: "Follow request not found." });
    }

    const sender = followRequest.sender;
    const receiver = followRequest.receiver;

    if (receiver.toString() !== userId.toString()) {
        return res.status(401).json({ error: "Unauthorized to accept this follow request." });
    }

    if (followRequest.status !== "pending") {
        return res.status(400).json({ error: "Follow request has already been processed." });
    }

    await User.findByIdAndUpdate(sender, { $push: { following: receiver } });
    await User.findByIdAndUpdate(receiver, { $push: { followers: sender } });
    await FollowRequest.findByIdAndUpdate(followRequestId, { status: "accepted" });

    await Notification.deleteMany({
        sender: sender,
        receiver: receiver,
        type: "followRequest"
    });

    const newNotification = new Notification({
        sender: sender,
        receiver: receiver,
        type: "requestAccepted"
    });

    await newNotification.save();

    res.status(200).json({ message: "Follow request accepted successfully." });
}

const rejectFollowRequest = async (req, res) => {
    const { followRequestId } = req.params;
    const userId = req.user._id;

    const followRequest = await FollowRequest.findById(followRequestId);

    if (!followRequest) {
        return res.status(404).json({ error: "Follow request not found." });
    }

    if (receiver.toString() !== userId.toString()) {
        return res.status(401).json({ error: "Unauthorized to accept this follow request." });
    }

    if (followRequest.status !== "pending") {
        return res.status(400).json({ error: "Follow request has already been processed." });
    }


    await FollowRequest.findByIdAndDelete(followRequestId);

    res.status(200).json({ message: "Follow request rejected successfully." });
}


module.exports = {
    acceptFollowRequest,
    rejectFollowRequest
}   