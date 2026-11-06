import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Pages
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
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
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
                <Route path="/" element={<Home />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/planner" element={<WorkoutPlanner />} />
                <Route path="/ai-coach" element={<AICoach />} />
                <Route path="/workout-generator" element={<WorkoutGenerator />} />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/diet-generator" element={<DietGenerator />} />
                <Route path="/calculators" element={<Calculators />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="/community" element={<Community />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile" element={<Profile />} />
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

