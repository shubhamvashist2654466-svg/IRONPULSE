import Progress from '../models/Progress.js';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * @desc    Log weight & measurements check-in
 * @route   POST /api/v1/progress
 * @access  Private
 */
export const logProgress = async (req, res, next) => {
  try {
    const { date, weight, bodyFatPercentage, measurements, photos, notes } = req.body;

    const entry = await Progress.create({
      user: req.user.id,
      date,
      weight,
      bodyFatPercentage,
      measurements,
      photos,
      notes,
    });

    // Update user current weight
    await User.findByIdAndUpdate(req.user.id, { weight });

    return successResponse(res, 201, 'Progress check-in logged successfully', { entry });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get progress logs history
 * @route   GET /api/v1/progress
 * @access  Private
 */
export const getProgressHistory = async (req, res, next) => {
  try {
    const logs = await Progress.find({ user: req.user.id }).sort({ date: 1 });

    return successResponse(res, 200, 'Progress history retrieved', { logs });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get progress analytics summary (weight change, trends, charts data)
 * @route   GET /api/v1/progress/summary
 * @access  Private
 */
export const getProgressSummary = async (req, res, next) => {
  try {
    const logs = await Progress.find({ user: req.user.id }).sort({ date: 1 });

    if (logs.length === 0) {
      return successResponse(res, 200, 'No progress records found yet', {
        startWeight: 0,
        currentWeight: 0,
        weightChange: 0,
        totalEntries: 0,
        chartData: [],
      });
    }

    const startWeight = logs[0].weight;
    const currentWeight = logs[logs.length - 1].weight;
    const weightChange = Math.round((currentWeight - startWeight) * 10) / 10;

    const chartData = logs.map((log) => ({
      date: log.date,
      weight: log.weight,
      bodyFat: log.bodyFatPercentage || null,
    }));

    return successResponse(res, 200, 'Progress summary computed', {
      startWeight,
      currentWeight,
      weightChange,
      totalEntries: logs.length,
      chartData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete progress record
 * @route   DELETE /api/v1/progress/:id
 * @access  Private
 */
export const deleteProgress = async (req, res, next) => {
  try {
    const entry = await Progress.findById(req.params.id);
    if (!entry) {
      return errorResponse(res, 404, 'Progress record not found');
    }

    if (entry.user.toString() !== req.user.id) {
      return errorResponse(res, 403, 'Unauthorized');
    }

    await entry.deleteOne();
    return successResponse(res, 200, 'Progress check-in removed');
  } catch (error) {
    next(error);
  }
};
