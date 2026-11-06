import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Apple,
  Search,
  Plus,
  Trash2,
  PieChart as PieIcon,
  Flame,
  Scale,
  Sparkles,
  CheckCircle2,
  Info,
  Clock
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { FOOD_DATABASE, MEAL_TIMINGS } from '../data/foodDatabase';
import { SAMPLE_DIET_PLANS } from '../data/dietPlans';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/storage';
import { useToast } from '../context/ToastContext';

const INITIAL_LOG = {
  breakfast: [
    { ...FOOD_DATABASE.find((f) => f.id === 'food_10'), customServings: 1 }, // Oats
    { ...FOOD_DATABASE.find((f) => f.id === 'food_15'), customServings: 1 }, // Whey
  ],
  mid_morning: [
    { ...FOOD_DATABASE.find((f) => f.id === 'food_6'), customServings: 1 }, // Greek yogurt
  ],
  lunch: [
    { ...FOOD_DATABASE.find((f) => f.id === 'food_4'), customServings: 1.5 }, // Chicken breast
    { ...FOOD_DATABASE.find((f) => f.id === 'food_11'), customServings: 1 }, // Brown rice
    { ...FOOD_DATABASE.find((f) => f.id === 'food_8'), customServings: 1 }, // Dal
  ],
  pre_workout: [
    { ...FOOD_DATABASE.find((f) => f.id === 'food_14'), customServings: 1 }, // Banana
    { ...FOOD_DATABASE.find((f) => f.id === 'food_12'), customServings: 1 }, // Peanut butter
  ],
  post_workout: [
    { ...FOOD_DATABASE.find((f) => f.id === 'food_15'), customServings: 1 }, // Whey
  ],
  dinner: [
    { ...FOOD_DATABASE.find((f) => f.id === 'food_1'), customServings: 1 }, // Paneer
    { ...FOOD_DATABASE.find((f) => f.id === 'food_2'), customServings: 1 }, // Soya chunks
  ],
};

const MACRO_COLORS = {
  protein: '#C6FF3D', // Neon Lime
  carbs: '#06B6D4',   // Cyan
  fats: '#F59E0B',    // Amber
};

