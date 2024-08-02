const { mongoose } = require("mongoose");
const { BookmarkCollection } = require("./bookmarksCollection");
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    bookmarksCollection: {
      type: [mongoose.Types.ObjectId],
      ref: "BookmarkCollection",
      default: [],
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
    reports: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.post("save", async function (doc) {
  const defaultColleciton = await BookmarkCollection.findOne({
    user: doc._id,
    isDefault: true,
  });

  if (!defaultColleciton) {
    const defaultColleciton = new BookmarkCollection({
      user: doc._id,
      title: "Bookmarks",
      isDefault: true,
    });

    await defaultColleciton.save();

    doc.bookmarksCollection.push(defaultColleciton._id);
    await doc.save();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
