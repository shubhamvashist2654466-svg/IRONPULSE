import React, { createContext, useContext, useState } from 'react';
import { STORAGE_KEYS, DEFAULT_USER } from '../utils/storage';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.USER_PROFILE, DEFAULT_USER);
  const [token, setToken] = useLocalStorage(STORAGE_KEYS.AUTH_TOKEN, 'demo_session_active');
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.FAVORITE_EXERCISES, [
    'barbell-bench-press',
    'barbell-back-squat',
    'conventional-deadlift'
  ]);

  const isAuthenticated = Boolean(token && user);

  const login = (email, password) => {
    // Simulated authentication with LocalStorage
    const dummyUser = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: email ? email.split('@')[0].replace('.', ' ').toUpperCase() : DEFAULT_USER.name,
    };
    setUser(dummyUser);
    setToken('ironpulse_simulated_jwt_' + Date.now());
    return { success: true, user: dummyUser };
  };

  const signup = (userData) => {
    const newUser = {
      ...DEFAULT_USER,
      ...userData,
      id: 'usr_' + Date.now(),
      joinedDate: 'Just Now',
      workoutsCompleted: 0,
      streakDays: 1,
    };
    setUser(newUser);
    setToken('ironpulse_simulated_jwt_' + Date.now());
    return { success: true, user: newUser };
  };

  const logout = () => {
    setToken(null);
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const toggleFavorite = (exerciseId) => {
    setFavorites((prev) => {
      if (prev.includes(exerciseId)) {
        return prev.filter((id) => id !== exerciseId);
      } else {
        return [...prev, exerciseId];
      }
    });
  };

  const isFavorite = (exerciseId) => favorites.includes(exerciseId);

  return (
    <AuthContext.Provider
      value={{
        user,
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

