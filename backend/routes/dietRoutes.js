import express from 'express';
import {
  getDietPlans,
  getDietPlanById,
  createDietPlan,
  updateDietPlan,
  deleteDietPlan,
} from '../controllers/dietController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getDietPlans)
  .post(createDietPlan);

router.route('/:id')
  .get(getDietPlanById)
  .put(updateDietPlan)
  .delete(deleteDietPlan);

export default router;
