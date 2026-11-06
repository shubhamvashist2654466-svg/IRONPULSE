import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart as LineChartIcon,
  TrendingDown,
  TrendingUp,
  Dumbbell,
  Flame,
  Award,
  Plus,
  Camera,
  Calendar,
  Layers,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/storage';
import { useToast } from '../context/ToastContext';

const INITIAL_WEIGHT_HISTORY = [
  { week: 'Week 1', weight: 84.5, target: 76.0, calories: 2450, protein: 155 },
  { week: 'Week 2', weight: 83.8, target: 76.0, calories: 2500, protein: 160 },
  { week: 'Week 3', weight: 82.9, target: 76.0, calories: 2420, protein: 165 },
  { week: 'Week 4', weight: 82.1, target: 76.0, calories: 2480, protein: 170 },
  { week: 'Week 5', weight: 81.3, target: 76.0, calories: 2550, protein: 165 },
  { week: 'Week 6', weight: 80.5, target: 76.0, calories: 2510, protein: 168 },
  { week: 'Week 7', weight: 79.8, target: 76.0, calories: 2530, protein: 172 },
  { week: 'Week 8', weight: 78.5, target: 76.0, calories: 2600, protein: 175 },
];

const INITIAL_WORKOUT_FREQUENCY = [
  { day: 'Mon', workouts: 1, duration: 65 },
  { day: 'Tue', workouts: 1, duration: 70 },
  { day: 'Wed', workouts: 1, duration: 60 },
  { day: 'Thu', workouts: 0, duration: 0 },
  { day: 'Fri', workouts: 1, duration: 75 },
  { day: 'Sat', workouts: 1, duration: 80 },
  { day: 'Sun', workouts: 0, duration: 0 },
];

