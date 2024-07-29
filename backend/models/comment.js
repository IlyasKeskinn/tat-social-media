const { mongoose, Schema } = require("mongoose");

const replySchema = mongoose.Schema(
  {
    replyBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reply: {
      type: Schema.Types.String,
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema = mongoose.Schema({
  commentBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: Schema.Types.String,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  replies: [replySchema],
},
{
    timestamps: true,
  });

module.exports = { commentSchema, replySchema };
