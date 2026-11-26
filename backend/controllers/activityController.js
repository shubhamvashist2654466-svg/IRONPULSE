import Activity from '../models/Activity.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * @desc    Log or update daily activity record
 * @route   POST /api/v1/activity
 * @access  Private
 */
export const logDailyActivity = async (req, res, next) => {
  try {
    const {
      date,
      steps,
      stepTarget,
      activeCalories,
      distanceKm,
      activeMinutes,
      workoutDurationMinutes,
      sleepHours,
      sleepStages,
      restingHeartRate,
    } = req.body;

    const activity = await Activity.findOneAndUpdate(
      { user: req.user.id, date },
      {
        user: req.user.id,
        date,
        steps: steps || 0,
        stepTarget: stepTarget || 10000,
        activeCalories: activeCalories || 0,
        distanceKm: distanceKm || 0,
        activeMinutes: activeMinutes || 0,
        workoutDurationMinutes: workoutDurationMinutes || 0,
        sleepHours: sleepHours || 0,
        sleepStages: sleepStages || { deepMinutes: 0, remMinutes: 0, lightMinutes: 0 },
        restingHeartRate: restingHeartRate || 60,
      },
      { new: true, upsert: true, runValidators: true }
    );

    return successResponse(res, 200, 'Activity record saved successfully', { activity });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get daily activity record
 * @route   GET /api/v1/activity/daily
 * @access  Private
 */
export const getDailyActivity = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const date = req.query.date || today;

    const activity = await Activity.findOne({ user: req.user.id, date });

    return successResponse(res, 200, 'Daily activity record retrieved', {
      activity: activity || {
        date,
        steps: 0,
        stepTarget: 10000,
        activeCalories: 0,
        distanceKm: 0,
        activeMinutes: 0,
        workoutDurationMinutes: 0,
        sleepHours: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get weekly activity history
 * @route   GET /api/v1/activity/weekly
 * @access  Private
 */
export const getWeeklyActivity = async (req, res, next) => {
  try {
    const activities = await Activity.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(7);

    return successResponse(res, 200, 'Weekly activity records retrieved', {
      weekly: activities.reverse(),
    });
  } catch (error) {
    next(error);
  }
};
