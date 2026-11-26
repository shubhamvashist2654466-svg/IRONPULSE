import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * @desc    Get user profile details
 * @route   GET /api/v1/users/profile
 * @access  Private
 */
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('favoriteExercises');
    if (!user) {
      return errorResponse(res, 404, 'User profile not found');
    }
    return successResponse(res, 200, 'Profile fetched successfully', { user });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile details
 * @route   PUT /api/v1/users/profile
 * @access  Private
 */
export const updateProfile = async (req, res, next) => {
  try {
    const allowedUpdates = [
      'name',
      'age',
      'gender',
      'height',
      'weight',
      'goal',
      'fitnessExperience',
      'dietaryPreference',
      'workoutLocation',
      'avatar',
    ];

    const updates = {};
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).populate('favoriteExercises');

    return successResponse(res, 200, 'Athlete profile updated successfully', {
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Change user password
 * @route   PUT /api/v1/users/change-password
 * @access  Private
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return errorResponse(res, 400, 'Current password verification failed');
    }

    user.password = newPassword;
    await user.save();

    return successResponse(res, 200, 'Password updated successfully. Keep your credentials secure.');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle favorite exercise bookmark
 * @route   POST /api/v1/users/favorites/:exerciseId
 * @access  Private
 */
export const toggleFavoriteExercise = async (req, res, next) => {
  try {
    const { exerciseId } = req.params;
    const user = await User.findById(req.user.id);

    const isFav = user.favoriteExercises.some((id) => id.toString() === exerciseId);

    if (isFav) {
      user.favoriteExercises = user.favoriteExercises.filter((id) => id.toString() !== exerciseId);
      await user.save();
      return successResponse(res, 200, 'Exercise removed from favorites', {
        isFavorite: false,
        favoriteCount: user.favoriteExercises.length,
      });
    } else {
      user.favoriteExercises.push(exerciseId);
      await user.save();
      return successResponse(res, 200, 'Exercise added to favorites', {
        isFavorite: true,
        favoriteCount: user.favoriteExercises.length,
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all favorite exercises
 * @route   GET /api/v1/users/favorites
 * @access  Private
 */
export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('favoriteExercises');
    return successResponse(res, 200, 'Favorite exercises retrieved', {
      favorites: user.favoriteExercises,
    });
  } catch (error) {
    next(error);
  }
};
