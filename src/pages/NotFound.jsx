import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowLeft, Dumbbell, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 text-center bg-radial-grid">
      <div className="max-w-md w-full space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-neon/15 border border-neon/40 flex items-center justify-center text-neon mx-auto shadow-neon">
          <Zap className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-neon uppercase tracking-widest">
            ERROR 404 • SIGNAL LOST
          </span>
          <h1 className="text-4xl sm:text-5xl font-black font-display text-white">
            PAGE NOT FOUND
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            The training protocol or page you requested does not exist or has been relocated to another server sector.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neon text-black font-bold text-xs hover:bg-neon-hover shadow-neon-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
          <Link
            to="/workouts"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-dark-800 text-white font-semibold text-xs border border-dark-600 hover:border-neon transition-all"
          >
            <Dumbbell className="w-4 h-4 text-neon" />
            <span>Browse Workouts</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

