import mongoose from 'mongoose';

const workoutExerciseSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
  },
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    default: 3,
  },
  reps: {
    type: String,
    default: '8-12',
  },
  weight: {
    type: String,
    default: '0 kg',
  },
  restSeconds: {
    type: Number,
    default: 90,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  notes: String,
});

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Workout title is required'],
      trim: true,
    },
    splitType: {
      type: String,
      enum: ['Push Pull Legs', 'Bro Split', 'Upper Lower', 'Full Body', 'Custom'],
      default: 'Custom',
    },
    dayOfWeek: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
      index: true,
    },
    focus: {
      type: String,
      default: 'General Conditioning',
    },
    exercises: [workoutExerciseSchema],
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: Date,
    durationMinutes: {
      type: Number,
      default: 60,
    },
    totalVolumeKg: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for user weekly workouts
workoutSchema.index({ user: 1, dayOfWeek: 1 });

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
