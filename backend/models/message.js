const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatRoomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatRoom',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'image', 'audio', 'post'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent'
    },
    readBy: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        readAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    isEdited: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// When the message is updated, set isEdited to true
messageSchema.pre('save', function(next) {
    if (this.isModified('content')) {
        this.isEdited = true;
    }
    next();
}); 

const Message = mongoose.model('Message', messageSchema);

module.exports = { Message };
