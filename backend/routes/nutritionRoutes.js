import express from 'express';
import {
  getDailyNutrition,
  getWeeklyNutrition,
  logMeal,
  deleteMealEntry,
  getFoodDatabase,
} from '../controllers/nutritionController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { logMealValidator } from '../validators/fitnessValidator.js';

const router = express.Router();

// Public verified food database route
router.get('/foods', getFoodDatabase);

// Protected routes
router.use(protect);
router.get('/daily', getDailyNutrition);
router.get('/weekly', getWeeklyNutrition);
router.post('/', logMealValidator, validate, logMeal);
router.delete('/:id', deleteMealEntry);

export default router;
