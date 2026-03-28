import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LogOut, User as UserIcon, Loader2 } from 'lucide-react';
import { Builder } from '@builder.io/react';
import { cn } from '../../lib/utils';
import { useFirebase } from '../../App';

export const Navbar = ({
  logo = "https://image2url.com/r2/default/images/1774365037875-84e3c176-201b-4629-9855-649c1718e3b2.png",
  navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Locations', href: '#locations' },
    { name: 'Photos', href: '#photos', isPage: true },
    { name: 'The Team', href: '#team', isPage: true },
    { name: 'Merch', href: '#merch', isPage: true },
    { name: 'Contact', href: '#contact' },
  ],
  ctaText = "Book Now",
}: {
  logo?: string;
  navLinks?: { name: string, href: string, isPage?: boolean }[];
  ctaText?: string;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, login, logout } = useFirebase();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 py-8",
      isScrolled ? "bg-zinc-200/80 backdrop-blur-2xl py-5 border-b border-black/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src={logo} 
            alt="REX Logo" 
            className="h-8 md:h-10 brightness-0"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-navy-900 transition-all"
              onClick={(e) => {
                if (link.isPage) {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('changePage', { detail: link.name.toLowerCase().replace(' ', '') }));
                } else if (link.href.startsWith('#')) {
                  // If we're not on home page, switch to home first
                  const isHomePage = !['photos', 'team', 'merch', 'vision'].includes(window.location.hash.replace('#', '')) && 
                                   document.querySelector('main') !== null;
                  
                  // We can check the current page state if we pass it as a prop, 
                  // but we can also just dispatch the event to switch to home.
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('changePage', { detail: 'home' }));
                  
                  // Wait for the home page to render, then scroll
                  setTimeout(() => {
                    const element = document.getElementById(link.href.replace('#', ''));
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }
              }}
            >
              {link.name}
            </motion.a>
          ))}
          
          <div className="flex items-center gap-6">
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-black/20" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-black uppercase tracking-widest text-black/40">Logged in as</span>
                  <span className="text-[10px] font-bold text-black">{user.displayName || user.email}</span>
                </div>
                <button 
                  onClick={() => logout()}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors text-black/40 hover:text-navy-900"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => login()}
                className="text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-navy-900 transition-all flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" /> Login
              </button>
            )}

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('pricing');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.dispatchEvent(new CustomEvent('changePage', { detail: 'home' }));
                  setTimeout(() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="bg-ice-blue text-black px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-ice-blue/90 transition-all duration-500 shadow-2xl shadow-ice-blue/10"
            >
              {ctaText}
            </motion.button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-black/5 mt-4 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (link.isPage) {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('changePage', { detail: link.name.toLowerCase().replace(' ', '') }));
                    } else if (link.href.startsWith('#')) {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('changePage', { detail: 'home' }));
                      setTimeout(() => {
                        const element = document.getElementById(link.href.replace('#', ''));
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                  className="text-lg font-bold uppercase tracking-tighter text-black/80"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-black/5">
                {user ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-black">{user.displayName || user.email}</span>
                    <button onClick={() => logout()} className="text-xs font-black uppercase tracking-widest text-navy-900">Logout</button>
                  </div>
                ) : (
                  <button onClick={() => login()} className="text-lg font-bold uppercase tracking-tighter text-black/80">Login</button>
                )}
              </div>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const element = document.getElementById('pricing');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.dispatchEvent(new CustomEvent('changePage', { detail: 'home' }));
                    setTimeout(() => {
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="bg-black text-white w-full py-4 rounded-xl font-black uppercase tracking-widest"
              >
                Book Training
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

Builder.registerComponent(Navbar, {
  name: 'Navbar',
  inputs: [
    { name: 'logo', type: 'file', defaultValue: "https://image2url.com/r2/default/images/1774365037875-84e3c176-201b-4629-9855-649c1718e3b2.png" },
    {
      name: 'navLinks',
      type: 'list',
      subFields: [
        { name: 'name', type: 'string' },
        { name: 'href', type: 'string' },
        { name: 'isPage', type: 'boolean' },
      ],
      defaultValue: [
        { name: 'About', href: '#about' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Locations', href: '#locations' },
        { name: 'Photos', href: '#photos', isPage: true },
        { name: 'The Team', href: '#team', isPage: true },
        { name: 'Merch', href: '#merch', isPage: true },
        { name: 'Contact', href: '#contact' },
      ],
    },
    { name: 'ctaText', type: 'string', defaultValue: "Book Now" },
  ],
});
