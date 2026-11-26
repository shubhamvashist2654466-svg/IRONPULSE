import crypto from 'crypto';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * @desc    Register new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      age,
      gender,
      height,
      weight,
      goal,
      fitnessExperience,
      dietaryPreference,
      workoutLocation,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, 400, 'An athlete account with this email address already exists.');
    }

    const user = await User.create({
      name,
      email,
      password,
      age,
      gender,
      height,
      weight,
      goal,
      fitnessExperience,
      dietaryPreference,
      workoutLocation,
    });

    const token = generateToken(user._id);

    return successResponse(
      res,
      201,
      'Athlete registered successfully! Welcome to IRONPULSE.',
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          goal: user.goal,
          dietaryPreference: user.dietaryPreference,
          height: user.height,
          weight: user.weight,
          avatar: user.avatar,
          streakDays: user.streakDays,
        },
        token,
      }
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user & get JWT token
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return errorResponse(res, 401, 'Invalid credentials. User not found.');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return errorResponse(res, 401, 'Invalid credentials. Password incorrect.');
    }

    const token = generateToken(user._id);

    return successResponse(
      res,
      200,
      'Authentication successful! Welcome back, athlete.',
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          goal: user.goal,
          dietaryPreference: user.dietaryPreference,
          height: user.height,
          weight: user.weight,
          avatar: user.avatar,
          streakDays: user.streakDays,
          workoutsCompleted: user.workoutsCompleted,
        },
        token,
      }
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user / clear token
 * @route   POST /api/v1/auth/logout
 * @access  Public
 */
export const logout = async (req, res) => {
  return successResponse(res, 200, 'Logged out successfully from IRONPULSE session.');
};

/**
 * @desc    Get currently logged in user
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('favoriteExercises', 'name category equipment difficulty');
    return successResponse(res, 200, 'User profile retrieved', { user });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Forgot password: generate reset token
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // Return 200 even if user not found for security enumeration prevention
      return successResponse(
        res,
        200,
        'If an account exists with this email, password reset instructions have been generated.'
      );
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes valid
    await user.save({ validateBeforeSave: false });

    // In a production app, send via Nodemailer / SendGrid. Here we return simulate response
    return successResponse(
      res,
      200,
      'Password reset token generated. Valid for 30 minutes.',
      {
        simulatedResetToken: resetToken,
        instructions: 'Submit token and newPassword to /api/v1/auth/reset-password',
      }
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reset password using reset token
 * @route   POST /api/v1/auth/reset-password
 * @access  Public
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return errorResponse(res, 400, 'Invalid or expired password reset token.');
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const jwtToken = generateToken(user._id);

    return successResponse(res, 200, 'Password has been reset successfully. You are now logged in.', {
      token: jwtToken,
    });
  } catch (error) {
    next(error);
  }
};
