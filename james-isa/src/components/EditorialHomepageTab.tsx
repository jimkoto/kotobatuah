import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Code2,
  Cpu,
  LayoutGrid,
  MessageCircle,
  ShieldCheck,
  Terminal,
  User,
} from 'lucide-react';
import { OFFICIAL_LINKS } from '../data/socialLinks';
import { PillarArticlesSection } from './PillarArticlesSection';

interface EditorialHomepageTabProps {
  onNavigate: (tabId: string) => void;
  initialSlug?: string;
}

export const EditorialHomepageTab: React.FC<EditorialHomepageTabProps> = ({
  onNavigate,
  initialSlug,
}) => {
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* ===================================================================== */}
      {/* 1. HERO SECTION: SYNERGIZED WITH LIVE JIMKOTO.MY.ID GRID BLUEPRINT    */}
      {/* ===================================================================== */}
      <section className="pt-2 sm:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Hero Value Proposition & Direct Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <p className="mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Webmaster · SEO / SEM · Serverless Architecture · Koto Batuah
              </p>

              <h1 className="text-[clamp(2.25rem,4.3vw,3.75rem)] font-extrabold tracking-tight leading-[1.06] text-white">
                Infrastruktur yang bekerja di balik layar, bukan di depan pengunjung.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Saya <span className="text-white font-semibold">Jim Koto (James Isa)</span>. Saya merancang dan merawat situs web serta sistem di baliknya — dari optimasi SEO/SEM sampai arsitektur serverless yang menjaga kredensial tetap di server, bukan di browser siapa pun. Founder{' '}
                <a
                  href={OFFICIAL_LINKS.akomoda}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-300 hover:underline"
                >
                  Akomoda Network
                </a>{' '}
                &amp;{' '}
                <a
                  href={OFFICIAL_LINKS.kotobatuah}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-300 hover:underline"
                >
                  Koto Batuah
                </a>{' '}
                — Synergizing The Future.
              </p>
            </div>

            <div className="space-y-6">
              {/* Primary CTA + Clean Secondary Action Links */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={OFFICIAL_LINKS.chat}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>Diskusikan Proyek Anda</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={OFFICIAL_LINKS.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-lg bg-[#0d0c1a]/90 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white text-xs font-semibold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <span>FB Page: Jim Koto</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href={OFFICIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-lg bg-[#0d0c1a]/90 hover:bg-emerald-500/15 border border-white/15 hover:border-emerald-400/40 text-emerald-300 text-xs font-semibold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WA Direct {OFFICIAL_LINKS.whatsappDisplay}</span>
                </a>

                <a
                  href={OFFICIAL_LINKS.bio}
                  target="_blank"
                  rel="noopener"
                  className="px-4 py-3 rounded-lg bg-[#0d0c1a]/90 hover:bg-amber-400/10 border border-white/15 hover:border-amber-400/40 text-amber-300 text-xs font-semibold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Official Bio</span>
                </a>
              </div>

              {/* Clean Regional & Philosophy Line */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs mono text-slate-400">
                <span>Tangerang Selatan, Banten · -6.2886, 106.7179</span>
                <span className="text-slate-600 hidden sm:inline">/</span>
                <span className="text-slate-300">Mesin untuk Efisiensi. Manusia untuk Makna.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Alur Data Architecture Diagram (from Live jimkoto.my.id) */}
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-xl border border-white/15 bg-[#0d0c1a]/95 p-6 flex flex-col justify-between space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="mono text-[11px] uppercase tracking-widest text-slate-400">
                  Alur Data — Satu Permintaan Halaman
                </span>
                <span className="mono text-[11px] text-amber-300">Hybrid Source</span>
              </div>

              <div className="space-y-3">
                {/* Step 01 */}
                <div className="p-4 rounded-lg border border-white/10 bg-[#070610]/80 space-y-1">
                  <div className="mono text-[11px] text-slate-400 uppercase">01. Browser</div>
                  <div className="text-sm font-bold text-white mono">
                    BROWSER fetch(&apos;/api/articles&apos;)
                  </div>
                  <p className="text-xs text-slate-400 mono">
                    fast loading · client secret free · cache 5m
                  </p>
                </div>

                <div className="text-center mono text-xs text-slate-500">↓</div>

                {/* Step 02 */}
                <div className="p-4 rounded-lg border border-amber-400/30 bg-[#121024]/90 space-y-1">
                  <div className="mono text-[11px] text-amber-300 uppercase">
                    02. Cloudflare Pages Function + R2/D1 Cache
                  </div>
                  <div className="text-sm font-bold text-white mono">CLOUDFLARE EDGE</div>
                  <p className="text-xs text-slate-400 mono">
                    env.GOOGLE_SHEET_ID · Service Account JWT · Cache 5 menit
                  </p>
                </div>

                <div className="text-center mono text-xs text-slate-500">↓ fallback</div>

                {/* Step 03 */}
                <div className="p-4 rounded-lg border border-white/10 bg-[#070610]/80 space-y-1">
                  <div className="mono text-[11px] text-emerald-400 uppercase">
                    03. Google Sheets (Hybrid Source)
                  </div>
                  <div className="text-sm font-bold text-white mono">GOOGLE SHEETS</div>
                  <p className="text-xs text-slate-400 mono">
                    private CMS · Blog!A2:K · share hanya ke service account
                  </p>
                </div>
              </div>

              <p className="pt-3 border-t border-white/10 text-[11px] mono text-slate-400 leading-relaxed">
                Kredensial hanya hidup di baris tengah — tidak pernah ke browser. Cloudflare cache dulu, kalau miss langsung baca Google Sheet ID.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. LAYANAN: TIGA HAL YANG SAYA KERJAKAN (FROM LIVE JIMKOTO.MY.ID)      */}
      {/* ===================================================================== */}
      <section id="layanan" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Layanan</h2>
          <p className="mono text-xs uppercase tracking-widest text-slate-400">
            Tiga hal yang saya kerjakan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 01 Webmaster */}
          <div className="rounded-xl border border-white/10 bg-[#0d0c1a]/90 p-6 flex flex-col justify-between space-y-6 hover:border-white/25 transition-colors">
            <div className="space-y-3">
              <div className="mono text-xs text-slate-400">01. Webmaster</div>
              <h3 className="text-xl font-bold text-white">Setup &amp; perawatan situs</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Dari domain, hosting, sampai maintenance rutin — situs tetap jalan tanpa pusing. Menggunakan Hostinger sebagai vault yang stabil dan terjangkau.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <a
                href={OFFICIAL_LINKS.hostinger}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
              >
                <span>Hostinger Rp 29k</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 02 SEO & GEO & E-E-A-T */}
          <div className="rounded-xl border border-white/10 bg-[#0d0c1a]/90 p-6 flex flex-col justify-between space-y-6 hover:border-white/25 transition-colors">
            <div className="space-y-3">
              <div className="mono text-xs text-slate-400">02. SEO &amp; GEO &amp; E-E-A-T</div>
              <h3 className="text-xl font-bold text-white">Ditemukan oleh yang tepat</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                JSON-LD Person, Organization &amp; LocalBusiness terstruktur, GEO Tangerang Selatan (-6.2886, 106.7179), Facebook Page verified, dan direct hub{' '}
                <span className="text-white mono text-xs">chat.jimkoto.my.id</span>.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => onNavigate('review')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <span>Buka Audit SEO &amp; Core Web Vitals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 03 Serverless */}
          <div className="rounded-xl border border-white/10 bg-[#0d0c1a]/90 p-6 flex flex-col justify-between space-y-6 hover:border-white/25 transition-colors">
            <div className="space-y-3">
              <div className="mono text-xs text-slate-400">03. Serverless</div>
              <h3 className="text-xl font-bold text-white">Arsitektur tanpa server tradisional</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Cloudflare Workers / Pages Functions + R2/D1 + Google Sheets CMS — cepat, efisien biaya, dan secret tetap aman di sisi server. Zero Leakage Verified.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => onNavigate('cloudflare')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <span>Lihat Blueprint Cloudflare Edge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. BUILD LOG & ARTIKEL PILAR (LIVE GOOGLE SHEETS + CLOUDFLARE EDGE)   */}
      {/* ===================================================================== */}
      <PillarArticlesSection onNavigate={onNavigate} initialSlug={initialSlug} />

      {/* ===================================================================== */}
      {/* 4. FILOSOFI: 4 LAPISAN KESADARAN & KOTO BATUAH                        */}
      {/* ===================================================================== */}
      <section id="filosofi" className="scroll-mt-24 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1.5">
            <p className="mono text-xs uppercase tracking-widest text-amber-300">
              Filosofi Akomoda · 20 Tahun Evolusi
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4 Lapisan Kesadaran: Dari Tanah ke Kolam Terawat
            </h2>
          </div>
          <p className="font-serif italic text-base sm:text-lg text-slate-300 max-w-md">
            &ldquo;Di tengah badai inflasi, kita tidak butuh samudera baru. Kita butuh kolam yang terawat.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              num: '01',
              title: 'Tanah',
              era: 'Microsoft Era',
              desc: 'Windows, Office, dan disiplin struktur file berjenjang. Tempat berpijak pertama untuk logika sistem.',
            },
            {
              num: '02',
              title: 'Benih',
              era: 'Google Era',
              desc: 'Workspace, Drive, Docs, dan Google Sheets. Benih kolaborasi awan serta database yang mudah dikelola UMKM.',
            },
            {
              num: '03',
              title: 'Samudera',
              era: 'Meta Era · 3.2B Audiens',
              desc: 'Facebook, Instagram, Threads, dan WhatsApp. Tempat audiens nyata berkumpul dan siap berinteraksi.',
            },
            {
              num: '04',
              title: 'Kolam Terawat',
              era: 'Akomoda Network',
              desc: 'Ekosistem UMKM go-online dalam 2 jam via subdomain jimkoto.my.id/* — data privat aman, order langsung ke WhatsApp.',
              highlight: true,
            },
          ].map((item) => (
            <div
              key={item.num}
              className={`rounded-xl border p-6 flex flex-col justify-between space-y-4 ${
                item.highlight
                  ? 'border-amber-400/50 bg-[#121024]/95'
                  : 'border-white/10 bg-[#0d0c1a]/90'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs mono text-slate-400">
                  <span className={item.highlight ? 'text-amber-300 font-bold' : ''}>
                    {item.num}.
                  </span>
                  <span>{item.era}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Koto Batuah — Synergizing The Future Banner (from Live Screenshot 3) */}
        <div className="rounded-xl border border-white/15 bg-[#0d0c1a]/95 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-3xl">
            <img
              src="/bio/assets/jim-koto-avatar-512.png"
              alt="Koto Batuah & Jim Koto"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/favicon.svg';
              }}
              className="w-12 h-12 rounded-xl object-cover border border-white/15 shrink-0"
            />
            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Koto Batuah — Synergizing The Future
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The core pillar of digital infrastructure integrating communities, intelligent technology, and accountable asset management. Membangun Akomoda Network sebagai Kolam Terawat untuk UMKM Go Online 2 Jam — warung, jahit, kuliner, dan jasa.
              </p>
            </div>
          </div>

          <a
            href={OFFICIAL_LINKS.kotobatuah}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Kunjungi Koto Batuah</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
          </a>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. DEVSTUDIO & TECH INTELLIGENCE HUB GATEWAY                          */}
      {/* ===================================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <p className="mono text-xs uppercase tracking-widest text-slate-400">
              Interactive Engineering Workbench
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              DevStudio &amp; Tech Intelligence Hub
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('review')}
            className="text-xs font-semibold text-amber-300 hover:text-amber-200 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Buka Workspace Lengkap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              tab: 'review',
              icon: ShieldCheck,
              title: 'Audit & Core Web Vitals',
              desc: 'Evaluasi LCP, INP, CLS, serta kelengkapan JSON-LD Schema untuk performa produksi.',
            },
            {
              tab: 'cloudflare',
              icon: Cloud,
              title: 'Cloudflare Edge Blueprint',
              desc: 'Panduan deploy Pages Functions, caching R2/D1, dan proteksi kredensial server-side.',
            },
            {
              tab: 'incubator',
              icon: LayoutGrid,
              title: 'App Blueprints',
              desc: 'Kumpulan arsitektur sistem siap rilis untuk UMKM, katalog digital, dan otomasi.',
            },
            {
              tab: 'optimizer',
              icon: Terminal,
              title: 'Code Optimizer & AI Advisor',
              desc: 'Uji bottleneck kode TypeScript/React serta konsultasi arsitektur langsung dengan AI.',
            },
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.tab}
                type="button"
                onClick={() => onNavigate(tool.tab)}
                className="text-left rounded-xl border border-white/10 bg-[#0d0c1a]/90 hover:border-amber-400/50 p-5 flex flex-col justify-between space-y-4 transition-colors cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{tool.desc}</p>
                </div>
                <span className="text-xs font-semibold text-slate-400 group-hover:text-amber-300 inline-flex items-center gap-1">
                  <span>Buka Modul</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            );
          })}
        </div>

        {/* Clean Engineering Dispatch Newsletter Bar */}
        <div className="rounded-xl border border-white/10 bg-[#0d0c1a]/90 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-lg font-bold text-white">
              Jim Koto Engineering Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Catatan berkala mengenai arsitektur serverless Cloudflare, Google Sheets CMS, dan solusi digital UMKM.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="nama@domainanda.com"
              aria-label="Alamat email untuk Engineering Dispatch"
              className="px-3.5 py-2.5 bg-[#070610] border border-white/15 focus:border-amber-400 rounded-lg text-xs text-white placeholder-slate-500 outline-none sm:w-64 mono"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer"
            >
              {subscribed ? 'Terdaftar ✓' : 'Berlangganan'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
