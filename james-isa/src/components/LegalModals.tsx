import React from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Lock, 
  Cookie, 
  Map, 
  ExternalLink, 
  Check, 
  ArrowRight,
  Globe
} from 'lucide-react';

export type LegalModalType = 'tos' | 'disclaimer' | 'privacy' | 'cookies' | 'sitemap' | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
  onNavigate?: (tabId: string) => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ 
  activeModal, 
  onClose,
  onNavigate 
}) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#120828] border border-white/20 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 text-white shadow-2xl relative my-8 max-h-[88vh] flex flex-col justify-between">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              {activeModal === 'tos' && <FileText className="w-5 h-5" />}
              {activeModal === 'disclaimer' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {activeModal === 'privacy' && <Lock className="w-5 h-5 text-emerald-400" />}
              {activeModal === 'cookies' && <Cookie className="w-5 h-5 text-orange-400" />}
              {activeModal === 'sitemap' && <Map className="w-5 h-5 text-cyan-400" />}
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                {activeModal === 'tos' && 'Syarat & Ketentuan Layanan (Terms of Service)'}
                {activeModal === 'disclaimer' && 'Pernyataan Penyangkalan (Disclaimer)'}
                {activeModal === 'privacy' && 'Kebijakan Privasi & Perlindungan Data'}
                {activeModal === 'cookies' && 'Kebijakan & Pengaturan Cookies Dinamis'}
                {activeModal === 'sitemap' && 'Peta Situs (Sitemap) jimkoto.my.id'}
              </h3>
              <p className="text-[11px] mono text-slate-400">
                Pembaruan Terakhir: September 2026 • Jim Koto (James Isa) & Akomoda Network
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition cursor-pointer"
            aria-label="Tutup jendela modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body with Scrollable Area */}
        <div className="overflow-y-auto pr-2 space-y-5 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
          
          {/* 1. TERMS OF SERVICE */}
          {activeModal === 'tos' && (
            <div className="space-y-4">
              <section className="space-y-2">
                <h4 className="font-serif font-bold text-base text-white">1. Pengantar & Ketentuan Umum</h4>
                <p>
                  Selamat datang di portal resmi <strong>jimkoto.my.id</strong> yang dikelola oleh Jim Koto (James Isa) sebagai bagian dari ekosistem Akomoda Network. Dengan mengakses, membaca, atau menggunakan layanan di portal ini, Anda menyetujui seluruh syarat dan ketentuan berikut.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-serif font-bold text-base text-white">2. Program Bantuan UMKM 100% Gratis</h4>
                <p>
                  Inisiatif digitalisasi 2 Jam Jadi untuk UMKM disediakan secara nirlaba dan sukarela. Kami berhak menyeleksi atau memprioritaskan pendaftar berdasarkan kesiapan materi katalog serta urgensi usaha lokal.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-serif font-bold text-base text-white">3. Hak Kekayaan Intelektual</h4>
                <p>
                  Seluruh artikel pilar, blueprint arsitektur, dan kode open-source dilindungi lisensi etis. Anda diperbolehkan menggunakan kode untuk keperluan edukasi dan produksi dengan mencantumkan atribusi ke <strong>jimkoto.my.id</strong>.
                </p>
              </section>
            </div>
          )}

          {/* 2. DISCLAIMERS */}
          {activeModal === 'disclaimer' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl space-y-2 text-amber-200">
                <div className="font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Pernyataan Independensi & Integritas</span>
                </div>
                <p className="text-xs">
                  Portal jimkoto.my.id adalah entitas independen. Penyebutan platform pihak ketiga (seperti Microsoft, Google, Meta, Cloudflare) dilakukan semata-mata dalam konteks analisis arsitektur teknologi.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-serif font-bold text-base text-white">1. Tidak Ada Jaminan Hasil Finansial</h4>
                <p>
                  Artikel, panduan, dan blueprint teknologi disajikan untuk tujuan edukasi dan optimasi rekayasa perangkat lunak. Hasil penjualan atau performa bisnis UMKM bergantung pada eksekusi produk dan dinamika pasar masing-masing.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-serif font-bold text-base text-white">2. Batasan Tanggung Jawab</h4>
                <p>
                  Kami tidak bertanggung jawab atas kerugian langsung maupun tidak langsung akibat penerapan kode atau konfigurasi edge tanpa pengujian menyeluruh di lingkungan staging pengguna.
                </p>
              </section>
            </div>
          )}

          {/* 3. PRIVACY POLICY */}
          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <section className="space-y-2">
                <h4 className="font-serif font-bold text-base text-white">1. Prinsip Zero-Data Leakage (Secure Core)</h4>
                <p>
                  Kami menerapkan prinsip isolasi data ketat (Secure Core Architecture). Data internal Google Drive pengguna diamankan melalui Service Account dan tidak pernah diekspos ke antarmuka publik atau browser bundle pihak ketiga.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-serif font-bold text-base text-white">2. Data yang Dikumpulkan</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li>Alamat email (hanya jika Anda secara sukarela mendaftar newsletter atau menghubungi chat).</li>
                  <li>Metrik teknis anonim Core Web Vitals (LCP, INP, CLS) untuk pemeliharaan performa CDN Cloudflare.</li>
                  <li>Tidak ada data pribadi sensitif yang diperjualbelikan kepada broker data mana pun.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-serif font-bold text-base text-white">3. Hak Pemilik Data</h4>
                <p>
                  Anda berhak meminta penghapusan riwayat komunikasi atau unsubscribe dari newsletter kapan saja melalui tautan yang disediakan atau via chat resmi di <a href="https://chat.jimkoto.my.id" target="_blank" rel="noreferrer" className="text-emerald-400 underline">chat.jimkoto.my.id</a>.
                </p>
              </section>
            </div>
          )}

          {/* 4. COOKIES POLICY & PREFERENCE */}
          {activeModal === 'cookies' && (
            <div className="space-y-4">
              <section className="space-y-2">
                <h4 className="font-serif font-bold text-base text-white">Penggunaan Cookies di jimkoto.my.id</h4>
                <p>
                  Kami hanya menggunakan cookies esensial dan preferensi tema/session lokal. Tidak ada cookie pelacak pihak ketiga (third-party tracking cookies) invasif.
                </p>
              </section>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Cookies Esensial (Wajib)</div>
                    <div className="text-xs text-slate-400">Diperlukan untuk routing SPA, tema visual, dan integritas keamanan.</div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs mono rounded font-bold">Selalu Aktif</span>
                </div>

                <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Cache & Offline Storage</div>
                    <div className="text-xs text-slate-400">Menyimpan artikel pilar offline agar akses super cepat tanpa kuota berulang.</div>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-400/20 text-amber-300 text-xs mono rounded font-bold">Aktif (Lokal)</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. SITEMAP */}
          {activeModal === 'sitemap' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Struktur direktori navigasi dan konten pilar portal <strong>jimkoto.my.id</strong>:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <h5 className="font-bold text-amber-300 mono text-xs uppercase">Halaman Utama & Visi</h5>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li>
                      <button onClick={() => { onNavigate?.('editorial'); onClose(); }} className="hover:text-white underline cursor-pointer">
                        • Beranda: Kesadaran Adalah Anugerah
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate?.('editorial'); onClose(); }} className="hover:text-white underline cursor-pointer">
                        • 4 Lapisan Kesadaran (Microsoft, Google, Meta, Akomoda)
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate?.('editorial'); onClose(); }} className="hover:text-white underline cursor-pointer">
                        • 3 Program Bantuan UMKM Gratis (2 Jam Selesai)
                      </button>
                    </li>
                    <li>
                      <a href="#artikel-pilar" onClick={onClose} className="hover:text-amber-300 underline font-semibold text-amber-200">
                        • Kontainer Artikel Pilar (Google Sheets Live)
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <h5 className="font-bold text-cyan-300 mono text-xs uppercase">DevStudio & Alat Rekayasa</h5>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li>
                      <button onClick={() => { onNavigate?.('audit'); onClose(); }} className="hover:text-white underline cursor-pointer">
                        • Audit & Review Arsitektur
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate?.('cloudflare'); onClose(); }} className="hover:text-white underline cursor-pointer">
                        • Cloudflare Edge Deployment Suite
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate?.('incubator'); onClose(); }} className="hover:text-white underline cursor-pointer">
                        • Production App Blueprints
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate?.('optimizer'); onClose(); }} className="hover:text-white underline cursor-pointer">
                        • Code Optimizer Engine
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate?.('advisor'); onClose(); }} className="hover:text-white underline cursor-pointer">
                        • AI Tech Architecture Advisor
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs mono">
          <div className="text-slate-400">
            Official Portal: <span className="text-amber-300">jimkoto.my.id</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition cursor-pointer"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
