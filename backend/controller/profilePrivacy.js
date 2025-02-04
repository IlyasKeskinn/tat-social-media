require("express-async-errors");
const { User } = require("../models/user");
const { FollowRequest } = require("../models/followRequest");
const { mongoose } = require("mongoose");
const { Notification } = require("../models/notification");



const setPrivateProfile = async (req, res) => {
    const signedInUserId = req.user._id;
    const user = await User.findById(signedInUserId);

    // If the user is not found, return a 404 error.
    if (!user) {
        return res.status(404).json({ error: "User not found!" });
    }

    // If the user profile is private, handle pending follow requests.
    if (user.privateProfile) {

        // Find all pending follow requests sent to this user.
        const pendingFollowRequests = await FollowRequest.find({
            receiver: user._id,
            status: "pending"
        });

        // Iterate through each pending follow request and accept it.
        for (const pendingFollowRequest of pendingFollowRequests) {
            pendingFollowRequest.status = "accepted"; // Update the status to 'accepted'.
            await pendingFollowRequest.save(); // Save the updated follow request.


            // Add the sender to the user's followers list if not already included.
            if (!user.followers.includes(pendingFollowRequest.sender.toString())) {
                user.followers.push(pendingFollowRequest.sender); // Add the sender to followers.
                await user.save();
            }

            // Add the user to the sender's following list if not already included.
            const FollowRequestSenderUser = await User.findById(pendingFollowRequest.sender);
            if (!FollowRequestSenderUser.following.includes(user._id.toString())) {
                FollowRequestSenderUser.following.push(user._id); // Add the user to following.
                await FollowRequestSenderUser.save();
            }

            await Notification.deleteMany({
                sender: pendingFollowRequest.sender,
                receiver: signedInUserId,
                type: "followRequest"
            });

            const newNotification = new Notification({
                sender: signedInUserId,
                receiver: pendingFollowRequest.sender,
                type: "requestAccepted"
            });

            await newNotification.save();
        }


    }
    // Toggle the user's private profile status.
    user.privateProfile = !user.privateProfile;

    await user.save();

    // Send a success response.
    res.status(200).json({ message: "Profile updated successfully." });
};

const getPrivacyStatus = async (req, res) => {
    const signedInUserId = req.user._id;
    const user = await User.findById(signedInUserId);

    res.status(200).json({ isPrivate: user.privateProfile });
};

module.exports = { setPrivateProfile, getPrivacyStatus };