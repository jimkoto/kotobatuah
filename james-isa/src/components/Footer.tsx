import React from 'react';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { OFFICIAL_LINKS, OFFICIAL_SOCIAL_ACCOUNTS } from '../data/socialLinks';
import { LegalModalType } from './LegalModals';

interface FooterProps {
  onOpenLegalModal?: (type: LegalModalType) => void;
  onNavigate?: (tabId: string) => void;
}

const renderSocialIcon = (id: string) => {
  switch (id) {
    case 'facebook':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'threads':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'github':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case 'whatsapp':
    case 'chat':
    default:
      return <MessageCircle className="w-4 h-4" />;
  }
};

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal, onNavigate }) => {
  const scrollToSection = (sectionId: string) => {
    if (onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="kontak"
      className="w-full bg-[#070610]/95 text-slate-300 border-t border-white/10 pt-14 pb-12 mt-12 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 3-Column Footer matching live jimkoto.my.id */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Column 1: Brand Identity & Location */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/bio/assets/jim-koto-avatar-512.png"
                alt="Jim Koto"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/favicon.svg';
                }}
                className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
              />
              <div>
                <div className="text-base font-bold text-white tracking-tight">
                  jimkoto<span className="text-amber-400">.my.id</span>
                </div>
                <div className="text-[11px] mono text-slate-400">
                  Jim Koto (James Isa) · Founder Akomoda Network
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed space-y-1">
              <p>© 2026 Jim Koto (James Isa) · Akomoda Network · Koto Batuah Synergizing The Future</p>
              <p className="mono text-[11px]">Tangerang Selatan, Banten · -6.2886, 106.7179</p>
              <p className="text-slate-300 pt-1">Mesin untuk Efisiensi. Manusia untuk Makna.</p>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <div className="text-xs font-semibold text-white">Koto Batuah</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The core pillar of digital infrastructure integrating communities, intelligent technology, and accountable asset management.
              </p>
            </div>
          </div>

          {/* Column 2: Layanan & Ekosistem */}
          <div className="md:col-span-3 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Layanan</h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('layanan')}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    Webmaster &amp; Maintenance
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('layanan')}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    SEO, GEO &amp; E-E-A-T
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('layanan')}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    Arsitektur Serverless
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('review')}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    DevStudio Workbench
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Ekosistem</h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <a
                    href={OFFICIAL_LINKS.bio}
                    target="_blank"
                    rel="noopener"
                    className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 text-amber-300 font-semibold"
                  >
                    <span>Official Bio (/bio)</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href={OFFICIAL_LINKS.akomoda}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Akomoda Network
                  </a>
                </li>
                <li>
                  <a
                    href={OFFICIAL_LINKS.kotobatuah}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Koto Batuah
                  </a>
                </li>
                <li>
                  <a
                    href={OFFICIAL_LINKS.hostinger}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Rekomendasi Hosting (Hostinger)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Connect · Social Media Utama (100% Real Verified Accounts) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Connect · Social Media Utama
              </h3>
              <a
                href={OFFICIAL_LINKS.email}
                className="text-xs mono text-slate-300 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{OFFICIAL_LINKS.emailDisplay}</span>
              </a>
            </div>

            {/* Verified Icon Grid */}
            <div className="flex flex-wrap items-center gap-2.5">
              {OFFICIAL_SOCIAL_ACCOUNTS.map((acc) => (
                <a
                  key={acc.id}
                  href={acc.href}
                  target="_blank"
                  rel="noreferrer"
                  title={`${acc.label}: ${acc.handle}`}
                  aria-label={`${acc.label} - ${acc.handle}`}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${acc.badgeBg} ${acc.badgeText}`}
                >
                  {renderSocialIcon(acc.id)}
                </a>
              ))}
            </div>

            {/* Readable Account Directory (replacing old #PLACEHOLDER# lines) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-2 text-xs mono">
              {OFFICIAL_SOCIAL_ACCOUNTS.map((acc) => (
                <a
                  key={acc.id}
                  href={acc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between py-1 border-b border-white/5 text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="text-slate-300 font-semibold">{acc.label}</span>
                  <span className="truncate max-w-[160px] group-hover:text-amber-300 transition-colors">
                    {acc.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Meta Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] mono text-slate-400">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <button
              type="button"
              onClick={() => onOpenLegalModal?.('tos')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => onOpenLegalModal?.('disclaimer')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Disclaimers
            </button>
            <button
              type="button"
              onClick={() => onOpenLegalModal?.('privacy')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegalModal?.('cookies')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Cookies
            </button>
            <button
              type="button"
              onClick={() => onOpenLegalModal?.('sitemap')}
              className="hover:text-amber-300 transition-colors cursor-pointer text-slate-300"
            >
              Sitemap
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span>Cloudflare Edge Ready</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-300 font-medium">jimkoto.my.id</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
