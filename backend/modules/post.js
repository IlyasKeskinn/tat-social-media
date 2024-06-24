const { mongoose, Schema } = require("mongoose");
const postSchema = mongoose.Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    tatmoji: {
      type: String,
    },
    images: {
      type: Array,
    },
    likes: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    replies: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
        userProfilePictures: {
          type: String,
        },
        username: {
          type: String,
        },
      },
    ],
  },
  {
    timestamp: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
