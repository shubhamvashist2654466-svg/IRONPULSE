import {
  calculateBMI,
  calculateBMR,
  calculateTDEE,
  calculateProtein,
  calculateDailyCalories,
  calculateBodyFat,
  calculateIdealWeight,
  calculateWaterIntake,
} from '../utils/calculations.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const calculateBMIHandler = (req, res) => {
  try {
    const { weightKg, heightCm } = req.body;
    const result = calculateBMI(weightKg, heightCm);
    return successResponse(res, 200, 'BMI calculation complete', result);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

export const calculateBMRHandler = (req, res) => {
  try {
    const { weightKg, heightCm, age, gender } = req.body;
    const result = calculateBMR(weightKg, heightCm, age, gender);
    return successResponse(res, 200, 'BMR calculation complete', result);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

export const calculateTDEEHandler = (req, res) => {
  try {
    const { bmr, activityLevel } = req.body;
    const result = calculateTDEE(bmr, activityLevel);
    return successResponse(res, 200, 'TDEE calculation complete', result);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

export const calculateProteinHandler = (req, res) => {
  try {
    const { weightKg, goal } = req.body;
    const result = calculateProtein(weightKg, goal);
    return successResponse(res, 200, 'Protein target calculated', result);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

export const calculateDailyCaloriesHandler = (req, res) => {
  try {
    const result = calculateDailyCalories(req.body);
    return successResponse(res, 200, 'Daily calorie & macro targets calculated', result);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

export const calculateBodyFatHandler = (req, res) => {
  try {
    const result = calculateBodyFat(req.body);
    return successResponse(res, 200, 'Body fat estimation complete', result);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

export const calculateIdealWeightHandler = (req, res) => {
  try {
    const { heightCm, gender } = req.body;
    const result = calculateIdealWeight(heightCm, gender);
    return successResponse(res, 200, 'Ideal weight calculated', result);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

export const calculateWaterIntakeHandler = (req, res) => {
  try {
    const { weightKg, workoutMinutes, climate } = req.body;
    const result = calculateWaterIntake(weightKg, workoutMinutes, climate);
    return successResponse(res, 200, 'Water intake calculated', result);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};
