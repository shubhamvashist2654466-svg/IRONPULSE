import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Dumbbell, Clock, Flame, CheckCircle2, AlertOctagon, Heart, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function ExerciseModal({ exercise, isOpen, onClose, onAddToPlanner }) {
  const { isFavorite, toggleFavorite } = useAuth();
  const { showToast } = useToast();

  if (!isOpen || !exercise) return null;

  const favorite = isFavorite(exercise.id);

  const handleFavoriteClick = () => {
    toggleFavorite(exercise.id);
    showToast({
      type: 'success',
      title: favorite ? 'Removed from Saved' : 'Saved to Favorites',
      message: `${exercise.name} ${favorite ? 'removed from' : 'added to'} your favorite exercises.`
    });
  };

  const handleAddPlanner = () => {
    if (onAddToPlanner) {
      onAddToPlanner(exercise);
    } else {
      showToast({
        type: 'success',
        title: 'Added to Planner',
        message: `${exercise.name} has been placed into your workout schedule.`
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-3xl bg-dark-900 border border-dark-600 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header Image & Actions */}
        <div className="relative h-64 sm:h-72 w-full shrink-0">
          <img
            src={exercise.image}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

          {/* Close & Favorite buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleFavoriteClick}
              className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
                favorite
                  ? 'bg-red-500/20 text-red-500 border-red-500/50'
                  : 'bg-dark-900/80 text-zinc-300 hover:text-white border-dark-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-dark-900/80 text-zinc-400 hover:text-white border border-dark-600 backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Category on Image */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-neon text-black">
                {exercise.category}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-dark-800 text-zinc-300 border border-dark-600">
                {exercise.equipment}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                {exercise.difficulty}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {exercise.name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-dark-800 border border-dark-700">
              <span className="text-[11px] text-zinc-400 uppercase font-semibold">Recommended</span>
              <p className="text-base font-bold text-white mt-0.5">{exercise.defaultSets} Sets</p>
            </div>
            <div className="p-3 rounded-xl bg-dark-800 border border-dark-700">
              <span className="text-[11px] text-zinc-400 uppercase font-semibold">Rep Range</span>
              <p className="text-base font-bold text-neon mt-0.5">{exercise.defaultReps} Reps</p>
            </div>
            <div className="p-3 rounded-xl bg-dark-800 border border-dark-700">
              <span className="text-[11px] text-zinc-400 uppercase font-semibold">Rest Interval</span>
              <p className="text-base font-bold text-white mt-0.5">{exercise.restSeconds} Seconds</p>
            </div>
            <div className="p-3 rounded-xl bg-dark-800 border border-dark-700">
              <span className="text-[11px] text-zinc-400 uppercase font-semibold">Target Muscle</span>
              <p className="text-xs font-bold text-cyan-400 mt-1 line-clamp-1">{exercise.targetMuscle}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Description</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">{exercise.description}</p>
          </div>

          {/* Secondary Muscles */}
          {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Secondary Muscles Involved</h4>
              <div className="flex flex-wrap gap-2">
                {exercise.secondaryMuscles.map((muscle, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-dark-800 text-zinc-300 border border-dark-700"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Instructions */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-neon" />
              <span>Step-by-Step Execution Guide</span>
            </h4>
            <ol className="space-y-3">
              {exercise.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-dark-800 border border-dark-600 text-neon font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Pro Tips & Mistakes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercise.tips && (
              <div className="p-4 rounded-2xl bg-neon/5 border border-neon/20">
                <h5 className="text-xs font-bold text-neon uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Flame className="w-4 h-4 text-neon" />
                  <span>Coach Pro Tip</span>
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">{exercise.tips}</p>
              </div>
            )}

            {exercise.commonMistakes && (
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
                <h5 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <AlertOctagon className="w-4 h-4 text-red-400" />
                  <span>Common Mistakes</span>
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">{exercise.commonMistakes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 border-t border-dark-700 bg-dark-850 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
          >
            Close Guide
          </button>
          <button
            onClick={handleAddPlanner}
            className="flex items-center gap-2 bg-neon text-black font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-neon-hover shadow-neon-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Workout Schedule</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

