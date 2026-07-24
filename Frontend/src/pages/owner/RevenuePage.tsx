import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Building2, Wallet, Calendar, ChevronDown, MapPin } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

const summaryCards = [
  { icon: DollarSign, label: 'Total Revenue', value: formatCurrency(124580), change: '+18.2% vs last year', color: 'text-success', bg: 'bg-success/10' },
  { icon: TrendingUp, label: 'This Month', value: formatCurrency(10200), change: '+12.5% vs last month', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: Building2, label: 'Avg per Property', value: formatCurrency(15572), change: 'per property per year', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: Wallet, label: 'Pending Payouts', value: formatCurrency(4200), change: '3 pending payouts', color: 'text-warning', bg: 'bg-warning/10' },
];

const monthlyRevenue = [
  { month: 'Jan', revenue: 3200, bookings: 8 },
  { month: 'Feb', revenue: 4800, bookings: 12 },
  { month: 'Mar', revenue: 5100, bookings: 14 },
  { month: 'Apr', revenue: 4500, bookings: 11 },
  { month: 'May', revenue: 6200, bookings: 16 },
  { month: 'Jun', revenue: 5800, bookings: 15 },
  { month: 'Jul', revenue: 7200, bookings: 18 },
  { month: 'Aug', revenue: 8100, bookings: 20 },
  { month: 'Sep', revenue: 7600, bookings: 19 },
  { month: 'Oct', revenue: 8400, bookings: 21 },
  { month: 'Nov', revenue: 9200, bookings: 23 },
  { month: 'Dec', revenue: 10200, bookings: 25 },
];

const weeklyBookings = [
  { week: 'W1', bookings: 4 }, { week: 'W2', bookings: 7 },
  { week: 'W3', bookings: 5 }, { week: 'W4', bookings: 8 },
];

const topProperties = [
  { name: 'Skyline Penthouse', revenue: 28560, bookings: 24, location: 'New York, USA', image: 'from-purple-500 to-pink-500' },
  { name: 'Seaside Villa', revenue: 31320, bookings: 18, location: 'Malibu, USA', image: 'from-blue-500 to-cyan-500' },
  { name: 'Beachfront Bungalow', revenue: 25650, bookings: 45, location: 'Bali, Indonesia', image: 'from-yellow-500 to-orange-500' },
  { name: 'Urban Loft', revenue: 26040, bookings: 31, location: 'London, UK', image: 'from-orange-500 to-red-500' },
];

export function RevenuePage() {
  const [dateRange, setDateRange] = useState('This Year');

  const maxMonthlyRev = Math.max(...monthlyRevenue.map(m => m.revenue));
  const maxWeeklyBookings = Math.max(...weeklyBookings.map(w => w.bookings));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-4xl text-secondary">Revenue Dashboard</h1>
              <p className="text-gray-500 font-ui text-sm mt-1">Track your earnings and performance</p>
            </div>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors appearance-none bg-white pr-10"
              >
                <option>This Year</option>
                <option>Last Year</option>
                <option>All Time</option>
              </select>
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {summaryCards.map((card) => (
            <motion.div
              key={card.label}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="bg-white rounded-2xl p-5 border border-gray-100"
            >
              <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-2xl font-heading text-secondary mb-1">{card.value}</p>
              <p className="text-sm text-gray-500 font-ui">{card.label}</p>
              <p className="text-xs text-gray-400 mt-1">{card.change}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <h2 className="font-ui font-semibold text-lg text-secondary mb-6">Monthly Revenue</h2>
            <div className="flex items-end gap-2 h-48">
              {monthlyRevenue.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-lg hover:opacity-80 transition-opacity relative group"
                    style={{ height: `${(m.revenue / maxMonthlyRev) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatCurrency(m.revenue)}
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-ui">{m.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <h2 className="font-ui font-semibold text-lg text-secondary mb-6">Weekly Bookings</h2>
            <div className="flex items-end gap-4 h-48">
              {weeklyBookings.map((w) => (
                <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-gradient-to-t from-success to-success/60 rounded-t-lg hover:opacity-80 transition-opacity relative group"
                    style={{ height: `${(w.bookings / maxWeeklyBookings) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {w.bookings} bookings
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-ui">{w.week}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-gray-100"
        >
          <h2 className="font-ui font-semibold text-lg text-secondary mb-6">Top Performing Properties</h2>
          <div className="space-y-4">
            {topProperties.map((prop, index) => (
              <div key={prop.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prop.image} flex-shrink-0 flex items-center justify-center text-white font-ui font-bold text-sm`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-ui font-semibold text-secondary text-sm">{prop.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {prop.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-ui font-bold text-primary text-sm">{formatCurrency(prop.revenue)}</p>
                  <p className="text-xs text-gray-400">{prop.bookings} bookings</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}