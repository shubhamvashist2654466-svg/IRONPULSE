import express from 'express';
import {
  calculateBMIHandler,
  calculateBMRHandler,
  calculateTDEEHandler,
  calculateProteinHandler,
  calculateDailyCaloriesHandler,
  calculateBodyFatHandler,
  calculateIdealWeightHandler,
  calculateWaterIntakeHandler,
} from '../controllers/calculatorController.js';
import { validate } from '../middleware/validationMiddleware.js';
import {
  bmiValidator,
  bmrValidator,
  tdeeValidator,
  proteinValidator,
} from '../validators/fitnessValidator.js';

const router = express.Router();

router.post('/bmi', bmiValidator, validate, calculateBMIHandler);
router.post('/bmr', bmrValidator, validate, calculateBMRHandler);
router.post('/tdee', tdeeValidator, validate, calculateTDEEHandler);
router.post('/protein', proteinValidator, validate, calculateProteinHandler);
router.post('/daily-calories', calculateDailyCaloriesHandler);
router.post('/body-fat', calculateBodyFatHandler);
router.post('/ideal-weight', calculateIdealWeightHandler);
router.post('/water-intake', calculateWaterIntakeHandler);

export default router;
