import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Heart, Trash2, ShoppingBag } from 'lucide-react';

const savedProperties = [
  { id: 1, name: 'Skyline Penthouse', location: 'New York, USA', price: 420, rating: 4.9, reviews: 128, image: 'from-purple-500 to-pink-500' },
  { id: 2, name: 'Seaside Villa', location: 'Malibu, USA', price: 580, rating: 4.8, reviews: 96, image: 'from-blue-500 to-cyan-500' },
  { id: 3, name: 'Mountain Lodge', location: 'Aspen, USA', price: 350, rating: 4.7, reviews: 74, image: 'from-emerald-500 to-teal-500' },
  { id: 4, name: 'Urban Loft', location: 'London, UK', price: 280, rating: 4.6, reviews: 152, image: 'from-orange-500 to-red-500' },
  { id: 5, name: 'Beachfront Bungalow', location: 'Bali, Indonesia', price: 190, rating: 4.9, reviews: 203, image: 'from-yellow-500 to-orange-500' },
];

export function WishlistPage() {
  const [items, setItems] = useState(savedProperties);

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl text-secondary">My Wishlist</h1>
            <p className="text-gray-500 font-ui text-sm mt-1">{items.length} saved {items.length === 1 ? 'property' : 'properties'}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-ui font-semibold text-xl text-secondary mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 font-sans mb-6">Save properties you love to find them later</p>
            <a
              href="/properties"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-ui font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <ShoppingBag className="w-5 h-5" /> Browse Properties
            </a>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((property) => (
              <motion.div
                key={property.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-48 bg-gradient-to-br ${property.image} relative`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-0.5">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-semibold text-secondary">{property.rating}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(property.id)}
                    className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-error hover:text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <a href={`/properties/${property.id}`} className="p-4 block">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-ui font-semibold text-secondary group-hover:text-primary transition-colors">{property.name}</h3>
                    <p className="font-ui font-bold text-primary">${property.price}<span className="text-xs text-gray-500 font-normal">/n</span></p>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {property.location}
                  </p>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}