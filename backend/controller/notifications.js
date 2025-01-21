require("express-async-errors");
const { Notification } = require("../models/notification");



const getNotifications = async (req, res) => {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;
    const notifications = await Notification.find({ receiver: userId }).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));


    await Notification.updateMany({ receiver: userId, isRead: false }, { $set: { isRead: true } });

    res.status(200).json(notifications);
};

const getUnreadNotificationCount = async (req, res) => {
    const userId = req.user._id;


    const unreadCount = await Notification.countDocuments({ receiver: userId, isRead: false });

    res.status(200).json({ unreadCount });
};

module.exports = {
    getNotifications,
    getUnreadNotificationCount,
};