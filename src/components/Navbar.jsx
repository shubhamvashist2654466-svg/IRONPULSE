import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Dumbbell,
  Calendar,
  Bot,
  Apple,
  Calculator,
  LineChart,
  Activity,
  BookOpen,
  Users,
  Search,
  Bell,
  Menu,
  X,
  User,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationDrawer from './NotificationDrawer';
import GlobalSearch from './GlobalSearch';

const NAV_LINKS = [
  { name: 'Home', path: '/', icon: Zap },
  { name: 'Workouts', path: '/workouts', icon: Dumbbell },
  { name: 'Planner', path: '/planner', icon: Calendar },
  { name: 'AI Coach', path: '/ai-coach', icon: Bot, isSpecial: true },
  { name: 'Nutrition', path: '/nutrition', icon: Apple },
  { name: 'Calculators', path: '/calculators', icon: Calculator },
  { name: 'Progress', path: '/progress', icon: LineChart },
  { name: 'Activity', path: '/activity', icon: Activity },
  { name: 'Blog', path: '/blog', icon: BookOpen },
  { name: 'Community', path: '/community', icon: Users },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-dark-950/90 backdrop-blur-md border-b border-dark-600/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-neon/15 border border-neon/40 flex items-center justify-center group-hover:bg-neon group-hover:shadow-neon transition-all duration-300">
                <Zap className="w-5 h-5 text-neon group-hover:text-black transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider font-display text-white group-hover:text-neon transition-colors">
                  IRON<span className="text-neon">PULSE</span>
                </span>
                <span className="text-[9px] tracking-widest text-zinc-400 uppercase font-semibold font-mono">
                  STRENGTH MEETS SCIENCE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-neon bg-neon/10 border border-neon/20 shadow-neon-sm'
                        : link.isSpecial
                        ? 'text-white bg-dark-800 hover:text-neon hover:border-neon/40 border border-dark-600'
                        : 'text-zinc-300 hover:text-white hover:bg-dark-800'
                    }`
                  }
                >
                  <link.icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* Right Action Icons & Auth */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Global Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-800 border border-dark-600 hover:border-dark-500 text-zinc-400 hover:text-white transition-all text-xs"
                title="Search (Cmd+K)"
              >
                <Search className="w-4 h-4 text-neon" />
                <span className="hidden md:inline">Search...</span>
                <kbd className="hidden lg:inline text-[10px] bg-dark-700 px-1.5 py-0.5 rounded text-zinc-400">
                  ⌘K
                </kbd>
              </button>

              {/* Notifications Button */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-xl bg-dark-800 border border-dark-600 hover:border-dark-500 text-zinc-300 hover:text-neon transition-all relative"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-neon animate-pulse" />
                </button>
                <NotificationDrawer
                  isOpen={notificationsOpen}
                  onClose={() => setNotificationsOpen(false)}
                />
              </div>

              {/* User Profile / Auth State */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-xl bg-dark-800 border border-dark-600 hover:border-neon/50 transition-all"
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={user?.name || 'User'}
                      className="w-7 h-7 rounded-lg object-cover border border-neon/30"
                    />
                    <span className="hidden sm:inline text-xs font-semibold text-white max-w-[90px] truncate">
                      {user?.name?.split(' ')[0] || 'Athlete'}
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 top-12 w-52 bg-dark-900 border border-dark-600 rounded-xl shadow-2xl z-50 p-2 overflow-hidden"
                      >
                        <div className="px-3 py-2 border-b border-dark-700 mb-1">
                          <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                          <p className="text-[11px] text-zinc-400 truncate">{user?.email}</p>
                          <div className="mt-1 inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-neon/15 text-neon border border-neon/30">
                            {user?.membership || 'PRO ATHLETE'}
                          </div>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-neon" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/planner"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>My Workout Plan</span>
                        </Link>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                            navigate('/login');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1 border-t border-dark-700/50"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-xs font-semibold text-zinc-300 hover:text-white px-3 py-2 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="text-xs font-bold bg-neon text-black px-3.5 py-2 rounded-xl hover:bg-neon-hover shadow-neon-sm transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden p-2 rounded-xl bg-dark-800 border border-dark-600 text-zinc-300 hover:text-white"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 xl:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-dark-900 border-l border-dark-600 p-5 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-dark-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neon/20 flex items-center justify-center border border-neon/30">
                      <Zap className="w-4 h-4 text-neon" />
                    </div>
                    <span className="font-extrabold text-white text-lg font-display">IRONPULSE</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-dark-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="mt-5 space-y-1">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          isActive
                            ? 'bg-neon/15 text-neon border border-neon/30 font-bold'
                            : 'text-zinc-300 hover:bg-dark-800 hover:text-white'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <link.icon className="w-4 h-4" />
                        <span>{link.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Mobile Drawer Bottom */}
              <div className="pt-6 border-t border-dark-700 space-y-3">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-dark-800 border border-dark-600"
                    >
                      <img
                        src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={user?.name}
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                        <p className="text-[10px] text-zinc-400 truncate">{user?.email}</p>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-red-400 bg-red-500/10 rounded-xl hover:bg-red-500/20"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 text-center text-xs font-semibold text-white bg-dark-800 border border-dark-600 rounded-xl hover:bg-dark-700"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 text-center text-xs font-bold text-black bg-neon rounded-xl hover:bg-neon-hover shadow-neon-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                <p className="text-[11px] text-zinc-500 text-center font-mono">
                  IRONPULSE v1.0 • Strength Meets Science
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

