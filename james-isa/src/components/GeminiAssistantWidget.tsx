import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  X, 
  Minimize2, 
  Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const QUICK_CHIPS = [
  "Bantu UMKM online 2 jam",
  "Optimasi Core Web Vitals",
  "Amankan Google Sheet & Drive",
  "Rancang Blueprint Aplikasi"
];

interface GeminiAssistantWidgetProps {
  onNavigateTab?: (tabId: string) => void;
  forceOpen?: boolean;
  onCloseForce?: () => void;
}

export const GeminiAssistantWidget: React.FC<GeminiAssistantWidgetProps> = ({ 
  onNavigateTab, 
  forceOpen,
  onCloseForce 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-gemini',
      role: 'assistant',
      content: 'Halo! Saya **Gemini AI Architect** untuk **jimkoto.my.id**.\n\nAda yang bisa saya bantu terkait:\n1. 🌾 **Filosofi Akomoda & Solusi UMKM**\n2. ⚡ **Optimasi Performa & Clean Code**\n3. ☁️ **Deploy Cloudflare & Edge CMS**\n4. 🚀 **Blueprint Aplikasi & Arsitektur**',
      timestamp: 'Online'
    }
  ]);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      setHasUnread(false);
    }
  }, [forceOpen]);

  const handleSendMessage = async (customText?: string) => {
    const text = customText || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: 'Gemini Assistant di jimkoto.my.id. Berikan solusi arsitektural dan implementatif untuk Jim Koto, UMKM Indonesia, dan pengunjung.'
        })
      });

      let replyText = '';
      if (res.ok) {
        const data = await res.json();
        replyText = data.text || '';
      }

      if (!replyText) {
        // Smart contextual fallback response if offline or key pending
        if (text.toLowerCase().includes('umkm') || text.toLowerCase().includes('online')) {
          replyText = `**Program Bantuan UMKM 2 Jam Go-Online (Akomoda Network):**\n\n1. **Katalog Digital:** Produk langsung terhubung ke Google Sheet sebagai database produk.\n2. **Chat-to-Order:** Pembeli langsung klik WhatsApp penjual tanpa perantara biaya marketplace.\n3. **Subdomain Gratis:** Disediakan sub-portal khusus di ekosistem \`jimkoto.my.id\`.\n\nSilakan klik tombol **"Chat WA"** di atas untuk verifikasi pendaftaran UMKM Anda.`;
        } else if (text.toLowerCase().includes('sheet') || text.toLowerCase().includes('drive') || text.toLowerCase().includes('aman')) {
          replyText = `**Prinsip Arsitektur Secure Core:**\n\n- **Private Vault:** Google Drive & Sheet privat Anda diakses via Google Cloud Service Account terisolasi.\n- **Zero Exposure:** Pengunjung website hanya membaca mirror data publik tanpa pernah tahu ID rahasia maupun akun internal Anda.\n- **Sub-second Edge Cache:** Performa akses instan via CDN Cloudflare Pages.`;
        } else {
          replyText = `Terima kasih! Sebagai AI Architect Jim Koto, saya siap mendampingi Anda membangun sistem yang efisien: *"Mesin Untuk Efisiensi, Manusia Untuk Makna."*\n\nAnda dapat menjelajahi **Artikel Pilar**, mencoba **Code Optimizer**, atau berkonsultasi langsung via WhatsApp Jim Koto.`;
        }
      }

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (!isOpen) setHasUnread(true);
    } catch (_err: any) {
      const fallbackMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `**Solusi Cepat Jim Koto:**\nSistem AI siap membantu Anda mengoptimalkan aplikasi web, mengamankan spreadsheet, dan merilis katalog UMKM. Silakan gunakan menu di atas atau hubungi tim via tombol WhatsApp di kanan bawah.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseForce) onCloseForce();
  };

  return (
    <>
      {/* Floating Trigger Button on the BOTTOM-LEFT */}
      <div className="fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-40 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasUnread(false);
          }}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0d0c1a]/95 hover:bg-[#16142b] text-amber-300 border border-amber-400/40 font-bold text-xs shadow-lg shadow-black/50 transition-colors cursor-pointer whitespace-nowrap"
          title="Tanya Gemini AI Assistant"
        >
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Tanya AI</span>
          {hasUnread && (
            <span className="px-1.5 py-0.5 text-[9px] bg-amber-400 text-slate-950 rounded-full font-mono">
              1
            </span>
          )}
        </button>
      </div>

      {/* Floating Gemini Drawer Panel (Bottom-Left Popover) */}
      {isOpen && (
        <div
          className={`fixed bottom-20 left-3 sm:left-6 z-50 bg-[#14082e] border-2 border-amber-400/40 shadow-2xl shadow-black/90 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 backdrop-blur-xl ${
            isExpanded 
              ? 'w-[94vw] sm:w-[580px] h-[82vh] max-h-[720px]' 
              : 'w-[94vw] sm:w-[420px] h-[520px]'
          }`}
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#1c0d3e] to-[#2a1158] border-b border-white/15 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-serif font-bold text-white flex items-center gap-1.5 leading-tight">
                  <span>Gemini AI Architect</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded font-mono border border-amber-400/30 font-bold">
                    3.7 Flash
                  </span>
                </h3>
                <p className="text-[11px] mono text-slate-200">
                  Konsultasi Live • jimkoto.my.id
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-slate-200 hover:text-white hover:bg-white/15 rounded-lg transition"
                title={isExpanded ? 'Kecilkan' : 'Perbesar'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={handleClose}
                className="p-1.5 text-slate-200 hover:text-white hover:bg-white/15 rounded-lg transition"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Topic Chips */}
          <div className="bg-[#0b041c] px-3 py-2 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto text-[11px] mono scrollbar-none">
            {QUICK_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                disabled={isLoading}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 border border-white/15 text-white font-bold whitespace-nowrap transition cursor-pointer shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-[#0f0724]/95">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAssistant ? 'items-start' : 'items-start flex-row-reverse'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-md ${
                      isAssistant
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950'
                        : 'bg-emerald-500 text-slate-950'
                    }`}
                  >
                    {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] space-y-1.5 text-xs leading-relaxed ${
                      isAssistant
                        ? 'bg-[#1a0e3c] border border-white/15 text-slate-100 shadow-lg'
                        : 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-semibold shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-80 pb-1 border-b border-black/10">
                      <span className="font-mono uppercase font-bold">{isAssistant ? 'Gemini AI' : 'Pengunjung'}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 bg-[#1a0e3c] border border-amber-400/30 rounded-xl text-amber-300 text-xs mono font-bold">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Gemini sedang menyusun jawaban arsitektur...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0d0520] border-t border-white/15 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tanyakan kode, UMKM, atau arsitektur..."
              className="flex-1 bg-[#1a0e3c] border border-white/20 focus:border-amber-400 text-white placeholder-slate-300 text-xs px-3.5 py-2.5 rounded-xl outline-none transition"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold disabled:opacity-40 transition cursor-pointer shadow-md"
              title="Kirim Pesan"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
