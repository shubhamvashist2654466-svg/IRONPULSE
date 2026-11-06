import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please provide a valid athlete email address.'
      });
      return;
    }

    setSubmitted(true);
    showToast({
      type: 'success',
      title: 'Reset Link Dispatched!',
      message: 'Simulated password reset email sent to your inbox.'
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-radial-grid">
      <div className="max-w-md w-full p-8 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-neon/15 border border-neon/30 flex items-center justify-center text-neon mx-auto shadow-neon-sm">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white">
            RECOVER CREDENTIALS
          </h2>
          <p className="text-xs text-zinc-400">
            Enter your account email to receive your password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-dark-850 border border-neon/30 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-neon mx-auto" />
            <h4 className="text-sm font-bold text-white">Reset Link Dispatched</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              We've dispatched password recovery instructions to <strong className="text-neon">{email}</strong>.
            </p>
            <Link
              to="/login"
              className="inline-block mt-4 text-xs font-bold text-neon hover:underline"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Registered Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="athlete@ironpulse.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-neon text-black font-extrabold text-xs uppercase tracking-wide hover:bg-neon-hover shadow-neon-sm transition-all"
            >
              Send Password Reset Link
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-dark-700/60">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

