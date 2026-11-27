import mongoose from 'mongoose';

const blogContentSectionSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      maxlength: [300, 'Summary cannot exceed 300 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Muscle Building',
        'Weight Loss',
        'Nutrition',
        'Supplements',
        'Workout Techniques',
        'Recovery and Sleep',
        'Fitness Myths',
      ],
      index: true,
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    author: {
      type: String,
      default: 'IRONPULSE Editorial Team',
    },
    authorRole: {
      type: String,
      default: 'Sports Scientist & CSCS',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    },
    content: [blogContentSectionSchema],
    takeaways: [
      {
        type: String,
      },
    ],
    tags: [String],
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Slug auto-generation before validation and saving
blogSchema.pre('validate', function () {
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
});

blogSchema.pre('save', function () {
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
