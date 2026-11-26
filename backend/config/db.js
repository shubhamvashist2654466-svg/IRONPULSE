import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * Supports both local MongoDB and MongoDB Atlas URIs
 */
export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error('❌ MONGODB_URI is not defined in backend/.env');
      process.exit(1);
    }

    if (mongoUri.includes('<db_username>') || mongoUri.includes('<db_password>')) {
      console.warn(
        '⚠️  MONGODB_URI contains placeholder <db_username> or <db_password>!\n' +
        '👉 Please replace them with your actual MongoDB Atlas database user credentials in backend/.env'
      );
      return null;
    }

    const conn = await mongoose.connect(mongoUri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting reconnection...');
    });

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.warn('⚠️  Make sure your IP address is whitelisted in MongoDB Atlas Network Access and credentials are correct.');
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
