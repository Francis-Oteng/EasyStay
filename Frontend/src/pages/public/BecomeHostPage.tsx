import { motion } from 'framer-motion';
import { Building2, DollarSign, Users, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  { icon: DollarSign, title: 'Earn Extra Income', description: 'List your property and start earning money from your unused space.' },
  { icon: Users, title: 'Reach Global Travelers', description: 'Connect with millions of travelers looking for unique stays.' },
  { icon: Shield, title: 'Secure & Protected', description: 'Host with confidence. We provide insurance and 24/7 support.' },
  { icon: Building2, title: 'Easy Management', description: 'Manage your listings, bookings, and payments from one dashboard.' },
];

export function BecomeHostPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
      <div className="bg-gradient-to-br from-secondary to-primary py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-heading text-5xl text-white mb-4">
            Become a Host
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            List your property and start earning. Join thousands of hosts worldwide.
          </motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-primary font-ui font-semibold px-8 py-4 rounded-xl hover:bg-accent transition-colors text-lg"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="font-heading text-4xl text-secondary text-center mb-12">Why Host with StayEasy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-ui font-semibold text-lg text-secondary mb-2">{benefit.title}</h3>
              <p className="text-gray-500 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}