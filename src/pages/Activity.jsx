import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity as ActivityIcon,
  Footprints,
  Flame,
  Moon,
  Clock,
  Compass,
  Heart,
  TrendingUp,
  RotateCcw,
  Sparkles,
  Watch
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useToast } from '../context/ToastContext';

const HOURLY_STEPS = [
  { hour: '6 AM', steps: 450 },
  { hour: '8 AM', steps: 1200 },
  { hour: '10 AM', steps: 850 },
  { hour: '12 PM', steps: 1400 },
  { hour: '2 PM', steps: 950 },
  { hour: '4 PM', steps: 1100 },
  { hour: '6 PM', steps: 3200 }, // Gym session
  { hour: '8 PM', steps: 1400 },
  { hour: '10 PM', steps: 650 },
];

export default function Activity() {
  const { showToast } = useToast();

  const [metrics, setMetrics] = useState({
    steps: 11200,
    stepTarget: 10000,
    activeCalories: 680,
    distanceKm: 8.4,
    activeMinutes: 65,
    sleepHours: 7.8,
    sleepTarget: 8.0,
    deepSleepPercent: 24,
    remSleepPercent: 22,
    lightSleepPercent: 54,
    restingHeartRate: 56,
  });

  const stepProgress = Math.min(100, Math.round((metrics.steps / metrics.stepTarget) * 100));

  const handleUpdate = (field, val) => {
    setMetrics((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  return (
    <div className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-dark-700/60">
        <div>
          <span className="text-xs font-mono font-bold text-neon uppercase tracking-widest">
            BIOMETRICS & CONTINUOUS SENSING SIMULATION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white mt-1 uppercase">
            DAILY ACTIVITY TELEMETRY
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Monitor non-exercise activity thermogenesis (NEAT), cardiovascular heart rate dynamics, nocturnal sleep architecture, and movement cadence.
          </p>
        </div>

        {/* Sync Device Badge */}
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-dark-900 border border-dark-700">
          <Watch className="w-5 h-5 text-neon shrink-0 animate-pulse" />
          <div className="text-xs">
            <span className="text-white font-bold block">Smart Device Sync</span>
            <span className="text-zinc-500 font-mono text-[11px]">Sensor Ready Interface</span>
          </div>
        </div>
      </div>

      {/* Main 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Daily Steps */}
        <div className="p-6 rounded-3xl bg-dark-900 border border-dark-700 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-neon/15 border border-neon/30 flex items-center justify-center text-neon">
              <Footprints className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-neon bg-neon/15 px-2 py-0.5 rounded">
              {stepProgress}% GOAL
            </span>
          </div>

          <div className="mt-4">
            <span className="text-xs text-zinc-400 uppercase font-semibold">Step Cadence</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <input
                type="number"
                value={metrics.steps}
                onChange={(e) => handleUpdate('steps', Number(e.target.value))}
                className="bg-transparent text-3xl font-black font-display text-white w-32 focus:outline-none"
              />
              <span className="text-xs text-zinc-500 font-mono">/ {metrics.stepTarget}</span>
            </div>
            <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden mt-3">
              <div className="bg-neon h-full rounded-full transition-all" style={{ width: `${stepProgress}%` }} />
            </div>
          </div>
        </div>

        {/* Active Calories Burned */}
        <div className="p-6 rounded-3xl bg-dark-900 border border-dark-700 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-zinc-400">EXERCISE + NEAT</span>
          </div>

          <div className="mt-4">
            <span className="text-xs text-zinc-400 uppercase font-semibold">Active Caloric Burn</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <input
                type="number"
                value={metrics.activeCalories}
                onChange={(e) => handleUpdate('activeCalories', Number(e.target.value))}
                className="bg-transparent text-3xl font-black font-display text-orange-400 w-28 focus:outline-none"
              />
              <span className="text-xs text-zinc-500 font-mono">kcal</span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">Excludes 1,850 kcal BMR</p>
          </div>
        </div>

        {/* Distance Walked */}
        <div className="p-6 rounded-3xl bg-dark-900 border border-dark-700 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-zinc-400">GPS TELEMETRY</span>
          </div>

          <div className="mt-4">
            <span className="text-xs text-zinc-400 uppercase font-semibold">Walking Distance</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <input
                type="number"
                step="0.1"
                value={metrics.distanceKm}
                onChange={(e) => handleUpdate('distanceKm', Number(e.target.value))}
                className="bg-transparent text-3xl font-black font-display text-cyan-400 w-24 focus:outline-none"
              />
              <span className="text-xs text-zinc-500 font-mono">km</span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">Pace: 11:20 min/km</p>
          </div>
        </div>

        {/* Active Minutes */}
        <div className="p-6 rounded-3xl bg-dark-900 border border-dark-700 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-zinc-400">ELEVATED HR</span>
          </div>

          <div className="mt-4">
            <span className="text-xs text-zinc-400 uppercase font-semibold">Active Training Time</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <input
                type="number"
                value={metrics.activeMinutes}
                onChange={(e) => handleUpdate('activeMinutes', Number(e.target.value))}
                className="bg-transparent text-3xl font-black font-display text-purple-400 w-24 focus:outline-none"
              />
              <span className="text-xs text-zinc-500 font-mono">mins</span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">Zone 2 & Zone 3 heart rate</p>
          </div>
        </div>
      </div>

      {/* Hourly Step Cadence Chart */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Hourly Step Distribution</h3>
            <p className="text-xs text-zinc-400">Peak physical output recorded during 6:00 PM evening training</p>
          </div>
          <span className="text-xs font-mono font-bold text-neon bg-neon/15 px-3 py-1 rounded-lg border border-neon/30">
            TOTAL: {metrics.steps.toLocaleString()} STEPS
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={HOURLY_STEPS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="hour" stroke="#71717a" fontSize={11} />
              <YAxis stroke="#71717a" fontSize={11} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-dark-950 border border-dark-700 p-2.5 rounded-xl shadow-xl text-xs">
                        <p className="font-bold text-white mb-0.5">{label}</p>
                        <p className="text-neon font-mono">{payload[0].value} steps</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="steps" fill="#C6FF3D" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sleep Architecture Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-dark-700 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Nocturnal Recovery Architecture</h3>
              <p className="text-xs text-zinc-400">Growth hormone & muscle repair telemetry</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-zinc-500 block text-[10px]">TOTAL SLEEP</span>
              <span className="text-base font-bold text-white">{metrics.sleepHours} hrs</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px]">RESTING HR</span>
              <span className="text-base font-bold text-neon">{metrics.restingHeartRate} bpm</span>
            </div>
          </div>
        </div>

        {/* Sleep Stage Visual Bars */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-indigo-400">Deep Stage 3/4 Sleep (Physical Repair)</span>
              <span className="text-white font-mono">{metrics.deepSleepPercent}% (1h 52m)</span>
            </div>
            <div className="w-full bg-dark-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${metrics.deepSleepPercent}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-purple-400">REM Sleep (Neural Restoration & Motor Learning)</span>
              <span className="text-white font-mono">{metrics.remSleepPercent}% (1h 42m)</span>
            </div>
            <div className="w-full bg-dark-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${metrics.remSleepPercent}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-zinc-400">Light Sleep (Circadian Transition)</span>
              <span className="text-white font-mono">{metrics.lightSleepPercent}% (4h 12m)</span>
            </div>
            <div className="w-full bg-dark-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-zinc-600 h-full rounded-full" style={{ width: `${metrics.lightSleepPercent}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

