import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft, ArrowRight, Check, Home, DollarSign, Users,
  Grid3X3, Camera, Upload, Building2, MapPin, Globe
} from 'lucide-react';

const addPropertySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Select a category'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  pricePerNight: z.coerce.number().min(1, 'Price must be at least $1'),
  bedrooms: z.coerce.number().min(1, 'At least 1 bedroom'),
  bathrooms: z.coerce.number().min(1, 'At least 1 bathroom'),
  maxGuests: z.coerce.number().min(1, 'At least 1 guest'),
});

type AddPropertyForm = z.infer<typeof addPropertySchema>;

const amenityOptions = [
  'WiFi', 'Pool', 'Air Conditioning', 'Parking', 'Gym',
  'Kitchen', 'Washer', 'Dryer', 'TV', 'Fireplace',
  'Balcony', 'Garden', 'Elevator', 'Pet Friendly', 'Smoke Detector',
  'Carbon Monoxide Detector', 'First Aid Kit', 'Fire Extinguisher'
];

const categories = ['Apartment', 'House', 'Villa', 'Cabin', 'Cottage', 'Bungalow', 'Penthouse', 'Townhouse'];

const steps = ['Basic Info', 'Pricing', 'Amenities', 'Images', 'Review'];

export function AddPropertyPage() {
  const [step, setStep] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, trigger, watch } = useForm<AddPropertyForm>({
    resolver: zodResolver(addPropertySchema),
    defaultValues: {
      bedrooms: 1, bathrooms: 1, maxGuests: 2, pricePerNight: 100,
    },
  });

  const formValues = watch();

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const addMockImage = () => {
    const gradients = ['from-purple-500 to-pink-500', 'from-blue-500 to-cyan-500', 'from-emerald-500 to-teal-500', 'from-orange-500 to-red-500'];
    setImages(prev => [...prev, gradients[prev.length % gradients.length]]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = async () => {
    if (step === 0) {
      const valid = await trigger(['name', 'description', 'category', 'address', 'city', 'country']);
      if (valid) setStep(1);
    } else if (step === 1) {
      const valid = await trigger(['pricePerNight', 'bedrooms', 'bathrooms', 'maxGuests']);
      if (valid) setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const onSubmit = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl text-secondary">Add New Property</h1>
            <p className="text-gray-500 font-ui text-sm mt-1">List your property on StayEasy</p>
          </motion.div>
          <div className="flex items-center gap-2 mt-6">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-ui font-semibold transition-all ${
                  i <= step ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-xs font-ui hidden sm:block ${i <= step ? 'text-secondary font-semibold' : 'text-gray-400'}`}>{s}</span>
                {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="font-ui font-semibold text-xl text-secondary mb-4">Basic Information</h2>
                  <div>
                    <label className="block text-sm font-ui font-medium text-secondary mb-1">Property Name</label>
                    <input type="text" {...register('name')} placeholder="e.g., Skyline Penthouse" className={`w-full px-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.name ? 'border-error' : 'border-gray-200'}`} />
                    {errors.name && <p className="text-error text-xs font-ui mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-ui font-medium text-secondary mb-1">Description</label>
                    <textarea {...register('description')} placeholder="Describe your property in detail..." rows={4} className={`w-full px-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors resize-none ${errors.description ? 'border-error' : 'border-gray-200'}`} />
                    {errors.description && <p className="text-error text-xs font-ui mt-1">{errors.description.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-ui font-medium text-secondary mb-1">Category</label>
                    <div className="relative">
                      <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <select {...register('category')} className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors appearance-none bg-white ${errors.category ? 'border-error' : 'border-gray-200'}`}>
                        <option value="">Select category</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    {errors.category && <p className="text-error text-xs font-ui mt-1">{errors.category.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-ui font-medium text-secondary mb-1">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input type="text" {...register('address')} placeholder="Street address" className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.address ? 'border-error' : 'border-gray-200'}`} />
                    </div>
                    {errors.address && <p className="text-error text-xs font-ui mt-1">{errors.address.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-ui font-medium text-secondary mb-1">City</label>
                      <input type="text" {...register('city')} placeholder="City" className={`w-full px-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.city ? 'border-error' : 'border-gray-200'}`} />
                      {errors.city && <p className="text-error text-xs font-ui mt-1">{errors.city.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-ui font-medium text-secondary mb-1">Country</label>
                      <input type="text" {...register('country')} placeholder="Country" className={`w-full px-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.country ? 'border-error' : 'border-gray-200'}`} />
                      {errors.country && <p className="text-error text-xs font-ui mt-1">{errors.country.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="font-ui font-semibold text-xl text-secondary mb-4">Pricing & Capacity</h2>
                  <div>
                    <label className="block text-sm font-ui font-medium text-secondary mb-1">Price per Night ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input type="number" {...register('pricePerNight')} className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.pricePerNight ? 'border-error' : 'border-gray-200'}`} />
                    </div>
                    {errors.pricePerNight && <p className="text-error text-xs font-ui mt-1">{errors.pricePerNight.message}</p>}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-ui font-medium text-secondary mb-1">Bedrooms</label>
                      <input type="number" {...register('bedrooms')} className={`w-full px-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.bedrooms ? 'border-error' : 'border-gray-200'}`} />
                      {errors.bedrooms && <p className="text-error text-xs font-ui mt-1">{errors.bedrooms.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-ui font-medium text-secondary mb-1">Bathrooms</label>
                      <input type="number" {...register('bathrooms')} className={`w-full px-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.bathrooms ? 'border-error' : 'border-gray-200'}`} />
                      {errors.bathrooms && <p className="text-error text-xs font-ui mt-1">{errors.bathrooms.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-ui font-medium text-secondary mb-1">Max Guests</label>
                      <input type="number" {...register('maxGuests')} className={`w-full px-4 py-3 border rounded-xl text-sm font-ui focus:outline-none focus:border-primary transition-colors ${errors.maxGuests ? 'border-error' : 'border-gray-200'}`} />
                      {errors.maxGuests && <p className="text-error text-xs font-ui mt-1">{errors.maxGuests.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-ui font-semibold text-xl text-secondary mb-4">Amenities</h2>
                  <p className="text-sm text-gray-500 font-ui mb-4">Select all amenities your property offers</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {amenityOptions.map(amenity => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`p-3 rounded-xl border-2 text-left text-sm font-ui transition-all ${
                          selectedAmenities.includes(amenity)
                            ? 'border-primary bg-accent text-primary font-semibold'
                            : 'border-gray-200 text-gray-600 hover:border-primary/50'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 font-ui mt-3">{selectedAmenities.length} amenities selected</p>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-ui font-semibold text-xl text-secondary mb-4">Property Images</h2>
                  <p className="text-sm text-gray-500 font-ui mb-4">Upload photos of your property (at least 1 required)</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {images.map((img, i) => (
                      <div key={i} className={`h-40 bg-gradient-to-br ${img} rounded-xl relative group`}>
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-2 right-2 w-7 h-7 bg-error/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-ui"
                        >
                          X
                        </button>
                      </div>
                    ))}
                    {images.length < 8 && (
                      <button
                        type="button"
                        onClick={addMockImage}
                        className="h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-accent/50 transition-colors"
                      >
                        <Camera className="w-6 h-6 text-gray-400" />
                        <span className="text-xs font-ui text-gray-500">Add Image</span>
                      </button>
                    )}
                  </div>
                  {images.length === 0 && (
                    <p className="text-xs text-gray-400 font-ui mt-2">Add at least one image to continue</p>
                  )}
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-ui font-semibold text-xl text-secondary mb-4">Review & Submit</h2>
                  <p className="text-sm text-gray-500 font-ui mb-6">Please review your property details before submitting</p>
                  <div className="bg-accent rounded-xl p-5 space-y-3 mb-6">
                    <div className="flex justify-between text-sm"><span className="font-ui text-gray-500">Name:</span><span className="font-ui text-secondary font-semibold">{formValues.name}</span></div>
                    <div className="flex justify-between text-sm"><span className="font-ui text-gray-500">Category:</span><span className="font-ui text-secondary">{formValues.category}</span></div>
                    <div className="flex justify-between text-sm"><span className="font-ui text-gray-500">Location:</span><span className="font-ui text-secondary">{formValues.city}, {formValues.country}</span></div>
                    <div className="flex justify-between text-sm"><span className="font-ui text-gray-500">Price:</span><span className="font-ui text-primary font-bold">${formValues.pricePerNight}/night</span></div>
                    <div className="flex justify-between text-sm"><span className="font-ui text-gray-500">Capacity:</span><span className="font-ui text-secondary">{formValues.bedrooms} bed / {formValues.bathrooms} bath / {formValues.maxGuests} guests</span></div>
                    <div className="flex justify-between text-sm"><span className="font-ui text-gray-500">Amenities:</span><span className="font-ui text-secondary">{selectedAmenities.length} selected</span></div>
                    <div className="flex justify-between text-sm"><span className="font-ui text-gray-500">Images:</span><span className="font-ui text-secondary">{images.length} uploaded</span></div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-ui font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Check className="w-5 h-5" /> Submit Property</>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 4 && (
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                {step > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={prevStep}
                    className="flex-1 border border-gray-200 text-secondary font-ui font-semibold py-3 rounded-xl hover:border-primary transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={nextStep}
                  className={`${step === 0 ? 'w-full' : 'flex-1'} bg-primary hover:bg-primary-dark text-white font-ui font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors`}
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}