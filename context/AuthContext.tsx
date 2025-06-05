import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean; 
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      // In a real application, you would validate credentials against your backend
      // and receive a token
      const mockToken = 'mock_jwt_token';
      const mockUser = {
        id: 1,
        name: 'Demo User',
        email,
        isLoggedIn: true
      };

      setToken(mockToken);
      setUser(mockUser);
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // In a real application, you would send registration data to your backend
      const mockToken = 'mock_jwt_token';
      const mockUser = {
        id: 1,
        name,
        email,
        isLoggedIn: true
      };

      setToken(mockToken);
      setUser(mockUser);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const resetPassword = async (email: string) => {
    try {
      // In a real application, you would send a password reset request to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      throw new Error('Password reset failed');
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      // In a real application, you would send the update to your backend
      setUser(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      throw new Error('Profile update failed');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated,
      resetPassword,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
