import { get, post, patch, put } from './api';
import type { Booking, ApiResponse } from '../types';
import type { BookingStatus } from '../types';

interface CreateBookingData {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export async function createBooking(data: CreateBookingData): Promise<Booking> {
  const response = await post<ApiResponse<Booking>>('/bookings', data);
  return response.data as Booking;
}

export async function getMyBookings(): Promise<Booking[]> {
  const response = await get<ApiResponse<Booking[]>>('/bookings/my');
  return response.data as Booking[];
}

export async function getBookingById(id: string): Promise<Booking> {
  const response = await get<ApiResponse<Booking>>(`/bookings/${id}`);
  return response.data as Booking;
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking> {
  const response = await patch<ApiResponse<Booking>>(`/bookings/${id}/status`, { status });
  return response.data as Booking;
}

export async function getPropertyBookings(propertyId: string): Promise<Booking[]> {
  const response = await get<ApiResponse<Booking[]>>(`/bookings/property/${propertyId}`);
  return response.data as Booking[];
}