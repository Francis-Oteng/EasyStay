import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, CheckCheck, CalendarCheck, MessageCircle, Star, AlertCircle } from 'lucide-react';

const initialNotifications = [
  { id: 1, type: 'booking', title: 'Booking Confirmed', message: 'Your stay at Skyline Penthouse has been confirmed for Aug 15 - Aug 18.', time: '2 hours ago', read: false },
  { id: 2, type: 'message', title: 'New Message from Host', message: 'Alexander Mitchell sent you a message about your upcoming stay.', time: '5 hours ago', read: false },
  { id: 3, type: 'review', title: 'Review Reminder', message: 'How was your stay at Mountain Lodge? Share your experience.', time: '1 day ago', read: false },
  { id: 4, type: 'promo', title: 'Special Offer', message: 'Get 20% off your next booking. Limited time offer!', time: '2 days ago', read: false },
  { id: 5, type: 'alert', title: 'Price Drop Alert', message: 'Seaside Villa has dropped in price. Check it out now!', time: '3 days ago', read: true },
  { id: 6, type: 'booking', title: 'Booking Cancelled', message: 'Your booking at Beachfront Bungalow has been cancelled.', time: '1 week ago', read: true },
];

const typeIcons: Record<string, React.ElementType> = {
  booking: CalendarCheck,
  message: MessageCircle,
  review: Star,
  promo: AlertCircle,
  alert: AlertCircle,
};

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-4xl text-secondary">Notifications</h1>
              <p className="text-gray-500 font-ui text-sm mt-1">
                {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-sm text-primary font-ui hover:text-primary-dark transition-colors"
              >
                <CheckCheck className="w-4 h-4" /> Mark All as Read
              </button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-ui font-semibold text-xl text-secondary mb-2">No notifications</h3>
            <p className="text-gray-500 font-sans">We'll notify you when something important happens</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
            className="space-y-3"
          >
            {notifications.map((notification) => {
              const Icon = typeIcons[notification.type] || Bell;
              return (
                <motion.div
                  key={notification.id}
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                  onClick={() => markAsRead(notification.id)}
                  className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all ${
                    notification.read ? 'border-gray-100' : 'border-primary/20 bg-accent/50'
                  } hover:shadow-md`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      notification.read ? 'bg-gray-100' : 'bg-primary/10'
                    }`}>
                      <Icon className={`w-5 h-5 ${notification.read ? 'text-gray-400' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`font-ui text-sm ${notification.read ? 'text-secondary' : 'font-semibold text-secondary'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-400">{notification.time}</span>
                          {!notification.read && (
                            <Check
                              className="w-4 h-4 text-gray-400 hover:text-primary transition-colors"
                              onClick={(e) => { e.stopPropagation(); markAsRead(notification.id); }}
                            />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 font-sans mt-1">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}