import express from 'express';
import {
  getFeed,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
} from '../controllers/communityController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { communityPostValidator } from '../validators/fitnessValidator.js';

const router = express.Router();

// Public read
router.get('/', getFeed);

// Protected interactions
router.use(protect);

router.post('/', communityPostValidator, validate, createPost);
router.route('/:id')
  .put(updatePost)
  .delete(deletePost);

router.post('/:id/like', toggleLike);
router.post('/:id/comments', addComment);
router.delete('/:id/comments/:commentId', deleteComment);

export default router;
