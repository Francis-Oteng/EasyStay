import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck, Star, Heart, MapPin, ArrowRight,
  ChevronRight, Clock, Home, User, Building2, Bell
} from 'lucide-react';

const upcomingBookings = [
  { id: 1, property: 'Skyline Penthouse', location: 'New York, USA', checkIn: 'Aug 15, 2026', checkOut: 'Aug 18, 2026', price: 1260, status: 'Confirmed', image: 'from-purple-500 to-pink-500' },
  { id: 2, property: 'Seaside Villa', location: 'Malibu, USA', checkIn: 'Sep 5, 2026', checkOut: 'Sep 10, 2026', price: 2900, status: 'Pending', image: 'from-blue-500 to-cyan-500' },
];

const recentProperties = [
  { id: 3, name: 'Mountain Lodge', location: 'Aspen, USA', price: 350, image: 'from-emerald-500 to-teal-500' },
  { id: 4, name: 'Urban Loft', location: 'London, UK', price: 280, image: 'from-orange-500 to-red-500' },
  { id: 5, name: 'Beachfront Bungalow', location: 'Bali, Indonesia', price: 190, image: 'from-yellow-500 to-orange-500' },
];

export function CustomerDashboard() {
  const [userName] = useState('Sarah');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-gray-500 font-ui text-sm">Welcome back,</p>
            <h1 className="font-heading text-4xl text-secondary">{userName}</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <CalendarCheck className="w-8 h-8 text-primary" />
              <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-full font-ui">+2 this month</span>
            </div>
            <p className="text-3xl font-heading text-secondary mb-1">12</p>
            <p className="text-sm text-gray-500 font-ui">Total Bookings</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <Star className="w-8 h-8 text-yellow-500" />
              <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-ui">2 upcoming</span>
            </div>
            <p className="text-3xl font-heading text-secondary mb-1">2</p>
            <p className="text-sm text-gray-500 font-ui">Upcoming Stays</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <Heart className="w-8 h-8 text-error" />
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-ui">Saved</span>
            </div>
            <p className="text-3xl font-heading text-secondary mb-1">8</p>
            <p className="text-sm text-gray-500 font-ui">Wishlist Items</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-ui font-semibold text-xl text-secondary">Upcoming Bookings</h2>
                <a href="/bookings" className="text-sm text-primary font-ui hover:text-primary-dark transition-colors flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                      <div className={`h-32 sm:h-auto sm:w-48 bg-gradient-to-br ${booking.image} flex-shrink-0`} />
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-ui font-semibold text-secondary">{booking.property}</h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> {booking.location}
                            </p>
                          </div>
                          <span className={`text-xs font-ui font-semibold px-3 py-1 rounded-full ${
                            booking.status === 'Confirmed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {booking.checkIn} - {booking.checkOut}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <p className="font-ui font-bold text-lg text-primary">${booking.price}</p>
                          <button className="text-sm text-error font-ui hover:underline">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-ui font-semibold text-xl text-secondary">Recently Viewed</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recentProperties.map((prop) => (
                  <a key={prop.id} href={`/properties/${prop.id}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all">
                    <div className={`h-32 bg-gradient-to-br ${prop.image}`} />
                    <div className="p-3">
                      <h3 className="font-ui font-semibold text-sm text-secondary group-hover:text-primary transition-colors">{prop.name}</h3>
                      <p className="text-xs text-gray-500">{prop.location}</p>
                      <p className="text-sm font-ui font-bold text-primary mt-1">${prop.price}<span className="text-xs text-gray-500 font-normal">/night</span></p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h2 className="font-ui font-semibold text-lg text-secondary mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a href="/properties" className="flex items-center gap-3 p-3 bg-accent rounded-xl hover:bg-accent-dark transition-colors group">
                  <Home className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-ui font-semibold text-secondary group-hover:text-primary transition-colors">Browse Properties</p>
                    <p className="text-xs text-gray-500">Find your next stay</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
                <a href="/bookings" className="flex items-center gap-3 p-3 bg-accent rounded-xl hover:bg-accent-dark transition-colors group">
                  <CalendarCheck className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-ui font-semibold text-secondary group-hover:text-primary transition-colors">View Bookings</p>
                    <p className="text-xs text-gray-500">Manage your stays</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
                <a href="/profile" className="flex items-center gap-3 p-3 bg-accent rounded-xl hover:bg-accent-dark transition-colors group">
                  <User className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-ui font-semibold text-secondary group-hover:text-primary transition-colors">Edit Profile</p>
                    <p className="text-xs text-gray-500">Update your details</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
                <a href="/wishlist" className="flex items-center gap-3 p-3 bg-accent rounded-xl hover:bg-accent-dark transition-colors group">
                  <Heart className="w-5 h-5 text-error" />
                  <div className="flex-1">
                    <p className="text-sm font-ui font-semibold text-secondary group-hover:text-primary transition-colors">Wishlist</p>
                    <p className="text-xs text-gray-500">{8} saved properties</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}