import React, { useState } from 'react';
import { Builder } from '@builder.io/react';
import { Loader2, Camera } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SectionReveal } from './common';
import { useFirebase } from '../../App';
import { db, handleFirestoreError, OperationType } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const PricingSection = ({
  badgeText = "Investment",
  title = "PRICING.",
  description = "Elite training for players who are serious about their development. Choose the path that fits your ambition.",
  plans = [
    {
      name: "Private",
      price: "55",
      features: ["1-on-1 Attention", "Customized Drills", "Performance Analysis", "Flexible Scheduling"],
      popular: false
    },
    {
      name: "Duo",
      price: "40",
      note: "each",
      features: ["2 Players", "Competitive Drills", "Tactical Focus", "Group Synergy"],
      popular: true
    },
    {
      name: "Small Group",
      price: "30",
      note: "each",
      features: ["3-5 Players", "Game Scenarios", "Team Dynamics", "High Intensity"],
      popular: false
    },
    {
      name: "Team Training",
      price: "20",
      note: "each",
      features: ["6-10 Players", "Tactical Intelligence", "Game Scenarios", "Team Chemistry"],
      popular: false
    }
  ],
  addonBadge = "Exclusive Add-on",
  addonTitle = "PHOTOSHOOT & VIDEO",
  addonDesc = "Capture your progress with professional media coverage of your session.",
  addonPrice = "+$30",
  addonNote = "Per Session",
  backgroundColor = "bg-zinc-200",
}: {
  badgeText?: string;
  title?: string;
  description?: string;
  plans?: { name: string, price: string, note?: string, features: string[], popular: boolean }[];
  addonBadge?: string;
  addonTitle?: string;
  addonDesc?: string;
  addonPrice?: string;
  addonNote?: string;
  backgroundColor?: string;
  key?: React.Key;
}) => {
  const { user, login } = useFirebase();
  const [bookingStatus, setBookingStatus] = useState<{ [key: string]: 'idle' | 'loading' | 'success' | 'error' }>({});

  const handleBook = async (planName: string) => {
    if (!user) {
      await login();
      return;
    }

    setBookingStatus(prev => ({ ...prev, [planName]: 'loading' }));
    try {
      await addDoc(collection(db, 'sessions'), {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        plan: planName,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setBookingStatus(prev => ({ ...prev, [planName]: 'success' }));
      setTimeout(() => setBookingStatus(prev => ({ ...prev, [planName]: 'idle' })), 3000);
    } catch (error) {
      console.error("Booking error:", error);
      setBookingStatus(prev => ({ ...prev, [planName]: 'error' }));
      handleFirestoreError(error, OperationType.WRITE, 'sessions');
    }
  };

  return (
    <section id="pricing" className={`relative py-32 px-6 ${backgroundColor} overflow-hidden`}>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-ice-blue/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ice-blue/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
      <div className="max-w-7xl mx-auto relative z-10">
            <SectionReveal className="text-center mb-24">
              <span className="text-black font-black uppercase tracking-[0.4em] text-xs mb-6 block">{badgeText}</span>
              <h2 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter text-black">PRICING.</h2>
          <p className="text-black/40 text-lg max-w-2xl mx-auto font-light">
            {description}
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, i) => (
            <SectionReveal key={i}>
              <div className={cn(
                "relative p-10 rounded-[3rem] transition-all duration-500 group border border-black/5 h-full flex flex-col",
                plan.popular ? "bg-ice-blue text-black shadow-2xl shadow-ice-blue/20" : "bg-gray-50 hover:bg-gray-100"
              )}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest border border-white/10">
                    Most Popular
                  </div>
                )}
                <h3 className={cn("text-2xl font-black mb-2 uppercase tracking-tight", plan.popular ? "text-black" : "text-black")}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black tracking-tighter">${plan.price}</span>
                  <span className={cn("text-sm font-medium opacity-50")}>{plan.note ? `/${plan.note}` : "/session"}</span>
                </div>
                <ul className="space-y-5 mb-10 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-medium">
                      <div className={cn("w-1.5 h-1.5 rounded-full", plan.popular ? "bg-black" : "bg-black")} />
                      <span className={plan.popular ? "text-black/70" : "text-black/70"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleBook(plan.name)}
                  disabled={bookingStatus[plan.name] === 'loading' || bookingStatus[plan.name] === 'success'}
                  className={cn(
                    "w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2",
                    plan.popular 
                      ? "bg-black text-white hover:bg-ice-blue hover:text-black" 
                      : "bg-black text-white hover:bg-ice-blue hover:text-black",
                    (bookingStatus[plan.name] === 'loading' || bookingStatus[plan.name] === 'success') && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {bookingStatus[plan.name] === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : bookingStatus[plan.name] === 'success' ? (
                    "Booked!"
                  ) : (
                    "Book Session"
                  )}
                </button>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="max-w-3xl mx-auto bg-gray-50 border border-black/5 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div>
                  <span className="text-black font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">{addonBadge}</span>
                  <h3 className="text-3xl font-black tracking-tighter text-black mb-2">{addonTitle}</h3>
                  <p className="text-black/40 font-light">{addonDesc}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="block text-4xl font-black text-black tracking-tighter">{addonPrice}</span>
                    <span className="text-[10px] uppercase tracking-widest text-black/30 font-black">{addonNote}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

Builder.registerComponent(PricingSection, {
  name: 'PricingSection',
  inputs: [
    { name: 'backgroundColor', type: 'string', defaultValue: 'bg-zinc-200' },
    { name: 'badgeText', type: 'string', defaultValue: "Investment" },
    { name: 'title', type: 'string', defaultValue: "PRICING." },
    { name: 'description', type: 'string', defaultValue: "Elite training for players who are serious about their development. Choose the path that fits your ambition." },
    {
      name: 'plans',
      type: 'list',
      subFields: [
        { name: 'name', type: 'string' },
        { name: 'price', type: 'string' },
        { name: 'note', type: 'string' },
        { name: 'features', type: 'list', subFields: [{ name: 'f', type: 'string' }] },
        { name: 'popular', type: 'boolean' },
      ],
      defaultValue: [
        {
          name: "Private",
          price: "55",
          features: [{ f: "1-on-1 Attention" }, { f: "Customized Drills" }, { f: "Performance Analysis" }, { f: "Flexible Scheduling" }],
          popular: false
        },
        {
          name: "Duo",
          price: "40",
          note: "each",
          features: [{ f: "2 Players" }, { f: "Competitive Drills" }, { f: "Tactical Focus" }, { f: "Group Synergy" }],
          popular: true
        },
        {
          name: "Small Group",
          price: "30",
          note: "each",
          features: [{ f: "3-5 Players" }, { f: "Game Scenarios" }, { f: "Team Dynamics" }, { f: "High Intensity" }],
          popular: false
        },
        {
          name: "Team Training",
          price: "20",
          note: "each",
          features: [{ f: "6-10 Players" }, { f: "Tactical Intelligence" }, { f: "Game Scenarios" }, { f: "Team Chemistry" }],
          popular: false
        }
      ],
    },
    { name: 'addonBadge', type: 'string', defaultValue: "Exclusive Add-on" },
    { name: 'addonTitle', type: 'string', defaultValue: "PHOTOSHOOT & VIDEO" },
    { name: 'addonDesc', type: 'string', defaultValue: "Capture your progress with professional media coverage of your session." },
    { name: 'addonPrice', type: 'string', defaultValue: "+$30" },
    { name: 'addonNote', type: 'string', defaultValue: "Per Session" },
  ],
});
