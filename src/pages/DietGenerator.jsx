import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Apple,
  Clock,
  ShieldAlert,
  Save,
  CheckCircle2,
  Flame,
  ArrowRight
} from 'lucide-react';
import { calculateDailyCalories } from '../utils/calculations';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/storage';
import { useToast } from '../context/ToastContext';

export default function DietGenerator() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [, setStoredDiet] = useLocalStorage(STORAGE_KEYS.SAVED_DIET_PLAN, null);

  const [formData, setFormData] = useState({
    age: 26,
    weight: 76,
    height: 178,
    gender: 'male',
    goal: 'muscle_gain',
    dietaryPreference: 'vegetarian',
    allergies: 'none',
    activityLevel: 'moderate',
    mealsPerDay: 4,
  });

  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      // Calculate target calories & macros
      const macroResults = calculateDailyCalories({
        weightKg: formData.weight,
        heightCm: formData.height,
        age: formData.age,
        gender: formData.gender,
        activityLevel: formData.activityLevel,
        goal: formData.goal,
      });

      const totalCals = macroResults.targetCalories;
      const totalProt = macroResults.protein;
      const totalCarbs = macroResults.carbs;
      const totalFats = macroResults.fats;

      const isVeg = formData.dietaryPreference === 'vegetarian';
      const isVegan = formData.dietaryPreference === 'vegan';

      // Meal items tailored by diet preference
      let meals = [];
      if (formData.mealsPerDay === 3) {
        meals = [
          {
            title: 'Power Breakfast (08:30 AM)',
            calories: Math.round(totalCals * 0.3),
            protein: Math.round(totalProt * 0.3),
            carbs: Math.round(totalCarbs * 0.35),
            fats: Math.round(totalFats * 0.25),
            items: isVeg
              ? ['70g Rolled Oats with 250ml Toned Milk', '1 Scoop Whey Isolate', '1 Sliced Banana', '15g Raw Almonds']
              : isVegan
              ? ['70g Rolled Oats with 300ml Soy Milk', '1 Scoop Pea/Rice Protein', '1 Banana + Chia seeds']
              : ['3 Whole Boiled Eggs + 2 Egg Whites', '2 Multigrain Toast with peanut butter', '1 Fresh Orange']
          },
          {
            title: 'Anabolic High-Protein Lunch (01:30 PM)',
            calories: Math.round(totalCals * 0.4),
            protein: Math.round(totalProt * 0.4),
            carbs: Math.round(totalCarbs * 0.45),
            fats: Math.round(totalFats * 0.4),
            items: isVeg
              ? ['120g Pan-seared Paneer cubes', '1 Bowl Yellow Toor Dal', '150g Steamed Brown Rice', 'Cucumber & Tomato Salad']
              : isVegan
              ? ['150g Organic Tofu stir fry', '1 Bowl Chickpea Chana Masala', '150g Brown Rice', 'Green Salad']
              : ['160g Grilled Chicken Breast', '1 Bowl Lentils (Dal)', '150g Brown Rice', 'Steamed Broccoli']
          },
          {
            title: 'Nutritious Recovery Dinner (08:30 PM)',
            calories: Math.round(totalCals * 0.3),
            protein: Math.round(totalProt * 0.3),
            carbs: Math.round(totalCarbs * 0.2),
            fats: Math.round(totalFats * 0.35),
            items: isVeg
              ? ['50g Soya Chunks Bhurji with capsicum', '2 Multigrain Rotis with light ghee', '1 Cup Low-fat Yogurt']
              : isVegan
              ? ['60g Soya Chunks curry with spinach', '2 Whole Wheat Rotis', 'Steamed Mixed Vegetables']
              : ['150g Pan-seared Fish or Chicken Tikka', '2 Multigrain Rotis', 'Fresh Avocado & Greens']
          }
        ];
      } else {
        // 4, 5, or 6 meals
        meals = [
          {
            title: 'Breakfast (08:00 AM)',
            calories: Math.round(totalCals * 0.25),
            protein: Math.round(totalProt * 0.25),
            carbs: Math.round(totalCarbs * 0.3),
            fats: Math.round(totalFats * 0.25),
            items: isVeg
              ? ['60g Rolled Oats with milk & cinnamon', '1 Scoop Whey Protein Isolate', '1 Sliced Banana']
              : ['3 Egg Omelette with spinach & mushrooms', '2 Slices Multigrain Toast', '1 cup Black Coffee']
          },
          {
            title: 'Mid-Morning Sustenance (11:30 AM)',
            calories: Math.round(totalCals * 0.15),
            protein: Math.round(totalProt * 0.15),
            carbs: Math.round(totalCarbs * 0.15),
            fats: Math.round(totalFats * 0.15),
            items: ['150g Low Fat Greek Yogurt / Soya Milk', '1 Apple sliced with 1 tbsp Peanut Butter']
          },
          {
            title: 'Power Fuel Lunch (01:30 PM)',
            calories: Math.round(totalCals * 0.3),
            protein: Math.round(totalProt * 0.3),
            carbs: Math.round(totalCarbs * 0.35),
            fats: Math.round(totalFats * 0.3),
            items: isVeg
              ? ['120g Paneer / 50g Soya Chunks Masala', '1 Bowl Moong Dal', '150g Basmati Rice', 'Green Salad']
              : ['150g Grilled Chicken Breast', '1 Bowl Dal', '150g Brown Rice', 'Steamed Vegetables']
          },
          {
            title: 'Post-Workout / Evening Dinner (08:00 PM)',
            calories: Math.round(totalCals * 0.3),
            protein: Math.round(totalProt * 0.3),
            carbs: Math.round(totalCarbs * 0.2),
            fats: Math.round(totalFats * 0.3),
            items: isVeg
              ? ['100g Paneer Bhurji with bell peppers', '2 Multigrain Rotis', 'Cucumber Mint Raita']
              : ['140g Fish Fillet / Lean Minced Chicken', '2 Multigrain Rotis', 'Large Fresh Salad']
          }
        ];
      }

      setGeneratedPlan({
        name: `${formData.dietaryPreference.toUpperCase()} • ${formData.goal.replace('_', ' ').toUpperCase()}`,
        totals: {
          calories: totalCals,
          protein: totalProt,
          carbs: totalCarbs,
          fats: totalFats
        },
        meals
      });

      setIsGenerating(false);
      showToast({
        type: 'success',
        title: 'Diet Plan Generated!',
        message: `Calculated ${totalCals} kcal with ${totalProt}g protein based on your metabolism.`
      });
    }, 700);
  };

  const handleSaveToProfile = () => {
    if (!generatedPlan) return;
    setStoredDiet(generatedPlan);
    showToast({
      type: 'success',
      title: 'Diet Plan Saved!',
      message: 'Plan saved to your athlete profile.'
    });
  };

  return (
    <div className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold text-neon uppercase tracking-widest">
          METABOLIC & NUTRITION ENGINE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white mt-1 uppercase">
          AI DIET PLAN GENERATOR
        </h1>
        <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
          Generates tailored daily meal timing, ingredient measurements, and macro targets calibrated to your metabolic rate, dietary choices, and muscle preservation requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-dark-900 border border-dark-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-neon" />
            <span>Nutrition Parameters</span>
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4">
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

            {/* Goal */}
            <div>
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Fitness Goal
              </label>
              <select
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon font-bold cursor-pointer"
              >
                <option value="muscle_gain">Muscle Hypertrophy (Lean Bulk +300 kcal)</option>
                <option value="fat_loss">Moderate Fat Loss (-300 kcal)</option>
                <option value="fast_fat_loss">Aggressive Cut (-500 kcal)</option>
                <option value="maintenance">Maintenance & Performance</option>
              </select>
            </div>

            {/* Dietary Preference */}
            <div>
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Dietary Preference
              </label>
              <select
                value={formData.dietaryPreference}
                onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon font-bold cursor-pointer"
              >
                <option value="vegetarian">Vegetarian (Includes Paneer, Milk, Dal)</option>
                <option value="non_vegetarian">Non-Vegetarian (Chicken, Fish, Eggs)</option>
                <option value="vegan">100% Plant-Based Vegan (Tofu, Soya, Beans)</option>
                <option value="eggetarian">Eggetarian (Vegetarian + Whole Eggs)</option>
              </select>
            </div>

            {/* Activity Level & Meals per Day */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                  Activity Level
                </label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon font-bold cursor-pointer"
                >
                  <option value="sedentary">Sedentary (Desk Job)</option>
                  <option value="light">Light (1-3 days/wk)</option>
                  <option value="moderate">Moderate (3-5 days/wk)</option>
                  <option value="very">Very Active (6-7 days/wk)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                  Meals Per Day
                </label>
                <select
                  value={formData.mealsPerDay}
                  onChange={(e) => setFormData({ ...formData, mealsPerDay: Number(e.target.value) })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon font-bold cursor-pointer"
                >
                  <option value={3}>3 Main Meals</option>
                  <option value={4}>4 Meals (Recommended)</option>
                  <option value={5}>5 Meals</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full mt-4 py-3.5 rounded-xl bg-neon text-black font-extrabold text-sm uppercase tracking-wide hover:bg-neon-hover shadow-neon-sm transition-all"
            >
              {isGenerating ? 'Synthesizing Nutrition Protocol...' : 'Generate AI Diet Plan'}
            </button>
          </form>

          {/* Non-medical disclaimer */}
          <div className="mt-6 p-3.5 rounded-xl bg-dark-800/60 border border-dark-700 flex items-start gap-2.5 text-[11px] text-zinc-400 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Disclaimer: All generated meal plans and macro distributions are estimates for athletic wellness. Consult a registered dietitian for clinical conditions or allergies.
            </span>
          </div>
        </div>

        {/* Generated Plan Display */}
        <div className="lg:col-span-7">
          {!generatedPlan ? (
            <div className="p-12 rounded-3xl bg-dark-900 border border-dark-700/80 text-center py-24">
              <Apple className="w-16 h-16 mx-auto text-zinc-700 mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-white">Your Diet Plan Will Appear Here</h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mt-2">
                Fill in your metrics on the left to calculate your metabolic targets and receive an actionable Indian/global meal breakdown.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-neon/40 shadow-2xl space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-dark-700 gap-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-neon uppercase tracking-wider">
                    TARGET CALIBRATION
                  </span>
                  <h3 className="text-2xl font-black font-display text-white mt-0.5">
                    {generatedPlan.name}
                  </h3>
                </div>

                <button
                  onClick={handleSaveToProfile}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neon text-black font-extrabold text-xs hover:bg-neon-hover shadow-neon-sm transition-all shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save to Profile</span>
                </button>
              </div>

              {/* Macro Summary Pill Matrix */}
              <div className="grid grid-cols-4 gap-2 font-mono text-center">
                <div className="p-3 rounded-2xl bg-dark-850 border border-dark-700">
                  <span className="text-[10px] text-zinc-400 uppercase block">Total Energy</span>
                  <span className="text-base font-bold text-white mt-0.5 block">{generatedPlan.totals.calories} kcal</span>
                </div>
                <div className="p-3 rounded-2xl bg-dark-850 border border-dark-700">
                  <span className="text-[10px] text-neon uppercase block">Protein</span>
                  <span className="text-base font-bold text-neon mt-0.5 block">{generatedPlan.totals.protein}g</span>
                </div>
                <div className="p-3 rounded-2xl bg-dark-850 border border-dark-700">
                  <span className="text-[10px] text-cyan-400 uppercase block">Carbs</span>
                  <span className="text-base font-bold text-cyan-400 mt-0.5 block">{generatedPlan.totals.carbs}g</span>
                </div>
                <div className="p-3 rounded-2xl bg-dark-850 border border-dark-700">
                  <span className="text-[10px] text-amber-400 uppercase block">Fats</span>
                  <span className="text-base font-bold text-amber-400 mt-0.5 block">{generatedPlan.totals.fats}g</span>
                </div>
              </div>

              {/* Meals List */}
              <div className="space-y-4">
                {generatedPlan.meals.map((meal, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 rounded-2xl bg-dark-850 border border-dark-750 space-y-3"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-dark-700">
                      <h4 className="text-xs font-bold text-white">{meal.title}</h4>
                      <span className="text-xs font-mono font-bold text-neon">{meal.calories} kcal</span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {meal.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-neon">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 border-t border-dark-700/60 flex justify-between text-[11px] font-mono text-zinc-400">
                      <span className="text-neon">Protein: {meal.protein}g</span>
                      <span className="text-cyan-400">Carbs: {meal.carbs}g</span>
                      <span className="text-amber-400">Fats: {meal.fats}g</span>
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

