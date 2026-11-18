import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Check, X, Settings } from 'lucide-react';

interface CookieBannerProps {
  onOpenCookiesModal: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenCookiesModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('jimkoto_cookie_consent');
    if (!consent) {
      // Delay showing slightly so user sees initial render smoothly
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('jimkoto_cookie_consent', 'accepted_all');
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('jimkoto_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      role="region"
      aria-label="Persetujuan Cookies"
      className="fixed bottom-4 left-4 sm:left-6 z-40 max-w-md w-[calc(100%-2rem)] sm:w-full bg-[#120826]/95 border border-white/20 rounded-2xl p-4 sm:p-5 text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-3 font-sans"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 border border-amber-400/30">
          <Cookie className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <div className="font-serif font-bold text-sm text-white flex items-center gap-2">
            <span>Privasi & Cookies Dinamis</span>
            <span className="text-[10px] px-2 py-0.2 bg-emerald-500/20 text-emerald-300 rounded mono">Secure Core</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Portal jimkoto.my.id hanya menggunakan cookies esensial dan local cache untuk performa sub-detik tanpa pelacak invasif.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={handleAcceptAll}
          className="flex-1 px-3 py-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-bold text-xs rounded-lg transition text-center cursor-pointer shadow-md"
        >
          Terima Semua
        </button>
        <button
          onClick={handleEssentialOnly}
          className="px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-200 text-xs rounded-lg transition cursor-pointer"
        >
          Hanya Esensial
        </button>
        <button
          onClick={onOpenCookiesModal}
          className="px-2.5 py-2 text-slate-400 hover:text-white text-xs mono transition cursor-pointer flex items-center gap-1"
          title="Buka Pengaturan Kebijakan Cookies"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Atur</span>
        </button>
      </div>
    </div>
  );
};
