import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  ArrowRight,
  Dumbbell,
  Flame,
  LineChart,
  ShieldCheck,
  Bot,
  Activity,
  Award,
  ChevronRight,
  CheckCircle,
  Play,
  Heart,
  TrendingUp,
  Scale
} from 'lucide-react';
import { EXERCISES } from '../data/exercises';
import { BLOG_POSTS } from '../data/blogPosts';
import ExerciseModal from '../components/ExerciseModal';
import WorkoutCard from '../components/WorkoutCard';

export default function Home() {
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = useState(null);

  const featuredWorkouts = EXERCISES.slice(0, 4);

  const categories = [
    {
      id: 'muscle',
      name: 'Muscle Building',
      desc: 'Maximal hypertrophy and progressive overload protocols.',
      count: '42 Routines',
      icon: Dumbbell,
      color: 'from-lime-500/20 to-transparent',
      border: 'hover:border-neon',
      badge: 'HYPERTROPHY',
      img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'fatloss',
      name: 'Fat Loss & Shred',
      desc: 'Metabolic resistance circuits and caloric deficit optimization.',
      count: '35 Routines',
      icon: Flame,
      color: 'from-orange-500/20 to-transparent',
      border: 'hover:border-orange-500',
      badge: 'THERMOGENIC',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'strength',
      name: 'Strength Training',
      desc: 'Heavy compound powerlifting and central nervous system output.',
      count: '28 Routines',
      icon: Award,
      color: 'from-cyan-500/20 to-transparent',
      border: 'hover:border-cyan-400',
      badge: 'PURE POWER',
      img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'home',
      name: 'Home Workouts',
      desc: 'Zero-equipment calisthenics & minimal dumbbell conditioning.',
      count: '30 Routines',
      icon: Activity,
      color: 'from-purple-500/20 to-transparent',
      border: 'hover:border-purple-400',
      badge: 'ANYWHERE',
      img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'endurance',
      name: 'Endurance Training',
      desc: 'Aerobic threshold stamina and cardiovascular resilience.',
      count: '22 Routines',
      icon: TrendingUp,
      color: 'from-emerald-500/20 to-transparent',
      border: 'hover:border-emerald-400',
      badge: 'VO2 MAX',
      img: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'general',
      name: 'General Fitness & Health',
      desc: 'Mobility, longevity, postural alignment, and core vitality.',
      count: '26 Routines',
      icon: ShieldCheck,
      color: 'from-blue-500/20 to-transparent',
      border: 'hover:border-blue-400',
      badge: 'LONGEVITY',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const transformations = [
    {
      name: 'Vikram Joshi',
      age: 28,
      duration: '16 Weeks',
      result: '-12kg Fat, +4.5kg Muscle',
      quote: 'The AI Workout Generator and TDEE calorie precision removed all guesswork. I finally broke through my 3-year plateau.',
      beforeImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80',
      benchPR: '140 kg (+35kg)',
      bodyFat: '23% → 12%'
    },
    {
      name: 'Marcus Reynolds',
      age: 34,
      duration: '24 Weeks',
      result: '-18kg Body Fat, Six-Pack revealed',
      quote: 'IronPulse feels like having an elite sports science coach in my pocket. Tracking macros and progressive overload made this effortless.',
      beforeImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80',
      benchPR: '155 kg (+40kg)',
      bodyFat: '28% → 10.5%'
    },
    {
      name: 'Anya Sharma',
      age: 25,
      duration: '12 Weeks',
      result: '+6kg Lean Mass, Strength Doubled',
      quote: 'As a vegetarian lifter, the Indian high-protein database and custom diet planner helped me easily hit 130g of protein daily.',
      beforeImg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80',
      benchPR: '75 kg (+25kg)',
      bodyFat: '24% → 17%'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-dark-700/60">
        {/* Full-width gym background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=90')`,
          }}
        />
        {/* Dark layered overlays for contrast and brand tone */}
        <div className="absolute inset-0 bg-dark-950/85 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
        <div className="absolute inset-0 bg-radial-grid opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon/10 border border-neon/30 text-neon text-xs sm:text-sm font-bold uppercase tracking-widest mb-6"
          >
            <Zap className="w-4 h-4 text-neon animate-pulse" />
            <span>AI-POWERED FITNESS PLATFORM • STRENGTH MEETS SCIENCE</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white uppercase max-w-5xl mx-auto leading-none"
          >
            BUILD STRENGTH. <br />
            <span className="text-neon text-neon-glow">DEFY LIMITS.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            Your complete fitness ecosystem. Personalized workouts, smarter scientific nutrition, intelligent algorithms, and measurable progress tracking.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/workout-generator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-neon text-black font-extrabold text-sm sm:text-base hover:bg-neon-hover shadow-neon hover:shadow-neon-lg transition-all transform hover:-translate-y-0.5 uppercase tracking-wide"
            >
              <span>START YOUR JOURNEY</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/workouts"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-dark-800/90 text-white font-bold text-sm sm:text-base border border-dark-600 hover:border-neon hover:bg-dark-700 transition-all uppercase tracking-wide"
            >
              <Dumbbell className="w-5 h-5 text-neon" />
              <span>EXPLORE WORKOUTS</span>
            </Link>
          </motion.div>

          {/* Animated Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 pt-12 border-t border-dark-700/60 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <div className="p-4 rounded-2xl bg-dark-900/60 border border-dark-800">
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-neon">500+</p>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 uppercase tracking-wider font-semibold">
                Exercise Protocols
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-dark-900/60 border border-dark-800">
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-white">50,000+</p>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 uppercase tracking-wider font-semibold">
                Active Lifters
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-dark-900/60 border border-dark-800">
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-cyan-400">120+</p>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 uppercase tracking-wider font-semibold">
                Pro Programs
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-dark-900/60 border border-dark-800">
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-purple-400">98.4%</p>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 uppercase tracking-wider font-semibold">
                Goal Achievement
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FITNESS CATEGORIES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-neon uppercase tracking-widest font-mono">
              ENGINEERED PROTOCOLS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-1">
              CHOOSE YOUR DISCIPLINE
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md mt-2 sm:mt-0">
            Precision designed training programs adapted to your biological goals, whether building dense muscle or extreme conditioning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => navigate('/workouts')}
                className={`group relative rounded-2xl bg-dark-900 border border-dark-700/80 ${cat.border} overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-72`}
              >
                {/* Background image preview */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500"
                  style={{ backgroundImage: `url('${cat.img}')` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-80`} />

                {/* Top badge and icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-dark-800/90 border border-dark-600 text-neon group-hover:bg-neon group-hover:text-black transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-dark-950/80 border border-dark-700 text-zinc-300">
                    {cat.badge}
                  </span>
                </div>

                {/* Bottom details */}
                <div className="relative z-10">
                  <span className="text-xs text-neon font-semibold font-mono">{cat.count}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-neon transition-colors mt-0.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-neon transition-colors">
                    <span>Explore Workouts</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. WHY IRONPULSE (VALUE PILLARS) */}
      <section className="py-20 bg-dark-900/60 border-y border-dark-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-neon uppercase tracking-widest font-mono">
              THE IRONPULSE ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-2">
              WHY ATHLETES CHOOSE IRONPULSE
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-3">
              We eliminated the noise and bro-science. Every workout schedule, macro recommendation, and calorie target is grounded in human exercise physiology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 hover:border-neon/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center text-neon mb-4">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Personalized Workout Planning</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Build custom weekly schedules, PPL, or Bro Splits with auto-adjusting sets and rest intervals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 hover:border-neon/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Smart Nutrition Tracking</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Log meals, balance protein, carbs, and fats, and hit exact caloric surplus or deficit targets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 hover:border-neon/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">8 Scientific Calculators</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Mifflin-St Jeor BMR, TDEE, Navy Body Fat, Ideal Weight, Protein goals, and water intake formulas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 hover:border-neon/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Progress Analytics</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Interactive charts, weight progressions, body measurement history, and visual transformation logs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 hover:border-neon/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">PULSE-AI Assistance</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Instant answers to training queries, tailored meal adjustments, and workout split recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED WORKOUTS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-neon uppercase tracking-widest font-mono">
              TOP TIER MOVEMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-1">
              FEATURED EXERCISES
            </h2>
          </div>
          <Link
            to="/workouts"
            className="mt-3 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold text-neon hover:underline tracking-wide uppercase"
          >
            <span>View Full Library ({EXERCISES.length}+)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWorkouts.map((exercise) => (
            <WorkoutCard
              key={exercise.id}
              exercise={exercise}
              onSelect={(ex) => setSelectedExercise(ex)}
            />
          ))}
        </div>
      </section>

      {/* 5. NUTRITION & MACRO SECTION PREVIEW */}
      <section className="py-20 bg-dark-900/80 border-y border-dark-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-neon uppercase tracking-widest font-mono">
                PRECISION BIO-FUEL
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-tight">
                NUTRITION IS 70% OF THE BATTLE. WE MAKE IT SIMPLE.
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                Whether you need a high-protein vegetarian diet with paneer and soya chunks or lean chicken and egg white protocols, IronPulse features a verified food database and smart meal planner.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-neon shrink-0" />
                  <span className="text-xs sm:text-sm text-zinc-200">
                    Comprehensive Indian & International food database with exact macros.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-neon shrink-0" />
                  <span className="text-xs sm:text-sm text-zinc-200">
                    Dynamic daily macro distribution charts (Carbs, Protein, Fats).
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-neon shrink-0" />
                  <span className="text-xs sm:text-sm text-zinc-200">
                    AI Diet Plan Generator tailored to dietary preferences (Veg, Vegan, Non-Veg).
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/nutrition"
                  className="px-6 py-3 rounded-xl bg-neon text-black font-bold text-xs sm:text-sm hover:bg-neon-hover shadow-neon-sm transition-all"
                >
                  Explore Nutrition Tracker
                </Link>
                <Link
                  to="/diet-generator"
                  className="px-6 py-3 rounded-xl bg-dark-800 text-white font-semibold text-xs sm:text-sm border border-dark-600 hover:border-neon transition-all"
                >
                  Generate AI Diet Plan
                </Link>
              </div>
            </div>

            {/* Nutrition Card graphic */}
            <div className="p-6 rounded-3xl bg-dark-850 border border-dark-700 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-dark-700 mb-6">
                <div>
                  <h4 className="text-base font-bold text-white">Daily Macro Distribution</h4>
                  <p className="text-xs text-zinc-400">Target: 2,650 kcal (Hypertrophy Surplus)</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-neon/15 text-neon border border-neon/30">
                  OPTIMAL
                </span>
              </div>

              {/* Progress bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-white">Protein (165g / 165g)</span>
                    <span className="text-neon">100% Target Met</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-dark-700 overflow-hidden">
                    <div className="h-full bg-neon rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-white">Carbohydrates (280g / 310g)</span>
                    <span className="text-cyan-400">90%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-dark-700 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-white">Fats (62g / 70g)</span>
                    <span className="text-amber-400">88%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-dark-700 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>
              </div>

              {/* Sample Food Items List */}
              <div className="mt-6 pt-4 border-t border-dark-700/60 space-y-2">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Sample Logged Items Today:
                </p>
                {[
                  { name: 'Oats with Whey Protein', cals: '410 kcal', p: '32g Protein' },
                  { name: 'Paneer & Dal Tadka with Brown Rice', cals: '680 kcal', p: '38g Protein' },
                  { name: 'Soya Chunks Curry + 2 Rotis', cals: '520 kcal', p: '34g Protein' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs p-2 rounded-lg bg-dark-800">
                    <span className="text-zinc-200 font-medium">{item.name}</span>
                    <span className="text-neon font-mono">{item.p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRANSFORMATIONS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-neon uppercase tracking-widest font-mono">
            REAL SCIENCE. REAL RESULTS.
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-1">
            ATHLETE TRANSFORMATIONS
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            Witness what disciplined progressive overload, calibrated caloric intake, and consistent daily tracking can achieve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transformations.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-dark-900 border border-dark-700 overflow-hidden flex flex-col justify-between hover:border-neon/50 transition-all duration-300"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <img src={t.beforeImg} alt={t.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-black/30" />
                <div className="absolute top-3 left-3 bg-neon text-black text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase font-mono">
                  {t.duration} PROTOCOL
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-baseline">
                  <div>
                    <h3 className="text-lg font-bold text-white">{t.name}, {t.age}</h3>
                    <p className="text-xs text-neon font-semibold">{t.result}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-zinc-300 italic leading-relaxed">
                  "{t.quote}"
                </p>

                <div className="mt-4 pt-3 border-t border-dark-700 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase">Bench PR</span>
                    <p className="font-bold text-white">{t.benchPR}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase">Body Fat</span>
                    <p className="font-bold text-neon">{t.bodyFat}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FITNESS BLOG PREVIEW */}
      <section className="py-20 bg-dark-900/60 border-t border-dark-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-neon uppercase tracking-widest font-mono">
                EVIDENCE BASED INSIGHTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-1">
                LATEST SCIENTIFIC ARTICLES
              </h2>
            </div>
            <Link
              to="/blog"
              className="mt-3 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold text-neon hover:underline tracking-wide uppercase"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <div
                key={post.id}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="group rounded-2xl bg-dark-850 border border-dark-700 hover:border-neon/40 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-dark-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-bold text-neon border border-neon/30">
                    {post.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-zinc-500 font-mono">{post.date} • {post.readTime}</span>
                    <h3 className="text-base font-bold text-white group-hover:text-neon transition-colors mt-1 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-dark-700/60 flex items-center justify-between text-xs font-semibold text-neon">
                    <span>Read Full Article</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="py-20 relative overflow-hidden border-t border-dark-700/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border border-neon/30 shadow-neon">
            <span className="text-xs font-mono font-bold text-neon uppercase tracking-widest">
              JOIN THE IRONPULSE MOVEMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white mt-2 uppercase">
              STOP GUESSING. START PROGRESSING.
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto mt-4 leading-relaxed">
              Take 2 minutes to generate your tailored scientific workout and nutrition plan. Zero subscription fees. 100% focused on pure performance.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/workout-generator"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-neon text-black font-extrabold text-sm hover:bg-neon-hover shadow-neon-sm transition-all"
              >
                Generate Free Workout Plan
              </Link>
              <Link
                to="/calculators"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-dark-800 text-white font-bold text-sm border border-dark-600 hover:border-white transition-all"
              >
                Explore All 8 Calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Modal */}
      <ExerciseModal
        exercise={selectedExercise}
        isOpen={Boolean(selectedExercise)}
        onClose={() => setSelectedExercise(null)}
      />
    </div>
  );
}

