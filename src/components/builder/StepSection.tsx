import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Builder } from '@builder.io/react';

export const StepSection = ({
  steps = [
    {
      id: "01",
      title: "Technical Mastery",
      desc: "Precision ball control and elite technique development.",
      img: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "02",
      title: "Tactical Intelligence",
      desc: "Game awareness, positioning, and strategic decision making.",
      img: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "03",
      title: "Elite Conditioning",
      desc: "High-performance speed, strength, and agility training.",
      img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800"
    }
  ],
  backgroundColor = "bg-zinc-300",
}: {
  steps?: { id: string, title: string, desc: string, img: string }[];
  backgroundColor?: string;
}) => {
  return (
    <section className={`py-20 px-6 ${backgroundColor} relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-ice-blue/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="relative group"
            >
              <div className="relative z-10 bg-gray-200/50 border border-black/5 shadow-sm rounded-[2rem] overflow-hidden p-8 hover:bg-gray-200 hover:shadow-xl hover:border-ice-blue/20 transition-all duration-500">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-4xl font-black text-black/10 group-hover:text-ice-blue transition-colors">{step.id}</span>
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-ice-blue group-hover:text-black group-hover:border-ice-blue transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight text-black">{step.title}</h3>
                <p className="text-black/40 text-sm leading-relaxed mb-8">{step.desc}</p>
                <div className="aspect-video rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

Builder.registerComponent(StepSection, {
  name: 'StepSection',
  inputs: [
    { name: 'backgroundColor', type: 'string', defaultValue: 'bg-zinc-300' },
    {
      name: 'steps',
      type: 'list',
      subFields: [
        { name: 'id', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'desc', type: 'string' },
        { name: 'img', type: 'file' },
      ],
      defaultValue: [
        {
          id: "01",
          title: "Technical Mastery",
          desc: "Precision ball control and elite technique development.",
          img: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: "02",
          title: "Tactical Intelligence",
          desc: "Game awareness, positioning, and strategic decision making.",
          img: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: "03",
          title: "Elite Conditioning",
          desc: "High-performance speed, strength, and agility training.",
          img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800"
        }
      ],
    },
  ],
});
