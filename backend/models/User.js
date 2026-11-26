import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    age: {
      type: Number,
      min: [12, 'Age must be at least 12'],
      max: [100, 'Age cannot exceed 100'],
      default: 25,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: 'male',
    },
    height: {
      type: Number, // in centimeters
      min: [100, 'Height must be at least 100 cm'],
      max: [250, 'Height cannot exceed 250 cm'],
      default: 178,
    },
    weight: {
      type: Number, // in kilograms
      min: [30, 'Weight must be at least 30 kg'],
      max: [300, 'Weight cannot exceed 300 kg'],
      default: 75,
    },
    goal: {
      type: String,
      enum: ['muscle_gain', 'fat_loss', 'strength', 'general_fitness', 'endurance'],
      default: 'muscle_gain',
    },
    fitnessExperience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    dietaryPreference: {
      type: String,
      enum: ['vegetarian', 'non_vegetarian', 'vegan', 'eggetarian'],
      default: 'vegetarian',
    },
    workoutLocation: {
      type: String,
      enum: ['gym', 'home'],
      default: 'gym',
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    role: {
      type: String,
      enum: ['user', 'coach', 'admin'],
      default: 'user',
    },
    streakDays: {
      type: Number,
      default: 1,
    },
    workoutsCompleted: {
      type: Number,
      default: 0,
    },
    favoriteExercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user-entered password with hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
