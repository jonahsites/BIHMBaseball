import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Builder } from '@builder.io/react';

export const PhotosPage = ({
  onBack = () => window.dispatchEvent(new CustomEvent('changePage', { detail: 'home' })),
  title = "Photos.",
  photos = [
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1560272564-c83d66b1ad12?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1518091043644-c1d445bcc97a?auto=format&fit=crop&q=80&w=800",
  ],
  backgroundColor = "bg-zinc-200",
}: {
  onBack?: () => void;
  title?: string;
  photos?: string[];
  backgroundColor?: string;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${backgroundColor} pt-40 pb-20 px-6`}
    >
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-navy-900 transition-all">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
        </button>
        <h2 className="text-6xl md:text-9xl font-black mb-16 tracking-tighter text-black uppercase">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-black/5"
            >
              <img src={src} alt={`Soccer ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

Builder.registerComponent(PhotosPage, {
  name: 'PhotosPage',
  inputs: [
    { name: 'backgroundColor', type: 'string', defaultValue: 'bg-zinc-200' },
    { name: 'title', type: 'string', defaultValue: "Photos." },
    { name: 'photos', type: 'list', subFields: [{ name: 'src', type: 'file' }], defaultValue: [
      { src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800" },
      { src: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800" },
      { src: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800" },
      { src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800" },
      { src: "https://images.unsplash.com/photo-1560272564-c83d66b1ad12?auto=format&fit=crop&q=80&w=800" },
      { src: "https://images.unsplash.com/photo-1518091043644-c1d445bcc97a?auto=format&fit=crop&q=80&w=800" },
    ] },
  ],
});
