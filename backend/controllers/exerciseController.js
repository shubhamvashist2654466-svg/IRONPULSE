import Exercise from '../models/Exercise.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/apiResponse.js';

/**
 * @desc    Get all exercises with search, category, equipment & difficulty filters
 * @route   GET /api/v1/exercises
 * @access  Public
 */
export const getExercises = async (req, res, next) => {
  try {
    const {
      search,
      category,
      difficulty,
      equipment,
      page = 1,
      limit = 20,
      sortBy = 'name',
      sortOrder = 'asc',
    } = req.query;

    const query = {};

    // Search query across name, targetMuscle, and description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { targetMuscle: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by Category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Filter by Difficulty
    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }

    // Filter by Equipment
    if (equipment && equipment !== 'All') {
      query.equipment = equipment;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const total = await Exercise.countDocuments(query);
    const exercises = await Exercise.find(query).sort(sort).skip(skip).limit(Number(limit));

    return paginatedResponse(
      res,
      200,
      'Exercises fetched successfully',
      exercises,
      Number(page),
      Number(limit),
      total
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get exercise by ID or slug
 * @route   GET /api/v1/exercises/:id
 * @access  Public
 */
export const getExerciseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let exercise;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      exercise = await Exercise.findById(id);
    } else {
      exercise = await Exercise.findOne({ slug: id.toLowerCase() });
    }

    if (!exercise) {
      return errorResponse(res, 404, 'Exercise not found in the library');
    }

    return successResponse(res, 200, 'Exercise details retrieved', { exercise });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new custom exercise (User or Admin)
 * @route   POST /api/v1/exercises
 * @access  Private
 */
export const createExercise = async (req, res, next) => {
  try {
    const {
      name,
      category,
      targetMuscle,
      secondaryMuscles,
      equipment,
      difficulty,
      defaultSets,
      defaultReps,
      restSeconds,
      image,
      description,
      instructions,
      tips,
      commonMistakes,
    } = req.body;

    const existing = await Exercise.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return errorResponse(res, 400, 'An exercise with this name already exists');
    }

    const exercise = await Exercise.create({
      name,
      category,
      targetMuscle,
      secondaryMuscles: secondaryMuscles || [],
      equipment,
      difficulty: difficulty || 'Intermediate',
      defaultSets: defaultSets || 3,
      defaultReps: defaultReps || '8-10',
      restSeconds: restSeconds || 90,
      image: image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      description,
      instructions: instructions || ['Perform with controlled tempo and strict form.'],
      tips,
      commonMistakes,
      isCustom: true,
      createdBy: req.user.id,
    });

    return successResponse(res, 201, 'Custom exercise added successfully', { exercise });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update exercise
 * @route   PUT /api/v1/exercises/:id
 * @access  Private (Owner or Admin)
 */
export const updateExercise = async (req, res, next) => {
  try {
    let exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return errorResponse(res, 404, 'Exercise not found');
    }

    if (!exercise.createdBy) {
      if (req.user.role !== 'admin') {
        return errorResponse(res, 403, 'Only administrators can modify default library exercises');
      }
    } else if (exercise.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'Unauthorized to update this exercise');
    }

    exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return successResponse(res, 200, 'Exercise updated successfully', { exercise });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete custom exercise
 * @route   DELETE /api/v1/exercises/:id
 * @access  Private (Owner or Admin)
 */
export const deleteExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return errorResponse(res, 404, 'Exercise not found');
    }

    if (!exercise.createdBy) {
      if (req.user.role !== 'admin') {
        return errorResponse(res, 403, 'Only administrators can delete default library exercises');
      }
    } else if (exercise.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'Unauthorized to delete this exercise');
    }

    await exercise.deleteOne();
    return successResponse(res, 200, 'Exercise removed successfully');
  } catch (error) {
    next(error);
  }
};
