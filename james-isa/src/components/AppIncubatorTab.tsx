import React, { useState } from 'react';
import { 
  Rocket, 
  Layers, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Zap,
  RefreshCw,
  Terminal,
  Server
} from 'lucide-react';
import { APP_BLUEPRINTS, AppBlueprint } from '../data/appBlueprints';

interface AppIncubatorTabProps {
  onOpenAdvisorWithPrompt: (prompt: string) => void;
}

export const AppIncubatorTab: React.FC<AppIncubatorTabProps> = ({ onOpenAdvisorWithPrompt }) => {
  const [selectedApp, setSelectedApp] = useState<AppBlueprint>(APP_BLUEPRINTS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  
  // Custom AI Generator State
  const [customIdea, setCustomIdea] = useState('');
  const [customStack, setCustomStack] = useState('React 19 + TypeScript + Vite + Tailwind + Express + Gemini AI');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSpec, setGeneratedSpec] = useState<any | null>(null);
  const [genError, setGenError] = useState<string | null>(null);

  const categories = ['All', 'Developer Platform', 'Performance Tool', 'AI & Automation', 'DevOps & Cloud'];

  const filteredApps = activeCategory === 'All' 
    ? APP_BLUEPRINTS 
    : APP_BLUEPRINTS.filter(app => app.category === activeCategory);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleGenerateCustomSpec = async () => {
    if (!customIdea.trim()) return;
    setIsGenerating(true);
    setGenError(null);

    try {
      const response = await fetch('/api/gemini/generate-app-spec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appIdea: customIdea,
          targetStack: customStack,
          targetAudience: 'Developers, Tech Blog Readers & Digital Businesses'
        })
      });

      if (!response.ok) {
        throw new Error(`Failed with status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedSpec(data);
    } catch (err: any) {
      console.error('Custom app spec error:', err);
      setGenError(err.message || 'Failed to generate blueprint. Please verify your connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="border border-[#1a1a1a]/10 bg-white p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[#1a1a1a]/10 pb-4">
          <div className="space-y-1 max-w-2xl">
            <span className="mono inline-block text-[10px] text-[#d44e28] font-bold uppercase tracking-widest mb-1">
              Issue Catalog • App Blueprints
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold tracking-tight text-[#1a1a1a]">
              Aplikasi yang Bisa Dibuat & Dioptimalkan
            </h1>
            <p className="text-xs sm:text-sm text-[#1a1a1a]/70 font-serif italic">
              6 Blueprint aplikasi web dan mobile siap bangun untuk ekosistem Jim Koto (James Isa).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const element = document.getElementById('custom-ai-incubator');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#d44e28] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Custom Generator</span>
            </button>
          </div>
        </div>

        {/* Category Filters (Mobile & Tablet Wrapped - No Hard Sliders) */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-medium tracking-wider">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border transition cursor-pointer font-bold ${
                activeCategory === cat
                  ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'border-white/15 bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 6 High-Value App Blueprints */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => {
          const isSelected = selectedApp.id === app.id;
          return (
            <div
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className={`cursor-pointer border p-6 space-y-4 transition flex flex-col justify-between ${
                isSelected
                  ? 'border-[#d44e28] bg-white ring-1 ring-[#d44e28]'
                  : 'border-[#1a1a1a]/10 bg-white hover:border-[#1a1a1a]/30'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2 border-b border-[#1a1a1a]/8 pb-2">
                  <span className="mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#1a1a1a]/10 bg-[#f8f7f2] text-[#d44e28] font-bold">
                    {app.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs mono font-bold text-[#d44e28]">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Impact {app.impactScore}%</span>
                  </div>
                </div>

                <h3 className="text-xl font-serif font-semibold text-[#1a1a1a] leading-snug">
                  {app.title}
                </h3>
                <p className="text-xs text-[#1a1a1a]/70 line-clamp-3 leading-relaxed">
                  {app.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1a1a1a]/8 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#1a1a1a]/60 mono">
                  <span>Dev: {app.estimatedDevTime}</span>
                  <span className="font-semibold text-[#1a1a1a]">{app.developmentComplexity}</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-xs font-semibold uppercase tracking-wider text-[#d44e28]">
                  <span>{isSelected ? 'Viewing Blueprint' : 'Inspect Blueprint'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected App Blueprint Deep Dive View */}
      {selectedApp && (
        <section className="border border-[#1a1a1a]/10 bg-white p-6 sm:p-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-4 border-b border-[#1a1a1a]/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="mono inline-block bg-[#1a1a1a] text-white text-[10px] px-2 py-0.5 uppercase tracking-wider">
                  {selectedApp.category}
                </span>
                <span className="text-xs text-[#1a1a1a]/60 mono">
                  Estimated Dev: {selectedApp.estimatedDevTime}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#1a1a1a] tracking-tight">
                {selectedApp.title}
              </h2>
              <p className="text-base text-[#1a1a1a]/75 font-serif italic">
                "{selectedApp.tagline}"
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAdvisorWithPrompt(`How should I implement the architecture for "${selectedApp.title}" in Jim Koto's ecosystem? What are the key performance optimizations?`)}
                className="px-4 py-2 border border-[#1a1a1a]/20 bg-[#f8f7f2] hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d44e28]" />
                <span>Consult AI Advisor</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns: Specs & Gains */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tech Stack Breakdown */}
              <div className="border border-[#1a1a1a]/10 bg-[#fdfcf8] p-5 space-y-3">
                <h3 className="mono text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest flex items-center gap-2 border-b border-[#1a1a1a]/8 pb-2">
                  <Server className="w-4 h-4 text-[#d44e28]" />
                  <span>Target Tech Stack & Architecture</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white border border-[#1a1a1a]/10">
                    <span className="text-[#1a1a1a]/60 uppercase text-[10px] mono block mb-1">Frontend Tier:</span>
                    <span className="mono text-[#1a1a1a] font-semibold">{selectedApp.techStack.frontend}</span>
                  </div>
                  <div className="p-3 bg-white border border-[#1a1a1a]/10">
                    <span className="text-[#1a1a1a]/60 uppercase text-[10px] mono block mb-1">Backend & API:</span>
                    <span className="mono text-[#1a1a1a] font-semibold">{selectedApp.techStack.backend}</span>
                  </div>
                  <div className="p-3 bg-white border border-[#1a1a1a]/10">
                    <span className="text-[#1a1a1a]/60 uppercase text-[10px] mono block mb-1">Database & Storage:</span>
                    <span className="mono text-[#1a1a1a] font-semibold">{selectedApp.techStack.database}</span>
                  </div>
                  <div className="p-3 bg-white border border-[#1a1a1a]/10">
                    <span className="text-[#1a1a1a]/60 uppercase text-[10px] mono block mb-1">Caching & CDN:</span>
                    <span className="mono text-[#1a1a1a] font-semibold">{selectedApp.techStack.caching}</span>
                  </div>
                </div>
              </div>

              {/* Core Features */}
              <div className="space-y-3">
                <h3 className="mono text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest flex items-center gap-2 border-b border-[#1a1a1a]/8 pb-1.5">
                  <Layers className="w-4 h-4 text-[#d44e28]" />
                  <span>Key Functional Capabilities</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#1a1a1a]/80">
                  {selectedApp.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-3 bg-[#fdfcf8] border border-[#1a1a1a]/10">
                      <CheckCircle2 className="w-4 h-4 text-[#d44e28] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optimization Gains */}
              <div className="space-y-3">
                <h3 className="mono text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest flex items-center gap-2 border-b border-[#1a1a1a]/8 pb-1.5">
                  <Zap className="w-4 h-4 text-[#d44e28]" />
                  <span>Measurable Optimization Gains</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedApp.optimizationGains.map((gain, idx) => (
                    <div key={idx} className="p-4 border border-[#1a1a1a]/10 bg-white space-y-1">
                      <span className="mono text-[10px] uppercase text-[#1a1a1a]/60 block">{gain.metric}</span>
                      <div className="flex items-baseline gap-2 mono">
                        <span className="text-xs text-[#1a1a1a]/40 line-through">{gain.before}</span>
                        <span className="text-sm font-bold text-[#d44e28]">→ {gain.after}</span>
                      </div>
                      <span className="text-xs font-semibold text-[#1a1a1a] block">{gain.impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Column: Starter Snippet */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#1a1a1a]/8 pb-1.5">
                <h3 className="mono text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#d44e28]" />
                  <span>Production Starter Code</span>
                </h3>
                <button
                  onClick={() => handleCopyCode(selectedApp.starterSnippet.code)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 border border-[#1a1a1a]/15 bg-white hover:bg-[#f8f7f2] text-[#1a1a1a] text-[10px] font-bold uppercase transition cursor-pointer"
                >
                  {copiedSnippet ? <Check className="w-3 h-3 text-[#d44e28]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="border border-[#1a1a1a]/20 bg-[#1a1a1a] text-[#fdfcf8] mono text-xs overflow-hidden">
                <div className="px-3 py-1.5 bg-[#262626] border-b border-[#333] flex items-center justify-between text-slate-300 text-[11px]">
                  <span>{selectedApp.starterSnippet.filename}</span>
                  <span className="text-[#d44e28] font-bold uppercase">{selectedApp.starterSnippet.language}</span>
                </div>
                <pre className="p-3.5 text-slate-200 overflow-x-auto max-h-[380px] leading-relaxed">
                  <code>{selectedApp.starterSnippet.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AI Custom App Blueprint Generator Section */}
      <section id="custom-ai-incubator" className="border border-[#1a1a1a]/10 bg-white p-6 sm:p-8 space-y-6">
        <div className="space-y-1 border-b border-[#1a1a1a]/10 pb-3">
          <span className="mono inline-block text-[10px] text-[#d44e28] font-bold uppercase tracking-widest mb-1">
            Interactive AI Studio
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1a1a1a]">
            Generate Custom App Blueprint for Jim Koto's Ecosystem
          </h2>
          <p className="text-xs text-[#1a1a1a]/70 font-serif italic">
            Ditenagai model Gemini 3.7 Flash server-side untuk merancang arsitektur, skema database, dan komponen starter dalam standar editorial Jim Koto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
              Deskripsi Ide Aplikasi:
            </label>
            <textarea
              value={customIdea}
              onChange={(e) => setCustomIdea(e.target.value)}
              placeholder="Contoh: Platform Code Review interaktif untuk tutorial React 19 dengan benchmark memori otomatis dan integrasi Discord webhook..."
              rows={3}
              className="w-full border border-[#1a1a1a]/15 bg-[#fdfcf8] p-3 text-xs sm:text-sm text-[#1a1a1a] placeholder-[#888] outline-none focus:bg-white transition"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
                Target Tech Stack:
              </label>
              <input
                type="text"
                value={customStack}
                onChange={(e) => setCustomStack(e.target.value)}
                className="w-full border border-[#1a1a1a]/15 bg-[#fdfcf8] px-3 py-2 text-xs text-[#1a1a1a] mono outline-none focus:bg-white transition"
              />
            </div>

            <button
              onClick={handleGenerateCustomSpec}
              disabled={isGenerating || !customIdea.trim()}
              className="w-full py-2.5 px-4 bg-[#1a1a1a] hover:bg-[#d44e28] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Synthesizing Architecture...' : 'Generate Blueprint'}</span>
            </button>
          </div>
        </div>

        {genError && (
          <div className="p-4 border border-[#d44e28] bg-[#fdf2ee] text-[#d44e28] text-xs font-semibold">
            {genError}
          </div>
        )}

        {/* Generated Blueprint View */}
        {generatedSpec && (
          <div className="pt-6 border-t border-[#1a1a1a]/10 space-y-6">
            <div className="space-y-1">
              <span className="mono text-[10px] text-[#d44e28] font-bold uppercase tracking-widest">
                ✓ AI Generated Editorial Specification
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1a1a1a]">{generatedSpec.appName}</h3>
              <p className="text-sm font-serif italic text-[#1a1a1a]/75">"{generatedSpec.tagline}"</p>
              <p className="text-xs text-[#1a1a1a]/70 pt-1 leading-relaxed">{generatedSpec.executiveSummary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#fdfcf8] border border-[#1a1a1a]/10">
                <span className="mono text-[#1a1a1a]/60 uppercase text-[10px] block mb-1">Frontend:</span>
                <span className="text-[#1a1a1a] mono font-semibold">{generatedSpec.targetArchitecture?.frontend}</span>
              </div>
              <div className="p-3 bg-[#fdfcf8] border border-[#1a1a1a]/10">
                <span className="mono text-[#1a1a1a]/60 uppercase text-[10px] block mb-1">Backend:</span>
                <span className="text-[#1a1a1a] mono font-semibold">{generatedSpec.targetArchitecture?.backend}</span>
              </div>
              <div className="p-3 bg-[#fdfcf8] border border-[#1a1a1a]/10">
                <span className="mono text-[#1a1a1a]/60 uppercase text-[10px] block mb-1">Database:</span>
                <span className="text-[#1a1a1a] mono font-semibold">{generatedSpec.targetArchitecture?.database}</span>
              </div>
              <div className="p-3 bg-[#fdfcf8] border border-[#1a1a1a]/10">
                <span className="mono text-[#1a1a1a]/60 uppercase text-[10px] block mb-1">Caching/CDN:</span>
                <span className="text-[#1a1a1a] mono font-semibold">{generatedSpec.targetArchitecture?.cachingAndCdn}</span>
              </div>
            </div>

            {/* Generated Starter Code */}
            {generatedSpec.starterComponentCode && (
              <div className="space-y-2">
                <span className="mono text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest">
                  Generated Starter Code
                </span>
                <div className="border border-[#1a1a1a]/20 bg-[#1a1a1a] text-slate-200 overflow-hidden mono text-xs">
                  <pre className="p-4 overflow-x-auto max-h-[300px] leading-relaxed">
                    <code>{generatedSpec.starterComponentCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

