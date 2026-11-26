import Workout from '../models/Workout.js';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * @desc    Get user's weekly workout schedule
 * @route   GET /api/v1/workouts
 * @access  Private
 */
export const getWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ createdAt: -1 });

    const totalWorkouts = workouts.length;
    const completedWorkouts = workouts.filter((w) => w.isCompleted).length;

    return successResponse(res, 200, 'Workouts retrieved successfully', {
      workouts,
      summary: {
        total: totalWorkouts,
        completed: completedWorkouts,
        completionRate: totalWorkouts > 0 ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new workout routine
 * @route   POST /api/v1/workouts
 * @access  Private
 */
export const createWorkout = async (req, res, next) => {
  try {
    const { title, splitType, dayOfWeek, focus, exercises, durationMinutes } = req.body;

    const workout = await Workout.create({
      user: req.user.id,
      title,
      splitType: splitType || 'Custom',
      dayOfWeek,
      focus: focus || 'Strength & Conditioning',
      exercises: exercises || [],
      durationMinutes: durationMinutes || 60,
    });

    return successResponse(res, 201, 'Workout created and scheduled successfully', { workout });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single workout by ID
 * @route   GET /api/v1/workouts/:id
 * @access  Private
 */
export const getWorkoutById = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return errorResponse(res, 404, 'Workout not found');
    }

    if (workout.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'Unauthorized access to this workout schedule');
    }

    return successResponse(res, 200, 'Workout fetched', { workout });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update workout details, exercises, sets or reps
 * @route   PUT /api/v1/workouts/:id
 * @access  Private
 */
export const updateWorkout = async (req, res, next) => {
  try {
    let workout = await Workout.findById(req.params.id);

    if (!workout) {
      return errorResponse(res, 404, 'Workout not found');
    }

    if (workout.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'Unauthorized. You do not own this workout');
    }

    workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return successResponse(res, 200, 'Workout updated successfully', { workout });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete workout
 * @route   DELETE /api/v1/workouts/:id
 * @access  Private
 */
export const deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return errorResponse(res, 404, 'Workout not found');
    }

    if (workout.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'Unauthorized action');
    }

    await workout.deleteOne();

    return successResponse(res, 200, 'Workout routine removed successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark entire workout or specific exercise as completed
 * @route   PATCH /api/v1/workouts/:id/complete
 * @access  Private
 */
export const toggleWorkoutCompletion = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return errorResponse(res, 404, 'Workout not found');
    }

    if (workout.user.toString() !== req.user.id) {
      return errorResponse(res, 403, 'Unauthorized');
    }

    workout.isCompleted = !workout.isCompleted;
    workout.completedAt = workout.isCompleted ? new Date() : null;

    if (workout.exercises) {
      workout.exercises.forEach((ex) => {
        ex.completed = workout.isCompleted;
      });
    }

    await workout.save();

    // Increment user completed workouts stat on completion
    if (workout.isCompleted) {
      await User.findByIdAndUpdate(req.user.id, { $inc: { workoutsCompleted: 1 } });
    }

    return successResponse(
      res,
      200,
      workout.isCompleted ? 'Workout marked as complete! Great work!' : 'Workout status reset',
      { workout }
    );
  } catch (error) {
    next(error);
  }
};
