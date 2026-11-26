import mongoose from 'mongoose';

const measurementsSchema = new mongoose.Schema({
  chest: { type: Number },     // cm
  arms: { type: Number },      // cm
  waist: { type: Number },     // cm
  thighs: { type: Number },    // cm
  shoulders: { type: Number }, // cm
  calves: { type: Number },    // cm
});

const progressSchema = new mongoose.Schema(
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
    weight: {
      type: Number,
      required: [true, 'Weight is required'],
      min: [30, 'Weight must be at least 30 kg'],
      max: [300, 'Weight cannot exceed 300 kg'],
    },
    bodyFatPercentage: {
      type: Number,
      min: 3,
      max: 60,
    },
    measurements: measurementsSchema,
    photos: {
      front: String,
      side: String,
      back: String,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

progressSchema.index({ user: 1, date: -1 });

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
