import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Calendar, MapPin } from 'lucide-react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { formatCurrency } from '@/utils/format';
import premiumKingSuite from '@/assets/images/Premiunm King suite picture.jpg';
import doubleComfort from '@/assets/images/double comfort room.jpg';
import familyConnecting from '@/assets/images/Family connecting room.jpg';

const rooms = [
  {
    id: '1',
    name: 'Premium King Suite',
    location: 'Airport Residential, Accra',
    pricePerNight: 220,
    rating: 4.8,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Pool', 'Ocean view'],
    images: [premiumKingSuite],
    isPublished: true,
  },
  {
    id: '2',
    name: 'Comfort Double Room',
    location: 'Ridge, Accra',
    pricePerNight: 145,
    rating: 4.5,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'City view', 'Breakfast'],
    images: [doubleComfort],
    isPublished: true,
  },
  {
    id: '3',
    name: 'Family Connecting Room',
    location: 'Ahodwo, Kumasi',
    pricePerNight: 310,
    rating: 4.7,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['WiFi', 'Pool', 'Lounge access'],
    images: [familyConnecting],
    isPublished: true,
  },
];

export function RoomsPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = rooms.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
      <div className="relative min-h-[40vh] flex items-center bg-gradient-to-br from-secondary via-[#1A1530] to-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-secondary/60 to-primary/80" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-wider text-primary-light"
          >
            Explore
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-1 font-heading text-4xl font-bold text-white"
          >
            Find your perfect stay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 max-w-2xl text-gray-300 mx-auto"
          >
            Search by destination, price, and stay style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10 max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-light w-4 h-4" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Where to?"
                className="w-full pl-10 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-sm font-ui focus:outline-none focus:border-primary-light transition-colors"
              />
            </div>
          </motion.div>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/10">
              Tonight
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/10">
              2 adults
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/10">
              Under {formatCurrency(250)}
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/10">
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
                    <span>{formatCurrency(0)}</span>
                    <span>{formatCurrency(500)}+</span>
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
                  onBook={(id) => navigate(`/properties/${id}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
