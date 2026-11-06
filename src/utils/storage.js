/**
 * Storage constants and helper functions
 */

export const STORAGE_KEYS = {
  USER_PROFILE: 'ironpulse_user_profile',
  AUTH_TOKEN: 'ironpulse_auth_token',
  WORKOUT_PLAN: 'ironpulse_weekly_workout_plan',
  FAVORITE_EXERCISES: 'ironpulse_favorite_exercises',
  NUTRITION_LOG: 'ironpulse_nutrition_daily_log',
  PROGRESS_LOGS: 'ironpulse_progress_entries',
  SAVED_DIET_PLAN: 'ironpulse_saved_diet_plan',
  ACTIVITY_DATA: 'ironpulse_activity_data',
  COMMUNITY_POSTS: 'ironpulse_community_posts',
  NOTIFICATIONS: 'ironpulse_notifications',
};

export const DEFAULT_USER = {
  id: 'usr_ironpulse_1',
  name: 'Alex Mercer',
  email: 'alex.mercer@ironpulse.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  age: 26,
  gender: 'male',
  height: 180, // cm
  weight: 78.5, // kg
  goal: 'muscle_gain', // muscle_gain, fat_loss, strength, endurance
  experience: 'intermediate', // beginner, intermediate, advanced
  dietaryPreference: 'non_vegetarian', // vegetarian, non_vegetarian, vegan
  targetCalories: 2650,
  targetProtein: 165,
  targetCarbs: 310,
  targetFats: 70,
  membership: 'PRO ATHLETE',
  joinedDate: 'Jan 2026',
  streakDays: 14,
  workoutsCompleted: 48,
};

