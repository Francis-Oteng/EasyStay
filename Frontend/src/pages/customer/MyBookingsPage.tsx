import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, XCircle, CalendarCheck, Search } from 'lucide-react';

const allBookings = [
  { id: 1, property: 'Skyline Penthouse', location: 'New York, USA', checkIn: 'Aug 15, 2026', checkOut: 'Aug 18, 2026', price: 1260, status: 'Confirmed', image: 'from-purple-500 to-pink-500', guests: 2 },
  { id: 2, property: 'Seaside Villa', location: 'Malibu, USA', checkIn: 'Sep 5, 2026', checkOut: 'Sep 10, 2026', price: 2900, status: 'Pending', image: 'from-blue-500 to-cyan-500', guests: 4 },
  { id: 3, property: 'Mountain Lodge', location: 'Aspen, USA', checkIn: 'Jun 10, 2026', checkOut: 'Jun 13, 2026', price: 1050, status: 'Completed', image: 'from-emerald-500 to-teal-500', guests: 2 },
  { id: 4, property: 'Urban Loft', location: 'London, UK', checkIn: 'May 20, 2026', checkOut: 'May 23, 2026', price: 840, status: 'Completed', image: 'from-orange-500 to-red-500', guests: 1 },
  { id: 5, property: 'Beachfront Bungalow', location: 'Bali, Indonesia', checkIn: 'Apr 5, 2026', checkOut: 'Apr 10, 2026', price: 950, status: 'Cancelled', image: 'from-yellow-500 to-orange-500', guests: 2 },
  { id: 6, property: 'Historic Townhouse', location: 'Paris, France', checkIn: 'Mar 1, 2026', checkOut: 'Mar 5, 2026', price: 1240, status: 'Completed', image: 'from-violet-500 to-purple-500', guests: 3 },
];

type TabType = 'Upcoming' | 'Past' | 'Cancelled';

const tabs: TabType[] = ['Upcoming', 'Past', 'Cancelled'];

export function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('Upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allBookings.filter(b => {
    if (activeTab === 'Upcoming') return b.status === 'Confirmed' || b.status === 'Pending';
    if (activeTab === 'Past') return b.status === 'Completed';
    if (activeTab === 'Cancelled') return b.status === 'Cancelled';
    return true;
  }).filter(b =>
    b.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl text-secondary">My Bookings</h1>
            <p className="text-gray-500 font-ui text-sm mt-1">Manage all your reservations</p>
          </motion.div>
          <div className="flex items-center gap-4 mt-6">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-ui transition-colors ${
                  activeTab === tab ? 'bg-primary text-white' : 'text-gray-500 hover:text-secondary hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by property or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <CalendarCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-ui font-semibold text-xl text-secondary mb-2">No {activeTab.toLowerCase()} bookings</h3>
            <p className="text-gray-500 font-sans">
              {activeTab === 'Upcoming' ? 'Start browsing properties to book your next stay!' : `You have no ${activeTab.toLowerCase()} bookings yet.`}
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            className="space-y-4"
          >
            {filtered.map((booking) => (
              <motion.div
                key={booking.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className={`h-32 sm:h-auto sm:w-48 bg-gradient-to-br ${booking.image} flex-shrink-0`} />
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-ui font-semibold text-lg text-secondary">{booking.property}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {booking.location}</p>
                      </div>
                      <span className={`text-xs font-ui font-semibold px-3 py-1 rounded-full ${
                        booking.status === 'Confirmed' ? 'bg-success/10 text-success' :
                        booking.status === 'Pending' ? 'bg-warning/10 text-warning' :
                        booking.status === 'Completed' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-error/10 text-error'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {booking.checkIn} - {booking.checkOut}</span>
                      <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <p className="font-ui font-bold text-xl text-primary">${booking.price}</p>
                      <div className="flex gap-2">
                        {(booking.status === 'Confirmed' || booking.status === 'Pending') && (
                          <button className="flex items-center gap-1 text-sm text-error font-ui hover:underline">
                            <XCircle className="w-4 h-4" /> Cancel
                          </button>
                        )}
                        <button className="text-sm text-primary font-ui hover:underline">View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}