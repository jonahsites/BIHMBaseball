import React, { useState } from 'react';
import { Builder } from '@builder.io/react';
import { Mail, Instagram, Facebook, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SectionReveal } from './common';
import { db, handleFirestoreError, OperationType } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const ContactSection = ({
  badgeText = "Get Started",
  title = "READY TO<br />LEVEL UP?",
  description = "Take the first step towards elite performance. Contact us to schedule your first session or ask any questions.",
  contactMethods = [
    { icon: 'mail', label: "Email Us", value: "info.rexsoccer@gmail.com", href: "mailto:info.rexsoccer@gmail.com" },
    { icon: 'instagram', label: "Follow Us", value: "@rex.soccer", href: "https://www.instagram.com/rex.soccer" },
    { icon: 'facebook', label: "Facebook", value: "REX Soccer", href: "https://www.facebook.com/profile.php?id=61578792965551" }
  ],
  formNameLabel = "Full Name",
  formEmailLabel = "Email Address",
  formMessageLabel = "Your Message",
  formSubmitText = "Send Message",
  backgroundColor = "bg-zinc-200",
}: {
  badgeText?: string;
  title?: string;
  description?: string;
  contactMethods?: { icon: string, label: string, value: string, href: string }[];
  formNameLabel?: string;
  formEmailLabel?: string;
  formMessageLabel?: string;
  formSubmitText?: string;
  backgroundColor?: string;
}) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus('error');
      handleFirestoreError(error, OperationType.WRITE, 'contact_messages');
    }
  };

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'mail': return <Mail className="w-6 h-6 text-black group-hover:text-black" />;
      case 'instagram': return <Instagram className="w-6 h-6 text-black group-hover:text-black" />;
      case 'facebook': return <Facebook className="w-6 h-6 text-black group-hover:text-black" />;
      default: return <Mail className="w-6 h-6 text-black group-hover:text-black" />;
    }
  };

  return (
    <section id="contact" className={`relative py-32 px-6 ${backgroundColor} overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          <SectionReveal>
            <span className="text-black font-black uppercase tracking-[0.4em] text-xs mb-6 block">{badgeText}</span>
            <h2 
              className="text-6xl md:text-9xl font-black mb-10 leading-[0.85] tracking-tighter text-black"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p className="text-black/40 text-xl font-light mb-12 max-w-md leading-relaxed">
              {description}
            </p>
            
            <div className="space-y-8">
              {contactMethods.map((method, i) => (
                <a 
                  key={i} 
                  href={method.href} 
                  target={method.icon === 'mail' ? undefined : "_blank"} 
                  rel={method.icon === 'mail' ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-ice-blue transition-colors duration-500">
                    {getIcon(method.icon)}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-1">{method.label}</p>
                    <p className="text-xl font-bold text-black">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal>
            <form onSubmit={handleSubmit} className="bg-gray-50 p-12 rounded-[3rem] border border-black/5 relative z-10 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">{formNameLabel}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full bg-white border border-black/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-ice-blue transition-all placeholder:text-black/10 text-black"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">{formEmailLabel}</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full bg-white border border-black/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-ice-blue transition-all placeholder:text-black/10 text-black"
                  />
                </div>
              </div>
              <div className="space-y-3 mb-10">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">{formMessageLabel}</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us about your goals..."
                  className="w-full bg-white border border-black/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-ice-blue transition-all resize-none placeholder:text-black/10 text-black"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={cn(
                  "w-full py-6 bg-black text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:bg-ice-blue hover:text-black transition-all duration-500 shadow-2xl shadow-black/5 flex items-center justify-center gap-3",
                  (status === 'loading' || status === 'success') && "opacity-70 cursor-not-allowed"
                )}
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === 'success' ? (
                  "Message Sent!"
                ) : (
                  formSubmitText
                )}
              </button>
              {status === 'error' && (
                <p className="mt-4 text-center text-xs font-bold text-red-500 uppercase tracking-widest">
                  Error sending message. Please try again.
                </p>
              )}
            </form>
          </SectionReveal>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 text-[20rem] font-black text-black/[0.02] select-none pointer-events-none uppercase leading-none translate-y-1/2">
        ELITE
      </div>
    </section>
  );
};

Builder.registerComponent(ContactSection, {
  name: 'ContactSection',
  inputs: [
    { name: 'backgroundColor', type: 'string', defaultValue: 'bg-zinc-200' },
    { name: 'badgeText', type: 'string', defaultValue: "Get Started" },
    { name: 'title', type: 'string', defaultValue: "READY TO<br />LEVEL UP?" },
    { name: 'description', type: 'string', defaultValue: "Take the first step towards elite performance. Contact us to schedule your first session or ask any questions." },
    {
      name: 'contactMethods',
      type: 'list',
      subFields: [
        { name: 'icon', type: 'string', enum: ['mail', 'instagram', 'facebook'] },
        { name: 'label', type: 'string' },
        { name: 'value', type: 'string' },
        { name: 'href', type: 'string' },
      ],
      defaultValue: [
        { icon: 'mail', label: "Email Us", value: "info.rexsoccer@gmail.com", href: "mailto:info.rexsoccer@gmail.com" },
        { icon: 'instagram', label: "Follow Us", value: "@rex.soccer", href: "https://www.instagram.com/rex.soccer" },
        { icon: 'facebook', label: "Facebook", value: "REX Soccer", href: "https://www.facebook.com/profile.php?id=61578792965551" }
      ],
    },
    { name: 'formNameLabel', type: 'string', defaultValue: "Full Name" },
    { name: 'formEmailLabel', type: 'string', defaultValue: "Email Address" },
    { name: 'formMessageLabel', type: 'string', defaultValue: "Your Message" },
    { name: 'formSubmitText', type: 'string', defaultValue: "Send Message" },
  ],
});
