import React, { useState } from 'react';
import { 
  Zap, 
  Terminal, 
  Copy, 
  Check, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

interface CodePreset {
  id: string;
  name: string;
  category: string;
  language: string;
  code: string;
  goal: string;
}

const PRESETS: CodePreset[] = [
  {
    id: 'react-unnecessary-renders',
    name: 'React 19 Re-render & Expensive Computation Bottleneck',
    category: 'React Performance',
    language: 'typescript',
    goal: 'Eliminate redundant re-renders, isolate state, and memoize expensive computations with React 19 compiler patterns',
    code: `// Unoptimized React Component with heavy rendering lag
import React, { useState } from 'react';

export function ProductCatalog({ items, onSelect }) {
  const [filter, setFilter] = useState('');
  const [count, setCount] = useState(0);

  // Expensive calculation runs on EVERY re-render (even when only count changes)
  const processedItems = items
    .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    .map(item => {
      // Simulate heavy data transformation
      let score = 0;
      for (let i = 0; i < 50000; i++) { score += (i * 0.001); }
      return { ...item, score };
    });

  return (
    <div>
      <input 
        value={filter} 
        onChange={e => setFilter(e.target.value)} 
        placeholder="Filter..." 
      />
      <button onClick={() => setCount(c => c + 1)}>Clicks: {count}</button>
      <ul>
        {processedItems.map(item => (
          <li key={item.id} onClick={() => onSelect(item)}>
            {item.name} - Score: {item.score.toFixed(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}`
  },
  {
    id: 'node-async-loop-bottleneck',
    name: 'Sequential Async/Await Loop (N+1 Query Slowdown)',
    category: 'Backend Node.js',
    language: 'typescript',
    goal: 'Convert sequential waterfall queries into batch concurrent promises with Promise.all and chunking',
    code: `// Unoptimized sequential query loop causing severe latency
import { fetchUserRecord, fetchUserPermissions } from './db';

export async function hydrateUsers(userIds: string[]) {
  const enrichedUsers = [];

  // Sequential await inside for-loop: takes N * (T1 + T2) ms!
  for (let i = 0; i < userIds.length; i++) {
    const id = userIds[i];
    const user = await fetchUserRecord(id);
    const permissions = await fetchUserPermissions(user.roleId);
    enrichedUsers.push({
      ...user,
      permissions
    });
  }

  return enrichedUsers;
}`
  },
  {
    id: 'memory-leak-event-listener',
    name: 'Memory Leak in Event Listener & Timer',
    category: 'Browser & Memory',
    language: 'typescript',
    goal: 'Prevent memory leak, properly clean up subscriptions, and debounce resize callbacks',
    code: `// Component with un-cleaned global listeners & unthrottled resize
import { useEffect, useState } from 'react';

export function WindowMonitor() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    // Missing cleanup, missing debounce: causes memory leak & main-thread freezing
    window.addEventListener('resize', () => {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    });

    setInterval(() => {
      console.log('Telemetry heartbeat...');
    }, 1000);
  }, []);

  return <div>Viewport: {size.w}x{size.h}</div>;
}`
  }
];

export const CodeOptimizerTab: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESETS[0].id);
  const [code, setCode] = useState<string>(PRESETS[0].code);
  const [language, setLanguage] = useState<string>(PRESETS[0].language);
  const [goal, setGoal] = useState<string>(PRESETS[0].goal);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedResult, setOptimizedResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSelectPreset = (preset: CodePreset) => {
    setSelectedPresetId(preset.id);
    setCode(preset.code);
    setLanguage(preset.language);
    setGoal(preset.goal);
    setOptimizedResult(null);
    setErrorMsg(null);
  };

  const handleRunOptimization = async () => {
    if (!code.trim()) return;
    setIsOptimizing(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/optimize-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          optimizationGoal: goal
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned error: ${res.status}`);
      }

      const data = await res.json();
      setOptimizedResult(data);
    } catch (err: any) {
      console.error('Optimization error:', err);
      setErrorMsg(err.message || 'Failed to optimize code with AI engine.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleCopyOptimized = () => {
    if (optimizedResult?.optimizedCode) {
      navigator.clipboard.writeText(optimizedResult.optimizedCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="border border-[#1a1a1a]/10 bg-white p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[#1a1a1a]/10 pb-4">
          <div className="space-y-1 max-w-2xl">
            <span className="mono inline-block text-[10px] text-[#d44e28] font-bold uppercase tracking-widest mb-1">
              Optimization Workbench • Clean Code
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold tracking-tight text-[#1a1a1a]">
              Code Optimization & Benchmarking Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#1a1a1a]/70 font-serif italic">
              Refactor kode Anda dengan prinsip arsitektur Jim Koto. Ditenagai server-side Gemini 3.7 Flash untuk mendeteksi bottleneck dan memory leak.
            </p>
          </div>

          <button
            onClick={handleRunOptimization}
            disabled={isOptimizing || !code.trim()}
            className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#d44e28] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'Optimizing Code...' : 'Refactor & Benchmark'}</span>
          </button>
        </div>

        {/* Preset Selector (Mobile/Tablet Friendly Wrapped) */}
        <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] font-medium tracking-wider">
          <span className="mono text-white/80 shrink-0 text-xs font-bold">Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p)}
              className={`px-3 py-1.5 rounded-lg border transition cursor-pointer font-bold ${
                selectedPresetId === p.id
                  ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'border-white/15 bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {p.name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor & Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Code */}
        <div className="border border-[#1a1a1a]/10 bg-white overflow-hidden flex flex-col">
          <div className="px-4 py-2.5 bg-[#f8f7f2] border-b border-[#1a1a1a]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#d44e28]" />
              <span className="mono text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
                Input Source Code
              </span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white text-[#1a1a1a] text-xs mono px-2.5 py-1 border border-[#1a1a1a]/20 outline-none cursor-pointer uppercase"
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="tsx">React (TSX)</option>
              <option value="sql">SQL Query</option>
            </select>
          </div>

          <div className="p-3 bg-[#1a1a1a] flex-1">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 bg-transparent text-[#fdfcf8] mono text-xs p-2 outline-none resize-none leading-relaxed"
              placeholder="Paste your code snippet here..."
            />
          </div>

          <div className="p-3 bg-[#fdfcf8] border-t border-[#1a1a1a]/10 space-y-1">
            <label className="block mono text-[10px] uppercase tracking-wider text-[#1a1a1a]/60">
              Optimization Objective:
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full border border-[#1a1a1a]/15 bg-white px-3 py-1.5 text-xs text-[#1a1a1a] outline-none mono"
            />
          </div>
        </div>

        {/* Right: Refactored Result */}
        <div className="border border-[#1a1a1a]/10 bg-white overflow-hidden flex flex-col">
          <div className="px-4 py-2.5 bg-[#f8f7f2] border-b border-[#1a1a1a]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d44e28]" />
              <span className="mono text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
                Refactored Result
              </span>
            </div>
            {optimizedResult?.optimizedCode && (
              <button
                onClick={handleCopyOptimized}
                className="inline-flex items-center gap-1 px-2.5 py-1 border border-[#1a1a1a]/20 bg-white hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] text-xs font-semibold uppercase transition cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-[#d44e28]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            )}
          </div>

          <div className="p-3 bg-[#1a1a1a] flex-1 overflow-auto">
            {isOptimizing ? (
              <div className="h-80 flex flex-col items-center justify-center space-y-3 text-slate-300 text-xs">
                <RefreshCw className="w-6 h-6 animate-spin text-[#d44e28]" />
                <span className="mono">Analyzing runtime complexity and AST transforms...</span>
              </div>
            ) : optimizedResult ? (
              <pre className="h-80 text-emerald-300 mono text-xs p-2 overflow-x-auto leading-relaxed">
                <code>{optimizedResult.optimizedCode}</code>
              </pre>
            ) : errorMsg ? (
              <div className="h-80 flex items-center justify-center p-4 text-[#d44e28] text-xs mono text-center">
                {errorMsg}
              </div>
            ) : (
              <div className="h-80 flex flex-col items-center justify-center text-slate-400 text-xs space-y-2">
                <Zap className="w-8 h-8 text-slate-600" />
                <span className="font-serif italic text-sm">Click "Refactor & Benchmark" to analyze and optimize.</span>
              </div>
            )}
          </div>

          {/* Quick Metrics Bar */}
          {optimizedResult && (
            <div className="p-3 bg-[#fdfcf8] border-t border-[#1a1a1a]/10 flex items-center justify-between text-xs mono">
              <div className="flex items-center gap-2">
                <span className="text-[#1a1a1a]/60 uppercase text-[10px]">Complexity:</span>
                <span className="text-[#1a1a1a]/40 line-through">{optimizedResult.complexityBefore || 'O(n^2)'}</span>
                <span className="text-[#d44e28] font-bold">→ {optimizedResult.complexityAfter || 'O(n)'}</span>
              </div>
              <div className="text-[#1a1a1a] font-semibold">
                {optimizedResult.estimatedSpeedup || 'Estimated ~50% faster'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Analysis Breakdown */}
      {optimizedResult && (
        <section className="border border-[#1a1a1a]/10 bg-white p-6 sm:p-8 space-y-6">
          <div className="space-y-1 border-b border-[#1a1a1a]/8 pb-3">
            <h3 className="text-xl font-serif font-semibold text-[#1a1a1a] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#d44e28]" />
              <span>Architectural Takeaways & Diagnostics</span>
            </h3>
            <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">
              {optimizedResult.summary}
            </p>
          </div>

          {optimizedResult.improvements && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {optimizedResult.improvements.map((imp: any, idx: number) => (
                <div key={idx} className="p-4 border border-[#1a1a1a]/10 bg-[#fdfcf8] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-serif font-semibold text-[#1a1a1a]">{imp.title}</span>
                    <span className="px-2 py-0.5 text-[9px] mono uppercase bg-[#1a1a1a] text-white">
                      {imp.type}
                    </span>
                  </div>
                  <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">{imp.description}</p>
                </div>
              ))}
            </div>
          )}

          {optimizedResult.keyTakeaway && (
            <div className="p-4 bg-[#fdf2ee] border-l-2 border-[#d44e28] text-xs text-[#8c2d13] flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#d44e28] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#d44e28] uppercase tracking-wider text-[10px] block mb-0.5 mono">
                  Principal Architecture Tip:
                </strong>
                <span className="leading-relaxed">{optimizedResult.keyTakeaway}</span>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

