import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Builder } from '@builder.io/react';
import { SectionReveal } from './common';

export const VisionPage = ({
  onBack = () => window.dispatchEvent(new CustomEvent('changePage', { detail: 'home' })),
  title = "Vision.",
  sections = [
    { title: "The Future of REX.", content: "Our vision is to become the premier destination for youth soccer development in the United States. We aren't just training players; we are building a community of elite athletes." },
    { title: "Expansion & Facilities.", content: "In the coming years, REX Soccer aims to open a state-of-the-art training facility, equipped with the latest technology in performance analysis and recovery. We plan to expand our reach across Florida and eventually nationwide." },
    { title: "Pro Pathway.", content: "We are committed to creating direct pathways for our players to reach professional levels, attracting scouts and professional partners who recognize the REX standard of excellence." }
  ],
  sketchfabUrl = "https://sketchfab.com/models/8688a932284747d0a3ddf4737c23bc86/embed?autostart=1&transparent=1&ui_controls=0&ui_infos=0&scrollwheel=0",
  backgroundColor = "bg-zinc-200",
}: {
  onBack?: () => void;
  title?: string;
  sections?: { title: string, content: string }[];
  sketchfabUrl?: string;
  backgroundColor?: string;
  key?: React.Key;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${backgroundColor} pt-40 pb-20 px-6 relative overflow-hidden`}
    >
      <div className="absolute top-[-25%] left-[75%] -translate-x-1/2 w-[160vw] h-[160vh] opacity-45 z-0">
        <div className="w-full h-full">
          <iframe 
            title="Training center" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; fullscreen; xr-spatial-tracking" 
            src={sketchfabUrl}
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <button onClick={onBack} className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-navy-900 transition-all">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
        </button>
        <h2 className="text-6xl md:text-9xl font-black mb-16 tracking-tighter text-black uppercase">{title}</h2>
        
        <div className="max-w-3xl space-y-12">
          {sections.map((section, i) => (
            <SectionReveal key={i}>
              <h3 className="text-3xl font-black text-black mb-6 uppercase">{section.title}</h3>
              <p className="text-black/60 text-xl font-medium leading-relaxed">
                {section.content}
              </p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

Builder.registerComponent(VisionPage, {
  name: 'VisionPage',
  inputs: [
    { name: 'backgroundColor', type: 'string', defaultValue: 'bg-zinc-200' },
    { name: 'title', type: 'string', defaultValue: "Vision." },
    {
      name: 'sections',
      type: 'list',
      subFields: [
        { name: 'title', type: 'string' },
        { name: 'content', type: 'string' },
      ],
      defaultValue: [
        { title: "The Future of REX.", content: "Our vision is to become the premier destination for youth soccer development in the United States. We aren't just training players; we are building a community of elite athletes." },
        { title: "Expansion & Facilities.", content: "In the coming years, REX Soccer aims to open a state-of-the-art training facility, equipped with the latest technology in performance analysis and recovery. We plan to expand our reach across Florida and eventually nationwide." },
        { title: "Pro Pathway.", content: "We are committed to creating direct pathways for our players to reach professional levels, attracting scouts and professional partners who recognize the REX standard of excellence." }
      ],
    },
    { name: 'sketchfabUrl', type: 'string', defaultValue: "https://sketchfab.com/models/8688a932284747d0a3ddf4737c23bc86/embed?autostart=1&transparent=1&ui_controls=0&ui_infos=0&scrollwheel=0" },
  ],
});
