import { body, query, param } from 'express-validator';

// Workouts Validator
export const createWorkoutValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Workout title is required'),

  body('dayOfWeek')
    .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    .withMessage('Valid day of week is required (Monday - Sunday)'),

  body('focus')
    .optional()
    .trim(),

  body('exercises')
    .optional()
    .isArray().withMessage('Exercises must be an array'),

  body('exercises.*.name')
    .optional()
    .notEmpty().withMessage('Exercise name is required in list'),
];

// Exercise Validator
export const createExerciseValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Exercise name is required'),

  body('category')
    .isIn(['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Abs', 'Full Body'])
    .withMessage('Invalid exercise category'),

  body('targetMuscle')
    .trim()
    .notEmpty().withMessage('Target muscle is required'),

  body('equipment')
    .isIn(['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight', 'Kettlebell', 'Other'])
    .withMessage('Invalid equipment type'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
];

// Nutrition Entry Validator
export const logMealValidator = [
  body('date')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be in format YYYY-MM-DD'),

  body('mealCategory')
    .isIn(['breakfast', 'mid_morning', 'lunch', 'pre_workout', 'post_workout', 'dinner', 'snacks'])
    .withMessage('Invalid meal category'),

  body('foods')
    .isArray({ min: 1 })
    .withMessage('At least one food item is required'),

  body('foods.*.name')
    .notEmpty().withMessage('Food item name is required'),

  body('foods.*.calories')
    .isNumeric().withMessage('Food calories must be a valid number'),

  body('foods.*.protein')
    .isNumeric().withMessage('Food protein must be a valid number'),

  body('foods.*.carbs')
    .isNumeric().withMessage('Food carbohydrates must be a valid number'),

  body('foods.*.fats')
    .isNumeric().withMessage('Food fats must be a valid number'),
];

// Progress Log Validator
export const progressValidator = [
  body('date')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be in format YYYY-MM-DD'),

  body('weight')
    .isFloat({ min: 30, max: 300 })
    .withMessage('Weight must be between 30 and 300 kg'),

  body('bodyFatPercentage')
    .optional()
    .isFloat({ min: 3, max: 60 })
    .withMessage('Body fat percentage must be between 3 and 60%'),
];

// Activity Log Validator
export const activityValidator = [
  body('date')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be in format YYYY-MM-DD'),

  body('steps')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Steps must be a non-negative integer'),

  body('sleepHours')
    .optional()
    .isFloat({ min: 0, max: 24 })
    .withMessage('Sleep hours must be between 0 and 24'),
];

// Community Post Validator
export const communityPostValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Post title is required')
    .isLength({ max: 120 }).withMessage('Title cannot exceed 120 characters'),

  body('content')
    .trim()
    .notEmpty().withMessage('Post content is required')
    .isLength({ max: 3000 }).withMessage('Content cannot exceed 3000 characters'),

  body('tag')
    .optional()
    .isIn(['PR Alert', 'Transformation', 'Nutrition', 'Questions', 'General'])
    .withMessage('Invalid tag selected'),
];

// Calculator Input Validators
export const bmiValidator = [
  body('weightKg')
    .isFloat({ min: 20, max: 300 })
    .withMessage('Weight in kg is required (20-300 kg)'),
  body('heightCm')
    .isFloat({ min: 80, max: 250 })
    .withMessage('Height in cm is required (80-250 cm)'),
];

export const bmrValidator = [
  body('weightKg').isFloat({ min: 20, max: 300 }).withMessage('Weight is required'),
  body('heightCm').isFloat({ min: 80, max: 250 }).withMessage('Height is required'),
  body('age').isInt({ min: 10, max: 120 }).withMessage('Age is required (10-120)'),
  body('gender').optional().isIn(['male', 'female']).withMessage('Gender must be male or female'),
];

export const tdeeValidator = [
  body('bmr').isFloat({ min: 500, max: 5000 }).withMessage('Valid BMR is required'),
  body('activityLevel')
    .optional()
    .isIn(['sedentary', 'light', 'moderate', 'very_active', 'extra_active'])
    .withMessage('Invalid activity level'),
];

export const proteinValidator = [
  body('weightKg').isFloat({ min: 20, max: 300 }).withMessage('Weight is required'),
  body('goal').optional().isIn(['muscle_gain', 'fat_loss', 'strength', 'endurance', 'maintenance']),
];
