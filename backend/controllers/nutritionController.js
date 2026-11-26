import Nutrition from '../models/Nutrition.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// Predefined verified foods database including authentic Indian staples
export const FOOD_DATABASE = [
  { id: 'paneer', name: 'Paneer (Cottage Cheese)', category: 'High Protein / Dairy', serving: '100g', calories: 265, protein: 18.3, carbs: 3.5, fats: 20.8, isVeg: true },
  { id: 'soya_chunks', name: 'Soya Chunks (Raw)', category: 'Plant Protein', serving: '50g', calories: 172, protein: 26.0, carbs: 16.5, fats: 0.5, isVeg: true },
  { id: 'tofu', name: 'Tofu (Firm Organic)', category: 'Plant Protein', serving: '100g', calories: 144, protein: 17.0, carbs: 2.8, fats: 8.5, isVeg: true },
  { id: 'chicken_breast', name: 'Chicken Breast (Skinless Grilled)', category: 'Lean Poultry', serving: '100g', calories: 165, protein: 31.0, carbs: 0.0, fats: 3.6, isVeg: false },
  { id: 'eggs', name: 'Whole Eggs (Boiled)', category: 'Whole Foods / Eggs', serving: '2 Large (100g)', calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0, isVeg: false },
  { id: 'greek_yogurt', name: 'Greek Yogurt (Plain 0% Fat)', category: 'Dairy', serving: '150g', calories: 88, protein: 15.0, carbs: 5.4, fats: 0.6, isVeg: true },
  { id: 'milk', name: 'Cow Milk (Toned 3% Fat)', category: 'Dairy', serving: '250ml', calories: 150, protein: 8.0, carbs: 12.0, fats: 7.5, isVeg: true },
  { id: 'dal', name: 'Yellow Moong Dal (Cooked)', category: 'Legumes', serving: '1 Cup (200g)', calories: 230, protein: 18.0, carbs: 40.0, fats: 0.8, isVeg: true },
  { id: 'chickpeas', name: 'Chickpeas / Chana (Boiled)', category: 'Legumes', serving: '1 Cup (164g)', calories: 269, protein: 14.5, carbs: 45.0, fats: 4.2, isVeg: true },
  { id: 'oats', name: 'Rolled Oats (Raw)', category: 'Complex Carbs', serving: '50g', calories: 194, protein: 6.8, carbs: 34.0, fats: 3.5, isVeg: true },
  { id: 'brown_rice', name: 'Brown Rice (Cooked)', category: 'Complex Carbs', serving: '150g', calories: 168, protein: 3.8, carbs: 35.0, fats: 1.4, isVeg: true },
  { id: 'peanut_butter', name: 'Natural Peanut Butter', category: 'Healthy Fats', serving: '2 Tbsp (32g)', calories: 190, protein: 8.0, carbs: 6.0, fats: 16.0, isVeg: true },
  { id: 'almonds', name: 'Raw California Almonds', category: 'Nuts & Seeds', serving: '30g', calories: 172, protein: 6.0, carbs: 6.1, fats: 15.0, isVeg: true },
  { id: 'banana', name: 'Ripe Yellow Banana', category: 'Fruits', serving: '1 Medium (118g)', calories: 105, protein: 1.3, carbs: 27.0, fats: 0.3, isVeg: true },
  { id: 'whey_isolate', name: '100% Whey Protein Isolate', category: 'Supplements', serving: '1 Scoop (30g)', calories: 120, protein: 25.0, carbs: 1.5, fats: 0.5, isVeg: true },
  { id: 'salmon', name: 'Atlantic Salmon Fillet', category: 'Seafood', serving: '120g', calories: 240, protein: 26.0, carbs: 0.0, fats: 14.5, isVeg: false },
];

/**
 * @desc    Search and get verified food database items
 * @route   GET /api/v1/nutrition/foods
 * @access  Public
 */
export const getFoodDatabase = async (req, res) => {
  const { search } = req.query;
  let items = FOOD_DATABASE;

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }

  return successResponse(res, 200, 'Food database retrieved', { foods: items });
};

/**
 * @desc    Log a meal consumption entry
 * @route   POST /api/v1/nutrition
 * @access  Private
 */
export const logMeal = async (req, res, next) => {
  try {
    const { date, mealCategory, foods } = req.body;

    let entry = await Nutrition.findOne({
      user: req.user.id,
      date,
      mealCategory,
    });

    if (entry) {
      entry.foods.push(...foods);
      await entry.save();
    } else {
      entry = await Nutrition.create({
        user: req.user.id,
        date,
        mealCategory,
        foods,
      });
    }

    return successResponse(res, 201, 'Meal logged successfully', { entry });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get daily nutrition summary and logged meals
 * @route   GET /api/v1/nutrition/daily
 * @access  Private
 */
export const getDailyNutrition = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const date = req.query.date || today;

    const meals = await Nutrition.find({ user: req.user.id, date });

    const totals = meals.reduce(
      (acc, meal) => {
        acc.calories += meal.totalCalories || 0;
        acc.protein += meal.totalProtein || 0;
        acc.carbs += meal.totalCarbs || 0;
        acc.fats += meal.totalFats || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

    totals.protein = Math.round(totals.protein * 10) / 10;
    totals.carbs = Math.round(totals.carbs * 10) / 10;
    totals.fats = Math.round(totals.fats * 10) / 10;

    return successResponse(res, 200, 'Daily nutrition data retrieved', {
      date,
      totals,
      meals,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get weekly nutrition breakdown
 * @route   GET /api/v1/nutrition/weekly
 * @access  Private
 */
export const getWeeklyNutrition = async (req, res, next) => {
  try {
    const entries = await Nutrition.find({ user: req.user.id }).sort({ date: -1 }).limit(35);

    // Group by date
    const historyMap = {};
    entries.forEach((e) => {
      if (!historyMap[e.date]) {
        historyMap[e.date] = { date: e.date, calories: 0, protein: 0, carbs: 0, fats: 0 };
      }
      historyMap[e.date].calories += e.totalCalories || 0;
      historyMap[e.date].protein += e.totalProtein || 0;
      historyMap[e.date].carbs += e.totalCarbs || 0;
      historyMap[e.date].fats += e.totalFats || 0;
    });

    const weeklyData = Object.values(historyMap).slice(0, 7).reverse();

    return successResponse(res, 200, 'Weekly nutrition history fetched', { weeklyData });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a food item or entire meal log
 * @route   DELETE /api/v1/nutrition/:id
 * @access  Private
 */
export const deleteMealEntry = async (req, res, next) => {
  try {
    const entry = await Nutrition.findById(req.params.id);

    if (!entry) {
      return errorResponse(res, 404, 'Nutrition log entry not found');
    }

    if (entry.user.toString() !== req.user.id) {
      return errorResponse(res, 403, 'Unauthorized');
    }

    await entry.deleteOne();
    return successResponse(res, 200, 'Nutrition log removed');
  } catch (error) {
    next(error);
  }
};
