import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  servingQuantity: {
    type: String,
    default: '1 serving',
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true, // grams
  },
  carbs: {
    type: Number,
    required: true, // grams
  },
  fats: {
    type: Number,
    required: true, // grams
  },
  isVeg: {
    type: Boolean,
    default: true,
  },
});

const nutritionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: {
      type: String, // YYYY-MM-DD for clean day aggregation
      required: true,
      index: true,
    },
    mealCategory: {
      type: String,
      enum: ['breakfast', 'mid_morning', 'lunch', 'pre_workout', 'post_workout', 'dinner', 'snacks'],
      required: true,
    },
    foods: [foodItemSchema],
    totalCalories: {
      type: Number,
      default: 0,
    },
    totalProtein: {
      type: Number,
      default: 0,
    },
    totalCarbs: {
      type: Number,
      default: 0,
    },
    totalFats: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate meal macros
nutritionSchema.pre('save', function () {
  if (this.foods && this.foods.length > 0) {
    this.totalCalories = Math.round(this.foods.reduce((sum, f) => sum + (f.calories || 0), 0));
    this.totalProtein = Math.round(this.foods.reduce((sum, f) => sum + (f.protein || 0), 0) * 10) / 10;
    this.totalCarbs = Math.round(this.foods.reduce((sum, f) => sum + (f.carbs || 0), 0) * 10) / 10;
    this.totalFats = Math.round(this.foods.reduce((sum, f) => sum + (f.fats || 0), 0) * 10) / 10;
  } else {
    this.totalCalories = 0;
    this.totalProtein = 0;
    this.totalCarbs = 0;
    this.totalFats = 0;
  }
});

nutritionSchema.index({ user: 1, date: 1, mealCategory: 1 });

const Nutrition = mongoose.model('Nutrition', nutritionSchema);
export default Nutrition;
