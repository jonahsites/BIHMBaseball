import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Builder } from '@builder.io/react';

export const QuoteSection = ({
  quote = '"WHEN THE BODY STOPS, THE SPIRIT TAKES OVER."',
  backgroundColor = "bg-zinc-200",
}: {
  quote?: string;
  backgroundColor?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5]);

  return (
    <section ref={ref} className={`py-32 flex items-center justify-center ${backgroundColor} px-6 relative overflow-hidden`}>
      <motion.div 
        style={{ scale, opacity }}
        className="max-w-5xl text-center"
      >
        <h2 className="text-4xl md:text-7xl font-black leading-tight mb-8 italic text-black">
          {quote}
        </h2>
        <div className="w-24 h-1 bg-black mx-auto rounded-full" />
      </motion.div>
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-navy-900" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-32 bg-navy-900" />
      </div>
    </section>
  );
};

Builder.registerComponent(QuoteSection, {
  name: 'QuoteSection',
  inputs: [
    { name: 'quote', type: 'string', defaultValue: '"WHEN THE BODY STOPS, THE SPIRIT TAKES OVER."' },
    { name: 'backgroundColor', type: 'string', defaultValue: 'bg-zinc-200' },
  ],
});
