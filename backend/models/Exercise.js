import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Exercise name is required'],
      trim: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Abs', 'Full Body'],
      index: true,
    },
    targetMuscle: {
      type: String,
      required: [true, 'Target muscle is required'],
      trim: true,
    },
    secondaryMuscles: [
      {
        type: String,
        trim: true,
      },
    ],
    equipment: {
      type: String,
      required: [true, 'Equipment is required'],
      enum: ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight', 'Kettlebell', 'Other'],
      index: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
      index: true,
    },
    defaultSets: {
      type: Number,
      default: 4,
    },
    defaultReps: {
      type: String,
      default: '8-10',
    },
    restSeconds: {
      type: Number,
      default: 90,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    tips: {
      type: String,
    },
    commonMistakes: {
      type: String,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug
exerciseSchema.pre('save', function () {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;