export default function Nutrition() {
  const [mealLog, setMealLog] = useLocalStorage(STORAGE_KEYS.NUTRITION_LOG, INITIAL_LOG);
  const [foodSearch, setFoodSearch] = useState('');
  const [activeMealTarget, setActiveMealTarget] = useState('lunch');
  const [selectedCuratedPlan, setSelectedCuratedPlan] = useState(SAMPLE_DIET_PLANS[0]);
  const [activeTab, setActiveTab] = useState('tracker'); // tracker, database, curated
  const { showToast } = useToast();

  const dailyGoals = {
    calories: 2650,
    protein: 165,
    carbs: 310,
    fats: 70,
  };

  // Calculate totals
  const totals = useMemo(() => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    Object.values(mealLog).forEach((mealItems) => {
      if (Array.isArray(mealItems)) {
        mealItems.forEach((item) => {
          if (item) {
            const factor = item.customServings || 1;
            calories += (item.calories || 0) * factor;
            protein += (item.protein || 0) * factor;
            carbs += (item.carbs || 0) * factor;
            fats += (item.fats || 0) * factor;
          }
        });
      }
    });

    return {
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
    };
  }, [mealLog]);

  const pieData = [
    { name: 'Protein (g)', value: totals.protein * 4, grams: totals.protein, color: MACRO_COLORS.protein },
    { name: 'Carbs (g)', value: totals.carbs * 4, grams: totals.carbs, color: MACRO_COLORS.carbs },
    { name: 'Fats (g)', value: totals.fats * 9, grams: totals.fats, color: MACRO_COLORS.fats },
  ];

  const handleAddFoodToMeal = (food, mealId = activeMealTarget) => {
    setMealLog((prev) => {
      const copy = { ...prev };
      if (!copy[mealId]) copy[mealId] = [];
      copy[mealId] = [...copy[mealId], { ...food, customServings: 1 }];
      return copy;
    });
    showToast({
      type: 'success',
      title: 'Food Item Added',
      message: `${food.name} logged into ${mealId.replace('_', ' ').toUpperCase()}.`
    });
  };

  const handleRemoveFoodFromMeal = (mealId, idx) => {
    setMealLog((prev) => {
      const copy = { ...prev };
      copy[mealId] = copy[mealId].filter((_, i) => i !== idx);
      return copy;
    });
    showToast({
      type: 'info',
      title: 'Item Removed',
      message: 'Item removed from meal log.'
    });
  };

  const filteredFoods = useMemo(() => {
    if (!foodSearch) return FOOD_DATABASE;
    const q = foodSearch.toLowerCase();
    return FOOD_DATABASE.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [foodSearch]);

  return (
    <div className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-dark-700/60">
        <div>
          <span className="text-xs font-mono font-bold text-neon uppercase tracking-widest">
            BIO-ENERGETICS & MACRONUTRIENT AUDITING
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white mt-1 uppercase">
            NUTRITION & DIET
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Scientific macro calibration. Log daily meals with exact serving sizes, search our verified food database, and adhere to proven nutritional blueprints.
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex bg-dark-900 border border-dark-700 p-1 rounded-2xl">
          {[
            { id: 'tracker', label: 'Daily Tracker & Meals' },
            { id: 'database', label: 'Food Database' },
            { id: 'curated', label: 'Curated Diet Plans' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-neon text-black shadow-neon-sm'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'tracker' && (
        <div className="space-y-10">
          {/* Top Overview Cards & Macro Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Calories & Macro Progress Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Total Calories */}
              <div className="sm:col-span-2 p-6 rounded-3xl bg-dark-900 border border-dark-700 flex flex-col justify-between shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Daily Calorie Balance</h4>
                      <p className="text-xs text-zinc-400">Target: {dailyGoals.calories} kcal</p>
                    </div>
                  </div>
                  <span className="text-2xl font-mono font-extrabold text-neon">
                    {totals.calories}{' '}
                    <span className="text-xs text-zinc-400 font-normal">/ {dailyGoals.calories} kcal</span>
                  </span>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-dark-800 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-neon h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.round((totals.calories / dailyGoals.calories) * 100))}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mt-2 font-mono">
                    <span>{Math.round((totals.calories / dailyGoals.calories) * 100)}% of goal consumed</span>
                    <span>{Math.max(0, dailyGoals.calories - totals.calories)} kcal remaining</span>
                  </div>
                </div>
              </div>

              {/* Protein Goal */}
              <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-neon uppercase font-mono">PROTEIN</span>
                    <p className="text-2xl font-bold font-display text-white mt-1">
                      {totals.protein}g{' '}
                      <span className="text-xs text-zinc-400 font-normal">/ {dailyGoals.protein}g</span>
                    </p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-neon/15 text-neon font-bold">
                    {Math.round((totals.protein / dailyGoals.protein) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-neon h-full rounded-full"
                    style={{ width: `${Math.min(100, (totals.protein / dailyGoals.protein) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Carbs Goal */}
              <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase font-mono">CARBOHYDRATES</span>
                    <p className="text-2xl font-bold font-display text-white mt-1">
                      {totals.carbs}g{' '}
                      <span className="text-xs text-zinc-400 font-normal">/ {dailyGoals.carbs}g</span>
                    </p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 font-bold">
                    {Math.round((totals.carbs / dailyGoals.carbs) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-cyan-400 h-full rounded-full"
                    style={{ width: `${Math.min(100, (totals.carbs / dailyGoals.carbs) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Fats Goal */}
              <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase font-mono">HEALTHY FATS</span>
                    <p className="text-2xl font-bold font-display text-white mt-1">
                      {totals.fats}g{' '}
                      <span className="text-xs text-zinc-400 font-normal">/ {dailyGoals.fats}g</span>
                    </p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-bold">
                    {Math.round((totals.fats / dailyGoals.fats) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{ width: `${Math.min(100, (totals.fats / dailyGoals.fats) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Water Intake Quick Card */}
              <div className="p-5 rounded-2xl bg-dark-900 border border-dark-700">
                <span className="text-xs font-bold text-blue-400 uppercase font-mono">HYDRATION</span>
                <p className="text-2xl font-bold font-display text-white mt-1">
                  2.8L <span className="text-xs text-zinc-400 font-normal">/ 3.5L Target</span>
                </p>
                <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden mt-3">
                  <div className="bg-blue-400 h-full rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
            </div>

            {/* Recharts Macro Ratio Pie Chart */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-dark-900 border border-dark-700 flex flex-col justify-between shadow-xl">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Macronutrient Calorie Ratio
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">Based on 4-4-9 caloric density</p>
              </div>

              <div className="h-56 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#080808" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-dark-950 border border-dark-700 p-2.5 rounded-xl shadow-xl text-xs">
                              <p className="font-bold text-white">{data.name}</p>
                              <p className="text-neon font-mono">{data.grams}g ({data.value} kcal)</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-dark-700 text-center text-xs">
                <div>
                  <span className="w-2.5 h-2.5 rounded-full inline-block mr-1 bg-neon" />
                  <span className="text-zinc-400">Protein</span>
                  <p className="font-mono font-bold text-white mt-0.5">{totals.protein}g</p>
                </div>
                <div>
                  <span className="w-2.5 h-2.5 rounded-full inline-block mr-1 bg-cyan-400" />
                  <span className="text-zinc-400">Carbs</span>
                  <p className="font-mono font-bold text-white mt-0.5">{totals.carbs}g</p>
                </div>
                <div>
                  <span className="w-2.5 h-2.5 rounded-full inline-block mr-1 bg-amber-400" />
                  <span className="text-zinc-400">Fats</span>
                  <p className="font-mono font-bold text-white mt-0.5">{totals.fats}g</p>
                </div>
              </div>
            </div>
          </div>

          {/* 6-Meal Interactive Planner */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold font-display text-white">Daily Meal Schedule</h3>
                <p className="text-xs text-zinc-400">Add or remove foods across 6 daily fueling windows.</p>
              </div>
              <button
                onClick={() => setActiveTab('database')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neon text-black font-bold text-xs hover:bg-neon-hover shadow-neon-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add from Food Database</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MEAL_TIMINGS.map((meal) => {
                const items = mealLog[meal.id] || [];
                const mealCals = items.reduce((acc, it) => acc + (it?.calories || 0) * (it?.customServings || 1), 0);
                const mealProt = items.reduce((acc, it) => acc + (it?.protein || 0) * (it?.customServings || 1), 0);

                return (
                  <div
                    key={meal.id}
                    className="p-5 rounded-2xl bg-dark-900 border border-dark-700 flex flex-col justify-between"
                  >
                    <div>
                      {/* Meal title & time */}
                      <div className="flex items-center justify-between pb-3 border-b border-dark-800">
                        <div>
                          <h4 className="text-sm font-bold text-white">{meal.label}</h4>
                          <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-neon" />
                            {meal.time}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-neon">{Math.round(mealCals)} kcal</span>
                          <p className="text-[10px] text-zinc-400">{Math.round(mealProt)}g Protein</p>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                        {items.length === 0 ? (
                          <p className="text-xs text-zinc-600 italic py-4 text-center">No foods logged yet.</p>
                        ) : (
                          items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2 rounded-xl bg-dark-850 text-xs border border-dark-800"
                            >
                              <div className="min-w-0 pr-2">
                                <p className="font-semibold text-zinc-200 truncate">{item.name}</p>
                                <span className="text-[10px] text-zinc-400 font-mono">
                                  {item.serving} • {item.calories} kcal • {item.protein}g P
                                </span>
                              </div>
                              <button
                                onClick={() => handleRemoveFoodFromMeal(meal.id, idx)}
                                className="text-zinc-500 hover:text-red-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Quick Add into this meal */}
                    <div className="mt-4 pt-3 border-t border-dark-800">
                      <button
                        onClick={() => {
                          setActiveMealTarget(meal.id);
                          setActiveTab('database');
                        }}
                        className="w-full py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-neon text-xs font-semibold border border-dark-700 hover:border-neon transition-all"
                      >
                        + Log item to {meal.label}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* FOOD DATABASE TAB */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-display text-white">Food Database</h3>
              <p className="text-xs text-zinc-400">Select items to log into your meal tracker.</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 font-semibold">Target Window:</span>
              <select
                value={activeMealTarget}
                onChange={(e) => setActiveMealTarget(e.target.value)}
                className="bg-dark-900 border border-dark-700 rounded-xl px-3 py-2 text-xs text-neon font-bold focus:outline-none focus:border-neon"
              >
                {MEAL_TIMINGS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label} ({m.time})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search food by name, tag (e.g. Paneer, Whey, Soya, Rice)..."
              value={foodSearch}
              onChange={(e) => setFoodSearch(e.target.value)}
              className="w-full bg-dark-900 border border-dark-700 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-neon"
            />
          </div>

          {/* Food Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFoods.map((food) => (
              <div
                key={food.id}
                className="rounded-2xl bg-dark-900 border border-dark-700 overflow-hidden flex flex-col justify-between hover:border-neon/40 transition-all shadow-card"
              >
                <div className="relative h-40 w-full overflow-hidden bg-dark-950">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                  <span
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold ${
                      food.isVeg ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {food.isVeg ? 'VEG' : 'NON-VEG'}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{food.name}</h4>
                    <span className="text-[11px] text-zinc-400">{food.serving}</span>

                    <div className="grid grid-cols-4 gap-1 mt-3 pt-2 border-t border-dark-800 text-center font-mono">
                      <div className="bg-dark-850 p-1.5 rounded-lg">
                        <span className="text-[9px] text-zinc-500 block">CALS</span>
                        <span className="text-xs font-bold text-white">{food.calories}</span>
                      </div>
                      <div className="bg-dark-850 p-1.5 rounded-lg">
                        <span className="text-[9px] text-neon block">PRO</span>
                        <span className="text-xs font-bold text-neon">{food.protein}g</span>
                      </div>
                      <div className="bg-dark-850 p-1.5 rounded-lg">
                        <span className="text-[9px] text-cyan-400 block">CARB</span>
                        <span className="text-xs font-bold text-cyan-400">{food.carbs}g</span>
                      </div>
                      <div className="bg-dark-850 p-1.5 rounded-lg">
                        <span className="text-[9px] text-amber-400 block">FAT</span>
                        <span className="text-xs font-bold text-amber-400">{food.fats}g</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddFoodToMeal(food)}
                    className="w-full mt-4 py-2 rounded-xl bg-neon/15 hover:bg-neon hover:text-black text-neon text-xs font-bold border border-neon/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log to {activeMealTarget.replace('_', ' ')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CURATED DIET PLANS TAB */}
      {activeTab === 'curated' && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            {SAMPLE_DIET_PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedCuratedPlan(plan)}
                className={`px-5 py-3 rounded-2xl border text-xs font-bold transition-all ${
                  selectedCuratedPlan.id === plan.id
                    ? 'bg-neon text-black border-neon shadow-neon-sm'
                    : 'bg-dark-900 border-dark-700 text-zinc-300 hover:text-white'
                }`}
              >
                {plan.name}
              </button>
            ))}
          </div>

          {/* Selected Plan Details */}
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-dark-700 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-dark-700 gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-neon uppercase tracking-wider">
                  {selectedCuratedPlan.badge}
                </span>
                <h3 className="text-2xl font-black font-display text-white mt-1">
                  {selectedCuratedPlan.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-2xl leading-relaxed">
                  {selectedCuratedPlan.description}
                </p>
              </div>

              <div className="flex items-center gap-4 bg-dark-850 p-4 rounded-2xl border border-dark-700 shrink-0 font-mono">
                <div>
                  <span className="text-[10px] text-zinc-400 block">ENERGY</span>
                  <span className="text-base font-bold text-white">{selectedCuratedPlan.calories} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-neon block">PROTEIN</span>
                  <span className="text-base font-bold text-neon">{selectedCuratedPlan.protein}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-cyan-400 block">CARBS</span>
                  <span className="text-base font-bold text-cyan-400">{selectedCuratedPlan.carbs}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 block">FATS</span>
                  <span className="text-base font-bold text-amber-400">{selectedCuratedPlan.fats}g</span>
                </div>
              </div>
            </div>

            {/* Meal Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCuratedPlan.meals.map((meal, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-dark-850 border border-dark-700 space-y-3">
                  <div className="flex justify-between items-start pb-2 border-b border-dark-750">
                    <h4 className="text-xs font-bold text-white">{meal.title}</h4>
                    <span className="text-[11px] font-mono text-neon font-bold">{meal.calories} kcal</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {meal.items.map((it, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-neon">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-dark-700/60 flex justify-between text-[11px] font-mono text-zinc-400">
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>F: {meal.fats}g</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

