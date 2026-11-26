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

    const conn = await mongoose.connect(mongoUri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting reconnection...');
    });

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.warn('⚠️  Make sure MongoDB is running or update MONGODB_URI in backend/.env');
    // We don't crash in development immediately so server can still serve non-DB routes if needed
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
