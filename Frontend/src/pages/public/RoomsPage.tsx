import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { PropertyCard } from '@/components/property/PropertyCard';

const rooms = [
  {
    id: '1',
    name: 'Premium King Suite',
    location: 'Miami Beach, FL',
    pricePerNight: 220,
    rating: 4.8,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Pool', 'Ocean view'],
    images: [],
    isPublished: true,
  },
  {
    id: '2',
    name: 'Comfort Double Room',
    location: 'Downtown, NYC',
    pricePerNight: 145,
    rating: 4.5,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'City view', 'Breakfast'],
    images: [],
    isPublished: true,
  },
  {
    id: '3',
    name: 'Family Connecting Room',
    location: 'Orlando, FL',
    pricePerNight: 310,
    rating: 4.7,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['WiFi', 'Pool', 'Lounge access'],
    images: [],
    isPublished: true,
  },
];

export function RoomsPage() {
  const [search, setSearch] = useState('');

  const filtered = rooms.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
      <div className="bg-gradient-to-br from-accent to-white pb-12 pt-8">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Explore</p>
          <h1 className="mt-1 font-heading text-4xl font-bold text-secondary">
            Find your perfect stay
          </h1>
          <p className="mt-2 max-w-2xl text-text-muted">
            Search rooms by date, guest count, price, and stay style.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Tonight
            </span>
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              2 adults
            </span>
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Under $250
            </span>
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Breakfast
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-secondary">Filters</h3>
                <SlidersHorizontal className="h-4 w-4 text-text-muted" />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-text">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="City or property name..."
                      className="w-full rounded-xl border border-border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text">Price range</label>
                  <div className="h-2 rounded-full bg-accent">
                    <div className="h-2 w-3/4 rounded-full bg-primary" />
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-text-muted">
                    <span>$0</span>
                    <span>$500+</span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {['WiFi', 'Pool', 'Parking', 'Breakfast', 'Gym'].map((a) => (
                      <span
                        key={a}
                        className="cursor-pointer rounded-full border border-border px-3 py-1 text-xs font-medium text-text-muted transition-colors hover:border-primary hover:text-primary"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text">Stay intent</label>
                  <ul className="space-y-2 text-sm text-text-muted">
                    {['Weekend stay', 'Business trip', 'Family holiday'].map((item) => (
                      <li key={item} className="cursor-pointer hover:text-primary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">{filtered.length}</span> results found
              </p>
              <select className="rounded-lg border border-border px-3 py-1.5 text-sm outline-none">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((room) => (
                <PropertyCard
                  key={room.id}
                  id={room.id}
                  name={room.name}
                  location={room.location}
                  pricePerNight={room.pricePerNight}
                  rating={room.rating}
                  images={room.images}
                  bedrooms={room.bedrooms}
                  bathrooms={room.bathrooms}
                  amenities={room.amenities}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
