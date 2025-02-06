require("express-async-errors");
const { ChatRoom } = require("../models/chatRoom");
const { User } = require("../models/user");



// Direct message chat room creation/check
const checkCreateDirectChatRoom = async (req, res) => {

    const { participantId } = req.body;
    const currentUserId = req.user._id;

    if (!participantId) {
        return res.status(400).json({ error: "Participant ID is required" });
    }

    // Check if chat room already exists
    const existingChatRoom = await ChatRoom.findOne({
        isGroup: false,
        'participants.user': { $all: [currentUserId, participantId] }
    }).populate('participants.user', 'userName fullName profilePic')
        .populate('lastMessage');

    if (existingChatRoom) {
        return res.status(200).json(existingChatRoom);
    }

    // Get both users
    const [otherUser, currentUser] = await Promise.all([
        User.findById(participantId),
        User.findById(currentUserId)
    ]);

    if (!otherUser || !currentUser) {
        return res.status(404).json({ error: "User not found" });
    }

    // Check if users blocked each other
    const isBlockedByOther = otherUser.blockedUsers.includes(currentUserId);
    const isBlockedByMe = currentUser.blockedUsers.includes(participantId);

    if (isBlockedByOther || isBlockedByMe) {
        return res.status(403).json({ error: "Cannot chat with blocked user" });
    }

    // Check privacy settings
    if (otherUser.privateProfile) {
        const isFollowing = otherUser.followers.some(
            follower => follower.toString() === currentUserId.toString()
        );

        if (!isFollowing) {
            return res.status(403).json({ error: "Cannot message private account without following" });
        }
    }

    // Create new direct chat room
    const newChatRoom = new ChatRoom({
        isGroup: false,
        createdBy: currentUserId,
        participants: [
            { user: currentUserId, role: 'member' },
            { user: participantId, role: 'member' }
        ]
    });

    await newChatRoom.save();

    const populatedChatRoom = await ChatRoom.findById(newChatRoom._id)
        .populate('participants.user', 'userName fullName profilePic')
        .populate('lastMessage');

    res.status(201).json(populatedChatRoom);

};

// Group chat room creation
const createGroupChatRoom = async (req, res) => {

    const { name, participantIds } = req.body;
    const currentUserId = req.user._id;

    // Validate input
    if (!name || !participantIds || !Array.isArray(participantIds)) {
        return res.status(400).json({ error: "Name and valid participants list are required" });
    }

    if (participantIds.length < 2) {
        return res.status(400).json({ error: "Group chat requires at least 3 participants including you" });
    }

    // Add current user if not included
    if (!participantIds.includes(currentUserId)) {
        participantIds.push(currentUserId);
    }

    // Get all participants
    const participants = await User.find({ _id: { $in: participantIds } });

    if (participants.length !== participantIds.length) {
        return res.status(404).json({ error: "Some users not found" });
    }

    // Create participants array with roles
    const participantsWithRoles = participantIds.map(userId => ({
        user: userId,
        role: userId === currentUserId ? 'admin' : 'member'
    }));

    // Create new group chat room
    const newGroupChat = new ChatRoom({
        name,
        isGroup: true,
        createdBy: currentUserId,
        participants: participantsWithRoles,
        theme: {
            colorPalette: 'default',
            background: {
                type: 'none',
                url: null
            }
        }
    });

    await newGroupChat.save();

    const populatedGroupChat = await ChatRoom.findById(newGroupChat._id)
        .populate('participants.user', 'userName fullName profilePic')
        .populate('createdBy', 'userName fullName profilePic')
        .populate('lastMessage');

    res.status(201).json(populatedGroupChat);

};

// Get user's chat rooms
const getUserChatRooms = async (req, res) => {

    const userId = req.user._id;

    const chatRooms = await ChatRoom.find({
        'participants.user': userId
    })
        .populate('participants.user', 'userName fullName profilePic')
        .populate('lastMessage')
        .populate('createdBy', 'userName fullName profilePic')
        .sort({ lastMessageAt: -1 });

    res.status(200).json(chatRooms);

};

module.exports = {
    checkCreateDirectChatRoom,
    createGroupChatRoom,
    getUserChatRooms
};

