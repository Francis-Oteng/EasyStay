import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User } from '../types';
import * as authService from '../services/auth.service';
import api from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isCustomer: boolean;
  isOwner: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; fullName: string; phoneNumber: string; role: 'CUSTOMER' | 'OWNER' }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      authService
        .getCurrentUser()
        .then((currentUser) => {
          setUser(currentUser);
          localStorage.setItem('user', JSON.stringify(currentUser));
        })
        .catch(() => {
          setToken(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authService.login(email, password);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }, []);

  const register = useCallback(async (data: { email: string; password: string; fullName: string; phoneNumber: string; role: 'CUSTOMER' | 'OWNER' }) => {
    const response = await authService.register(data);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        isCustomer: user?.role === 'CUSTOMER',
        isOwner: user?.role === 'OWNER',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}