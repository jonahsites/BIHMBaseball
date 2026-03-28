import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Builder } from '@builder.io/react';

export const MerchPage = ({
  onBack = () => window.dispatchEvent(new CustomEvent('changePage', { detail: 'home' })),
  title = "Coming Soon.",
  subtitle = "REX Soccer Merch Store",
  backgroundColor = "bg-zinc-300",
}: {
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${backgroundColor} flex items-center justify-center px-6`}
    >
      <div className="text-center">
        <button onClick={onBack} className="mb-12 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-navy-900 transition-all">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
        </button>
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-black uppercase mb-4">{title}</h2>
        <p className="text-navy-900 font-black uppercase tracking-[0.4em] text-xs">{subtitle}</p>
      </div>
    </motion.div>
  );
};

Builder.registerComponent(MerchPage, {
  name: 'MerchPage',
  inputs: [
    { name: 'backgroundColor', type: 'string', defaultValue: 'bg-zinc-300' },
    { name: 'title', type: 'string', defaultValue: "Coming Soon." },
    { name: 'subtitle', type: 'string', defaultValue: "REX Soccer Merch Store" },
  ],
});
