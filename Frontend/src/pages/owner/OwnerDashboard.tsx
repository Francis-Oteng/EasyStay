import { motion } from 'framer-motion';
import {
  Home, Building2, CalendarCheck, DollarSign, TrendingUp,
  ChevronRight, Plus, Users, Calendar
} from 'lucide-react';

const stats = [
  { icon: Home, label: 'Total Properties', value: '8', change: '+2 this month', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: Building2, label: 'Active Listings', value: '6', change: '75% listed', color: 'text-success', bg: 'bg-success/10' },
  { icon: CalendarCheck, label: 'Total Bookings', value: '47', change: '+12 this month', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: DollarSign, label: 'Revenue', value: '$48,250', change: '+15.3% vs last month', color: 'text-warning', bg: 'bg-warning/10' },
  { icon: TrendingUp, label: 'Occupancy Rate', value: '78%', change: '+5% vs last month', color: 'text-primary', bg: 'bg-primary/10' },
];

const recentBookings = [
  { id: 1, property: 'Skyline Penthouse', customer: 'Sarah Johnson', checkIn: 'Aug 15', checkOut: 'Aug 18', status: 'Confirmed', amount: 1260 },
  { id: 2, property: 'Seaside Villa', customer: 'Michael Chen', checkIn: 'Sep 5', checkOut: 'Sep 10', status: 'Pending', amount: 2900 },
  { id: 3, property: 'Mountain Lodge', customer: 'Emma Williams', checkIn: 'Jul 20', checkOut: 'Jul 23', status: 'Confirmed', amount: 1050 },
  { id: 4, property: 'Urban Loft', customer: 'David Kim', checkIn: 'Aug 1', checkOut: 'Aug 4', status: 'Cancelled', amount: 840 },
  { id: 5, property: 'Beachfront Bungalow', customer: 'Lisa Anderson', checkIn: 'Aug 10', checkOut: 'Aug 15', status: 'Confirmed', amount: 950 },
];

const monthlyRevenue = [3200, 4800, 5100, 4500, 6200, 5800, 7200, 8100, 7600, 8400, 9200, 10200];

export function OwnerDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl text-secondary">Owner Dashboard</h1>
            <p className="text-gray-500 font-ui text-sm mt-1">Manage your properties and bookings</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="bg-white rounded-2xl p-5 border border-gray-100"
            >
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-heading text-secondary mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500 font-ui">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-ui font-semibold text-lg text-secondary">Revenue Overview</h2>
                <span className="text-xs text-gray-500 font-ui">2026</span>
              </div>
              <div className="flex items-end gap-2 h-40">
                {monthlyRevenue.map((rev, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-primary/20 rounded-t-lg hover:bg-primary/40 transition-colors relative group"
                      style={{ height: `${(rev / Math.max(...monthlyRevenue)) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${rev.toLocaleString()}
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-ui">
                      {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 pb-4">
                <h2 className="font-ui font-semibold text-lg text-secondary">Recent Bookings</h2>
                <a href="/owner/bookings" className="text-sm text-primary font-ui hover:text-primary-dark transition-colors flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-t border-gray-100 bg-gray-50">
                      <th className="text-left px-6 py-3 text-xs font-ui font-semibold text-gray-500 uppercase">Property</th>
                      <th className="text-left px-6 py-3 text-xs font-ui font-semibold text-gray-500 uppercase">Customer</th>
                      <th className="text-left px-6 py-3 text-xs font-ui font-semibold text-gray-500 uppercase">Dates</th>
                      <th className="text-left px-6 py-3 text-xs font-ui font-semibold text-gray-500 uppercase">Status</th>
                      <th className="text-right px-6 py-3 text-xs font-ui font-semibold text-gray-500 uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-ui text-secondary">{booking.property}</td>
                        <td className="px-6 py-4 text-sm font-ui text-gray-600">{booking.customer}</td>
                        <td className="px-6 py-4 text-sm font-ui text-gray-600">{booking.checkIn} - {booking.checkOut}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-ui font-semibold px-2 py-1 rounded-full ${
                            booking.status === 'Confirmed' ? 'bg-success/10 text-success' :
                            booking.status === 'Pending' ? 'bg-warning/10 text-warning' :
                            'bg-error/10 text-error'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-ui font-semibold text-secondary text-right">${booking.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h2 className="font-ui font-semibold text-lg text-secondary mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a href="/owner/properties/add" className="flex items-center gap-3 p-3 bg-accent rounded-xl hover:bg-accent-dark transition-colors group">
                  <Plus className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-ui font-semibold text-secondary group-hover:text-primary transition-colors">Add Property</p>
                    <p className="text-xs text-gray-500">List a new property</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
                <a href="/owner/bookings" className="flex items-center gap-3 p-3 bg-accent rounded-xl hover:bg-accent-dark transition-colors group">
                  <CalendarCheck className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-ui font-semibold text-secondary group-hover:text-primary transition-colors">View Bookings</p>
                    <p className="text-xs text-gray-500">Manage reservations</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
                <a href="/owner/calendar" className="flex items-center gap-3 p-3 bg-accent rounded-xl hover:bg-accent-dark transition-colors group">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-ui font-semibold text-secondary group-hover:text-primary transition-colors">Check Calendar</p>
                    <p className="text-xs text-gray-500">Manage availability</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
                <a href="/owner/revenue" className="flex items-center gap-3 p-3 bg-accent rounded-xl hover:bg-accent-dark transition-colors group">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-ui font-semibold text-secondary group-hover:text-primary transition-colors">Revenue Report</p>
                    <p className="text-xs text-gray-500">View earnings</p>
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