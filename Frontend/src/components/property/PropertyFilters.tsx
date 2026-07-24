import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { formatCurrency } from '@/utils/format';

export interface PropertyFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  search: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  sortBy: string;
}

const amenityOptions = [
  'WiFi',
  'Pool',
  'Parking',
  'Air Conditioning',
  'Kitchen',
  'Pet Friendly',
  'Gym',
  'Washer',
];

const defaultFilters: FilterValues = {
  search: '',
  minPrice: 0,
  maxPrice: 1000,
  bedrooms: '',
  bathrooms: '',
  amenities: [],
  sortBy: 'price-asc',
};

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);
  const [showMobile, setShowMobile] = useState(false);

  const updateFilter = (key: keyof FilterValues, value: string | string[] | number) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const toggleAmenity = (amenity: string) => {
    const updated = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilter('amenities', updated);
  };

  const clearAll = () => {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const filterContent = (
    <div className="space-y-6">
      <div>
        <Input
          placeholder="Search by city or name..."
          icon={<Search className="h-4 w-4" />}
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
        />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-text mb-3">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={1000}
            step={50}
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
            className="w-full accent-primary"
          />
          <input
            type="range"
            min={0}
            max={1000}
            step={50}
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <div className="flex justify-between text-xs text-text-muted mt-1">
          <span>{formatCurrency(filters.minPrice)}</span>
          <span>{formatCurrency(filters.maxPrice)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Bedrooms"
          options={[
            { value: '', label: 'Any' },
            { value: '1', label: '1+' },
            { value: '2', label: '2+' },
            { value: '3', label: '3+' },
            { value: '4', label: '4+' },
          ]}
          value={filters.bedrooms}
          onChange={(e) => updateFilter('bedrooms', e.target.value)}
        />
        <Select
          label="Bathrooms"
          options={[
            { value: '', label: 'Any' },
            { value: '1', label: '1+' },
            { value: '2', label: '2+' },
            { value: '3', label: '3+' },
          ]}
          value={filters.bathrooms}
          onChange={(e) => updateFilter('bathrooms', e.target.value)}
        />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-text mb-3">Amenities</h4>
        <div className="space-y-2">
          {amenityOptions.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text group-hover:text-primary transition-colors">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <Select
          label="Sort by"
          options={[
            { value: 'price-asc', label: 'Price: Low to High' },
            { value: 'price-desc', label: 'Price: High to Low' },
            { value: 'rating-desc', label: 'Highest Rated' },
            { value: 'name-asc', label: 'Name: A-Z' },
          ]}
          value={filters.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value)}
        />
      </div>

      <Button variant="outline" size="sm" className="w-full" onClick={clearAll}>
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setShowMobile(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-text hover:bg-accent transition-colors"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>

      <aside className="hidden lg:block w-72 shrink-0">
        <div className="bg-white rounded-2xl border border-border/50 p-5 sticky top-20">
          <h3 className="font-semibold text-text mb-5">Filters</h3>
          {filterContent}
        </div>
      </aside>

      {showMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowMobile(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-text">Filters</h3>
              <button
                onClick={() => setShowMobile(false)}
                className="p-1 rounded-lg text-text-muted hover:text-text hover:bg-accent transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">{filterContent}</div>
          </div>
        </div>
      )}
    </>
  );
}