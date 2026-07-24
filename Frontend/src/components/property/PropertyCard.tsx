import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Star,
  MapPin,
  Bed,
  Bath,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  onBook?: (id: string) => void;
  onWishlist?: (id: string) => void;
  isWishlisted?: boolean;
}

export function PropertyCard({
  id,
  name,
  location,
  pricePerNight,
  rating,
  images,
  bedrooms,
  bathrooms,
  amenities,
  onBook,
  onWishlist,
  isWishlisted,
}: PropertyCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(isWishlisted || false);

  const handleWishlist = () => {
    setWishlisted(!wishlisted);
    onWishlist?.(id);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-border/50"
    >
      <div className="relative group aspect-[4/3] overflow-hidden">
        <img
          src={images[currentImage] || '/placeholder.jpg'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={clsx(
              'h-5 w-5 transition-colors',
              wishlisted ? 'fill-error text-error' : 'text-text-muted',
            )}
          />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4 text-text" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4 text-text" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage(i);
              }}
              className={clsx(
                'w-2 h-2 rounded-full transition-all',
                i === currentImage ? 'bg-white w-4' : 'bg-white/50',
              )}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-text truncate">{name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium text-text">{rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-text-muted text-sm mb-3">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{location}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-text-muted mb-3">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{bedrooms} bed{bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{bathrooms} bath{bathrooms !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="default" size="sm">
                {amenity}
              </Badge>
            ))}
            {amenities.length > 3 && (
              <Badge variant="default" size="sm">
                +{amenities.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div>
            <span className="text-lg font-bold text-text">${pricePerNight}</span>
            <span className="text-sm text-text-muted"> / night</span>
          </div>
          <Button size="sm" onClick={() => onBook?.(id)}>
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}