export default function Progress() {
  const [weightLogs, setWeightLogs] = useLocalStorage(
    STORAGE_KEYS.PROGRESS_LOGS,
    INITIAL_WEIGHT_HISTORY
  );

  const [addLogModalOpen, setAddLogModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newCalories, setNewCalories] = useState('');
  const [newProtein, setNewProtein] = useState('');
  const [measurements, setMeasurements] = useState({
    chest: '104 cm',
    arms: '40.5 cm',
    waist: '81 cm',
    thighs: '60 cm',
    shoulders: '124 cm'
  });

  const [beforePhoto, setBeforePhoto] = useState(
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80'
  );
  const [currentPhoto, setCurrentPhoto] = useState(
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80'
  );

  const { showToast } = useToast();

  const startWeight = weightLogs[0]?.weight || 84.5;
  const currentWeight = weightLogs[weightLogs.length - 1]?.weight || 78.5;
  const netWeightChange = Number((currentWeight - startWeight).toFixed(1));

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newWeight) return;

    const nextWeekNumber = weightLogs.length + 1;
    const newEntry = {
      week: `Week ${nextWeekNumber}`,
      weight: parseFloat(newWeight),
      target: 76.0,
      calories: parseInt(newCalories) || 2550,
      protein: parseInt(newProtein) || 170,
    };

    setWeightLogs([...weightLogs, newEntry]);
    setAddLogModalOpen(false);
    setNewWeight('');
    setNewCalories('');
    setNewProtein('');

    showToast({
      type: 'success',
      title: 'Progress Entry Logged!',
      message: `Weight updated to ${newEntry.weight} kg for ${newEntry.week}.`
    });
  };

  const handlePhotoUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'before') setBeforePhoto(reader.result);
        else setCurrentPhoto(reader.result);
        showToast({
          type: 'success',
          title: 'Photo Uploaded!',
          message: 'Transformation photo updated successfully.'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-dark-700/60">
        <div>
          <span className="text-xs font-mono font-bold text-neon uppercase tracking-widest">
            LONGITUDINAL PHYSIOMETRICS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white mt-1 uppercase">
            PROGRESS TRACKER
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Data-driven transformation telemetry. Monitor body mass trends, volume loads, macro adherence consistency, and visual before-and-after timelines.
          </p>
        </div>

        <button
          onClick={() => setAddLogModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neon text-black font-extrabold text-xs hover:bg-neon-hover shadow-neon-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Check-in</span>
        </button>
      </div>

      {/* KPI Headline Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Current Weight */}
        <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Current Weight</span>
          <p className="text-3xl font-black font-display text-white mt-1">{currentWeight} kg</p>
          <span className="text-[11px] text-zinc-500 font-mono">Started: {startWeight} kg</span>
        </div>

        {/* Net Change */}
        <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Net Weight Change</span>
          <div className="flex items-center gap-2 mt-1">
            <p className={`text-3xl font-black font-display ${netWeightChange < 0 ? 'text-neon' : 'text-cyan-400'}`}>
              {netWeightChange > 0 ? `+${netWeightChange}` : netWeightChange} kg
            </p>
            {netWeightChange < 0 ? (
              <TrendingDown className="w-5 h-5 text-neon" />
            ) : (
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            )}
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">Across {weightLogs.length} weeks</span>
        </div>

        {/* Workout Completion */}
        <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Workout Adherence</span>
          <p className="text-3xl font-black font-display text-neon mt-1">94%</p>
          <span className="text-[11px] text-zinc-500 font-mono">48 Workouts completed</span>
        </div>

        {/* Weekly Frequency */}
        <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Weekly Frequency</span>
          <p className="text-3xl font-black font-display text-cyan-400 mt-1">5.2 Days</p>
          <span className="text-[11px] text-zinc-500 font-mono">Avg 68 mins / session</span>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weight Progression Line Chart */}
        <div className="p-6 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Body Mass Progression (kg)</h3>
              <p className="text-xs text-zinc-400">Weekly weigh-ins vs 76kg lean target</p>
            </div>
            <span className="text-xs font-mono font-bold text-neon bg-neon/15 px-2.5 py-1 rounded-lg border border-neon/30">
              TARGET: 76.0 KG
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightLogs} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="week" stroke="#71717a" fontSize={11} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#71717a" fontSize={11} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-dark-950 border border-dark-700 p-3 rounded-xl shadow-xl text-xs">
                          <p className="font-bold text-white mb-1">{label}</p>
                          <p className="text-neon font-mono">Weight: {payload[0].value} kg</p>
                          <p className="text-zinc-500 font-mono">Target: 76.0 kg</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#C6FF3D"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#C6FF3D', stroke: '#080808', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#71717a"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Workout Volume / Duration Bar Chart */}
        <div className="p-6 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Weekly Training Duration (Mins)</h3>
              <p className="text-xs text-zinc-400">Time under tension per daily split</p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/15 px-2.5 py-1 rounded-lg border border-cyan-500/30">
              5 SESSIONS
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INITIAL_WORKOUT_FREQUENCY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="day" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-dark-950 border border-dark-700 p-3 rounded-xl shadow-xl text-xs">
                          <p className="font-bold text-white mb-1">{label}</p>
                          <p className="text-cyan-400 font-mono">Duration: {payload[0].value} mins</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="duration" fill="#06B6D4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Body Measurements & Photos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Measurements List */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-dark-900 border border-dark-700/80 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-dark-700">
            <h3 className="text-base font-bold text-white">Body Circumferences</h3>
            <span className="text-xs text-zinc-400 font-mono">Updated this week</span>
          </div>

          <div className="space-y-3">
            {Object.entries(measurements).map(([part, val]) => (
              <div
                key={part}
                className="flex items-center justify-between p-3 rounded-xl bg-dark-850 border border-dark-750"
              >
                <span className="text-xs font-semibold text-zinc-300 capitalize">{part}</span>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => setMeasurements({ ...measurements, [part]: e.target.value })}
                  className="bg-dark-900 border border-dark-700 rounded-lg px-2.5 py-1 text-xs text-neon font-mono font-bold text-right w-24 focus:outline-none focus:border-neon"
                />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => showToast({ type: 'success', title: 'Measurements Saved', message: 'Circumference telemetry updated.' })}
              className="w-full py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-neon font-bold text-xs border border-neon/30 transition-all"
            >
              Update Measurements
            </button>
          </div>
        </div>

        {/* Transformation Photos Preview */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-dark-900 border border-dark-700/80 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-dark-700">
            <div>
              <h3 className="text-base font-bold text-white">Visual Transformation Telemetry</h3>
              <p className="text-xs text-zinc-400">Before & Current side-by-side comparison</p>
            </div>
            <span className="text-xs font-mono font-bold text-neon bg-neon/15 px-2.5 py-1 rounded-lg border border-neon/30">
              -6.0 KG NET
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Before Photo */}
            <div className="space-y-2">
              <div className="relative h-64 rounded-2xl overflow-hidden bg-dark-950 border border-dark-700 group">
                <img src={beforePhoto} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-dark-950/80 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-zinc-400 border border-dark-700">
                  WEEK 1 (84.5 KG)
                </div>
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-white text-xs font-semibold gap-1">
                  <Camera className="w-5 h-5 text-neon" />
                  <span>Replace Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, 'before')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Current Photo */}
            <div className="space-y-2">
              <div className="relative h-64 rounded-2xl overflow-hidden bg-dark-950 border border-dark-700 group">
                <img src={currentPhoto} alt="Current" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-neon text-black px-2.5 py-1 rounded-md text-[10px] font-mono font-bold">
                  CURRENT (78.5 KG)
                </div>
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-white text-xs font-semibold gap-1">
                  <Camera className="w-5 h-5 text-neon" />
                  <span>Update Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, 'current')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Check-in Modal */}
      {addLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-dark-900 border border-dark-600 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Log New Check-in</h3>
            <form onSubmit={handleAddLog} className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Body Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder="e.g. 78.1"
                  required
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-neon"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Daily Avg Calories (kcal)</label>
                <input
                  type="number"
                  value={newCalories}
                  onChange={(e) => setNewCalories(e.target.value)}
                  placeholder="e.g. 2500"
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-neon"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Daily Avg Protein (g)</label>
                <input
                  type="number"
                  value={newProtein}
                  onChange={(e) => setNewProtein(e.target.value)}
                  placeholder="e.g. 170"
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-neon"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddLogModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-dark-800 text-zinc-400 text-xs font-semibold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-neon text-black text-xs font-bold hover:bg-neon-hover shadow-neon-sm"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

