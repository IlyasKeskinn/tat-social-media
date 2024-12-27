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
    isUpdated: {
      type: Boolean,
      default: false, 
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema = mongoose.Schema(
  {
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
    isUpdated: {
      type: Boolean,
      default: false, // İlk oluşturulduğunda false
    },
    updatedAt: {
      type: Date,
      default: null, // Başlangıçta null
    },
  },
  {
    timestamps: true,
  }
);

// Güncelleme hook'u ekleyelim
commentSchema.pre("save", function (next) {
  if (!this.isNew && this.isModified("comment")) { 
    this.isUpdated = true;
    this.updatedAt = Date.now();
  }
  next();
});

replySchema.pre("save", function (next) {
  if (!this.isNew && this.isModified("reply")) { 
    this.isUpdated = true;
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = { commentSchema, replySchema };
