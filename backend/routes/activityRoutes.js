import express from 'express';
import {
  logDailyActivity,
  getDailyActivity,
  getWeeklyActivity,
} from '../controllers/activityController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { activityValidator } from '../validators/fitnessValidator.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(activityValidator, validate, logDailyActivity);

router.get('/daily', getDailyActivity);
router.get('/weekly', getWeeklyActivity);

export default router;
