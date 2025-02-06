import mongoose from "mongoose";


const chatRoomSchema = new mongoose.Schema({
    // basis information
    name: {
        type: String,
        required: function() {
            // If it's a group chat, the name is required
            return this.isGroup === true;
        }
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    // participants and roles
    participants: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['admin', 'member'],
            default: 'member'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],

    // Visual customization
    theme: {
        colorPalette: {
            type: String,
            enum: ['default', 'dark', 'light', 'blue', 'green', 'purple'],
            default: 'default'
        },
        background: {
            type: {
                type: String,
                enum: ['none', 'image', 'video'],
                default: 'none'
            },
            url: {
                type: String,
                default: null
            }
        }
    },

    // Last message information (for performance)
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    lastMessageAt: {
        type: Date
    }
},
{
    timestamps: true
}); 

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom;