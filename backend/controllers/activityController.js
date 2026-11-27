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

    const updateFields = {};
    if (steps !== undefined) updateFields.steps = Number(steps);
    if (stepTarget !== undefined) updateFields.stepTarget = Number(stepTarget);
    if (activeCalories !== undefined) updateFields.activeCalories = Number(activeCalories);
    if (distanceKm !== undefined) updateFields.distanceKm = Number(distanceKm);
    if (activeMinutes !== undefined) updateFields.activeMinutes = Number(activeMinutes);
    if (workoutDurationMinutes !== undefined) updateFields.workoutDurationMinutes = Number(workoutDurationMinutes);
    if (sleepHours !== undefined) updateFields.sleepHours = Number(sleepHours);
    if (sleepStages !== undefined) updateFields.sleepStages = sleepStages;
    if (restingHeartRate !== undefined) updateFields.restingHeartRate = Number(restingHeartRate);

    const activity = await Activity.findOneAndUpdate(
      { user: req.user.id, date },
      {
        $set: updateFields,
        $setOnInsert: {
          user: req.user.id,
          date,
        },
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
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
