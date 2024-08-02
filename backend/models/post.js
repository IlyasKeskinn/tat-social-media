const { mongoose, Schema } = require("mongoose");
const { commentSchema } = require("./comment.js");
const { BookmarkCollection } = require("./bookmarksCollection.js");
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
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

postSchema.pre("findOneAndDelete", async function (next) {
  const postId = this.getQuery()._id;

  try {
    await BookmarkCollection.updateMany(
      { posts: postId },
      { $pull: { posts: postId } }
    );

    console.log(`Related bookmarks for post ${postId} have been cleaned up.`);
    next();
  } catch (error) {
    console.error("Error cleaning up bookmarks during post deletion:", error);
    next(error);
  }
});
module.exports = { Post };
