const { mongoose, Schema } = require("mongoose");

const bookmarkCollectionSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: "String",
      required: true,
    },
    bookmarks: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
      default: [],
    },
    isDefault: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const BookmarkCollection = mongoose.model(
  "BookmarkCollection",
  bookmarkCollectionSchema
);

module.exports = {
  BookmarkCollection,
};
