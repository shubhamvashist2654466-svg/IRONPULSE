import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Dumbbell, BookOpen, Calculator, Apple, ArrowRight } from 'lucide-react';
import { EXERCISES } from '../data/exercises';
import { BLOG_POSTS } from '../data/blogPosts';
import { FOOD_DATABASE } from '../data/foodDatabase';

const CALCULATORS_LIST = [
  { id: 'bmi', name: 'BMI Calculator', desc: 'Body Mass Index & Weight Classification' },
  { id: 'bmr', name: 'BMR Calculator', desc: 'Basal Metabolic Rate (Mifflin-St Jeor)' },
  { id: 'tdee', name: 'TDEE Calculator', desc: 'Total Daily Energy Expenditure' },
  { id: 'protein', name: 'Protein Calculator', desc: 'Daily Target in Grams' },
  { id: 'calorie', name: 'Daily Calorie Calculator', desc: 'Macro breakdown for bulking or cutting' },
  { id: 'bodyfat', name: 'Body Fat Calculator', desc: 'U.S. Navy Body Fat Method' },
  { id: 'idealweight', name: 'Ideal Weight Calculator', desc: 'Devine & Robinson Formula' },
  { id: 'water', name: 'Water Intake Calculator', desc: 'Hydration Target in Liters' },
];

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search triggered by parent or window event
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredExercises = cleanQuery
    ? EXERCISES.filter(
        (ex) =>
          ex.name.toLowerCase().includes(cleanQuery) ||
          ex.category.toLowerCase().includes(cleanQuery) ||
          ex.targetMuscle.toLowerCase().includes(cleanQuery)
      ).slice(0, 4)
    : [];

  const filteredBlogs = cleanQuery
    ? BLOG_POSTS.filter(
        (b) =>
          b.title.toLowerCase().includes(cleanQuery) ||
          b.category.toLowerCase().includes(cleanQuery) ||
          b.summary.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : [];

  const filteredFoods = cleanQuery
    ? FOOD_DATABASE.filter(
        (f) =>
          f.name.toLowerCase().includes(cleanQuery) ||
          f.category.toLowerCase().includes(cleanQuery)
      ).slice(0, 4)
    : [];

  const filteredCalculators = cleanQuery
    ? CALCULATORS_LIST.filter(
        (c) =>
          c.name.toLowerCase().includes(cleanQuery) ||
          c.desc.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : [];

  const hasResults =
    filteredExercises.length > 0 ||
    filteredBlogs.length > 0 ||
    filteredFoods.length > 0 ||
    filteredCalculators.length > 0;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="w-full max-w-2xl bg-dark-900 border border-dark-600 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-dark-700 bg-dark-850">
          <Search className="w-5 h-5 text-neon shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search exercises, nutrition, calculators, articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-zinc-500 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-500 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-1 text-[11px] font-mono text-zinc-400 bg-dark-700 border border-dark-600 rounded">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {!query && (
            <div className="py-8 text-center text-zinc-500 text-sm">
              <Dumbbell className="w-8 h-8 mx-auto text-zinc-600 mb-2 opacity-50" />
              <p>Type to search across IRONPULSE workouts, foods, calculators & articles.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {['Bench Press', 'Protein', 'BMI', 'Deadlift', 'Paneer', 'Sleep'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs bg-dark-800 hover:bg-dark-700 text-zinc-300 px-3 py-1.5 rounded-lg border border-dark-600 hover:border-neon transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="py-12 text-center text-zinc-500 text-sm">
              <p>No results found for "{query}".</p>
              <p className="text-xs text-zinc-600 mt-1">Try searching for generic terms like "Chest", "Calories", or "Oats".</p>
            </div>
          )}

          {/* Exercises */}
          {filteredExercises.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neon uppercase tracking-wider mb-2 px-2">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>Exercises & Workouts</span>
              </div>
              <div className="space-y-1">
                {filteredExercises.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => handleSelect(`/workouts?search=${encodeURIComponent(ex.name)}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-dark-800 transition-colors text-left group border border-transparent hover:border-dark-600"
                  >
                    <div className="flex items-center gap-3">
                      <img src={ex.image} alt={ex.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-neon transition-colors">
                          {ex.name}
                        </h4>
                        <p className="text-xs text-zinc-400">
                          {ex.category} • {ex.equipment} • {ex.targetMuscle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-neon group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Calculators */}
          {filteredCalculators.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 px-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>Fitness Calculators</span>
              </div>
              <div className="space-y-1">
                {filteredCalculators.map((calc) => (
                  <button
                    key={calc.id}
                    onClick={() => handleSelect(`/calculators?tab=${calc.id}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-dark-800 transition-colors text-left group border border-transparent hover:border-dark-600"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {calc.name}
                      </h4>
                      <p className="text-xs text-zinc-400">{calc.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Foods */}
          {filteredFoods.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-green-400 uppercase tracking-wider mb-2 px-2">
                <Apple className="w-3.5 h-3.5" />
                <span>Food & Nutrition</span>
              </div>
              <div className="space-y-1">
                {filteredFoods.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => handleSelect(`/nutrition?search=${encodeURIComponent(food.name)}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-dark-800 transition-colors text-left group border border-transparent hover:border-dark-600"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-green-400 transition-colors">
                        {food.name}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {food.serving} — {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fats}g
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blog Articles */}
          {filteredBlogs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2 px-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Scientific Articles</span>
              </div>
              <div className="space-y-1">
                {filteredBlogs.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelect(`/blog/${b.id}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-dark-800 transition-colors text-left group border border-transparent hover:border-dark-600"
                  >
                    <div className="pr-4">
                      <h4 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                        {b.title}
                      </h4>
                      <p className="text-xs text-zinc-400">{b.category} • {b.readTime}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

