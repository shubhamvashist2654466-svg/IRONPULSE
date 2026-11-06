import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Flame, Droplet, Dumbbell, Award, Check, Trash2, X } from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'streak',
    title: '14-Day Streak Unlocked! 🔥',
    message: 'Consistency is king. You hit your target workouts for 14 straight days.',
    time: '25m ago',
    unread: true,
    icon: Flame,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10'
  },
  {
    id: 'n2',
    type: 'hydration',
    title: 'Hydration Check 💧',
    message: "You have logged 2.1L today. Drink 750ml more to hit your 3.0L daily hydration goal.",
    time: '1h ago',
    unread: true,
    icon: Droplet,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10'
  },
  {
    id: 'n3',
    type: 'workout',
    title: 'Workout Day Scheduled 🏋️',
    message: 'Today is Push Day A: Bench Press, Incline Dumbbell, Overhead Press.',
    time: '4h ago',
    unread: false,
    icon: Dumbbell,
    color: 'text-neon',
    bg: 'bg-neon/10'
  },
  {
    id: 'n4',
    type: 'community',
    title: 'Community Leaderboard 🏆',
    message: 'You moved up to Rank #4 in the IronPulse weekly lifters leaderboard!',
    time: '1d ago',
    unread: false,
    icon: Award,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10'
  }
];

export default function NotificationDrawer({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-14 w-80 sm:w-96 bg-dark-900 border border-dark-600 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-dark-700 bg-dark-850">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-neon" />
          <h3 className="text-sm font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-[11px] font-bold bg-neon text-black rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-zinc-400 hover:text-neon transition-colors"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-dark-700/50">
        {notifications.length === 0 ? (
          <div className="py-10 text-center text-zinc-500 text-xs">
            <Bell className="w-6 h-6 mx-auto mb-2 text-zinc-600 opacity-50" />
            No notifications right now.
          </div>
        ) : (
          notifications.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => markAsRead(item.id)}
                className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer hover:bg-dark-800 ${
                  item.unread ? 'bg-dark-800/40' : ''
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${item.bg}`}>
                  <IconComponent className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-semibold text-white truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-zinc-500 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                    {item.message}
                  </p>
                </div>
                {item.unread && (
                  <span className="w-2 h-2 rounded-full bg-neon shrink-0 mt-1.5" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-2.5 border-t border-dark-700 bg-dark-850 flex justify-between items-center text-xs text-zinc-400 px-4">
          <span>{notifications.length} alerts saved</span>
          <button
            onClick={clearAll}
            className="flex items-center gap-1 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

