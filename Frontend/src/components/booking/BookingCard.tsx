import { motion } from 'framer-motion';
import { Calendar, MapPin, MoreVertical } from 'lucide-react';
import clsx from 'clsx';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatCurrency } from '@/utils/format';

type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

export interface BookingCardProps {
  id: string;
  propertyName: string;
  propertyImage: string;
  location: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  totalPrice: number;
  onView?: (id: string) => void;
  onCancel?: (id: string) => void;
  onReview?: (id: string) => void;
}

const statusConfig: Record<BookingStatus, { label: string; variant: 'primary' | 'success' | 'warning' | 'error' }> = {
  confirmed: { label: 'Confirmed', variant: 'success' },
  pending: { label: 'Pending', variant: 'warning' },
  cancelled: { label: 'Cancelled', variant: 'error' },
  completed: { label: 'Completed', variant: 'primary' },
};

export function BookingCard({
  id,
  propertyName,
  propertyImage,
  location,
  checkIn,
  checkOut,
  status,
  totalPrice,
  onView,
  onCancel,
  onReview,
}: BookingCardProps) {
  const { label, variant } = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-48 sm:h-auto shrink-0">
          <img
            src={propertyImage || '/placeholder.jpg'}
            alt={propertyName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-text">{propertyName}</h3>
              <Badge variant={variant} size="sm">
                {label}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-text-muted mb-3">
              <MapPin className="h-3.5 w-3.5" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{checkIn} - {checkOut}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/50">
            <div>
              <span className="text-lg font-bold text-text">{formatCurrency(totalPrice)}</span>
              <span className="text-sm text-text-muted"> total</span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={() => onView?.(id)}>
                View Details
              </Button>
              {(status === 'confirmed' || status === 'pending') && (
                <Button size="sm" variant="danger" onClick={() => onCancel?.(id)}>
                  Cancel
                </Button>
              )}
              {status === 'completed' && (
                <Button size="sm" variant="primary" onClick={() => onReview?.(id)}>
                  Review
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}