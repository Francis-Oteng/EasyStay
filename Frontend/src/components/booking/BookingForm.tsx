import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

const bookingSchema = z.object({
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.string().min(1, 'Number of guests is required'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export interface BookingFormProps {
  pricePerNight: number;
  onSubmit: (data: BookingFormData) => void;
  maxGuests?: number;
  isSubmitting?: boolean;
}

export function BookingForm({
  pricePerNight,
  onSubmit,
  maxGuests = 10,
  isSubmitting,
}: BookingFormProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const watchedCheckIn = watch('checkIn');
  const watchedCheckOut = watch('checkOut');

  const nights = useMemo(() => {
    if (watchedCheckIn && watchedCheckOut) {
      const start = new Date(watchedCheckIn);
      const end = new Date(watchedCheckOut);
      const diff = Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
      return diff;
    }
    return 0;
  }, [watchedCheckIn, watchedCheckOut]);

  const totalPrice = nights * pricePerNight;

  const guestOptions = Array.from({ length: maxGuests }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} guest${i > 0 ? 's' : ''}`,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Check-in"
          type="date"
          icon={<Calendar className="h-4 w-4" />}
          error={errors.checkIn?.message}
          {...register('checkIn', {
            onChange: (e) => setCheckIn(e.target.value),
          })}
        />
        <Input
          label="Check-out"
          type="date"
          icon={<Calendar className="h-4 w-4" />}
          error={errors.checkOut?.message}
          {...register('checkOut', {
            onChange: (e) => setCheckOut(e.target.value),
          })}
        />
      </div>

      <Select
        label="Guests"
        options={guestOptions}
        placeholder="Select guests"
        icon={<Users className="h-4 w-4" />}
        error={errors.guests?.message}
        {...register('guests')}
      />

      <div className="bg-accent rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm text-text-muted">
          <span>${pricePerNight} x {nights} night{nights !== 1 ? 's' : ''}</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between text-sm text-text-muted">
          <span>Service fee</span>
          <span>${Math.round(totalPrice * 0.1)}</span>
        </div>
        <div className="flex justify-between text-sm text-text-muted">
          <span>Cleaning fee</span>
          <span>$50</span>
        </div>
        <hr className="border-border" />
        <div className="flex justify-between font-semibold text-text">
          <span>Total</span>
          <span>${totalPrice + Math.round(totalPrice * 0.1) + 50}</span>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
        Confirm Booking
      </Button>
    </form>
  );
}