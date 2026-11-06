import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Timer,
  Sparkles,
  RotateCcw,
  Dumbbell,
  Clock,
  Layers,
  ChevronDown
} from 'lucide-react';
import { PRESET_SPLITS } from '../data/workoutPlans';
import { EXERCISES } from '../data/exercises';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/storage';
import RestTimer from '../components/RestTimer';
import { useToast } from '../context/ToastContext';

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export default function WorkoutPlanner() {
  const [weeklyPlan, setWeeklyPlan] = useLocalStorage(
    STORAGE_KEYS.WORKOUT_PLAN,
    PRESET_SPLITS.ppl.days
  );

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [selectedSplitKey, setSelectedSplitKey] = useState('ppl');
  const { showToast } = useToast();

  const currentDayData = weeklyPlan[selectedDayIndex] || {
    day: DAYS_OF_WEEK[selectedDayIndex],
    focus: 'Rest & Recovery',
    exercises: []
  };

  const loadPresetSplit = (splitKey) => {
    const preset = PRESET_SPLITS[splitKey];
    if (preset) {
      setWeeklyPlan(preset.days);
      setSelectedSplitKey(splitKey);
      showToast({
        type: 'success',
        title: 'Workout Split Loaded!',
        message: `Applied ${preset.name} (${preset.frequency}) to your weekly schedule.`
      });
    }
  };

  const toggleExerciseComplete = (exerciseIdx) => {
    setWeeklyPlan((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const targetDay = copy[selectedDayIndex];
      if (targetDay && targetDay.exercises && targetDay.exercises[exerciseIdx]) {
        targetDay.exercises[exerciseIdx].completed = !targetDay.exercises[exerciseIdx].completed;
      }
      return copy;
    });
  };

  const removeExercise = (exerciseIdx) => {
    setWeeklyPlan((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[selectedDayIndex].exercises.splice(exerciseIdx, 1);
      return copy;
    });
    showToast({
      type: 'info',
      title: 'Exercise Removed',
      message: 'Exercise removed from today\'s schedule.'
    });
  };

  const addExerciseToCurrentDay = (ex) => {
    setWeeklyPlan((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[selectedDayIndex].exercises) {
        copy[selectedDayIndex].exercises = [];
      }
      copy[selectedDayIndex].exercises.push({
        name: ex.name,
        sets: ex.defaultSets || 3,
        reps: ex.defaultReps || '10-12',
        rest: `${ex.restSeconds || 90}s`,
        weight: '0 kg',
        completed: false
      });
      return copy;
    });
    setExerciseModalOpen(false);
    showToast({
      type: 'success',
      title: 'Exercise Added!',
      message: `${ex.name} added to ${DAYS_OF_WEEK[selectedDayIndex]}.`
    });
  };

  const updateFocus = (newFocus) => {
    setWeeklyPlan((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[selectedDayIndex].focus = newFocus;
      return copy;
    });
  };

  // Weekly stats
  const totalExercisesWeekly = weeklyPlan.reduce((acc, day) => acc + (day.exercises?.length || 0), 0);
  const completedExercisesWeekly = weeklyPlan.reduce(
    (acc, day) => acc + (day.exercises?.filter((e) => e.completed).length || 0),
    0
  );
  const weeklyCompletionRate =
    totalExercisesWeekly > 0 ? Math.round((completedExercisesWeekly / totalExercisesWeekly) * 100) : 0;

  return (
    <div className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-dark-700/60">
        <div>
          <span className="text-xs font-mono font-bold text-neon uppercase tracking-widest">
            INTERACTIVE SCHEDULER & LOGBOOK
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white mt-1 uppercase">
            WORKOUT PLANNER
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Construct your weekly split, load scientific periodization templates, log sets and weights in real-time, and track workout completion streaks.
          </p>
        </div>

        {/* Preset Split Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
            Load Template:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { key: 'ppl', label: 'Push Pull Legs' },
              { key: 'bro_split', label: 'Bro Split' },
              { key: 'upper_lower', label: 'Upper / Lower' },
              { key: 'full_body', label: 'Full Body' },
            ].map((split) => (
              <button
                key={split.key}
                onClick={() => loadPresetSplit(split.key)}
                className={`text-xs px-3 py-2 rounded-xl border font-semibold transition-all ${
                  selectedSplitKey === split.key
                    ? 'bg-neon text-black font-bold border-neon shadow-neon-sm'
                    : 'bg-dark-900 text-zinc-300 border-dark-700 hover:border-dark-600'
                }`}
              >
                {split.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-dark-900 border border-dark-700">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Weekly Completion</span>
          <p className="text-2xl font-bold font-display text-neon mt-1">{weeklyCompletionRate}%</p>
          <div className="w-full bg-dark-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-neon h-full rounded-full transition-all duration-300" style={{ width: `${weeklyCompletionRate}%` }} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-dark-900 border border-dark-700">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Exercises Logged</span>
          <p className="text-2xl font-bold font-display text-white mt-1">
            {completedExercisesWeekly} <span className="text-xs text-zinc-400 font-normal">/ {totalExercisesWeekly}</span>
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">Across 7 days</p>
        </div>

        <div className="p-4 rounded-2xl bg-dark-900 border border-dark-700">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Today's Focus</span>
          <p className="text-sm font-bold text-cyan-400 mt-1 line-clamp-1">{currentDayData.focus}</p>
          <p className="text-[11px] text-zinc-400 mt-1">{currentDayData.exercises?.length || 0} Movements</p>
        </div>

        <div className="p-4 rounded-2xl bg-dark-900 border border-dark-700">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Active Split</span>
          <p className="text-sm font-bold text-white mt-1 uppercase">{selectedSplitKey.replace('_', ' ')}</p>
          <p className="text-[11px] text-zinc-400 mt-1">Saved to LocalStorage</p>
        </div>
      </div>

      {/* Main Split Layout: Days Tabs & Day Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Day Selector Navigation Column */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-1">
            Weekly Schedule
          </h3>
          <div className="space-y-2">
            {DAYS_OF_WEEK.map((day, idx) => {
              const dayObj = weeklyPlan[idx] || { focus: 'Rest', exercises: [] };
              const count = dayObj.exercises?.length || 0;
              const completedCount = dayObj.exercises?.filter((e) => e.completed).length || 0;
              const isSelected = selectedDayIndex === idx;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                    isSelected
                      ? 'bg-neon/15 border-neon/50 text-white shadow-neon-sm'
                      : 'bg-dark-900 border-dark-700 text-zinc-300 hover:bg-dark-850 hover:border-dark-600'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${isSelected ? 'text-neon' : 'text-white'}`}>
                        {day}
                      </span>
                      {completedCount === count && count > 0 && (
                        <CheckCircle2 className="w-4 h-4 text-neon shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5 truncate">{dayObj.focus}</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-zinc-400 shrink-0 bg-dark-800 px-2 py-1 rounded-lg border border-dark-700">
                    {completedCount}/{count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Embedded Rest Timer */}
          <div className="pt-4">
            <RestTimer />
          </div>
        </div>

        {/* Selected Day Exercise Management & Log */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-2xl">
            {/* Day Header & Focus Input */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-dark-700">
              <div>
                <span className="text-xs font-mono text-neon font-bold uppercase tracking-widest">
                  DAY {selectedDayIndex + 1} OF 7
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-0.5">
                  {DAYS_OF_WEEK[selectedDayIndex]}
                </h2>
              </div>

              {/* Day Focus Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={currentDayData.focus}
                  onChange={(e) => updateFocus(e.target.value)}
                  placeholder="Focus (e.g. Chest & Triceps)"
                  className="bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-semibold"
                />
                <button
                  onClick={() => setExerciseModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neon text-black font-bold text-xs hover:bg-neon-hover shadow-neon-sm transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Exercise</span>
                </button>
              </div>
            </div>

            {/* Exercise List */}
            <div className="mt-6 space-y-3">
              {(!currentDayData.exercises || currentDayData.exercises.length === 0) ? (
                <div className="py-16 text-center text-zinc-500 text-sm">
                  <Dumbbell className="w-10 h-10 mx-auto text-zinc-600 mb-3 opacity-40" />
                  <p className="font-semibold text-zinc-400">Rest Day or No Exercises Assigned Yet.</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Click "Add Exercise" to schedule your compound or isolation movements for {DAYS_OF_WEEK[selectedDayIndex]}.
                  </p>
                  <button
                    onClick={() => setExerciseModalOpen(true)}
                    className="mt-4 px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-neon border border-neon/30 text-xs font-semibold inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Browse & Add Exercises</span>
                  </button>
                </div>
              ) : (
                currentDayData.exercises.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      ex.completed
                        ? 'bg-dark-850/50 border-neon/30 text-zinc-400'
                        : 'bg-dark-850 border-dark-700 hover:border-dark-600 text-white'
                    }`}
                  >
                    {/* Title & Checkbox */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => toggleExerciseComplete(exIdx)}
                        className="mt-0.5 text-zinc-500 hover:text-neon transition-colors shrink-0"
                      >
                        {ex.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-neon" />
                        ) : (
                          <Circle className="w-6 h-6 hover:text-zinc-300" />
                        )}
                      </button>
                      <div>
                        <h4
                          className={`text-base font-bold transition-all ${
                            ex.completed ? 'line-through text-zinc-500' : 'text-white'
                          }`}
                        >
                          {ex.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5 text-neon" />
                            {ex.sets} Sets
                          </span>
                          <span>•</span>
                          <span className="text-zinc-300 font-medium">{ex.reps} Reps</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-zinc-500" />
                            {ex.rest} Rest
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Weight & Action */}
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <div className="flex items-center gap-1 bg-dark-900 border border-dark-700 px-2.5 py-1.5 rounded-xl">
                        <span className="text-[11px] text-zinc-400">Weight:</span>
                        <input
                          type="text"
                          value={ex.weight || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setWeeklyPlan((prev) => {
                              const copy = JSON.parse(JSON.stringify(prev));
                              copy[selectedDayIndex].exercises[exIdx].weight = val;
                              return copy;
                            });
                          }}
                          placeholder="80 kg"
                          className="w-16 bg-transparent text-xs text-neon font-bold text-center focus:outline-none"
                        />
                      </div>

                      <button
                        onClick={() => removeExercise(exIdx)}
                        className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Remove Exercise"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Exercise Modal Picker */}
      {exerciseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-dark-900 border border-dark-600 rounded-3xl p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-dark-700">
              <h3 className="text-lg font-bold text-white">Select Exercise to Add</h3>
              <button
                onClick={() => setExerciseModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-2">
              {EXERCISES.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => addExerciseToCurrentDay(ex)}
                  className="p-3 rounded-xl bg-dark-850 hover:bg-dark-800 border border-dark-700 hover:border-neon cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img src={ex.image} alt={ex.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-neon transition-colors">
                        {ex.name}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {ex.category} • {ex.equipment} • {ex.targetMuscle}
                      </p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-neon/15 text-neon font-bold text-xs group-hover:bg-neon group-hover:text-black transition-all">
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

