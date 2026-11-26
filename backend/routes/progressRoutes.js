import express from 'express';
import {
  logProgress,
  getProgressHistory,
  getProgressSummary,
  deleteProgress,
} from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { progressValidator } from '../validators/fitnessValidator.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getProgressHistory)
  .post(progressValidator, validate, logProgress);

router.get('/summary', getProgressSummary);
router.delete('/:id', deleteProgress);

export default router;
