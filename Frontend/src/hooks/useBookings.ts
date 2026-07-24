import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as bookingService from '../services/booking.service';
import type { BookingStatus } from '../types';

export function useMyBookings() {
  return useQuery({
    queryKey: ['myBookings'],
    queryFn: () => bookingService.getMyBookings(),
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingService.getBookingById(id),
    enabled: !!id,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof bookingService.createBooking>[0]) =>
      bookingService.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
    },
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) =>
      bookingService.updateBookingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function usePropertyBookings(propertyId: string) {
  return useQuery({
    queryKey: ['propertyBookings', propertyId],
    queryFn: () => bookingService.getPropertyBookings(propertyId),
    enabled: !!propertyId,
  });
}