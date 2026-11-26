import { body } from 'express-validator';

export const registerValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 60 }).withMessage('Name must be between 2 and 60 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match. Please try again.');
      }
      return true;
    }),

  body('age')
    .optional()
    .isInt({ min: 12, max: 100 }).withMessage('Age must be between 12 and 100'),

  body('height')
    .optional()
    .isFloat({ min: 100, max: 250 }).withMessage('Height must be between 100 and 250 cm'),

  body('weight')
    .optional()
    .isFloat({ min: 30, max: 300 }).withMessage('Weight must be between 30 and 300 kg'),

  body('gender')
    .optional()
    .isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),

  body('goal')
    .optional()
    .isIn(['muscle_gain', 'fat_loss', 'strength', 'general_fitness', 'endurance'])
    .withMessage('Invalid fitness goal selected'),

  body('dietaryPreference')
    .optional()
    .isIn(['vegetarian', 'non_vegetarian', 'vegan', 'eggetarian'])
    .withMessage('Invalid dietary preference selected'),
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required'),
];

export const changePasswordValidator = [
  body('currentPassword')
    .notEmpty().withMessage('Current password is required'),

  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
];

export const forgotPasswordValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
];

export const resetPasswordValidator = [
  body('token')
    .notEmpty().withMessage('Reset token is required'),

  body('password')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
];
