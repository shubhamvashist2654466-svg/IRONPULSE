import { uploadToCloudinary } from '../config/cloudinary.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * @desc    Upload an image file (supports local storage and optional Cloudinary)
 * @route   POST /api/v1/upload/image
 * @access  Private
 */
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 400, 'No image file uploaded');
    }

    let imageUrl = `/uploads/${req.file.filename}`;

    // If Cloudinary credentials are set in environment, upload to Cloudinary CDN
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      try {
        const cloudResult = await uploadToCloudinary(req.file.path, 'ironpulse');
        imageUrl = cloudResult.secure_url;
      } catch (cloudErr) {
        console.warn('⚠️ Cloudinary upload failed, falling back to local storage URL:', cloudErr.message);
      }
    }

    return successResponse(res, 201, 'Image uploaded successfully', {
      url: imageUrl,
      filename: req.file.filename,
      sizeBytes: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    next(error);
  }
};
