import { motion } from 'framer-motion';
import { Shield, Verified, Zap, CreditCard, HeadphonesIcon, Building2, Users, MapPin } from 'lucide-react';

const stats = [
  { icon: Building2, value: '500+', label: 'Properties Listed' },
  { icon: Users, value: '10,000+', label: 'Happy Guests' },
  { icon: MapPin, value: '16', label: 'Regions Covered' },
  { icon: Shield, value: '99.9%', label: 'Secure Bookings' },
];

const values = [
  { icon: Shield, title: 'Trust & Safety', description: 'Every property is verified to ensure quality, accuracy, and safety for all our guests.' },
  { icon: Verified, title: 'Local Expertise', description: 'Deep knowledge of Ghanaian hospitality and neighbourhoods to help you find the perfect stay.' },
  { icon: Zap, title: 'Instant Booking', description: 'Real-time availability and instant confirmation so you can plan with confidence.' },
  { icon: CreditCard, title: 'Best Prices', description: 'Competitive pricing with no hidden fees, giving you the best value for your stay.' },
  { icon: HeadphonesIcon, title: '24/7 Support', description: 'Our local support team is always available to assist you in English, Twi, Ga, and Hausa.' },
];

const team = [
  { name: 'Francis Oteng', role: 'Founder & CEO', initials: 'FO' },
  { name: 'Otu Obed', role: 'Head of Operations', initials: 'OO' },
  { name: 'Afia Animwah Opoku Agyemang', role: 'Chief Technology Officer', initials: 'AA' },
  { name: 'Opoku Philip Brako', role: 'Head of Hospitality', initials: 'PB' },
];

export function AboutPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary via-[#1A1530] to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,57,252,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(43,35,68,0.3),transparent_50%)]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-primary-light font-ui text-sm uppercase tracking-[0.2em] mb-4">
            About Us
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-5xl sm:text-6xl text-white mb-6">
            Your Home Across Ghana
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-gray-300 font-sans text-lg max-w-2xl mx-auto leading-relaxed">
            StayEasy connects travellers with the finest accommodations across Ghana — from executive self-contains in Accra to beach resorts in Busua and lakeside cottages in Akosombo.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-heading text-3xl font-bold text-secondary">{stat.value}</p>
              <p className="text-sm text-gray-500 font-ui mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
          <div className="text-center mb-12">
            <p className="text-primary font-ui text-sm uppercase tracking-[0.2em] mb-2">Our Story</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-secondary">How StayEasy Began</h2>
          </div>
          <div className="max-w-3xl mx-auto text-gray-600 font-sans text-base leading-relaxed space-y-4">
            <p>
              StayEasy was born out of a simple observation: finding quality accommodation in Ghana was harder than it should be. Travellers struggled to discover verified properties, and property owners lacked a reliable platform to showcase their spaces.
            </p>
            <p>
              Founded in Accra, our team set out to build a platform that makes booking a stay as easy as a few clicks. We partner with property owners across all 16 regions of Ghana to offer a curated selection of homes, apartments, villas, and resorts.
            </p>
            <p>
              Today, StayEasy is trusted by thousands of guests and hosts, and we are committed to growing Ghana's hospitality ecosystem through technology, trust, and local expertise.
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
          <div className="text-center mb-12">
            <p className="text-primary font-ui text-sm uppercase tracking-[0.2em] mb-2">Our Values</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-secondary">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <motion.div key={value.title} whileHover={{ y: -3 }} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-ui font-semibold text-lg text-secondary mb-2">{value.title}</h3>
                <p className="text-gray-500 font-sans text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
          <div className="text-center mb-12">
            <p className="text-primary font-ui text-sm uppercase tracking-[0.2em] mb-2">Our Team</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-secondary">Meet the People Behind StayEasy</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <motion.div key={member.name} whileHover={{ y: -3 }} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-ui font-bold text-lg">{member.initials}</span>
                </div>
                <h3 className="font-ui font-semibold text-secondary">{member.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}