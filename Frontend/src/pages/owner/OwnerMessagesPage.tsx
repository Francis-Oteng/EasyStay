import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export function OwnerMessagesPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl text-secondary">Messages</h1>
            <p className="text-gray-500 font-ui text-sm mt-1">Communicate with your guests</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="font-ui font-semibold text-xl text-secondary mb-2">No messages yet</h3>
          <p className="text-gray-500">Messages from guests will appear here.</p>
        </div>
      </div>
    </motion.div>
  );
}