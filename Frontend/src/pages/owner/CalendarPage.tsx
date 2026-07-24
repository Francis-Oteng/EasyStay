import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const initialUnavailable = [5, 6, 7, 12, 13, 14, 19, 20, 21];

export function CalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [unavailableDates, setUnavailableDates] = useState<number[]>(initialUnavailable);

  const toggleDate = (day: number) => {
    setUnavailableDates(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const isCurrentMonth = now.getMonth() === month && now.getFullYear() === year;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl text-secondary">Availability Calendar</h1>
            <p className="text-gray-500 font-ui text-sm mt-1">Click dates to toggle availability</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-5 h-5 text-secondary" />
            </button>
            <h2 className="font-ui font-semibold text-xl text-secondary">
              {monthNames[month]} {year}
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-5 h-5 text-secondary" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center py-2 text-xs font-ui font-semibold text-gray-400 uppercase">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map(day => {
              const isUnavailable = unavailableDates.includes(day);
              const isToday = isCurrentMonth && day === now.getDate();
              return (
                <button
                  key={day}
                  onClick={() => toggleDate(day)}
                  className={`h-14 rounded-xl text-sm font-ui transition-all relative ${
                    isUnavailable
                      ? 'bg-error/10 text-error hover:bg-error/20'
                      : 'bg-success/10 text-success hover:bg-success/20'
                  } ${isToday ? 'ring-2 ring-primary' : ''}`}
                >
                  {day}
                  <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    isUnavailable ? 'bg-error' : 'bg-success'
                  }`} />
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-xs font-ui text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-error" />
              <span className="text-xs font-ui text-gray-600">Unavailable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary ring-2 ring-primary/30" />
              <span className="text-xs font-ui text-gray-600">Today</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              <h3 className="font-ui font-semibold text-sm text-secondary">Summary</h3>
            </div>
            <p className="text-sm text-gray-600 font-ui">
              {daysInMonth - unavailableDates.length} available days, {unavailableDates.length} unavailable days in {monthNames[month]}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}