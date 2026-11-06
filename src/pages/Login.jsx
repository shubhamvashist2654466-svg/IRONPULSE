import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast({
        type: 'error',
        title: 'Missing Fields',
        message: 'Please provide both email and password.'
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      showToast({
        type: 'success',
        title: 'Welcome Back, Athlete!',
        message: 'Successfully authenticated to IRONPULSE.'
      });
      navigate('/profile');
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail('alex.mercer@ironpulse.io');
    setPassword('IronPulse#2026');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-radial-grid">
      <div className="max-w-md w-full p-8 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-neon/15 border border-neon/30 flex items-center justify-center text-neon mx-auto shadow-neon-sm">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            WELCOME BACK
          </h2>
          <p className="text-xs text-zinc-400">
            Sign in to access your workout schedules, telemetry, and nutrition logs.
          </p>
        </div>

        {/* Demo Account Quick Fill Button */}
        <button
          type="button"
          onClick={handleFillDemo}
          className="w-full py-2 rounded-xl bg-neon/10 hover:bg-neon/20 border border-neon/30 text-neon text-xs font-bold transition-all text-center"
        >
          ⚡ Click to Autofill Demo Athlete Account
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
                className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-medium"
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
                className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-neon text-black font-extrabold text-xs uppercase tracking-wide hover:bg-neon-hover shadow-neon-sm transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In to IronPulse'}
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

