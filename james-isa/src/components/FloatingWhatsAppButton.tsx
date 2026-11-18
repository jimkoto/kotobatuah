import React from 'react';
import { MessageCircle } from 'lucide-react';
import { OFFICIAL_LINKS } from '../data/socialLinks';

export const FloatingWhatsAppButton: React.FC = () => {
  return (
    <aside
      aria-label="Chat WhatsApp Jim Koto"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 select-none print:hidden"
    >
      <a
        href={OFFICIAL_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 bg-[#00e676] hover:bg-[#10f084] text-slate-950 rounded-full shadow-lg shadow-black/50 transition-transform duration-150 hover:scale-[1.02] font-bold text-xs sm:text-sm whitespace-nowrap"
        aria-label={`Chat WA ${OFFICIAL_LINKS.whatsappInternational}`}
        title={`Chat WA ${OFFICIAL_LINKS.whatsappInternational}`}
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span>Chat WA {OFFICIAL_LINKS.whatsappInternational}</span>
      </a>
    </aside>
  );
};
