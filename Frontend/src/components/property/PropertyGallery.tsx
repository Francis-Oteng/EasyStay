import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import clsx from 'clsx';

interface PropertyGalleryProps {
  images: string[];
  alt?: string;
}

export function PropertyGallery({ images, alt = 'Property image' }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goTo = (index: number) => {
    setSelectedIndex(index);
  };

  const next = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden">
        <div
          className="col-span-2 row-span-2 cursor-pointer overflow-hidden"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={images[0]}
            alt={`${alt} - main`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        {images.slice(1, 5).map((img, i) => (
          <div
            key={i}
            className="cursor-pointer overflow-hidden"
            onClick={() => {
              goTo(i + 1);
              setLightboxOpen(true);
            }}
          >
            <img
              src={img}
              alt={`${alt} - ${i + 2}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={images[selectedIndex]}
              alt={`${alt} - ${selectedIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
            />

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={clsx(
                    'w-2.5 h-2.5 rounded-full transition-all',
                    i === selectedIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60',
                  )}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>

            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}