import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Dumbbell, Heart, X, RotateCcw } from 'lucide-react';
import { EXERCISES, MUSCLE_CATEGORIES, DIFFICULTY_LEVELS, EQUIPMENT_TYPES } from '../data/exercises';
import WorkoutCard from '../components/WorkoutCard';
import ExerciseModal from '../components/ExerciseModal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Workouts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [activeModalExercise, setActiveModalExercise] = useState(null);

  const { favorites } = useAuth();
  const { showToast } = useToast();

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter((ex) => {
      // Search term
      if (
        searchTerm &&
        !ex.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !ex.targetMuscle.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !ex.category.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      // Category
      if (selectedCategory !== 'All' && ex.category !== selectedCategory) {
        return false;
      }
      // Difficulty
      if (selectedDifficulty !== 'All' && ex.difficulty !== selectedDifficulty) {
        return false;
      }
      // Equipment
      if (selectedEquipment !== 'All' && ex.equipment !== selectedEquipment) {
        return false;
      }
      // Favorites
      if (showOnlyFavorites && !favorites.includes(ex.id)) {
        return false;
      }
      return true;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedEquipment, showOnlyFavorites, favorites]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedEquipment('All');
    setShowOnlyFavorites(false);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-neon uppercase tracking-widest">
              DATABASE & EXERCISE GUIDES
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-display text-white mt-1 uppercase">
              WORKOUT LIBRARY
            </h1>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Explore scientifically analyzed compound and isolation exercises with precise execution cues, muscle activation data, and set/rep configurations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                showOnlyFavorites
                  ? 'bg-red-500/15 text-red-400 border-red-500/40 shadow-sm'
                  : 'bg-dark-850 text-zinc-300 border-dark-700 hover:border-dark-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
              <span>Saved Favorites ({favorites.length})</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by exercise name, target muscle (e.g. Bench Press, Quads, Lats)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark-900 border border-dark-700 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-neon transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick dropdown filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {/* Difficulty */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-dark-900 border border-dark-700 rounded-2xl px-4 py-3.5 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-neon cursor-pointer"
              >
                <option value="All">All Difficulties</option>
                {DIFFICULTY_LEVELS.filter((d) => d !== 'All').map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>

              {/* Equipment */}
              <select
                value={selectedEquipment}
                onChange={(e) => setSelectedEquipment(e.target.value)}
                className="bg-dark-900 border border-dark-700 rounded-2xl px-4 py-3.5 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-neon cursor-pointer"
              >
                <option value="All">All Equipment</option>
                {EQUIPMENT_TYPES.filter((eq) => eq !== 'All').map((eq) => (
                  <option key={eq} value={eq}>
                    {eq}
                  </option>
                ))}
              </select>

              {(searchTerm || selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedEquipment !== 'All' || showOnlyFavorites) && (
                <button
                  onClick={resetFilters}
                  className="p-3.5 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-dark-700 text-zinc-400 hover:text-white transition-colors shrink-0"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Muscle Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {MUSCLE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-neon text-black font-bold border-neon shadow-neon-sm'
                    : 'bg-dark-900 text-zinc-300 border-dark-700 hover:border-dark-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Grid or Empty State */}
      {filteredExercises.length === 0 ? (
        <div className="text-center py-20 bg-dark-900/60 rounded-3xl border border-dark-700/80 p-8">
          <Dumbbell className="w-12 h-12 mx-auto text-zinc-600 mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-white">No exercises found</h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto mt-2 leading-relaxed">
            We couldn't find any exercises matching your exact filter parameters. Try clearing your filters or searching for another muscle group.
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 px-6 py-2.5 rounded-xl bg-neon text-black font-bold text-xs hover:bg-neon-hover transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExercises.map((exercise) => (
            <WorkoutCard
              key={exercise.id}
              exercise={exercise}
              onSelect={(ex) => setActiveModalExercise(ex)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <ExerciseModal
        exercise={activeModalExercise}
        isOpen={Boolean(activeModalExercise)}
        onClose={() => setActiveModalExercise(null)}
      />
    </div>
  );
}

