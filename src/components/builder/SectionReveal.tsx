import React from 'react';
import { motion } from 'motion/react';
import { Builder } from '@builder.io/react';

interface SectionRevealProps {
  children?: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
  key?: React.Key;
}

export const SectionReveal = ({ 
  children, 
  className,
  yOffset = 40,
  duration = 1
}: SectionRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: duration, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

Builder.registerComponent(SectionReveal, {
  name: 'SectionReveal',
  canHaveChildren: true,
  inputs: [
    { name: 'yOffset', type: 'number', defaultValue: 40 },
    { name: 'duration', type: 'number', defaultValue: 1 },
  ],
});
