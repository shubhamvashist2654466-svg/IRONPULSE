import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Zap,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: 25,
    gender: 'male',
    height: 178,
    weight: 75,
    goal: 'muscle_gain',
    dietaryPreference: 'non_vegetarian',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { signup, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Real-time password calculations
  const passwordsMatch = Boolean(
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword
  );

  const passwordsMismatch = Boolean(
    formData.confirmPassword &&
    formData.password !== formData.confirmPassword
  );

  const hasMinLength = formData.password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(formData.password);
  const hasNumberOrSymbol = /[\d\W]/.test(formData.password);

  // Compute strength score (0 to 3)
  const strengthScore =
    (hasMinLength ? 1 : 0) + (hasLetter ? 1 : 0) + (hasNumberOrSymbol ? 1 : 0);

  const getStrengthLabel = () => {
    if (!formData.password) return { text: '', color: '' };
    if (strengthScore === 1) return { text: 'Weak', color: 'text-red-400', bar: 'bg-red-500 w-1/3' };
    if (strengthScore === 2) return { text: 'Medium', color: 'text-yellow-400', bar: 'bg-yellow-400 w-2/3' };
    return { text: 'Strong', color: 'text-neon', bar: 'bg-neon w-full' };
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Full name and email address are required.');
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      setErrorMessage('Both password fields are mandatory.');
      return;
    }

    if (!hasMinLength) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please try again.');
      return;
    }

    setLoading(true);

    try {
      const res = await signup(formData);

      if (res.success) {
        setSuccessMessage('Athlete registered successfully! Welcome to IRONPULSE.');
        showToast({
          type: 'success',
          title: 'Athlete Account Created!',
          message: 'Welcome to the IRONPULSE performance platform.',
        });

        // Redirect to homepage or intended route after a brief confirmation
        setTimeout(() => {
          const destination = location.state?.from?.pathname || '/';
          navigate(destination, { replace: true });
        }, 800);
      } else {
        setErrorMessage(res.message || 'Registration failed. Please try again.');
        showToast({
          type: 'error',
          title: 'Registration Error',
          message: res.message || 'Could not create account.',
        });
      }
    } catch (err) {
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const strength = getStrengthLabel();

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-radial-grid">
      <div className="max-w-lg w-full p-6 sm:p-8 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-2xl space-y-6">
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

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        {/* Success Banner */}
        {successMessage && (
          <div className="p-3.5 rounded-xl bg-neon/10 border border-neon/30 flex items-center gap-3 text-neon text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-neon" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Full Name <span className="text-neon">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Marcus Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-medium transition-colors"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Email Address <span className="text-neon">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="athlete@ironpulse.io"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-medium transition-colors"
              />
            </div>
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Age <span className="text-neon">*</span>
              </label>
              <input
                type="number"
                min="12"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                required
                className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-neon transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Gender <span className="text-neon">*</span>
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-neon transition-colors"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Create Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Create Password <span className="text-neon">*</span>
              </label>
              {strength.text && (
                <span className={`text-[10px] font-bold ${strength.color}`}>
                  Strength: {strength.text}
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className={`w-full bg-dark-800 border rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none font-medium transition-colors ${
                  formData.password
                    ? hasMinLength
                      ? 'border-dark-600 focus:border-neon'
                      : 'border-yellow-500/50 focus:border-yellow-500'
                    : 'border-dark-600 focus:border-neon'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength Progress Bar */}
            {formData.password && (
              <div className="mt-2 space-y-1.5">
                <div className="w-full bg-dark-700 h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.bar}`}
                  />
                </div>
                {/* Requirements Checklist */}
                <div className="grid grid-cols-3 gap-1 text-[10px]">
                  <span
                    className={`flex items-center gap-1 ${
                      hasMinLength ? 'text-neon font-semibold' : 'text-zinc-500'
                    }`}
                  >
                    {hasMinLength ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    8+ chars
                  </span>
                  <span
                    className={`flex items-center gap-1 ${
                      hasLetter ? 'text-neon font-semibold' : 'text-zinc-500'
                    }`}
                  >
                    {hasLetter ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    Letter
                  </span>
                  <span
                    className={`flex items-center gap-1 ${
                      hasNumberOrSymbol ? 'text-neon font-semibold' : 'text-zinc-500'
                    }`}
                  >
                    {hasNumberOrSymbol ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    Num / Symbol
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Confirm Password <span className="text-neon">*</span>
              </label>
              {formData.confirmPassword && (
                <span
                  className={`text-[10px] font-bold ${
                    passwordsMatch ? 'text-neon' : 'text-red-400'
                  }`}
                >
                  {passwordsMatch ? '✓ Passwords Match' : '✕ Do Not Match'}
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className={`w-full bg-dark-800 border rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none font-medium transition-colors ${
                  formData.confirmPassword
                    ? passwordsMatch
                      ? 'border-neon/60 focus:border-neon'
                      : 'border-red-500/60 focus:border-red-500'
                    : 'border-dark-600 focus:border-neon'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Real-time Match Warning */}
            {passwordsMismatch && (
              <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                Passwords do not match. Please try again.
              </p>
            )}
            {passwordsMatch && (
              <p className="mt-1.5 text-[11px] text-neon flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                Passwords confirmed and matched.
              </p>
            )}
          </div>

          {/* Metrics: Height & Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                min="100"
                max="250"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-neon transition-colors"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                min="30"
                max="300"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-neon transition-colors"
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
              className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-neon transition-colors"
            >
              <option value="muscle_gain">Muscle Hypertrophy</option>
              <option value="fat_loss">Fat Loss & Conditioning</option>
              <option value="strength">Pure Heavy Strength</option>
              <option value="general_fitness">General Health & Fitness</option>
              <option value="endurance">Cardiovascular Endurance</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || (formData.confirmPassword && !passwordsMatch) || !hasMinLength}
            className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wide transition-all mt-2 ${
              loading || (formData.confirmPassword && !passwordsMatch) || !hasMinLength
                ? 'bg-dark-700 text-zinc-500 cursor-not-allowed border border-dark-600'
                : 'bg-neon text-black hover:bg-neon-hover shadow-neon-sm cursor-pointer'
            }`}
          >
            {loading ? 'Creating Athlete Profile...' : 'Complete Athlete Registration'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-2 border-t border-dark-700/60">
          <p className="text-xs text-zinc-400">
            Already have an athlete account?{' '}
            <Link to="/login" className="text-neon font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
