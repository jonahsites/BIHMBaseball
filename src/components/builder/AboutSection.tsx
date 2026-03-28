import React from 'react';
import { Builder } from '@builder.io/react';
import { SectionReveal } from './common';

export const AboutSection = ({
  badgeText = "Coach Raza",
  title = "TRAIN HARD.<br />PLAY SMART.",
  paragraphs = [
    "I'm Raza, founder of REX Soccer. Soccer has been my life since age 4 and has taken me around the world, from NCAA Division 1 soccer to training with the U20 Panama National Team.",
    "REX is built to help players improve with intention. Every session is designed to strengthen technique, tactical awareness, speed, conditioning, and discipline."
  ],
  stats = [
    { value: "20+", label: "Years Experience" },
    { value: "Elite", label: "Standards" }
  ],
  image = "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1000",
  secondaryImage = "https://image2url.com/r2/default/images/1774626482122-2079f441-33f7-49f4-a452-575f1fe1f1d4.png",
  missionBadge = "The Mission",
  missionText = "Unlock your true potential through elite, intentional experience.",
  backgroundColor = "bg-zinc-300",
}: {
  badgeText?: string;
  title?: string;
  paragraphs?: string[];
  stats?: { value: string, label: string }[];
  image?: string;
  secondaryImage?: string;
  missionBadge?: string;
  missionText?: string;
  backgroundColor?: string;
}) => {
  return (
    <section id="about" className={`relative py-20 px-6 overflow-hidden ${backgroundColor}`}>
      <div className="absolute top-0 left-0 w-96 h-96 bg-ice-blue/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
        {secondaryImage && (
          <div className="absolute -top-20 -right-20 w-64 h-64 opacity-10 pointer-events-none z-0">
            <img src={secondaryImage} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
        )}
        <SectionReveal>
              <div className="relative">
                <span className="text-black font-black uppercase tracking-widest text-xs mb-6 block">{badgeText}</span>
                <h2 
                  className="text-5xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter text-black"
                >
                  TRAIN <span className="text-ice-blue">HARD.</span><br />PLAY <span className="text-ice-blue">SMART.</span>
                </h2>
            <div className="space-y-8 text-black/50 text-lg font-light leading-relaxed max-w-lg">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            
            <div className="mt-16 flex gap-12">
              {stats.map((stat, i) => (
                <div key={i}>
                  <span className="block text-5xl font-black text-black mb-1">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="relative">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-100 border border-black/5 p-3 shadow-sm">
            <div className="absolute inset-0 bg-gray-200 z-0" />
            <img 
              src={image} 
              alt="Coach Raza"
              className="w-full h-full object-cover rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-12 left-12 right-12 z-20">
              <div className="bg-white/80 px-8 py-6 rounded-[2rem] backdrop-blur-3xl border border-black/5 shadow-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black mb-2">{missionBadge}</p>
                <p className="text-lg font-medium leading-snug text-black">{missionText}</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

Builder.registerComponent(AboutSection, {
  name: 'AboutSection',
  inputs: [
    { name: 'backgroundColor', type: 'string', defaultValue: 'bg-zinc-300' },
    { name: 'badgeText', type: 'string', defaultValue: "Coach Raza" },
    { name: 'title', type: 'string', defaultValue: "TRAIN HARD.<br />PLAY SMART." },
    { name: 'paragraphs', type: 'list', subFields: [{ name: 'p', type: 'string' }], defaultValue: [
      { p: "I'm Raza, founder of REX Soccer. Soccer has been my life since age 4 and has taken me around the world, from NCAA Division 1 soccer to training with the U20 Panama National Team." },
      { p: "REX is built to help players improve with intention. Every session is designed to strengthen technique, tactical awareness, speed, conditioning, and discipline." }
    ] },
    { name: 'stats', type: 'list', subFields: [{ name: 'value', type: 'string' }, { name: 'label', type: 'string' }], defaultValue: [
      { value: "20+", label: "Years Experience" },
      { value: "Elite", label: "Standards" }
    ] },
    { name: 'image', type: 'file', defaultValue: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1000" },
    { name: 'secondaryImage', type: 'file', defaultValue: "https://image2url.com/r2/default/images/1774626482122-2079f441-33f7-49f4-a452-575f1fe1f1d4.png" },
    { name: 'missionBadge', type: 'string', defaultValue: "The Mission" },
    { name: 'missionText', type: 'string', defaultValue: "Unlock your true potential through elite, intentional experience." },
  ],
});
