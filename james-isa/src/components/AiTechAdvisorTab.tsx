import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  Copy, 
  Check,
  Zap,
  Code2,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  "Bagaimana cara optimasi Core Web Vitals (LCP < 0.8s, INP < 50ms) pada Next.js 15?",
  "Rancang arsitektur Micro-SaaS untuk platform tutorial coding dengan server-side Gemini API.",
  "Bagaimana struktur schema JSON-LD TechArticle & FAQPage yang ideal untuk blog jimkoto.my.id?",
  "Jelaskan implementasi Clean Architecture di TypeScript dengan Result pattern tanpa try-catch overhead."
];

interface AiTechAdvisorTabProps {
  initialPrompt?: string;
}

export const AiTechAdvisorTab: React.FC<AiTechAdvisorTabProps> = ({ initialPrompt = '' }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Selamat datang di **Gemini AI Tech Advisor • jimkoto.my.id**.\n\nSaya siap memberikan konsultasi arsitektur dan engineering mengenai:\n- ⚡ **Programming & Full-Stack** (React 19, Next.js 15, TypeScript, Cloudflare Workers)\n- 🎯 **Performance Optimization & Core Web Vitals** (LCP, INP, CLS, Sub-second Edge Cache)\n- 🛡️ **Secure Core Architecture** (Google Service Accounts, Isolated Data Drives)\n- 🌾 **Ekosistem Akomoda & Solusi UMKM** (Go Online 2 Jam, WhatsApp Order Funnel)\n\nSilakan ketik pertanyaan teknis Anda atau pilih topik siap pakai di bawah.`,
      timestamp: 'Online'
    }
  ]);
  const [inputMessage, setInputMessage] = useState(initialPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
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
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: 'Jim Koto DevStudio - Software Development, Programming Tutorials, and Ecosystem Optimization for jimkoto.my.id'
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.text || 'No response text returned.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Advisor chat error:', err);
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Error: ${err.message || 'Failed to reach AI advisor backend. Please check connection.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Card */}
      <div className="border border-white/10 bg-[#140b2d]/90 backdrop-blur-md p-6 sm:p-8 space-y-4 rounded-xl shadow-xl">
        <div className="space-y-1 border-b border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-200 text-[11px] mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Server-Side Gemini 3.7 Flash Advisor</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            Jim Koto Editorial Tech Advisor
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-serif italic">
            Konsultasi arsitektur sistem, refactoring kode, panduan tutorial, dan optimasi digital ecosystem secara real-time.
          </p>
        </div>

        {/* Preset Prompt Buttons */}
        <div className="pt-1 flex flex-wrap gap-2">
          {PRESET_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="text-left px-3.5 py-2 border border-white/15 bg-[#1a0e3b] hover:bg-amber-400/20 hover:border-amber-400/40 text-xs text-slate-200 hover:text-white rounded-lg transition cursor-pointer shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="border border-white/10 bg-[#12082b]/95 backdrop-blur-md p-4 sm:p-6 space-y-5 min-h-[420px] max-h-[600px] overflow-y-auto rounded-xl shadow-2xl">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs sm:text-sm ${
                isAssistant ? 'items-start' : 'items-start flex-row-reverse'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border font-bold shadow-md ${
                  isAssistant
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300 text-slate-950'
                    : 'bg-emerald-500 border-emerald-400 text-slate-950'
                }`}
              >
                {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 max-w-[85%] space-y-2 rounded-xl border shadow-lg ${
                  isAssistant
                    ? 'bg-[#1a0f3a] border-white/10 text-slate-100'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-slate-950 font-medium'
                }`}
              >
                <div
                  className={`flex items-center justify-between gap-4 text-[10px] mono uppercase pb-1.5 border-b ${
                    isAssistant ? 'border-white/10 text-slate-400' : 'border-black/15 text-slate-900'
                  }`}
                >
                  <span className="font-bold">{isAssistant ? 'Gemini AI Advisor' : 'Developer Query'}</span>
                  <div className="flex items-center gap-2">
                    <span>{msg.timestamp}</span>
                    <button
                      onClick={() => handleCopyMessage(msg.content, msg.id)}
                      className="hover:text-amber-300 transition"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="whitespace-pre-wrap leading-relaxed space-y-2 text-xs sm:text-sm">
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3 text-xs text-amber-300 mono font-bold pl-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Gemini sedang menyusun analisis arsitektur...</span>
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <div className="border border-white/10 bg-[#140a2f] p-3 rounded-xl flex items-center gap-3 shadow-xl">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Tanyakan topik teknologi, arsitektur Next.js 15, atau optimasi jimkoto.my.id... (Tekan Enter)"
          rows={2}
          className="flex-1 bg-[#0c0520] border border-white/15 text-xs sm:text-sm text-white placeholder-slate-400 outline-none resize-none p-3 rounded-lg focus:border-amber-400 font-sans transition"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputMessage.trim()}
          className="px-6 py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 disabled:opacity-40 text-slate-950 font-bold uppercase text-xs tracking-wider flex items-center gap-2 transition shrink-0 cursor-pointer rounded-lg shadow-md"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
