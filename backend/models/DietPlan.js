import mongoose from 'mongoose';

const mealScheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    default: '08:00 AM',
  },
  calories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
  items: [
    {
      type: String,
      required: true,
    },
  ],
});

const dietPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // null represents platform curated blueprint
      index: true,
    },
    planName: {
      type: String,
      required: [true, 'Plan name is required'],
      trim: true,
    },
    fitnessGoal: {
      type: String,
      enum: ['muscle_gain', 'fat_loss', 'maintenance', 'athletic_performance'],
      default: 'muscle_gain',
    },
    dietaryPreference: {
      type: String,
      enum: ['vegetarian', 'non_vegetarian', 'vegan', 'eggetarian'],
      default: 'vegetarian',
    },
    dailyCalorieTarget: {
      type: Number,
      required: true,
    },
    proteinTarget: {
      type: Number,
      required: true, // grams
    },
    carbohydrateTarget: {
      type: Number,
      required: true, // grams
    },
    fatTarget: {
      type: Number,
      required: true, // grams
    },
    description: String,
    isTemplate: {
      type: Boolean,
      default: false,
    },
    mealSchedule: [mealScheduleSchema],
  },
  {
    timestamps: true,
  }
);

const DietPlan = mongoose.model('DietPlan', dietPlanSchema);
export default DietPlan;
