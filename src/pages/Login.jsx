import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Zap, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect immediately to homepage or intended route
  useEffect(() => {
    if (isAuthenticated) {
      const destination = location.state?.from?.pathname || '/';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both email address and password.');
      showToast({
        type: 'error',
        title: 'Missing Fields',
        message: 'Please provide both email and password.',
      });
      return;
    }

    setLoading(true);

    try {
      const res = await login(email, password, rememberMe);

      if (res.success) {
        showToast({
          type: 'success',
          title: 'Welcome Back, Athlete!',
          message: 'Successfully authenticated to IRONPULSE.',
        });

        // Redirect to intended route or homepage
        const destination = location.state?.from?.pathname || '/';
        navigate(destination, { replace: true });
      } else {
        setErrorMessage(res.message || 'Invalid email or password.');
        showToast({
          type: 'error',
          title: 'Authentication Failed',
          message: res.message || 'Invalid credentials.',
        });
      }
    } catch (err) {
      setErrorMessage('Unable to connect to authentication service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('alex.mercer@ironpulse.io');
    setPassword('IronPulse#2026');
    setErrorMessage('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-radial-grid">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-neon/15 border border-neon/30 flex items-center justify-center text-neon mx-auto shadow-neon-sm">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            WELCOME BACK
          </h2>
          <p className="text-xs text-zinc-400">
            Sign in to access your workouts, telemetry, nutrition logs, and AI Coach.
          </p>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        {/* Demo Account Quick Fill Button */}
        <button
          type="button"
          onClick={handleFillDemo}
          className="w-full py-2.5 rounded-xl bg-neon/10 hover:bg-neon/20 border border-neon/30 text-neon text-xs font-bold transition-all text-center flex items-center justify-center gap-2 group"
        >
          <Zap className="w-3.5 h-3.5 text-neon group-hover:scale-110 transition-transform" />
          Click to Autofill Demo Athlete Account
        </button>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="athlete@ironpulse.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-medium transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] text-neon hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-medium transition-colors"
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
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-dark-800 border-dark-600 text-neon focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#C6FF3D]"
              />
              <span>Remember athlete session</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wide transition-all ${
              loading
                ? 'bg-dark-700 text-zinc-500 cursor-not-allowed border border-dark-600'
                : 'bg-neon text-black hover:bg-neon-hover shadow-neon-sm cursor-pointer'
            }`}
          >
            {loading ? 'Authenticating Athlete...' : 'Sign In to IronPulse'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-2 border-t border-dark-700/60">
          <p className="text-xs text-zinc-400">
            Don't have an athlete account?{' '}
            <Link to="/signup" className="text-neon font-bold hover:underline">
              Sign Up Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
