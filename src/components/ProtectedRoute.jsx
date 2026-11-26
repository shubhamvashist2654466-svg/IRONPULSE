import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap } from 'lucide-react';

/**
 * ProtectedRoute Component
 * Strict access control wrapper.
 * Prevents unauthenticated users from accessing any internal page.
 * Redirects to /login preserving the intended destination for seamless post-login redirect.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-4">
        <div className="w-14 h-14 rounded-2xl bg-neon/10 border border-neon/30 flex items-center justify-center shadow-neon-sm mb-4 animate-pulse">
          <Zap className="w-7 h-7 text-neon animate-bounce" />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
          Verifying Athlete Security Credentials...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated athlete to login and record previous location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
