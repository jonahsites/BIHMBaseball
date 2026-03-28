import React from 'react';
import { Builder } from '@builder.io/react';
import { Instagram, Facebook } from 'lucide-react';

export const Footer = ({
  logo = "https://image2url.com/r2/default/images/1774365037875-84e3c176-201b-4629-9855-649c1718e3b2.png",
  description = "Elite soccer training for the next generation of athletes. Built on discipline, technique, and tactical intelligence.",
  navTitle = "Navigation",
  navItems = [
    { label: "About", href: "#about" },
    { label: "Training", href: "#training" },
    { label: "Pricing", href: "#pricing" },
    { label: "Locations", href: "#locations" },
    { label: "Contact", href: "#contact" }
  ],
  socialTitle = "Social",
  socials = [
    { icon: "instagram", href: "https://www.instagram.com/rex.soccer" },
    { icon: "facebook", href: "https://www.facebook.com/profile.php?id=61578792965551" }
  ],
  copyright = "© 2025 REX Soccer Training. All rights reserved.",
  links = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" }
  ],
  backgroundColor = "bg-zinc-300",
  backgroundImage = "https://image2url.com/r2/default/images/1774714416522-eec8f602-98bc-434b-81d1-599318ca2be0.png",
}: {
  logo?: string;
  description?: string;
  navTitle?: string;
  navItems?: { label: string, href: string }[];
  socialTitle?: string;
  socials?: { icon: string, href: string }[];
  copyright?: string;
  links?: { label: string, href: string }[];
  backgroundColor?: string;
  backgroundImage?: string;
}) => {
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'instagram': return <Instagram className="w-5 h-5 text-black/40 group-hover:text-white" />;
      case 'facebook': return <Facebook className="w-5 h-5 text-black/40 group-hover:text-white" />;
      default: return <Instagram className="w-5 h-5 text-black/40 group-hover:text-white" />;
    }
  };

  return (
    <footer className={`relative py-32 px-6 border-t border-black/5 ${backgroundColor} overflow-hidden`}>
      {/* Background Accent Image */}
      <img 
        src={backgroundImage}
        alt=""
        className="absolute bottom-0 right-0 w-96 md:w-[600px] opacity-10 pointer-events-none grayscale brightness-0 translate-x-1/6 translate-y-1/6"
        referrerPolicy="no-referrer"
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <img 
                src={logo} 
                alt="REX Logo" 
                className="h-10 md:h-12 brightness-0"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-black/30 text-lg font-light max-w-sm leading-relaxed">
              {description}
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black mb-8">{navTitle}</h4>
            <ul className="space-y-4">
              {navItems.map((item, i) => (
                <li key={i}>
                  <a 
                    href={item.href} 
                    className="text-sm text-black/40 hover:text-navy-900 transition-colors"
                    onClick={(e) => {
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent('changePage', { detail: 'home' }));
                        
                        setTimeout(() => {
                          const element = document.getElementById(item.href.replace('#', ''));
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                      }
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black mb-8">{socialTitle}</h4>
            <div className="flex gap-6">
              {socials.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center hover:bg-navy-900 transition-all group">
                  {getIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-black/20 text-[10px] uppercase tracking-[0.3em]">{copyright}</p>
          <div className="flex gap-12">
            {links.map((link, i) => (
              <a key={i} href={link.href} className="text-black/20 text-[10px] uppercase tracking-[0.3em] hover:text-black transition-colors">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

Builder.registerComponent(Footer, {
  name: 'Footer',
  inputs: [
    { name: 'backgroundColor', type: 'string', defaultValue: 'bg-zinc-300' },
    { name: 'backgroundImage', type: 'file', defaultValue: "https://image2url.com/r2/default/images/1774714416522-eec8f602-98bc-434b-81d1-599318ca2be0.png" },
    { name: 'logo', type: 'file', defaultValue: "https://image2url.com/r2/default/images/1774365037875-84e3c176-201b-4629-9855-649c1718e3b2.png" },
    { name: 'description', type: 'string', defaultValue: "Elite soccer training for the next generation of athletes. Built on discipline, technique, and tactical intelligence." },
    { name: 'navTitle', type: 'string', defaultValue: "Navigation" },
    {
      name: 'navItems',
      type: 'list',
      subFields: [
        { name: 'label', type: 'string' },
        { name: 'href', type: 'string' },
      ],
      defaultValue: [
        { label: "About", href: "#about" },
        { label: "Training", href: "#training" },
        { label: "Pricing", href: "#pricing" },
        { label: "Locations", href: "#locations" },
        { label: "Contact", href: "#contact" }
      ],
    },
    { name: 'socialTitle', type: 'string', defaultValue: "Social" },
    {
      name: 'socials',
      type: 'list',
      subFields: [
        { name: 'icon', type: 'string', enum: ['instagram', 'facebook'] },
        { name: 'href', type: 'string' },
      ],
      defaultValue: [
        { icon: "instagram", href: "https://www.instagram.com/rex.soccer" },
        { icon: "facebook", href: "https://www.facebook.com/profile.php?id=61578792965551" }
      ],
    },
    { name: 'copyright', type: 'string', defaultValue: "© 2025 REX Soccer Training. All rights reserved." },
    {
      name: 'links',
      type: 'list',
      subFields: [
        { name: 'label', type: 'string' },
        { name: 'href', type: 'string' },
      ],
      defaultValue: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" }
      ],
    },
  ],
});
