import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true,
    },
    steps: {
      type: Number,
      default: 0,
      min: 0,
    },
    stepTarget: {
      type: Number,
      default: 10000,
    },
    activeCalories: {
      type: Number,
      default: 0,
    },
    distanceKm: {
      type: Number,
      default: 0,
    },
    activeMinutes: {
      type: Number,
      default: 0,
    },
    workoutDurationMinutes: {
      type: Number,
      default: 0,
    },
    sleepHours: {
      type: Number,
      default: 0,
      min: 0,
      max: 24,
    },
    sleepStages: {
      deepMinutes: { type: Number, default: 0 },
      remMinutes: { type: Number, default: 0 },
      lightMinutes: { type: Number, default: 0 },
    },
    restingHeartRate: {
      type: Number,
      min: 30,
      max: 200,
    },
  },
  {
    timestamps: true,
  }
);

activitySchema.index({ user: 1, date: -1 }, { unique: true });

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
