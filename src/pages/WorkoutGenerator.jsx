import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Dumbbell,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Save,
  RotateCcw
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/storage';
import { useToast } from '../context/ToastContext';

export default function WorkoutGenerator() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [, setStoredPlan] = useLocalStorage(STORAGE_KEYS.WORKOUT_PLAN, []);

  const [formData, setFormData] = useState({
    age: 26,
    gender: 'male',
    height: 178,
    weight: 76,
    experience: 'intermediate',
    goal: 'muscle_gain',
    location: 'gym',
    daysPerWeek: 4,
    duration: 60,
  });

  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      // Dynamic logic to create tailored weekly schedule
      let planDays = [];
      const { goal, location, daysPerWeek, experience } = formData;

      const isHome = location === 'home';
      const sets = experience === 'beginner' ? 3 : experience === 'advanced' ? 4 : 3;

      if (daysPerWeek === 3) {
        planDays = [
          {
            day: 'Monday',
            focus: 'Full Body Compound A',
            exercises: [
              { name: isHome ? 'Bodyweight Squats & Jump Squats' : 'Barbell Back Squat', sets, reps: '8-10', rest: '120s' },
              { name: isHome ? 'Standard Push-ups' : 'Barbell Bench Press', sets, reps: '8-10', rest: '90s' },
              { name: isHome ? 'Doorframe Rows' : 'Bent-Over Barbell Row', sets, reps: '10', rest: '90s' },
              { name: 'Isometric Core Plank', sets: 3, reps: '45-60s', rest: '60s' }
            ]
          },
          {
            day: 'Wednesday',
            focus: 'Full Body Explosive B',
            exercises: [
              { name: isHome ? 'Single-Leg Bulgarian Split Squats' : 'Conventional Barbell Deadlift', sets, reps: '6-8', rest: '150s' },
              { name: isHome ? 'Pike Push-ups' : 'Standing Overhead Barbell Press', sets, reps: '8-10', rest: '90s' },
              { name: isHome ? 'Towel Pulls' : 'Wide-Grip Lat Pulldown', sets, reps: '10-12', rest: '75s' },
              { name: 'Hanging Leg Raises / Lying Leg Tucks', sets: 3, reps: '15', rest: '60s' }
            ]
          },
          {
            day: 'Friday',
            focus: 'Full Body Hypertrophy C',
            exercises: [
              { name: isHome ? 'Walking Lunges' : 'Incline Dumbbell Press', sets, reps: '10-12', rest: '90s' },
              { name: isHome ? 'Glute Bridges' : 'Dumbbell Romanian Deadlift (RDL)', sets, reps: '12', rest: '90s' },
              { name: 'Dumbbell Lateral Raise', sets, reps: '15', rest: '60s' },
              { name: 'Standing EZ-Bar Bicep Curl', sets, reps: '12', rest: '60s' }
            ]
          }
        ];
      } else if (daysPerWeek === 4) {
        planDays = [
          {
            day: 'Monday',
            focus: 'Upper Body Power',
            exercises: [
              { name: isHome ? 'Weighted Push-ups' : 'Barbell Bench Press', sets: 4, reps: '6-8', rest: '120s' },
              { name: isHome ? 'Inverted Table Rows' : 'Bent-Over Barbell Row', sets: 4, reps: '8-10', rest: '90s' },
              { name: isHome ? 'Pike Push-ups' : 'Standing Overhead Barbell Press', sets: 3, reps: '8-10', rest: '90s' },
              { name: 'Standing EZ-Bar Bicep Curl', sets: 3, reps: '10-12', rest: '60s' }
            ]
          },
          {
            day: 'Tuesday',
            focus: 'Lower Body Strength',
            exercises: [
              { name: isHome ? 'Bulgarian Split Squats' : 'Barbell Back Squat', sets: 4, reps: '6-8', rest: '150s' },
              { name: isHome ? 'Single-Leg RDL' : 'Dumbbell Romanian Deadlift (RDL)', sets: 3, reps: '10', rest: '90s' },
              { name: 'Walking Lunges', sets: 3, reps: '12 per leg', rest: '75s' },
              { name: 'Isometric Core Plank', sets: 3, reps: '60s', rest: '60s' }
            ]
          },
          {
            day: 'Thursday',
            focus: 'Upper Body Hypertrophy',
            exercises: [
              { name: isHome ? 'Diamond Push-ups' : 'Incline Dumbbell Press', sets: 4, reps: '8-12', rest: '90s' },
              { name: isHome ? 'Doorframe Rows' : 'Wide-Grip Lat Pulldown', sets: 4, reps: '10-12', rest: '75s' },
              { name: 'Dumbbell Lateral Raise', sets: 4, reps: '12-15', rest: '60s' },
              { name: 'Cable Tricep Pushdown', sets: 3, reps: '12-15', rest: '60s' }
            ]
          },
          {
            day: 'Friday',
            focus: 'Lower Body & Core Density',
            exercises: [
              { name: isHome ? 'Jump Squats' : 'Barbell Back Squat / Hack Squat', sets: 3, reps: '10-12', rest: '90s' },
              { name: 'Russian Kettlebell Swings', sets: 4, reps: '15-20', rest: '60s' },
              { name: 'Hanging Leg Raises', sets: 3, reps: '15', rest: '60s' }
            ]
          }
        ];
      } else {
        // 5 or 6 days - PPL Style
        planDays = [
          {
            day: 'Monday',
            focus: 'Push Day A (Chest, Shoulders, Triceps)',
            exercises: [
              { name: 'Barbell Bench Press', sets: 4, reps: '6-8', rest: '120s' },
              { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: '90s' },
              { name: 'Dumbbell Lateral Raise', sets: 4, reps: '12-15', rest: '60s' },
              { name: 'Cable Tricep Pushdown', sets: 3, reps: '12-15', rest: '60s' }
            ]
          },
          {
            day: 'Tuesday',
            focus: 'Pull Day A (Back, Rear Delts, Biceps)',
            exercises: [
              { name: 'Conventional Barbell Deadlift', sets: 3, reps: '5', rest: '180s' },
              { name: 'Wide-Grip Lat Pulldown', sets: 4, reps: '10-12', rest: '75s' },
              { name: 'Bent-Over Barbell Row', sets: 3, reps: '8-10', rest: '90s' },
              { name: 'Standing EZ-Bar Bicep Curl', sets: 3, reps: '10-12', rest: '60s' }
            ]
          },
          {
            day: 'Wednesday',
            focus: 'Leg Day A (Quads & Hamstrings)',
            exercises: [
              { name: 'Barbell Back Squat', sets: 4, reps: '6-8', rest: '150s' },
              { name: 'Dumbbell Romanian Deadlift (RDL)', sets: 3, reps: '10-12', rest: '90s' },
              { name: 'Dumbbell Walking Lunges', sets: 3, reps: '12/leg', rest: '75s' },
              { name: 'Isometric Core Plank', sets: 3, reps: '60s', rest: '60s' }
            ]
          },
          {
            day: 'Thursday',
            focus: 'Push Day B (Upper Chest & Shoulder Cap)',
            exercises: [
              { name: 'Incline Dumbbell Press', sets: 4, reps: '8-10', rest: '90s' },
              { name: 'Standing Overhead Barbell Press', sets: 3, reps: '8', rest: '90s' },
              { name: 'Dumbbell Lateral Raise', sets: 4, reps: '15', rest: '60s' },
              { name: 'Lying EZ-Bar Skull Crushers', sets: 3, reps: '10', rest: '75s' }
            ]
          },
          {
            day: 'Friday',
            focus: 'Pull Day B (Back Thickness & Forearms)',
            exercises: [
              { name: 'Wide-Grip Lat Pulldown', sets: 4, reps: '10-12', rest: '75s' },
              { name: 'Bent-Over Barbell Row', sets: 4, reps: '8-10', rest: '90s' },
              { name: 'Cable Face Pull with External Rotation', sets: 3, reps: '15-20', rest: '60s' },
              { name: 'Dumbbell Hammer Curls', sets: 3, reps: '12', rest: '60s' }
            ]
          }
        ];
      }

      setGeneratedPlan({
        name: `${formData.goal.replace('_', ' ').toUpperCase()} • ${formData.daysPerWeek}-DAY SPLIT`,
        location: formData.location,
        duration: `${formData.duration} mins`,
        days: planDays
      });
      setIsGenerating(false);

      showToast({
        type: 'success',
        title: 'Workout Plan Generated!',
        message: 'Your science-backed training program is ready.'
      });
    }, 800);
  };

  const handleExportToPlanner = () => {
    if (!generatedPlan) return;
    setStoredPlan(generatedPlan.days);
    showToast({
      type: 'success',
      title: 'Saved to Workout Planner!',
      message: 'Redirecting to your active weekly schedule...'
    });
    setTimeout(() => {
      navigate('/planner');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold text-neon uppercase tracking-widest">
          AI PROGRAM GENERATOR
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white mt-1 uppercase">
          PERSONALIZED WORKOUT GENERATOR
        </h1>
        <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
          Input your physiological attributes and schedule parameters. Our algorithm builds an evidence-based, progressive overload training split tailored to your exact equipment access.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-dark-900 border border-dark-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-neon" />
            <span>Athlete Parameters</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                  Age
                </label>
                <input
                  type="number"
                  min="14"
                  max="85"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon font-bold cursor-pointer"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Height & Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="100"
                  max="250"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="35"
                  max="250"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon font-bold"
                  required
                />
              </div>
            </div>

            {/* Fitness Goal */}
            <div>
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Primary Fitness Goal
              </label>
              <select
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon font-bold cursor-pointer"
              >
                <option value="muscle_gain">Muscle Hypertrophy (Lean Mass)</option>
                <option value="fat_loss">Fat Loss & Thermogenic Shred</option>
                <option value="strength">Pure Heavy Strength / Powerlifting</option>
                <option value="general_fitness">General Athletic Conditioning</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData({ ...formData, experience: lvl })}
                    className={`py-2 text-xs font-bold rounded-xl border capitalize transition-all ${
                      formData.experience === lvl
                        ? 'bg-neon text-black border-neon'
                        : 'bg-dark-800 border-dark-600 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Workout Location */}
            <div>
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Training Facility / Location
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'gym', label: 'Commercial Gym (Barbell/Cables)' },
                  { id: 'home', label: 'Home (Bodyweight/Dumbbells)' }
                ].map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, location: loc.id })}
                    className={`p-2.5 text-xs font-bold rounded-xl border text-left transition-all ${
                      formData.location === loc.id
                        ? 'bg-neon/15 border-neon text-neon'
                        : 'bg-dark-800 border-dark-600 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Days per week & duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                  Days Per Week
                </label>
                <select
                  value={formData.daysPerWeek}
                  onChange={(e) => setFormData({ ...formData, daysPerWeek: Number(e.target.value) })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon font-bold cursor-pointer"
                >
                  <option value={3}>3 Days (Full Body)</option>
                  <option value={4}>4 Days (Upper / Lower)</option>
                  <option value={5}>5 Days (Bro / PPL Hybrid)</option>
                  <option value={6}>6 Days (Full PPL 2x)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                  Session Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon font-bold cursor-pointer"
                >
                  <option value={45}>45 Minutes</option>
                  <option value={60}>60 Minutes</option>
                  <option value={75}>75 Minutes</option>
                  <option value={90}>90 Minutes</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full mt-4 py-3.5 rounded-xl bg-neon text-black font-extrabold text-sm uppercase tracking-wide hover:bg-neon-hover shadow-neon-sm transition-all"
            >
              {isGenerating ? 'Synthesizing Optimal Program...' : 'Generate Personalized Plan'}
            </button>
          </form>

          {/* Medical Disclaimer */}
          <div className="mt-6 p-3.5 rounded-xl bg-dark-800/60 border border-dark-700 flex items-start gap-2.5 text-[11px] text-zinc-400 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Disclaimer: Generated plans are algorithmic estimates for healthy individuals. Not medical or professional physical therapy advice.
            </span>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7">
          {!generatedPlan ? (
            <div className="p-12 rounded-3xl bg-dark-900 border border-dark-700/80 text-center py-24">
              <Dumbbell className="w-16 h-16 mx-auto text-zinc-700 mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-white">Your Plan Will Appear Here</h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mt-2">
                Configure your parameters on the left and click "Generate Personalized Plan" to preview your science-calibrated workout schedule.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-neon/40 shadow-2xl space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-dark-700 gap-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-neon uppercase tracking-wider">
                    SUCCESSFULLY COMPILED
                  </span>
                  <h3 className="text-2xl font-black font-display text-white mt-0.5">
                    {generatedPlan.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                    <span className="capitalize">{generatedPlan.location} Access</span>
                    <span>•</span>
                    <span>{generatedPlan.duration} per session</span>
                  </div>
                </div>

                <button
                  onClick={handleExportToPlanner}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neon text-black font-extrabold text-xs hover:bg-neon-hover shadow-neon-sm transition-all shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save to Active Planner</span>
                </button>
              </div>

              {/* Day by Day Plan Schedule */}
              <div className="space-y-4">
                {generatedPlan.days.map((dayItem, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-4 rounded-2xl bg-dark-850 border border-dark-700/90 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-neon uppercase">
                        {dayItem.day}
                      </span>
                      <span className="text-xs font-bold text-white bg-dark-800 px-3 py-1 rounded-lg border border-dark-700">
                        {dayItem.focus}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {dayItem.exercises.map((ex, eIdx) => (
                        <div
                          key={eIdx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 text-xs border border-dark-800"
                        >
                          <span className="font-semibold text-zinc-200">{ex.name}</span>
                          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                            <span className="text-neon font-bold">{ex.sets} Sets</span>
                            <span>×</span>
                            <span className="text-white">{ex.reps}</span>
                            <span>•</span>
                            <span>{ex.rest}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

