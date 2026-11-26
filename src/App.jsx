import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Protected Pages (Mandatory Authentication)
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import WorkoutPlanner from './pages/WorkoutPlanner';
import AICoach from './pages/AICoach';
import WorkoutGenerator from './pages/WorkoutGenerator';
import Nutrition from './pages/Nutrition';
import DietGenerator from './pages/DietGenerator';
import Calculators from './pages/Calculators';
import Progress from './pages/Progress';
import Activity from './pages/Activity';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Community from './pages/Community';
import Profile from './pages/Profile';

// Public Authentication Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen bg-dark-950 text-white flex flex-col selection:bg-neon selection:text-black">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Authentication Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Mandatory Protected Internal Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/workouts"
                  element={
                    <ProtectedRoute>
                      <Workouts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/planner"
                  element={
                    <ProtectedRoute>
                      <WorkoutPlanner />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-coach"
                  element={
                    <ProtectedRoute>
                      <AICoach />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/workout-generator"
                  element={
                    <ProtectedRoute>
                      <WorkoutGenerator />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/nutrition"
                  element={
                    <ProtectedRoute>
                      <Nutrition />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/diet-generator"
                  element={
                    <ProtectedRoute>
                      <DietGenerator />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/calculators"
                  element={
                    <ProtectedRoute>
                      <Calculators />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/progress"
                  element={
                    <ProtectedRoute>
                      <Progress />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/activity"
                  element={
                    <ProtectedRoute>
                      <Activity />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <ProtectedRoute>
                      <Blog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog/:id"
                  element={
                    <ProtectedRoute>
                      <BlogDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/community"
                  element={
                    <ProtectedRoute>
                      <Community />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}
