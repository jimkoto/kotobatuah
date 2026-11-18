import React, { useState } from 'react';
import { Menu, X, User, ArrowUpRight, MessageCircle, Bot } from 'lucide-react';
import { OFFICIAL_LINKS } from '../data/socialLinks';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickAudit?: () => void;
  onOpenGemini?: () => void;
}

const DEVSTUDIO_TABS = new Set([
  'review',
  'cloudflare',
  'incubator',
  'optimizer',
  'tutorials',
  'advisor',
]);

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenGemini,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openDevStudio = () => {
    setIsMobileMenuOpen(false);
    if (!DEVSTUDIO_TABS.has(activeTab)) {
      setActiveTab('review');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setIsMobileMenuOpen(false);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDevStudioActive = DEVSTUDIO_TABS.has(activeTab);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#070610]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={goHome}
          className="inline-flex items-center gap-3 text-left group cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400 rounded-lg"
          aria-label="Beranda jimkoto.my.id"
        >
          <img
            src="/bio/assets/jim-koto-avatar-512.png"
            alt="Jim Koto"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/favicon.svg';
            }}
            className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
          />
          <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
            jimkoto<span className="text-amber-400">.my.id</span>
          </span>
        </button>

        {/* Zone 2: Simplified 5-link Navigation (aligned with live jimkoto.my.id) */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-slate-300"
        >
          <button
            type="button"
            onClick={() => scrollToSection('layanan')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-amber-400/70"
          >
            Layanan
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('filosofi')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-amber-400/70"
          >
            Filosofi
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('artikel-pilar')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-amber-400/70"
          >
            Build Log
          </button>
          <button
            type="button"
            onClick={openDevStudio}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b ${
              isDevStudioActive
                ? 'text-amber-300 border-amber-400'
                : 'border-transparent hover:text-white hover:border-amber-400/70'
            }`}
          >
            DevStudio
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('kontak')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-amber-400/70"
          >
            Kontak
          </button>
        </nav>

        {/* Zone 3: 1 Primary CTA + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={OFFICIAL_LINKS.bio}
            target="_blank"
            rel="noopener"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold whitespace-nowrap shrink-0 transition-colors"
            title="Buka Halaman Bio Resmi Jim Koto"
          >
            <User className="w-3.5 h-3.5" />
            <span>Official Bio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-amber-300" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0b0a16] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => scrollToSection('layanan')}
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left text-slate-100 cursor-pointer"
            >
              Layanan
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('filosofi')}
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left text-slate-100 cursor-pointer"
            >
              Filosofi
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('artikel-pilar')}
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left text-slate-100 cursor-pointer"
            >
              Build Log
            </button>
            <button
              type="button"
              onClick={openDevStudio}
              className={`p-3 rounded-lg border text-left cursor-pointer ${
                isDevStudioActive
                  ? 'bg-amber-400/15 border-amber-400/50 text-amber-300'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-100'
              }`}
            >
              DevStudio Hub
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('kontak')}
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left text-slate-100 cursor-pointer"
            >
              Kontak & Sosial
            </button>
            <a
              href={OFFICIAL_LINKS.bio}
              target="_blank"
              rel="noopener"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-amber-400 text-slate-950 font-bold flex items-center justify-between"
            >
              <span>Official Bio</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <a
              href={OFFICIAL_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WA Direct</span>
            </a>
            {onOpenGemini && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenGemini();
                }}
                className="p-2.5 rounded-lg bg-white/5 border border-white/15 text-slate-100 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                <span>Tanya AI</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
