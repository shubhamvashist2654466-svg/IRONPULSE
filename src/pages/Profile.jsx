import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Calendar,
  Flame,
  Dumbbell,
  Heart,
  Edit2,
  LogOut,
  Award,
  Zap,
  Scale,
  Apple,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { EXERCISES } from '../data/exercises';

export default function Profile() {
  const { user, updateProfile, logout, favorites, toggleFavorite } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || 26,
    height: user?.height || 180,
    weight: user?.weight || 78.5,
    goal: user?.goal || 'muscle_gain',
    dietaryPreference: user?.dietaryPreference || 'vegetarian',
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setEditModalOpen(false);
    showToast({
      type: 'success',
      title: 'Profile Updated!',
      message: 'Your athlete telemetry has been refreshed.'
    });
  };

  const favoriteExercisesList = EXERCISES.filter((ex) => favorites.includes(ex.id));

  return (
    <div className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Athlete Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={user?.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-neon/50 shadow-neon-sm"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-dark-950 rounded-full">
                <span className="w-3.5 h-3.5 rounded-full bg-neon block" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
                  {user?.name || 'Alex Mercer'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neon text-black font-mono">
                  {user?.membership || 'PRO ATHLETE'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5 font-mono">
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                {user?.email}
              </p>
              <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2 font-mono">
                <span>Member since {user?.joinedDate || 'Jan 2026'}</span>
                <span>•</span>
                <span className="text-neon font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {user?.streakDays || 14} Day Streak
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setEditModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 border border-dark-600 hover:border-neon text-zinc-200 text-xs font-semibold transition-all"
            >
              <Edit2 className="w-3.5 h-3.5 text-neon" />
              <span>Edit Metrics</span>
            </button>
            <button
              onClick={() => {
                logout();
                showToast({ type: 'info', title: 'Signed Out', message: 'See you next session, athlete.' });
                navigate('/login');
              }}
              className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 text-xs font-semibold"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Current Mass</span>
          <p className="text-2xl font-bold font-display text-white mt-1">{user?.weight} kg</p>
          <span className="text-[11px] text-zinc-500 font-mono">Height: {user?.height} cm</span>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Fitness Objective</span>
          <p className="text-base font-bold font-display text-neon mt-1 capitalize">
            {user?.goal?.replace('_', ' ') || 'Muscle Gain'}
          </p>
          <span className="text-[11px] text-zinc-500 font-mono">Lean Hypertrophy</span>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Diet Protocol</span>
          <p className="text-base font-bold font-display text-cyan-400 mt-1 capitalize">
            {user?.dietaryPreference?.replace('_', ' ') || 'Vegetarian'}
          </p>
          <span className="text-[11px] text-zinc-500 font-mono">High Protein Matrix</span>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Total Logged</span>
          <p className="text-2xl font-bold font-display text-white mt-1">
            {user?.workoutsCompleted || 48}
          </p>
          <span className="text-[11px] text-zinc-500 font-mono">Workouts completed</span>
        </div>
      </div>

      {/* Saved / Favorite Exercises */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-dark-700">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400 fill-current" />
            <h3 className="text-lg font-bold text-white">Bookmarked & Favorite Exercises</h3>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            {favoriteExercisesList.length} movements pinned
          </span>
        </div>

        {favoriteExercisesList.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 text-xs">
            <Dumbbell className="w-8 h-8 mx-auto mb-2 opacity-40" />
            No exercises saved yet. Browse the workout library and click the heart icon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteExercisesList.map((ex) => (
              <div
                key={ex.id}
                className="p-3.5 rounded-2xl bg-dark-850 border border-dark-750 flex items-center justify-between group hover:border-neon/40 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <img src={ex.image} alt={ex.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-neon">
                      {ex.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400">{ex.category} • {ex.equipment}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    toggleFavorite(ex.id);
                    showToast({ type: 'info', title: 'Removed', message: `${ex.name} removed from favorites.` });
                  }}
                  className="text-zinc-500 hover:text-red-400 p-1.5 transition-colors"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-dark-900 border border-dark-600 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Edit Athlete Metrics</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Athlete Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-neon"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                    className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Fitness Goal</label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                >
                  <option value="muscle_gain">Muscle Hypertrophy</option>
                  <option value="fat_loss">Fat Loss</option>
                  <option value="strength">Heavy Strength</option>
                  <option value="endurance">Endurance</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Dietary Preference</label>
                <select
                  value={formData.dietaryPreference}
                  onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non_vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="eggetarian">Eggetarian</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-dark-800 text-zinc-400 text-xs font-semibold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-neon text-black text-xs font-bold hover:bg-neon-hover shadow-neon-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

