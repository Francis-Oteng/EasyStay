import { get, patch } from './api';
import type { Notification, ApiResponse } from '../types';

export async function getNotifications(): Promise<Notification[]> {
  const response = await get<ApiResponse<Notification[]>>('/notifications');
  return response.data as Notification[];
}

export async function markAsRead(id: string): Promise<void> {
  await patch(`/notifications/${id}/read`);
}

export async function markAllAsRead(): Promise<void> {
  await patch('/notifications/read-all');
}