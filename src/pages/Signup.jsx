import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: 25,
    gender: 'male',
    height: 178,
    weight: 75,
    goal: 'muscle_gain',
    dietaryPreference: 'vegetarian',
  });

  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      showToast({
        type: 'error',
        title: 'Missing Details',
        message: 'Please complete all required fields.'
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      signup(formData);
      setLoading(false);
      showToast({
        type: 'success',
        title: 'Athlete Account Created!',
        message: 'Welcome to the IronPulse ecosystem.'
      });
      navigate('/profile');
    }, 600);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-radial-grid">
      <div className="max-w-lg w-full p-8 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-neon/15 border border-neon/30 flex items-center justify-center text-neon mx-auto shadow-neon-sm">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            JOIN IRONPULSE
          </h2>
          <p className="text-xs text-zinc-400">
            Create your athlete profile to start generating scientific training splits.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Marcus Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="athlete@ironpulse.io"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-medium"
              />
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Weight (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
              />
            </div>
          </div>

          {/* Primary Goal */}
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Primary Goal
            </label>
            <select
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2.5 text-xs text-white font-bold"
            >
              <option value="muscle_gain">Muscle Hypertrophy</option>
              <option value="fat_loss">Fat Loss & Conditioning</option>
              <option value="strength">Pure Heavy Strength</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-neon text-black font-extrabold text-xs uppercase tracking-wide hover:bg-neon-hover shadow-neon-sm transition-all mt-2"
          >
            {loading ? 'Creating Account...' : 'Complete Athlete Registration'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-dark-700/60">
          <p className="text-xs text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="text-neon font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

