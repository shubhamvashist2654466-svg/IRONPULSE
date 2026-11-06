import React from 'react';
import { Heart, Clock, Dumbbell, ChevronRight, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function WorkoutCard({ exercise, onSelect, onAddToPlanner }) {
  const { isFavorite, toggleFavorite } = useAuth();
  const { showToast } = useToast();

  const favorite = isFavorite(exercise.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(exercise.id);
    showToast({
      type: 'success',
      title: favorite ? 'Removed' : 'Added to Favorites',
      message: `${exercise.name} ${favorite ? 'removed from' : 'saved to'} favorites.`
    });
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAddToPlanner) {
      onAddToPlanner(exercise);
    } else {
      showToast({
        type: 'success',
        title: 'Added to Planner',
        message: `${exercise.name} added to your weekly planner.`
      });
    }
  };

  return (
    <div
      onClick={() => onSelect(exercise)}
      className="group relative bg-dark-800/90 border border-dark-600/80 hover:border-neon/50 rounded-2xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
    >
      {/* Thumbnail Area */}
      <div className="relative h-48 w-full overflow-hidden bg-dark-900">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-black/30" />

        {/* Badges on Top */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-neon text-black uppercase tracking-wider">
            {exercise.category}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-dark-950/80 backdrop-blur-md text-zinc-300 border border-dark-700">
            {exercise.difficulty}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
            favorite
              ? 'bg-red-500/20 text-red-500 border-red-500/50'
              : 'bg-dark-950/60 text-zinc-400 hover:text-white border-dark-700'
          }`}
          aria-label="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
        </button>

        {/* Muscle target indicator */}
        <div className="absolute bottom-2.5 left-3 right-3">
          <p className="text-[11px] font-medium text-cyan-400 truncate">
            {exercise.targetMuscle}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-neon transition-colors line-clamp-1">
            {exercise.name}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {exercise.description}
          </p>
        </div>

        {/* Stats row */}
        <div className="pt-4 mt-3 border-t border-dark-700/60 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Dumbbell className="w-3.5 h-3.5 text-neon" />
            <span>{exercise.defaultSets} sets × {exercise.defaultReps}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{exercise.restSeconds}s rest</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-2">
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-dark-700 hover:bg-dark-600 text-zinc-200 text-xs font-semibold border border-dark-600 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-neon" />
            <span>Add</span>
          </button>
          <button
            onClick={() => onSelect(exercise)}
            className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-neon/15 hover:bg-neon hover:text-black text-neon text-xs font-bold border border-neon/30 transition-all"
          >
            <span>View</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

