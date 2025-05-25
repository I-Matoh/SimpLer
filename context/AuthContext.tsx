import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    // In a real application, you would validate credentials against your backend
    // For now, we'll simulate a successful login
    setUser({
      id: 1,
      name: 'Demo User',
      email,
      isLoggedIn: true
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real application, you would send registration data to your backend
    // For now, we'll simulate a successful registration
    setUser({
      id: 1,
      name,
      email,
      isLoggedIn: true
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
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