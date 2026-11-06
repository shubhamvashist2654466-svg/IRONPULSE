import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, ArrowRight, ShieldCheck, HeartPulse, Award } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid email address to subscribe.'
      });
      return;
    }
    showToast({
      type: 'success',
      title: 'Subscribed to Pulse Newsletter!',
      message: 'Weekly science-backed workouts and nutrition insights sent to your inbox.'
    });
    setEmail('');
  };

  return (
    <footer className="bg-dark-950 border-t border-dark-700/80 text-zinc-400 text-sm">
      {/* Top Banner / Value Proposition */}
      <div className="border-b border-dark-700/50 bg-dark-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-800/40 border border-dark-700/60">
            <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-neon" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">AI-Powered Algorithms</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Automated progressive overload & macro precision.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-800/40 border border-dark-700/60">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <HeartPulse className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Evidence-Based Science</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Zero bro-science. Formulated on sports physiology.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-800/40 border border-dark-700/60">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Complete Ecosystem</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Workouts, nutrition, metrics, and community in one sync.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neon/15 border border-neon/40 flex items-center justify-center">
                <Zap className="w-5 h-5 text-neon" />
              </div>
              <span className="text-2xl font-black font-display tracking-wider text-white">
                IRON<span className="text-neon">PULSE</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              The premier fitness intelligence ecosystem engineered for modern athletes, lifters, and fitness seekers. Train hard, eat smart, track everything.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Join the IronPulse Intelligence Briefing
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-neon text-black font-bold px-4 py-2 rounded-xl text-xs hover:bg-neon-hover transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/workouts" className="hover:text-neon transition-colors">Workout Library</Link></li>
              <li><Link to="/planner" className="hover:text-neon transition-colors">Interactive Planner</Link></li>
              <li><Link to="/ai-coach" className="hover:text-neon transition-colors">PULSE-AI Coach</Link></li>
              <li><Link to="/workout-generator" className="hover:text-neon transition-colors">AI Workout Generator</Link></li>
              <li><Link to="/nutrition" className="hover:text-neon transition-colors">Nutrition Tracker</Link></li>
              <li><Link to="/diet-generator" className="hover:text-neon transition-colors">AI Diet Generator</Link></li>
            </ul>
          </div>

          {/* Calculators & Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Calculators</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/calculators?tab=bmi" className="hover:text-neon transition-colors">BMI Calculator</Link></li>
              <li><Link to="/calculators?tab=bmr" className="hover:text-neon transition-colors">BMR Calculator</Link></li>
              <li><Link to="/calculators?tab=tdee" className="hover:text-neon transition-colors">TDEE Expenditure</Link></li>
              <li><Link to="/calculators?tab=protein" className="hover:text-neon transition-colors">Daily Protein Goal</Link></li>
              <li><Link to="/calculators?tab=calorie" className="hover:text-neon transition-colors">Calorie & Macro Target</Link></li>
              <li><Link to="/calculators?tab=bodyfat" className="hover:text-neon transition-colors">Navy Body Fat %</Link></li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Community & Info</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/community" className="hover:text-neon transition-colors">Lifters Feed</Link></li>
              <li><Link to="/community" className="hover:text-neon transition-colors">Weekly Challenges</Link></li>
              <li><Link to="/blog" className="hover:text-neon transition-colors">Scientific Blog</Link></li>
              <li><Link to="/progress" className="hover:text-neon transition-colors">Analytics Dashboard</Link></li>
              <li><Link to="/activity" className="hover:text-neon transition-colors">Daily Activity</Link></li>
              <li><Link to="/profile" className="hover:text-neon transition-colors">Athlete Profile</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="mt-12 pt-8 border-t border-dark-700/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p className="flex items-center gap-1.5 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0 inline" />
            <span>
              Disclaimer: All calculations, generated workout plans, and nutritional targets are estimates for educational and athletic purposes. Not medical advice.
            </span>
          </p>
          <div className="flex items-center gap-6 shrink-0">
            <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Service</span>
            <span className="text-zinc-400 font-mono">© 2026 IRONPULSE Inc.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

