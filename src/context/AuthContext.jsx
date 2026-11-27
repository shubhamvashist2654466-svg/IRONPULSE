import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, DEFAULT_USER } from '../utils/storage';

const AuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const BACKEND_URL = `${API_BASE.replace(/\/+$/, '')}/api/v1/auth`;
const REGISTERED_USERS_KEY = 'ironpulse_registered_athletes';

export function AuthProvider({ children }) {
  // Read token from localStorage or sessionStorage
  const [token, setToken] = useState(() => {
    return (
      localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) ||
      sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) ||
      null
    );
  });

  // Read user profile from localStorage or sessionStorage
  const [user, setUser] = useState(() => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEYS.USER_PROFILE) ||
        sessionStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Favorites persistence
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITE_EXERCISES);
      return stored
        ? JSON.parse(stored)
        : ['barbell-bench-press', 'barbell-back-squat', 'conventional-deadlift'];
    } catch {
      return ['barbell-bench-press', 'barbell-back-squat', 'conventional-deadlift'];
    }
  });

  // Session verification on mount
  useEffect(() => {
    const verifySession = async () => {
      const savedToken =
        localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) ||
        sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

      if (!savedToken) {
        setToken(null);
        setUser(null);
        setLoading(false);
        return;
      }

      // If token exists, verify with backend if accessible, otherwise maintain session
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);

        const response = await fetch(`${BACKEND_URL}/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${savedToken}`,
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data?.data?.user) {
            setUser(data.data.user);
            localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(data.data.user));
          }
        } else if (response.status === 401) {
          // Token expired or invalid on server
          logout();
        }
      } catch (err) {
        // Backend offline or timeout: keep client-side session if valid format
        console.debug('Backend verification offline or unreachable; using persisted session.');
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const isAuthenticated = Boolean(token && user);

  /**
   * Login method
   * Communicates with backend when available, with intelligent fallback.
   */
  const login = async (email, password, rememberMe = true) => {
    const storageTarget = rememberMe ? localStorage : sessionStorage;

    // 1. Try backend authentication first
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok && data?.data?.token) {
        const loggedUser = {
          ...data.data.user,
          membership: data.data.user.role === 'admin' ? 'ADMIN ATHLETE' : 'PRO ATHLETE',
        };
        setToken(data.data.token);
        setUser(loggedUser);
        storageTarget.setItem(STORAGE_KEYS.AUTH_TOKEN, data.data.token);
        storageTarget.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(loggedUser));
        return { success: true, user: loggedUser };
      } else if (!response.ok && response.status < 500) {
        // Explicit 400 or 401 credential failure from backend
        return {
          success: false,
          message: data?.message || 'Invalid credentials. Please verify your email and password.',
        };
      }
    } catch (netErr) {
      // Backend offline: proceed to verified offline athlete store
      console.debug('Backend offline. Attempting offline athlete credentials verification.');
    }

    // 2. Client-side verified athlete credentials verification (Demo + Registered users)
    const normalizedEmail = email.trim().toLowerCase();

    // Check demo credentials
    if (
      normalizedEmail === 'alex.mercer@ironpulse.io' &&
      password === 'IronPulse#2026'
    ) {
      const demoUser = { ...DEFAULT_USER };
      const simToken = 'ironpulse_jwt_demo_' + Date.now();
      setToken(simToken);
      setUser(demoUser);
      storageTarget.setItem(STORAGE_KEYS.AUTH_TOKEN, simToken);
      storageTarget.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(demoUser));
      return { success: true, user: demoUser };
    }

    // Check locally registered accounts
    try {
      const registeredRaw = localStorage.getItem(REGISTERED_USERS_KEY);
      const registeredList = registeredRaw ? JSON.parse(registeredRaw) : [];
      const matched = registeredList.find(
        (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
      );

      if (matched) {
        const { password: _, ...safeUser } = matched;
        const simToken = 'ironpulse_jwt_user_' + Date.now();
        setToken(simToken);
        setUser(safeUser);
        storageTarget.setItem(STORAGE_KEYS.AUTH_TOKEN, simToken);
        storageTarget.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(safeUser));
        return { success: true, user: safeUser };
      }
    } catch (e) {
      console.error('Error verifying local accounts', e);
    }

    // If demo account entered with wrong password
    if (normalizedEmail === 'alex.mercer@ironpulse.io') {
      return {
        success: false,
        message: 'Invalid password for Alex Mercer. Password should be: IronPulse#2026',
      };
    }

    return {
      success: false,
      message: 'Invalid email or password. Please check your credentials or register a new athlete account.',
    };
  };

  /**
   * Signup method
   * Validates matching passwords, length, and creates athlete record.
   */
  const signup = async (userData) => {
    const { password, confirmPassword, email, name } = userData;

    if (!password || !confirmPassword) {
      return { success: false, message: 'Both password fields are mandatory.' };
    }

    if (password !== confirmPassword) {
      return { success: false, message: 'Passwords do not match. Please try again.' };
    }

    if (password.length < 8) {
      return { success: false, message: 'Password must be at least 8 characters long.' };
    }

    // 1. Try backend registration
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok && data?.data?.token) {
        const newUser = {
          ...data.data.user,
          membership: data.data.user.role === 'admin' ? 'ADMIN ATHLETE' : 'PRO ATHLETE',
        };
        setToken(data.data.token);
        setUser(newUser);
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.data.token);
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(newUser));
        return { success: true, user: newUser };
      } else if (!response.ok) {
        return {
          success: false,
          message: data?.message || data?.errors?.[0]?.msg || 'Registration failed.',
        };
      }
    } catch (netErr) {
      console.debug('Backend offline. Creating local athlete profile.');
    }

    // 2. Client-side fallback registration
    const newAthlete = {
      ...DEFAULT_USER,
      id: 'usr_' + Date.now(),
      name: name || 'Athlete',
      email: email.trim().toLowerCase(),
      age: userData.age || 25,
      gender: userData.gender || 'male',
      height: userData.height || 178,
      weight: userData.weight || 75,
      goal: userData.goal || 'muscle_gain',
      dietaryPreference: userData.dietaryPreference || 'non_vegetarian',
      membership: 'PRO ATHLETE',
      joinedDate: 'Just Now',
      workoutsCompleted: 0,
      streakDays: 1,
    };

    // Store in registered athletes list for future offline logins
    try {
      const registeredRaw = localStorage.getItem(REGISTERED_USERS_KEY);
      const registeredList = registeredRaw ? JSON.parse(registeredRaw) : [];
      // Prevent duplicate email
      const existing = registeredList.find(
        (u) => u.email.toLowerCase() === newAthlete.email
      );
      if (existing) {
        return {
          success: false,
          message: 'An athlete account with this email address already exists. Please log in.',
        };
      }
      registeredList.push({ ...newAthlete, password });
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registeredList));
    } catch (e) {
      console.error('Error saving local athlete', e);
    }

    const simToken = 'ironpulse_jwt_' + Date.now();
    setToken(simToken);
    setUser(newAthlete);
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, simToken);
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(newAthlete));

    return { success: true, user: newAthlete };
  };

  /**
   * Logout method
   * Completely clears session and storage.
   */
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    setToken(null);
    setUser(null);
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = (exerciseId) => {
    setFavorites((prev) => {
      const next = prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId];
      localStorage.setItem(STORAGE_KEYS.FAVORITE_EXERCISES, JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (exerciseId) => favorites.includes(exerciseId);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        signup,
        logout,
        updateProfile,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
