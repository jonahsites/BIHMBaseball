import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Builder } from '@builder.io/react';

export const TeamPage = ({
  onBack = () => window.dispatchEvent(new CustomEvent('changePage', { detail: 'home' })),
  title = "The Team.",
  team = [
    { name: "Raza", role: "Founder & Head Coach", bio: "Former NCAA D1 player with international experience.", img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800" },
    { name: "Sarah Chen", role: "CEO", bio: "Strategic lead focusing on REX's expansion and vision.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
    { name: "Marcus Johnson", role: "Technical Director", bio: "Specialist in youth development and tactical analysis.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800" },
    { name: "Elena Rodriguez", role: "Goalkeeper Coach", bio: "Expert in shot-stopping and distribution techniques.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" },
  ],
  backgroundColor = "bg-zinc-300",
}: {
  onBack?: () => void;
  title?: string;
  team?: { name: string, role: string, bio: string, img: string }[];
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-100 rounded-[3rem] p-8 border border-black/5 group hover:bg-zinc-50 hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-2xl font-black text-black mb-2">{member.name}</h3>
              <p className="text-navy-900 text-[10px] font-black uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-black/40 text-sm font-medium leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

Builder.registerComponent(TeamPage, {
  name: 'TeamPage',
  inputs: [
    { name: 'backgroundColor', type: 'string', defaultValue: 'bg-zinc-300' },
    { name: 'title', type: 'string', defaultValue: "The Team." },
    {
      name: 'team',
      type: 'list',
      subFields: [
        { name: 'name', type: 'string' },
        { name: 'role', type: 'string' },
        { name: 'bio', type: 'string' },
        { name: 'img', type: 'file' },
      ],
      defaultValue: [
        { name: "Raza", role: "Founder & Head Coach", bio: "Former NCAA D1 player with international experience.", img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800" },
        { name: "Sarah Chen", role: "CEO", bio: "Strategic lead focusing on REX's expansion and vision.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
        { name: "Marcus Johnson", role: "Technical Director", bio: "Specialist in youth development and tactical analysis.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800" },
        { name: "Elena Rodriguez", role: "Goalkeeper Coach", bio: "Expert in shot-stopping and distribution techniques.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" },
      ],
    },
  ],
});
