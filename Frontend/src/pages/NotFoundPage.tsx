import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-secondary to-primary flex items-center justify-center p-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,57,252,0.15),transparent_60%)]" />
      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="font-heading text-[12rem] sm:text-[16rem] text-white/10 leading-none select-none mb-[-2rem]"
        >
          404
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-heading text-4xl sm:text-5xl text-white mb-4"
        >
          Page Not Found
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-300 font-sans text-lg mb-8"
        >
          The page you are looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="/"
            className="bg-white text-primary font-ui font-semibold px-6 py-3.5 rounded-xl hover:bg-accent transition-colors flex items-center gap-2"
          >
            <Home className="w-5 h-5" /> Go Home
          </a>
          <a
            href="/properties"
            className="border border-white/30 text-white font-ui font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            Browse Properties
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}