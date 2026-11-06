import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Volume2 } from 'lucide-react';
import { formatTime, playTimerBeep } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

export default function RestTimer({ initialSeconds = 90, compact = false }) {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playTimerBeep();
      showToast({
        type: 'info',
        title: 'Rest Time Complete! ⏱️',
        message: 'Your recovery interval is finished. Ready for your next set!'
      });
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, showToast]);

  const setTimerPreset = (secs) => {
    setIsRunning(false);
    setTotalSeconds(secs);
    setTimeLeft(secs);
  };

  const toggleRun = () => {
    if (timeLeft === 0) {
      setTimeLeft(totalSeconds);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  };

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-2 bg-dark-900 border border-dark-600 rounded-xl">
        <Timer className="w-4 h-4 text-neon shrink-0" />
        <span className="font-mono text-sm font-bold text-white min-w-[45px]">
          {formatTime(timeLeft)}
        </span>
        <button
          onClick={toggleRun}
          className="p-1.5 rounded-lg bg-neon text-black font-bold hover:bg-neon-hover text-xs"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-1.5 rounded-lg bg-dark-700 text-zinc-300 hover:text-white text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-dark-800/95 border border-dark-600 rounded-2xl p-4 sm:p-5 shadow-card relative overflow-hidden">
      {/* Background Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-neon transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-neon" />
          <h4 className="text-sm font-bold text-white tracking-wide uppercase">Rest Interval Stopwatch</h4>
        </div>
        <span className="text-xs text-zinc-400 flex items-center gap-1">
          <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
          Sound Alerts On
        </span>
      </div>

      {/* Main Display */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl sm:text-5xl font-mono font-black tracking-tight ${timeLeft <= 5 && timeLeft > 0 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs text-zinc-400 uppercase font-mono">
            {isRunning ? 'RUNNING' : timeLeft === 0 ? 'COMPLETED' : 'READY'}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleRun}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
              isRunning
                ? 'bg-amber-400 text-black hover:bg-amber-300'
                : 'bg-neon text-black hover:bg-neon-hover shadow-neon-sm'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start Rest</span>
              </>
            )}
          </button>
          <button
            onClick={resetTimer}
            className="p-2.5 rounded-xl bg-dark-700 hover:bg-dark-600 text-zinc-300 hover:text-white border border-dark-600 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset intervals */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-dark-700/60">
        <span className="text-xs text-zinc-400 mr-1">Presets:</span>
        {[30, 60, 90, 120, 180].map((sec) => (
          <button
            key={sec}
            onClick={() => setTimerPreset(sec)}
            className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all ${
              totalSeconds === sec
                ? 'bg-neon/20 border-neon/50 text-neon font-bold'
                : 'bg-dark-900 border-dark-700 text-zinc-400 hover:text-white hover:border-dark-500'
            }`}
          >
            {sec >= 60 ? `${sec / 60}m` : `${sec}s`}
          </button>
        ))}
      </div>
    </div>
  );
}

