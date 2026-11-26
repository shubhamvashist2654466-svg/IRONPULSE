import express from 'express';
import {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
} from '../controllers/exerciseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { createExerciseValidator } from '../validators/fitnessValidator.js';

const router = express.Router();

router.route('/')
  .get(getExercises)
  .post(protect, createExerciseValidator, validate, createExercise);

router.route('/:id')
  .get(getExerciseById)
  .put(protect, updateExercise)
  .delete(protect, deleteExercise);

export default router;
