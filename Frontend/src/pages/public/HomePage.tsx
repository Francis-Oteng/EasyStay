import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, MapPin, Calendar, Users, Star, Shield, Verified,
  Zap, CreditCard, HeadphonesIcon, Settings, ArrowRight,
  ChevronRight, Mail, Building2, Wifi, Dumbbell, Car,
  Waves, Snowflake, Coffee
} from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import executiveSelfCont from '@/assets/images/Executive self contained -Eastlegon accra.jpg';
import beachResortVilla from '@/assets/images/Beach Resort Villa western Region.jpg';
import mountainViewLodge from '@/assets/images/Mountain view resort western region.jpg';
import compoundHouse from '@/assets/images/compound house at asafo.jpg';
import lakesideCottages from '@/assets/images/lakeside cottages eastern region.jpg';
import premiumKingSuite from '@/assets/images/Premiunm King suite picture.jpg';

const featuredProperties = [
  { id: 1, name: 'Executive Self-Cont', location: 'East Legon, Accra', price: 420, rating: 4.9, reviews: 128, image: executiveSelfCont, amenities: ['WiFi', 'Pool', 'Gym'] },
  { id: 2, name: 'Beach Resort Villa', location: 'Busua, Western Region', price: 580, rating: 4.8, reviews: 96, image: beachResortVilla, amenities: ['WiFi', 'Pool', 'Parking'] },
  { id: 3, name: 'Mountain View Lodge', location: 'Axim, Western Region', price: 350, rating: 4.7, reviews: 74, image: mountainViewLodge, amenities: ['WiFi', 'Restaurant', 'Hiking'] },
  { id: 4, name: 'Compound House', location: 'Asafo, Kumasi', price: 280, rating: 4.6, reviews: 152, image: compoundHouse, amenities: ['WiFi', 'AC', 'Parking'] },
  { id: 5, name: 'Lakeside Cottages', location: 'Akosombo, Eastern Region', price: 190, rating: 4.9, reviews: 203, image: lakesideCottages, amenities: ['WiFi', 'Pool', 'Breakfast'] },
  { id: 6, name: 'Serviced Apartment', location: 'Labone, Accra', price: 310, rating: 4.7, reviews: 88, image: premiumKingSuite, amenities: ['WiFi', 'AC', 'Elevator'] },
];

const whyChooseItems = [
  { icon: Shield, title: 'Secure Payments', description: 'Your transactions are protected with bank-grade encryption and secure payment gateways.' },
  { icon: Verified, title: 'Verified Properties', description: 'Every property is verified for quality, accuracy, and safety standards.' },
  { icon: Zap, title: 'Instant Booking', description: 'Book your stay instantly with real-time availability and instant confirmation.' },
  { icon: CreditCard, title: 'Affordable Pricing', description: 'Best price guaranteed with no hidden fees and flexible payment options.' },
  { icon: HeadphonesIcon, title: '24/7 Support', description: 'Our support team is available around the clock to help you anytime.' },
  { icon: Settings, title: 'Easy Management', description: 'Manage all your bookings, payments, and preferences from one dashboard.' },
];

const testimonials = [
  { name: 'Sarah Johnson', location: 'New York, USA', rating: 5, text: 'Absolutely incredible experience! The villa exceeded all expectations. The views were breathtaking and the host was incredibly attentive.', initials: 'SJ' },
  { name: 'Michael Chen', location: 'Accra, Ghana', rating: 5, text: 'StayEasy made finding the perfect vacation rental effortless. The booking process was smooth and the property was exactly as described.', initials: 'MC' },
  { name: 'Emma Williams', location: 'London, UK', rating: 4, text: 'Great platform with amazing property options. Customer service was quick to respond and helped us with a special request.', initials: 'EW' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function HomePage() {
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState('2');

  return (
    <div className="min-h-screen bg-white">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-[#1A1530] to-primary overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,57,252,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(43,35,68,0.3),transparent_50%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-primary-light font-ui text-sm sm:text-base uppercase tracking-[0.2em] mb-4"
          >
            Premium Stay Experience
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-6"
          >
            Find Your
            <span className="block text-primary-light">Perfect Stay</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-gray-300 font-ui text-lg max-w-2xl mx-auto mb-10"
          >
            Discover hand-picked properties worldwide. From luxury villas to cozy apartments, find your home away from home.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto border border-white/10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-light w-5 h-5" />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 font-ui focus:outline-none focus:border-primary-light transition-colors"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-light w-5 h-5" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-ui focus:outline-none focus:border-primary-light transition-colors appearance-none cursor-pointer"
                >
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={n} value={n} className="bg-secondary text-white">{n} Guest{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary hover:bg-primary-dark text-white font-ui font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Search className="w-5 h-5" />
                Search
              </motion.button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-primary font-ui text-sm uppercase tracking-[0.2em] mb-2">Curated Selection</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-secondary">Featured Properties</h2>
          </div>
          <motion.a
            whileHover={{ x: 5 }}
            href="/properties"
            className="hidden sm:flex items-center gap-2 text-primary font-ui font-semibold hover:text-primary-dark transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProperties.map((property) => (
            <motion.a
              key={property.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              href={`/properties/${property.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-56 relative overflow-hidden">
                <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-secondary">{property.rating}</span>
                    <span className="text-xs text-gray-500">({property.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-ui font-semibold text-lg text-secondary group-hover:text-primary transition-colors">{property.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" /> {property.location}
                    </p>
                  </div>
                  <p className="font-ui font-bold text-lg text-primary">{formatCurrency(property.price)}<span className="text-sm text-gray-500 font-normal">/night</span></p>
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {property.amenities.map((amenity) => (
                    <span key={amenity} className="text-xs bg-accent text-primary px-3 py-1 rounded-full font-ui">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
        <motion.a
          whileHover={{ x: 5 }}
          href="/properties"
          className="sm:hidden flex items-center justify-center gap-2 mt-8 text-primary font-ui font-semibold"
        >
          View All Properties <ChevronRight className="w-4 h-4" />
        </motion.a>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="bg-accent py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-ui text-sm uppercase tracking-[0.2em] mb-2">Why Choose Us</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-secondary">Why Choose StayEasy</h2>
          </div>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyChooseItems.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-ui font-semibold text-lg text-secondary mb-2">{item.title}</h3>
                <p className="text-gray-500 font-sans text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <p className="text-primary font-ui text-sm uppercase tracking-[0.2em] mb-2">Testimonials</p>
          <h2 className="font-heading text-4xl sm:text-5xl text-secondary">What Our Guests Say</h2>
        </div>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((review) => (
            <motion.div
              key={review.name}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 font-sans text-sm leading-relaxed mb-6">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-ui font-semibold text-sm">{review.initials}</span>
                </div>
                <div>
                  <p className="font-ui font-semibold text-sm text-secondary">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="bg-gradient-to-br from-secondary to-primary py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            variants={itemVariants}
            className="text-primary-light font-ui text-sm uppercase tracking-[0.2em] mb-2"
          >
            Newsletter
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-heading text-4xl sm:text-5xl text-white mb-4"
          >
            Stay Updated
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-300 font-sans mb-8 max-w-lg mx-auto"
          >
            Subscribe to get special offers, travel inspiration, and new property alerts delivered to your inbox.
          </motion.p>
          <motion.form
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 font-ui focus:outline-none focus:border-primary-light transition-colors"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-white text-primary font-ui font-semibold px-6 py-3 rounded-xl hover:bg-accent transition-colors whitespace-nowrap"
            >
              Subscribe
            </motion.button>
          </motion.form>
        </div>
      </motion.section>
    </div>
  );
}