import DietPlan from '../models/DietPlan.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * @desc    Get user diet plans or platform templates
 * @route   GET /api/v1/diet-plans
 * @access  Private
 */
export const getDietPlans = async (req, res, next) => {
  try {
    const plans = await DietPlan.find({
      $or: [{ user: req.user.id }, { isTemplate: true }],
    }).sort({ createdAt: -1 });

    return successResponse(res, 200, 'Diet plans retrieved', { plans });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single diet plan by ID
 * @route   GET /api/v1/diet-plans/:id
 * @access  Private
 */
export const getDietPlanById = async (req, res, next) => {
  try {
    const plan = await DietPlan.findById(req.params.id);
    if (!plan) {
      return errorResponse(res, 404, 'Diet plan not found');
    }

    return successResponse(res, 200, 'Diet plan retrieved', { plan });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create personalized diet plan
 * @route   POST /api/v1/diet-plans
 * @access  Private
 */
export const createDietPlan = async (req, res, next) => {
  try {
    const {
      planName,
      fitnessGoal,
      dietaryPreference,
      dailyCalorieTarget,
      proteinTarget,
      carbohydrateTarget,
      fatTarget,
      description,
      mealSchedule,
    } = req.body;

    const plan = await DietPlan.create({
      user: req.user.id,
      planName,
      fitnessGoal,
      dietaryPreference,
      dailyCalorieTarget,
      proteinTarget,
      carbohydrateTarget,
      fatTarget,
      description,
      mealSchedule: mealSchedule || [],
      isTemplate: false,
    });

    return successResponse(res, 201, 'Diet plan formulated and saved successfully', { plan });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update personalized diet plan
 * @route   PUT /api/v1/diet-plans/:id
 * @access  Private
 */
export const updateDietPlan = async (req, res, next) => {
  try {
    let plan = await DietPlan.findById(req.params.id);
    if (!plan) {
      return errorResponse(res, 404, 'Diet plan not found');
    }

    if (!plan.user) {
      if (req.user.role !== 'admin') {
        return errorResponse(res, 403, 'Only administrators can modify curated template diet plans');
      }
    } else if (plan.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'Unauthorized to edit this diet plan');
    }

    plan = await DietPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return successResponse(res, 200, 'Diet plan updated successfully', { plan });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete diet plan
 * @route   DELETE /api/v1/diet-plans/:id
 * @access  Private
 */
export const deleteDietPlan = async (req, res, next) => {
  try {
    const plan = await DietPlan.findById(req.params.id);
    if (!plan) {
      return errorResponse(res, 404, 'Diet plan not found');
    }

    if (!plan.user) {
      if (req.user.role !== 'admin') {
        return errorResponse(res, 403, 'Only administrators can delete curated template diet plans');
      }
    } else if (plan.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'Unauthorized');
    }

    await plan.deleteOne();
    return successResponse(res, 200, 'Diet plan deleted successfully');
  } catch (error) {
    next(error);
  }
};
