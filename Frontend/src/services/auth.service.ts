import { post, get } from './api';
import type { User, ApiResponse } from '../types';

interface AuthResponse {
  user: User;
  token: string;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  role: 'CUSTOMER' | 'OWNER';
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await post<ApiResponse<AuthResponse>>('/auth/login', { email, password });
  return response.data as AuthResponse;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await post<ApiResponse<AuthResponse>>('/auth/register', data);
  return response.data as AuthResponse;
}

export async function getCurrentUser(): Promise<User> {
  const response = await get<ApiResponse<User>>('/auth/me');
  return response.data as User;
}

export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}