import express from 'express';
import {
  getWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  toggleWorkoutCompletion,
} from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { createWorkoutValidator } from '../validators/fitnessValidator.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getWorkouts)
  .post(createWorkoutValidator, validate, createWorkout);

router.route('/:id')
  .get(getWorkoutById)
  .put(updateWorkout)
  .delete(deleteWorkout);

router.patch('/:id/complete', toggleWorkoutCompletion);

export default router;
