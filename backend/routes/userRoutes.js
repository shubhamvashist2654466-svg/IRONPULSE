import express from 'express';
import {
  getProfile,
  updateProfile,
  changePassword,
  toggleFavoriteExercise,
  getFavorites,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { changePasswordValidator } from '../validators/authValidator.js';

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePasswordValidator, validate, changePassword);
router.get('/favorites', getFavorites);
router.post('/favorites/:exerciseId', toggleFavoriteExercise);

export default router;
