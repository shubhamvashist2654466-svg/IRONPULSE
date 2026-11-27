import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config();

// Configure Cloudinary with environment variables
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  console.log('☁️  Cloudinary configured successfully.');
} else {
  console.log('ℹ️  Cloudinary credentials not provided in .env - falling back to local file storage.');
}

/**
 * Upload image buffer or path to Cloudinary
 * @param {string|Buffer} fileSource - Local file path or buffer
 * @param {string} folder - Destination folder on Cloudinary
 * @returns {Promise<object>} Upload result with secure_url
 */
export const uploadToCloudinary = async (fileSource, folder = 'ironpulse') => {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary is not configured. Please set Cloudinary credentials in .env');
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileSource,
      {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto:good' }, { fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
};

export default cloudinary;
