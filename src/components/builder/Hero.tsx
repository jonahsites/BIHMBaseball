import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Builder } from '@builder.io/react';

export const Hero = ({
  backgroundImage = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000",
  badgeText = "Raza Elite Xperience",
  rLogo = "https://image2url.com/r2/default/images/1774365332136-abfdbeec-2f4c-4764-b03d-28d5f258f9d0.png",
  soccerBall = "https://pngimg.com/uploads/football/football_PNG52789.png",
  xLogo = "https://image2url.com/r2/default/images/1774365460719-25193da0-b4be-4342-bcd6-7d809edf0367.png",
  mainTitle = "REX SOCCER",
  subtext = "FIXING THE U.S YOUTH SOCCER SYSTEM.",
  cta1Text = "Book Training",
  cta2Text = "Our Mission",
}: {
  backgroundImage?: string;
  badgeText?: string;
  rLogo?: string;
  soccerBall?: string;
  xLogo?: string;
  mainTitle?: string;
  subtext?: string;
  cta1Text?: string;
  cta2Text?: string;
}) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const rexX = useTransform(scrollYProgress, [0, 1], [isMobile ? -80 : -300, isMobile ? -250 : -700]);
  const soccerX = useTransform(scrollYProgress, [0, 1], [isMobile ? 80 : 250, isMobile ? 250 : 650]);
  const ballRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const ballScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-start justify-center overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <motion.div 
          style={{ scale, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-white/90 z-10" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ice-blue/5 to-transparent z-[5]" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-ice-blue/10 blur-[120px] rounded-full z-[5]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-ice-blue/10 blur-[120px] rounded-full z-[5]" />
          <img 
            src={backgroundImage} 
            alt="Soccer Field"
            className="w-full h-full object-cover grayscale opacity-10"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-30 text-center px-6 w-full">
          <motion.div style={{ y, opacity }}>
            <div className="absolute inset-0 z-[-1] opacity-[0.08] grayscale pointer-events-none overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-[110%] h-[110%] -translate-x-5 -translate-y-5">
                <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1518091043644-c1d445bcc97a?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-black bg-black/10 px-6 py-3 rounded-full border border-black/20">
                {badgeText}
              </span>
            </motion.div>
            
            <div className="relative flex items-center justify-center mb-12 h-48 md:h-80">
              <motion.div 
                style={{ x: rexX }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute z-11 select-none w-[140px] md:w-[300px] opacity-20 top-12 md:top-11.75 md:ml-69"
              >
                <img 
                  src={rLogo} 
                  alt="R Logo" 
                  className="w-full h-auto brightness-0"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <motion.div 
                style={{ rotate: ballRotate, scale: ballScale }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                className="hidden relative z-20 w-32 h-32 md:w-64 md:h-64 mx-16 top-5"
              >
                <div className="absolute inset-0 bg-navy-900/10 blur-3xl rounded-full" />
                <img 
                  src={soccerBall} 
                  alt="Soccer Ball"
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_50px_rgba(0,8,20,0.1)]"
                  referrerPolicy="no-referrer"
                />
              </motion.div> 

              <motion.div 
                style={{ x: soccerX }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute z-10 select-none w-[140px] md:w-[300px] top-16 md:top-20 md:-ml-60"
              >
                <img 
                  src={xLogo} 
                  alt="X Logo" 
                  className="w-full h-auto brightness-0"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="max-w-2xl mx-auto text-ice-blue text-sm md:text-xl font-black mb-2 uppercase tracking-[0.2em]"
            >
              {mainTitle}
            </motion.p>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="max-w-2xl mx-auto text-black/40 text-[10px] md:text-xs font-black mb-12 leading-relaxed uppercase tracking-[0.4em]"
            >
              {subtext}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-ice-blue text-black px-12 py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-ice-blue/20"
              >
                {cta1Text}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.dispatchEvent(new CustomEvent('changePage', { detail: 'vision' }))}
                className="border border-black/10 px-12 py-5 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all text-black"
              >
                {cta2Text} <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-navy-900 to-transparent" />
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-black/20">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
};

Builder.registerComponent(Hero, {
  name: 'Hero',
  inputs: [
    { name: 'backgroundImage', type: 'file', defaultValue: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000" },
    { name: 'badgeText', type: 'string', defaultValue: "Raza Elite Xperience" },
    { name: 'rLogo', type: 'file', defaultValue: "https://image2url.com/r2/default/images/1774365332136-abfdbeec-2f4c-4764-b03d-28d5f258f9d0.png" },
    { name: 'soccerBall', type: 'file', defaultValue: "https://pngimg.com/uploads/football/football_PNG52789.png" },
    { name: 'xLogo', type: 'file', defaultValue: "https://image2url.com/r2/default/images/1774365460719-25193da0-b4be-4342-bcd6-7d809edf0367.png" },
    { name: 'mainTitle', type: 'string', defaultValue: "REX SOCCER" },
    { name: 'subtext', type: 'string', defaultValue: "FIXING THE U.S YOUTH SOCCER SYSTEM." },
    { name: 'cta1Text', type: 'string', defaultValue: "Book Training" },
    { name: 'cta2Text', type: 'string', defaultValue: "Our Mission" },
  ],
});
