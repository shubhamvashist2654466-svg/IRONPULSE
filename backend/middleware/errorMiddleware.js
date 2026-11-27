import { errorResponse } from '../utils/apiResponse.js';

/**
 * 404 Not Found Handler for unmatched routes
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Resource not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Central Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Mongoose Bad ObjectId or CastError
  if (err.name === 'CastError') {
    statusCode = 404;
    message = `Resource not found with ID of '${err.value}'`;
  }

  // Mongoose Duplicate Key Error (Code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = err.keyValue ? Object.keys(err.keyValue)[0] : 'field';
    message = `Duplicate value entered for field '${field}'. An account or resource already exists with this ${field}.`;
  }

  // Mongoose Schema Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error occurred';
    errors = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message,
    }));
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token expired';
  }

  // Multer File Upload Errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'File size limit exceeded. Maximum file size allowed is 5MB.';
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('💥 Error Stack:', err.stack);
  }

  return errorResponse(res, statusCode, message, errors);
};
