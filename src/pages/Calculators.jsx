import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calculator,
  Scale,
  Flame,
  Activity,
  Heart,
  Droplet,
  ShieldCheck,
  CheckCircle2,
  Info,
  RotateCcw
} from 'lucide-react';
import {
  calculateBMI,
  calculateBMR,
  calculateTDEE,
  calculateProtein,
  calculateDailyCalories,
  calculateBodyFat,
  calculateIdealWeight,
  calculateWaterIntake,
  ACTIVITY_MULTIPLIERS
} from '../utils/calculations';

export default function Calculators() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'bmi';

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setSearchParams({ tab: id });
  };

  // 1. BMI State
  const [bmiWeight, setBmiWeight] = useState(76);
  const [bmiHeight, setBmiHeight] = useState(178);
  const bmiResult = calculateBMI(bmiWeight, bmiHeight);

  // 2. BMR State
  const [bmrWeight, setBmrWeight] = useState(76);
  const [bmrHeight, setBmrHeight] = useState(178);
  const [bmrAge, setBmrAge] = useState(26);
  const [bmrGender, setBmrGender] = useState('male');
  const bmrResult = calculateBMR(bmrWeight, bmrHeight, bmrAge, bmrGender);

  // 3. TDEE State
  const [tdeeActivity, setTdeeActivity] = useState('moderate');
  const tdeeResult = calculateTDEE(bmrResult, tdeeActivity);

  // 4. Protein State
  const [proteinWeight, setProteinWeight] = useState(76);
  const [proteinGoal, setProteinGoal] = useState('muscle_gain');
  const proteinResult = calculateProtein(proteinWeight, proteinGoal);

  // 5. Daily Calorie State
  const [calWeight, setCalWeight] = useState(76);
  const [calHeight, setCalHeight] = useState(178);
  const [calAge, setCalAge] = useState(26);
  const [calGender, setCalGender] = useState('male');
  const [calActivity, setCalActivity] = useState('moderate');
  const [calGoal, setCalGoal] = useState('muscle_gain');
  const calorieResult = calculateDailyCalories({
    weightKg: calWeight,
    heightCm: calHeight,
    age: calAge,
    gender: calGender,
    activityLevel: calActivity,
    goal: calGoal,
  });

  // 6. Body Fat State
  const [bfGender, setBfGender] = useState('male');
  const [bfHeight, setBfHeight] = useState(178);
  const [bfNeck, setBfNeck] = useState(38);
  const [bfWaist, setBfWaist] = useState(82);
  const [bfHip, setBfHip] = useState(95);
  const bodyFatResult = calculateBodyFat({
    gender: bfGender,
    heightCm: bfHeight,
    neckCm: bfNeck,
    waistCm: bfWaist,
    hipCm: bfHip,
  });

  // 7. Ideal Weight State
  const [iwHeight, setIwHeight] = useState(178);
  const [iwGender, setIwGender] = useState('male');
  const idealWeightResult = calculateIdealWeight(iwHeight, iwGender);

  // 8. Water Intake State
  const [waterWeight, setWaterWeight] = useState(76);
  const [waterWorkoutMins, setWaterWorkoutMins] = useState(60);
  const [waterClimate, setWaterClimate] = useState('moderate');
  const waterResult = calculateWaterIntake(waterWeight, waterWorkoutMins, waterClimate);

  const TABS = [
    { id: 'bmi', name: 'BMI Calculator', icon: Scale },
    { id: 'bmr', name: 'BMR (Metabolism)', icon: Flame },
    { id: 'tdee', name: 'TDEE Expenditure', icon: Activity },
    { id: 'protein', name: 'Protein Target', icon: Heart },
    { id: 'calorie', name: 'Daily Calorie & Macros', icon: Calculator },
    { id: 'bodyfat', name: 'U.S. Navy Body Fat', icon: ShieldCheck },
    { id: 'idealweight', name: 'Ideal Healthy Weight', icon: Scale },
    { id: 'water', name: 'Water Intake', icon: Droplet },
  ];

  return (
    <div className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold text-neon uppercase tracking-widest">
          SPORTS SCIENCE TOOLBOX
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white mt-1 uppercase">
          FITNESS CALCULATORS
        </h1>
        <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
          Eight scientifically verified calculation models. Accurately measure body composition, basal metabolic expenditure, macronutrient ratios, and hydration protocols.
        </p>
      </div>

      {/* Calculator Navigation Bar / Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-neon text-black border-neon shadow-neon-sm font-extrabold'
                  : 'bg-dark-900 border-dark-700 text-zinc-300 hover:border-dark-600 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Calculator Box */}
      <div className="max-w-4xl mx-auto bg-dark-900 border border-dark-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
        {/* 1. BMI CALCULATOR */}
        {activeTab === 'bmi' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="border-b border-dark-700 pb-4">
              <h3 className="text-2xl font-bold font-display text-white">Body Mass Index (BMI)</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Standard metric utilized by the World Health Organization (WHO) to classify body weight relative to height.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                    Weight: <span className="text-neon font-bold">{bmiWeight} kg</span>
                  </label>
                  <input
                    type="range"
                    min="35"
                    max="180"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(Number(e.target.value))}
                    className="w-full accent-neon cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                    <span>35 kg</span>
                    <span>180 kg</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                    Height: <span className="text-cyan-400 font-bold">{bmiHeight} cm</span>
                  </label>
                  <input
                    type="range"
                    min="120"
                    max="220"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                    <span>120 cm</span>
                    <span>220 cm</span>
                  </div>
                </div>
              </div>

              {/* BMI Output Card */}
              {bmiResult && (
                <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 text-center space-y-3">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Your Calculated BMI</span>
                  <p className="text-5xl font-black font-display text-white tracking-tight">
                    {bmiResult.bmi}
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold border border-current bg-dark-800" style={{ color: bmiResult.color.includes('neon') ? '#C6FF3D' : bmiResult.color.includes('green') ? '#4ade80' : bmiResult.color.includes('yellow') ? '#facc15' : '#f87171' }}>
                    {bmiResult.category}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed px-4">
                    {bmiResult.description}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-mono pt-2 border-t border-dark-700">
                    Normal Healthy Weight Range for your height: <strong className="text-white">{bmiResult.idealRange}</strong>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 2. BMR CALCULATOR */}
        {activeTab === 'bmr' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="border-b border-dark-700 pb-4">
              <h3 className="text-2xl font-bold font-display text-white">Basal Metabolic Rate (BMR)</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Calculated using the Mifflin-St Jeor equation. Represents calories burned by vital organs at complete rest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1">Gender</label>
                    <select
                      value={bmrGender}
                      onChange={(e) => setBmrGender(e.target.value)}
                      className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1">Age</label>
                    <input
                      type="number"
                      value={bmrAge}
                      onChange={(e) => setBmrAge(Number(e.target.value))}
                      className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Weight: {bmrWeight} kg</label>
                  <input
                    type="range"
                    min="40"
                    max="160"
                    value={bmrWeight}
                    onChange={(e) => setBmrWeight(Number(e.target.value))}
                    className="w-full accent-neon cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Height: {bmrHeight} cm</label>
                  <input
                    type="range"
                    min="130"
                    max="215"
                    value={bmrHeight}
                    onChange={(e) => setBmrHeight(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* BMR Output Card */}
              <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 text-center space-y-3">
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Estimated Basal Metabolic Rate</span>
                <p className="text-5xl font-black font-display text-neon tracking-tight">
                  {bmrResult} <span className="text-base text-zinc-400 font-normal">kcal/day</span>
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed px-4">
                  This is your metabolic baseline. You burn this amount of energy simply breathing, pumping blood, and cellular turnover before taking a single step.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. TDEE CALCULATOR */}
        {activeTab === 'tdee' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="border-b border-dark-700 pb-4">
              <h3 className="text-2xl font-bold font-display text-white">Total Daily Energy Expenditure (TDEE)</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Your maintenance calories factoring in your physical activity level on top of your baseline BMR ({bmrResult} kcal).
              </p>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                Select Your Physical Activity Multiplier:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(ACTIVITY_MULTIPLIERS).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setTdeeActivity(key)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                      tdeeActivity === key
                        ? 'bg-neon/15 border-neon text-white shadow-neon-sm'
                        : 'bg-dark-850 border-dark-700 text-zinc-300 hover:border-dark-600'
                    }`}
                  >
                    <span className="block font-bold text-sm text-neon mb-0.5">{item.factor}x</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {tdeeResult && (
              <div className="mt-6 pt-6 border-t border-dark-700 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-mono">
                <div className="p-4 rounded-xl bg-dark-850 border border-dark-700">
                  <span className="text-xs text-amber-400 uppercase font-bold block">Deficit (Cutting)</span>
                  <p className="text-2xl font-bold text-white mt-1">{tdeeResult.cutting} kcal</p>
                  <span className="text-[10px] text-zinc-400">-500 kcal deficit</span>
                </div>
                <div className="p-4 rounded-xl bg-neon/10 border border-neon/30">
                  <span className="text-xs text-neon uppercase font-bold block">Maintenance (TDEE)</span>
                  <p className="text-3xl font-bold text-neon mt-1">{tdeeResult.maintenance} kcal</p>
                  <span className="text-[10px] text-zinc-400">Weight steady</span>
                </div>
                <div className="p-4 rounded-xl bg-dark-850 border border-dark-700">
                  <span className="text-xs text-cyan-400 uppercase font-bold block">Surplus (Bulking)</span>
                  <p className="text-2xl font-bold text-white mt-1">{tdeeResult.leanBulk} kcal</p>
                  <span className="text-[10px] text-zinc-400">+300 kcal lean bulk</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 4. PROTEIN CALCULATOR */}
        {activeTab === 'protein' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="border-b border-dark-700 pb-4">
              <h3 className="text-2xl font-bold font-display text-white">Daily Protein Target</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Optimized protein consumption to stimulate muscle protein synthesis (MPS) and preserve lean mass.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">
                    Body Weight: <span className="text-neon font-bold">{proteinWeight} kg</span>
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    value={proteinWeight}
                    onChange={(e) => setProteinWeight(Number(e.target.value))}
                    className="w-full accent-neon cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Current Goal</label>
                  <select
                    value={proteinGoal}
                    onChange={(e) => setProteinGoal(e.target.value)}
                    className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                  >
                    <option value="muscle_gain">Muscle Hypertrophy (1.8 - 2.2 g/kg)</option>
                    <option value="fat_loss">Fat Loss Caloric Deficit (2.0 - 2.4 g/kg)</option>
                    <option value="strength">Heavy Strength / Powerlifting (1.8 - 2.2 g/kg)</option>
                    <option value="endurance">Endurance Sports (1.4 - 1.8 g/kg)</option>
                  </select>
                </div>
              </div>

              {proteinResult && (
                <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 text-center space-y-3">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Recommended Daily Intake</span>
                  <p className="text-5xl font-black font-display text-neon tracking-tight">
                    {proteinResult.targetGrams} <span className="text-base text-zinc-400 font-normal">grams</span>
                  </p>
                  <p className="text-xs text-zinc-300">
                    Range: <strong className="text-white">{proteinResult.minGrams}g - {proteinResult.maxGrams}g</strong> ({proteinResult.perKg})
                  </p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed border-t border-dark-700 pt-2">
                    Spread across 3-4 meals to trigger the 2.5-3.0g leucine threshold in every feeding window.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 5. CALORIE & MACRO CALCULATOR */}
        {activeTab === 'calorie' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="border-b border-dark-700 pb-4">
              <h3 className="text-2xl font-bold font-display text-white">Daily Calorie & Macro Target</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Comprehensive macro distribution model calculating protein, carbs, and fats in grams.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={calWeight}
                  onChange={(e) => setCalWeight(Number(e.target.value))}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={calHeight}
                  onChange={(e) => setCalHeight(Number(e.target.value))}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Age</label>
                <input
                  type="number"
                  value={calAge}
                  onChange={(e) => setCalAge(Number(e.target.value))}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Gender</label>
                <select
                  value={calGender}
                  onChange={(e) => setCalGender(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Goal</label>
                <select
                  value={calGoal}
                  onChange={(e) => setCalGoal(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                >
                  <option value="muscle_gain">Lean Muscle Bulk (+300 kcal)</option>
                  <option value="fat_loss">Moderate Fat Loss (-300 kcal)</option>
                  <option value="fast_fat_loss">Aggressive Shred (-500 kcal)</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            {calorieResult && (
              <div className="mt-6 pt-6 border-t border-dark-700 space-y-4">
                <div className="p-4 rounded-2xl bg-dark-850 border border-neon/30 text-center">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Target Daily Energy</span>
                  <p className="text-4xl font-black font-display text-neon mt-1">
                    {calorieResult.targetCalories} kcal
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  <div className="p-3 rounded-xl bg-dark-850 border border-dark-700">
                    <span className="text-xs text-neon uppercase font-bold block">Protein</span>
                    <p className="text-xl font-bold text-white mt-0.5">{calorieResult.protein}g</p>
                    <span className="text-[10px] text-zinc-400">{calorieResult.proteinPercent}% Cals</span>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-850 border border-dark-700">
                    <span className="text-xs text-cyan-400 uppercase font-bold block">Carbs</span>
                    <p className="text-xl font-bold text-white mt-0.5">{calorieResult.carbs}g</p>
                    <span className="text-[10px] text-zinc-400">{calorieResult.carbsPercent}% Cals</span>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-850 border border-dark-700">
                    <span className="text-xs text-amber-400 uppercase font-bold block">Fats</span>
                    <p className="text-xl font-bold text-white mt-0.5">{calorieResult.fats}g</p>
                    <span className="text-[10px] text-zinc-400">{calorieResult.fatsPercent}% Cals</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 6. BODY FAT CALCULATOR */}
        {activeTab === 'bodyfat' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="border-b border-dark-700 pb-4">
              <h3 className="text-2xl font-bold font-display text-white">U.S. Navy Body Fat Calculator</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Circumference-based anthropometric formula recognized by DoD fitness assessments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1">Gender</label>
                    <select
                      value={bfGender}
                      onChange={(e) => setBfGender(e.target.value)}
                      className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={bfHeight}
                      onChange={(e) => setBfHeight(Number(e.target.value))}
                      className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Neck Circumference (cm)</label>
                  <input
                    type="number"
                    value={bfNeck}
                    onChange={(e) => setBfNeck(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Waist (at navel) (cm)</label>
                  <input
                    type="number"
                    value={bfWaist}
                    onChange={(e) => setBfWaist(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                  />
                </div>

                {bfGender === 'female' && (
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1">Hip (at widest) (cm)</label>
                    <input
                      type="number"
                      value={bfHip}
                      onChange={(e) => setBfHip(Number(e.target.value))}
                      className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                )}
              </div>

              {bodyFatResult && (
                <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 text-center space-y-3">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Estimated Body Fat %</span>
                  <p className="text-5xl font-black font-display text-neon tracking-tight">
                    {bodyFatResult.bodyFat}%
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-neon/15 text-neon border border-neon/30">
                    {bodyFatResult.category}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pt-2">
                    Measure snugly against skin without compressing soft tissue in the morning before breakfast.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 7. IDEAL WEIGHT CALCULATOR */}
        {activeTab === 'idealweight' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="border-b border-dark-700 pb-4">
              <h3 className="text-2xl font-bold font-display text-white">Ideal Healthy Weight</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Multi-formula clinical consensus incorporating Devine, Robinson, and Miller equations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Gender</label>
                  <select
                    value={iwGender}
                    onChange={(e) => setIwGender(e.target.value)}
                    className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Height (cm)</label>
                  <input
                    type="range"
                    min="140"
                    max="215"
                    value={iwHeight}
                    onChange={(e) => setIwHeight(Number(e.target.value))}
                    className="w-full accent-neon cursor-pointer"
                  />
                  <span className="text-xs font-mono text-neon font-bold block mt-1">{iwHeight} cm</span>
                </div>
              </div>

              {idealWeightResult && (
                <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 text-center space-y-3 font-mono">
                  <span className="text-xs font-bold text-zinc-400 uppercase">Averaged Ideal Weight</span>
                  <p className="text-5xl font-black font-display text-white tracking-tight">
                    {idealWeightResult.recommended} <span className="text-base text-zinc-400 font-normal">kg</span>
                  </p>
                  <p className="text-xs text-neon">
                    Normal WHO BMI Range: {idealWeightResult.healthyRange}
                  </p>
                  <div className="text-[11px] text-zinc-400 pt-2 border-t border-dark-700 space-y-1">
                    <p>Devine Formula: {idealWeightResult.devine} kg</p>
                    <p>Robinson Formula: {idealWeightResult.robinson} kg</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 8. WATER INTAKE CALCULATOR */}
        {activeTab === 'water' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="border-b border-dark-700 pb-4">
              <h3 className="text-2xl font-bold font-display text-white">Daily Hydration Target</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Estimates cellular hydration needs based on body mass, workout perspiration, and climate heat index.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">
                    Body Weight: <span className="text-blue-400 font-bold">{waterWeight} kg</span>
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    value={waterWeight}
                    onChange={(e) => setWaterWeight(Number(e.target.value))}
                    className="w-full accent-blue-400 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">
                    Daily Workout Duration: <span className="text-neon font-bold">{waterWorkoutMins} mins</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    step="15"
                    value={waterWorkoutMins}
                    onChange={(e) => setWaterWorkoutMins(Number(e.target.value))}
                    className="w-full accent-neon cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Climate Condition</label>
                  <select
                    value={waterClimate}
                    onChange={(e) => setWaterClimate(e.target.value)}
                    className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-white font-bold"
                  >
                    <option value="moderate">Moderate / Indoors AC</option>
                    <option value="hot">Hot / Humid Outdoor Weather (+500ml)</option>
                  </select>
                </div>
              </div>

              {waterResult && (
                <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 text-center space-y-3 font-mono">
                  <span className="text-xs font-bold text-zinc-400 uppercase">Estimated Daily Fluid</span>
                  <p className="text-5xl font-black font-display text-blue-400 tracking-tight">
                    {waterResult.liters} <span className="text-base text-zinc-400 font-normal">Liters</span>
                  </p>
                  <p className="text-xs text-white">
                    Approximately <strong className="text-neon font-bold">{waterResult.glasses} glasses</strong> (250ml each)
                  </p>
                  <p className="text-[11px] text-zinc-400 border-t border-dark-700 pt-2 leading-relaxed">
                    Sip steadily throughout the day rather than chugging in single sittings. Electrolytes (sodium, potassium) are essential during heavy sweating.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Global Medical Notice at bottom of calculators */}
        <div className="mt-8 pt-6 border-t border-dark-700 flex items-start gap-2 text-xs text-zinc-500">
          <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
          <span>
            Disclaimer: All fitness and nutritional calculations are mathematical estimates for educational and athletic purposes. They do not substitute medical diagnoses or professional healthcare counsel.
          </span>
        </div>
      </div>
    </div>
  );
}

