import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: [true, 'Comment text is required'],
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

const communityPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      maxlength: [3000, 'Content cannot exceed 3000 characters'],
    },
    tag: {
      type: String,
      enum: ['PR Alert', 'Transformation', 'Nutrition', 'Questions', 'General'],
      default: 'General',
      index: true,
    },
    image: {
      type: String,
      default: null,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [commentSchema],
    workoutShare: {
      name: String,
      exercises: String,
      duration: String,
      volume: String,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for like count
communityPostSchema.virtual('likeCount').get(function () {
  return this.likes ? this.likes.length : 0;
});

// Virtual for comment count
communityPostSchema.virtual('commentCount').get(function () {
  return this.comments ? this.comments.length : 0;
});

communityPostSchema.set('toJSON', { virtuals: true });
communityPostSchema.set('toObject', { virtuals: true });

const CommunityPost = mongoose.model('CommunityPost', communityPostSchema);
export default CommunityPost;
