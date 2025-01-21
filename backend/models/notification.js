const {mongoose} = require("mongoose");

const notificationSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ["followRequest", "like", "comment", "requestAccepted", "eventCreated", "eventJoined", "eventInvited", "eventInvitedAccepted"],
        required: true,
    },
    relatedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    relatedComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    },
    relatedEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = {
    Notification
}