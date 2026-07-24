import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Check, X, Ban, CalendarCheck } from 'lucide-react';

const allBookings = [
  { id: 1, property: 'Skyline Penthouse', customer: 'Sarah Johnson', email: 'sarah@example.com', checkIn: 'Aug 15, 2026', checkOut: 'Aug 18, 2026', guests: 2, total: 1260, status: 'Confirmed' as const },
  { id: 2, property: 'Seaside Villa', customer: 'Michael Chen', email: 'michael@example.com', checkIn: 'Sep 5, 2026', checkOut: 'Sep 10, 2026', guests: 4, total: 2900, status: 'Pending' as const },
  { id: 3, property: 'Mountain Lodge', customer: 'Emma Williams', email: 'emma@example.com', checkIn: 'Jul 20, 2026', checkOut: 'Jul 23, 2026', guests: 2, total: 1050, status: 'Confirmed' as const },
  { id: 4, property: 'Urban Loft', customer: 'David Kim', email: 'david@example.com', checkIn: 'Aug 1, 2026', checkOut: 'Aug 4, 2026', guests: 1, total: 840, status: 'Cancelled' as const },
  { id: 5, property: 'Beachfront Bungalow', customer: 'Lisa Anderson', email: 'lisa@example.com', checkIn: 'Aug 10, 2026', checkOut: 'Aug 15, 2026', guests: 2, total: 950, status: 'Pending' as const },
  { id: 6, property: 'Skyline Penthouse', customer: 'James Wilson', email: 'james@example.com', checkIn: 'Sep 1, 2026', checkOut: 'Sep 3, 2026', guests: 2, total: 840, status: 'Confirmed' as const },
];

type TabType = 'All' | 'Pending' | 'Confirmed' | 'Cancelled';

type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled';

export function OwnerBookingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookings, setBookings] = useState(allBookings);

  const updateStatus = (id: number, newStatus: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const filtered = bookings.filter(b => {
    if (activeTab !== 'All' && b.status !== activeTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return b.property.toLowerCase().includes(q) || b.customer.toLowerCase().includes(q);
    }
    return true;
  });

  const tabs: TabType[] = ['All', 'Pending', 'Confirmed', 'Cancelled'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl text-secondary">Booking Management</h1>
            <p className="text-gray-500 font-ui text-sm mt-1">Manage reservations for your properties</p>
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
                {tab} {tab !== 'All' && `(${bookings.filter(b => b.status === tab).length})`}
              </button>
            ))}
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by property or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-4 text-xs font-ui font-semibold text-gray-500 uppercase">Property</th>
                  <th className="text-left px-6 py-4 text-xs font-ui font-semibold text-gray-500 uppercase">Customer</th>
                  <th className="text-left px-6 py-4 text-xs font-ui font-semibold text-gray-500 uppercase">Dates</th>
                  <th className="text-left px-6 py-4 text-xs font-ui font-semibold text-gray-500 uppercase">Guests</th>
                  <th className="text-left px-6 py-4 text-xs font-ui font-semibold text-gray-500 uppercase">Total</th>
                  <th className="text-left px-6 py-4 text-xs font-ui font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-right px-6 py-4 text-xs font-ui font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <CalendarCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-ui text-sm">No bookings found</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((booking) => (
                    <tr key={booking.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-ui font-semibold text-secondary">{booking.property}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-ui text-gray-600">{booking.customer}</p>
                        <p className="text-xs text-gray-400">{booking.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-ui text-gray-600 whitespace-nowrap">
                        {booking.checkIn} - {booking.checkOut}
                      </td>
                      <td className="px-6 py-4 text-sm font-ui text-gray-600">{booking.guests}</td>
                      <td className="px-6 py-4 text-sm font-ui font-semibold text-secondary">${booking.total}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-ui font-semibold px-2.5 py-1 rounded-full ${
                          booking.status === 'Confirmed' ? 'bg-success/10 text-success' :
                          booking.status === 'Pending' ? 'bg-warning/10 text-warning' :
                          'bg-error/10 text-error'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {booking.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(booking.id, 'Confirmed')}
                                className="p-2 bg-success/10 text-success rounded-lg hover:bg-success/20 transition-colors"
                                title="Accept"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateStatus(booking.id, 'Cancelled')}
                                className="p-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors"
                                title="Reject"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {booking.status === 'Confirmed' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'Cancelled')}
                              className="p-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors"
                              title="Cancel"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          )}
                          {booking.status === 'Cancelled' && (
                            <span className="text-xs text-gray-400 font-ui">No actions</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}