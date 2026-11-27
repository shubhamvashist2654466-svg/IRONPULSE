import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import nutritionRoutes from './routes/nutritionRoutes.js';
import dietRoutes from './routes/dietRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import calculatorRoutes from './routes/calculatorRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables reliably from backend/.env regardless of execution directory
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config(); // fallback to current working directory if present

const app = express();

// Security: Helmet HTTP Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration for React frontend
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Dev-friendly permissive origin
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// HTTP request logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Request Rate Limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many requests from this IP address. Please slow down and try again later.',
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 authentication attempts
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});

app.use('/api/', generalLimiter);
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Favicon handler to prevent 404 errors in browser requests
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.status(200).json({
    status: 'healthy',
    platform: 'IRONPULSE REST API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: dbStatusMap[dbState] || 'unknown',
  });
});

// Root Information Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'IRONPULSE Backend API',
    tagline: 'STRENGTH MEETS SCIENCE',
    version: '1.0.0',
    documentation: '/api/v1',
    status: 'online',
  });
});

// Mount API v1 Routes
const API_PREFIX = '/api/v1';

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/workouts`, workoutRoutes);
app.use(`${API_PREFIX}/exercises`, exerciseRoutes);
app.use(`${API_PREFIX}/nutrition`, nutritionRoutes);
app.use(`${API_PREFIX}/diet-plans`, dietRoutes);
app.use(`${API_PREFIX}/progress`, progressRoutes);
app.use(`${API_PREFIX}/activity`, activityRoutes);
app.use(`${API_PREFIX}/blogs`, blogRoutes);
app.use(`${API_PREFIX}/community`, communityRoutes);
app.use(`${API_PREFIX}/upload`, uploadRoutes);
app.use(`${API_PREFIX}/calculators`, calculatorRoutes);
app.use(`${API_PREFIX}/notifications`, notificationRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Server Initialization
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                   IRONPULSE API SERVER                     ║
║              STRENGTH MEETS SCIENCE BACKEND                ║
╠════════════════════════════════════════════════════════════╣
║  🚀 Port:        ${PORT}                                      ║
║  🌐 Environment: ${process.env.NODE_ENV || 'development'}                               ║
║  📡 API Base:    http://localhost:${PORT}/api/v1             ║
║  💚 Health Check http://localhost:${PORT}/api/health         ║
╚════════════════════════════════════════════════════════════╝
    `);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️  Port ${PORT} is already in use by an active process.`);
    } else {
      console.error(`❌ Server startup error: ${err.message}`);
    }
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`💥 Unhandled Rejection: ${err.message}`);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error(`💥 Uncaught Exception: ${err.message}`);
  });
};

startServer();

export default app;
