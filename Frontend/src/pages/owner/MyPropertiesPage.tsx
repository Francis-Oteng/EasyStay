import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, MapPin, Star, Edit3, Trash2, Eye, EyeOff, Plus, DollarSign, CalendarCheck, Search } from 'lucide-react';

const initialProperties = [
  { id: 1, name: 'Skyline Penthouse', location: 'New York, USA', price: 420, bookings: 24, revenue: 28560, published: true, image: 'from-purple-500 to-pink-500', rating: 4.9 },
  { id: 2, name: 'Seaside Villa', location: 'Malibu, USA', price: 580, bookings: 18, revenue: 31320, published: true, image: 'from-blue-500 to-cyan-500', rating: 4.8 },
  { id: 3, name: 'Mountain Lodge', location: 'Aspen, USA', price: 350, bookings: 12, revenue: 12600, published: true, image: 'from-emerald-500 to-teal-500', rating: 4.7 },
  { id: 4, name: 'Urban Loft', location: 'London, UK', price: 280, bookings: 31, revenue: 26040, published: false, image: 'from-orange-500 to-red-500', rating: 4.6 },
  { id: 5, name: 'Beachfront Bungalow', location: 'Bali, Indonesia', price: 190, bookings: 45, revenue: 25650, published: true, image: 'from-yellow-500 to-orange-500', rating: 4.9 },
];

export function MyPropertiesPage() {
  const [properties, setProperties] = useState(initialProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const togglePublish = (id: number) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, published: !p.published } : p));
  };

  const deleteProperty = (id: number) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  const filtered = properties.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <h1 className="font-heading text-4xl text-secondary">My Properties</h1>
              <p className="text-gray-500 font-ui text-sm mt-1">{properties.length} properties</p>
            </div>
            <a
              href="/owner/properties/add"
              className="bg-primary hover:bg-primary-dark text-white font-ui font-semibold px-5 py-3 rounded-xl flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" /> Add Property
            </a>
          </motion.div>
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-ui font-semibold text-xl text-secondary mb-2">No properties found</h3>
            <p className="text-gray-500 font-sans mb-6">Start by adding your first property</p>
            <a href="/owner/properties/add" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-ui font-semibold px-6 py-3 rounded-xl transition-colors">
              <Plus className="w-5 h-5" /> Add Property
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className={`h-32 sm:h-auto sm:w-48 bg-gradient-to-br ${property.image} flex-shrink-0 relative`}>
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-ui font-semibold text-lg text-secondary">{property.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {property.location}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-secondary">{property.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> ${property.price}/night</span>
                      <span className="flex items-center gap-1"><CalendarCheck className="w-3.5 h-3.5" /> {property.bookings} bookings</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-success" /> ${property.revenue.toLocaleString()} revenue</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <button
                        onClick={() => togglePublish(property.id)}
                        className={`flex items-center gap-1.5 text-sm font-ui transition-colors ${
                          property.published ? 'text-success hover:text-success/80' : 'text-gray-400 hover:text-secondary'
                        }`}
                      >
                        {property.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {property.published ? 'Published' : 'Unpublished'}
                      </button>
                      <div className="flex items-center gap-3">
                        <a href={`/owner/properties/edit/${property.id}`} className="text-sm font-ui text-primary hover:text-primary-dark flex items-center gap-1 transition-colors">
                          <Edit3 className="w-4 h-4" /> Edit
                        </a>
                        {deleteConfirm === property.id ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => setDeleteConfirm(null)} className="text-xs font-ui text-gray-500 hover:text-secondary">Cancel</button>
                            <button onClick={() => deleteProperty(property.id)} className="text-xs font-ui text-error font-semibold hover:underline">Confirm</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(property.id)} className="text-sm font-ui text-error hover:text-error/80 flex items-center gap-1 transition-colors">
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}