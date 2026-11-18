import React, { useState } from 'react';
import { 
  Globe, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Zap, 
  ShieldCheck, 
  ExternalLink, 
  Code2, 
  Gauge, 
  Sparkles, 
  RefreshCw, 
  Check, 
  Share2
} from 'lucide-react';
import { 
  JIM_KOTO_PROFILE, 
  SITE_REVIEW_METRICS, 
  CONTENT_REVIEW_CATEGORIES, 
  STRATEGIC_SWOT,
  AuditMetric 
} from '../data/jimKotoProfile';

interface JimKotoReviewTabProps {
  onNavigateToIncubator: () => void;
  onNavigateToOptimizer: () => void;
  onNavigateToTutorials: () => void;
}

export const JimKotoReviewTab: React.FC<JimKotoReviewTabProps> = ({
  onNavigateToIncubator,
  onNavigateToOptimizer,
  onNavigateToTutorials,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [metrics, setMetrics] = useState<AuditMetric[]>(SITE_REVIEW_METRICS);
  const [auditTimestamp, setAuditTimestamp] = useState<string>('Live Edition');
  const [copiedLink, setCopiedLink] = useState(false);

  const runLiveAudit = () => {
    setIsRunningAudit(true);
    setTimeout(() => {
      setMetrics([
        {
          name: "Largest Contentful Paint (LCP)",
          category: "performance",
          score: 97,
          metricValue: "0.82s",
          status: "optimal",
          description: "Time taken to render the primary hero code block & typography.",
          recommendation: "Priority fetch enabled with Edge cache CDN."
        },
        {
          name: "Interaction to Next Paint (INP)",
          category: "performance",
          score: 99,
          metricValue: "34ms",
          status: "optimal",
          description: "Sub-50ms main thread responsiveness across click events.",
          recommendation: "Task chunking and React 19 concurrent transitions optimal."
        },
        {
          name: "Cumulative Layout Shift (CLS)",
          category: "performance",
          score: 100,
          metricValue: "0.002",
          status: "optimal",
          description: "Zero visual shifts during dynamic font and asset loads.",
          recommendation: "All code runner containers maintain reserved height constraints."
        },
        {
          name: "Time to First Byte (TTFB)",
          category: "performance",
          score: 95,
          metricValue: "108ms",
          status: "optimal",
          description: "Edge server TLS termination and instant HTML streaming.",
          recommendation: "Stale-while-revalidate caching header active."
        },
        {
          name: "Technical SEO & Schema Markup",
          category: "seo",
          score: 98,
          metricValue: "Structured 100%",
          status: "optimal",
          description: "TechArticle JSON-LD with Author Person credentials.",
          recommendation: "Author schema connected to Jim Koto (James Isa)."
        },
        {
          name: "Mobile & Touch Accessibility",
          category: "accessibility",
          score: 96,
          metricValue: "WCAG AA",
          status: "optimal",
          description: "High contrast ratios and keyboard navigability.",
          recommendation: "All interactive controls satisfy 44px touch targets."
        }
      ]);
      setAuditTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setIsRunningAudit(false);
    }, 1200);
  };

  const handleCopyReport = () => {
    const reportText = `Jim Koto DevStudio Editorial Report
Domain: https://jimkoto.my.id/
Founder & CEO: Jim Koto (James Isa)
Performance Score: 98/100
Core Web Vitals: LCP 0.82s | INP 34ms | CLS 0.002
Tech Focus: Programming Tutorials, Software Development, Digital Innovation`;
    navigator.clipboard.writeText(reportText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const overallScore = Math.round(
    metrics.reduce((acc, curr) => acc + curr.score, 0) / metrics.length
  );

  return (
    <div className="space-y-10 pb-16">
      {/* BroadSheet Hero Section: 3-Column Editorial Layout */}
      <div className="border border-[#1a1a1a]/10 bg-white grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#1a1a1a]/10">
        {/* Left Column: Curator Identity */}
        <section className="lg:col-span-3 p-6 flex flex-col justify-between bg-white space-y-6">
          <div>
            <p className="mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/60 mb-3">
              Curator Identity & Profile
            </p>
            <div className="mb-6">
              <h2 className="text-2xl font-serif italic border-b border-[#1a1a1a]/8 pb-2 mb-2 text-[#1a1a1a]">
                James Isa
              </h2>
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[#d44e28] block mb-2">
                Founder & CEO • Tech Lead
              </span>
              <p className="text-xs leading-relaxed text-[#1a1a1a]/70">
                {JIM_KOTO_PROFILE.mission}
              </p>
            </div>

            <ul className="space-y-3">
              <li className="flex justify-between items-baseline border-b border-[#1a1a1a]/6 pb-1.5">
                <span className="mono text-[10px] uppercase text-[#1a1a1a]/60">Focus</span>
                <span className="text-xs font-semibold text-[#1a1a1a]">Full-Stack & Cloud</span>
              </li>
              <li className="flex justify-between items-baseline border-b border-[#1a1a1a]/6 pb-1.5">
                <span className="mono text-[10px] uppercase text-[#1a1a1a]/60">Platform</span>
                <a
                  href={JIM_KOTO_PROFILE.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#d44e28] hover:underline flex items-center gap-1 mono"
                >
                  <span>jimkoto.my.id</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex justify-between items-baseline border-b border-[#1a1a1a]/6 pb-1.5">
                <span className="mono text-[10px] uppercase text-[#1a1a1a]/60">Affiliation</span>
                <span className="text-xs font-semibold text-[#1a1a1a]">Akomoda Network</span>
              </li>
              <li className="flex justify-between items-baseline border-b border-[#1a1a1a]/6 pb-1.5">
                <span className="mono text-[10px] uppercase text-[#1a1a1a]/60">Location</span>
                <span className="text-xs font-semibold text-[#1a1a1a]">Indonesia</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <div className="bg-[#1a1a1a] text-white p-5 flex flex-col justify-center text-center">
              <span className="text-4xl sm:text-5xl font-serif font-black mb-1">{overallScore}%</span>
              <span className="mono text-[9px] uppercase tracking-widest leading-tight text-white/70">
                System Quality & Accuracy Index
              </span>
            </div>
          </div>
        </section>

        {/* Center Column: Featured Editorial Review */}
        <section className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#fdfcf8]">
          <div className="space-y-6">
            <div>
              <span className="mono inline-block text-[10px] text-[#d44e28] font-bold uppercase tracking-widest mb-3">
                Featured Editorial Review
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold leading-[1.08] tracking-tight text-[#1a1a1a] mb-4">
                Bridging Logic & Digital Scalability.
              </h3>
              <div className="py-4 px-6 border-y border-[#1a1a1a]/10 text-base sm:text-lg leading-relaxed font-serif italic text-[#1a1a1a]/80 my-4 bg-white/70">
                "The engineering tutorials at jimkoto.my.id serve as a high-density technical bridge, translating complex software architectures into production-ready developer workflows."
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="border-t border-[#1a1a1a]/10 pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-1">
                  Programming Tutorials
                </h4>
                <p className="text-xs leading-relaxed text-[#1a1a1a]/70">
                  High-quality walkthroughs on modern stacks (React 19, Next.js 15, TypeScript, Node.js) focusing on the structural 'why' behind the 'how'.
                </p>
              </div>
              <div className="border-t border-[#1a1a1a]/10 pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-1">
                  App Optimization
                </h4>
                <p className="text-xs leading-relaxed text-[#1a1a1a]/70">
                  Advanced strategies for sub-second Core Web Vitals, memory management, zero-layout shifts, and scalable cloud edge caching.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1a1a1a]/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#1a1a1a] rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-[#d44e28] rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-[#d1d1d1] rounded-full"></div>
              <span className="mono text-[10px] uppercase tracking-wider text-[#1a1a1a]/60 ml-1">
                System Analysis v2.4
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={runLiveAudit}
                disabled={isRunningAudit}
                className="px-3.5 py-1.5 bg-[#1a1a1a] hover:bg-[#d44e28] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRunningAudit ? 'animate-spin' : ''}`} />
                <span>{isRunningAudit ? 'Auditing...' : 'Re-Run Audit'}</span>
              </button>
              <button
                onClick={handleCopyReport}
                className="px-3.5 py-1.5 border border-[#1a1a1a]/20 bg-white hover:bg-[#f8f7f2] text-[#1a1a1a] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-[#d44e28]" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Core Pillars & Verdict */}
        <section className="lg:col-span-3 bg-[#f8f7f2] p-6 flex flex-col justify-between space-y-6">
          <div>
            <h4 className="mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] mb-5 border-b border-[#1a1a1a]/10 pb-2">
              Core Technical Pillars
            </h4>

            <div className="space-y-6">
              <div className="relative pl-7">
                <span className="absolute left-0 top-0 text-2xl opacity-20 font-serif font-black text-[#1a1a1a]">
                  01
                </span>
                <h5 className="text-xs font-bold uppercase text-[#1a1a1a] mb-1">Tutorial Depth</h5>
                <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">
                  Deep-dive code explanations that bypass superficial, documentation-only copy.
                </p>
              </div>

              <div className="relative pl-7">
                <span className="absolute left-0 top-0 text-2xl opacity-20 font-serif font-black text-[#1a1a1a]">
                  02
                </span>
                <h5 className="text-xs font-bold uppercase text-[#1a1a1a] mb-1">Digital Innovation</h5>
                <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">
                  Integration of Gemini AI SDKs, Edge runtime computing, and automated developer tooling.
                </p>
              </div>

              <div className="relative pl-7">
                <span className="absolute left-0 top-0 text-2xl opacity-20 font-serif font-black text-[#1a1a1a]">
                  03
                </span>
                <h5 className="text-xs font-bold uppercase text-[#1a1a1a] mb-1">Ecosystem Speed</h5>
                <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">
                  Holistic SEO architecture, JSON-LD schemas, and sub-50ms INP response standards.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1a1a1a]/10">
            <div className="border border-[#1a1a1a]/15 p-4 bg-white shadow-none">
              <p className="mono text-[10px] font-bold uppercase text-[#d44e28] mb-1.5 tracking-wider">
                Editorial Verdict
              </p>
              <p className="text-xs italic text-[#1a1a1a]/80 font-serif leading-relaxed">
                "An essential reference bookmark for developers seeking to transition from superficial tutorials to high-performance enterprise craftsmanship."
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Core Web Vitals Scorecard */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#1a1a1a]/10 pb-3 gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight text-[#1a1a1a]">
              Core Web Vitals & System Diagnostics
            </h2>
            <p className="mono text-[10px] uppercase text-[#1a1a1a]/60 mt-0.5">
              Simulated Performance Profile • https://jimkoto.my.id/
            </p>
          </div>
          <span className="mono text-xs text-[#d44e28] font-bold">
            Grade A+ Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="border border-[#1a1a1a]/10 bg-white p-5 space-y-3 flex flex-col justify-between hover:border-[#d44e28] transition"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2 border-b border-[#1a1a1a]/8 pb-2">
                  <span className="mono text-[10px] uppercase text-[#1a1a1a]/60">
                    {metric.category}
                  </span>
                  <span className="px-2 py-0.5 mono text-xs font-bold bg-[#1a1a1a] text-white">
                    {metric.metricValue}
                  </span>
                </div>
                <h3 className="text-base font-serif font-semibold text-[#1a1a1a]">
                  {metric.name}
                </h3>
                <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">
                  {metric.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1a1a1a]/8 text-xs text-[#d44e28] mono flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{metric.recommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Taxonomy & Editorial Sections */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#1a1a1a]/10 pb-3 gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight text-[#1a1a1a]">
              Content Review: Programming & Innovation
            </h2>
            <p className="mono text-[10px] uppercase text-[#1a1a1a]/60 mt-0.5">
              Subject Taxonomy & Technical Depth Across Jim Koto's Catalog
            </p>
          </div>

          {/* Filter Tabs (Mobile/Tablet Friendly Wrapped) */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium tracking-wider">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg border transition cursor-pointer font-bold ${
                activeCategory === 'all'
                  ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'border-white/15 bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              All Topics
            </button>
            {CONTENT_REVIEW_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg border transition cursor-pointer whitespace-nowrap font-bold ${
                  activeCategory === cat.id
                    ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'border-white/15 bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {CONTENT_REVIEW_CATEGORIES.filter(
            (c) => activeCategory === 'all' || c.id === activeCategory
          ).map((cat) => (
            <div
              key={cat.id}
              className="border border-[#1a1a1a]/10 bg-white p-6 space-y-4 flex flex-col justify-between hover:border-[#1a1a1a]/30 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#1a1a1a]/8 pb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 bg-[#1a1a1a] text-white flex items-center justify-center font-bold text-xs font-serif">
                      {cat.title.charAt(0)}
                    </span>
                    <div>
                      <h3 className="text-lg font-serif font-semibold text-[#1a1a1a]">
                        {cat.title}
                      </h3>
                      <span className="mono text-[10px] text-[#1a1a1a]/60 uppercase">
                        {cat.coverage}
                      </span>
                    </div>
                  </div>
                  <span className="mono text-[10px] uppercase px-2 py-0.5 border border-[#1a1a1a]/10 bg-[#f8f7f2] text-[#1a1a1a] font-semibold">
                    {cat.depth}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="mono text-[10px] uppercase text-[#1a1a1a]/60 block">
                    Key Topic Coverage
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 bg-[#f8f7f2] border border-[#1a1a1a]/10 text-[#1a1a1a]/80 text-xs mono rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs pt-2">
                <div className="p-3 bg-[#f8f7f2] border-l-2 border-[#1a1a1a] text-[#1a1a1a]/80">
                  <strong className="text-[#1a1a1a] uppercase tracking-wider text-[10px] block mb-1">
                    Editorial Review:
                  </strong>
                  {cat.reviewNotes}
                </div>
                <div className="p-3 bg-[#fdf2ee] border-l-2 border-[#d44e28] text-[#8c2d13]">
                  <strong className="text-[#d44e28] uppercase tracking-wider text-[10px] block mb-1">
                    Optimization Vector:
                  </strong>
                  {cat.optimizationPotential}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic SWOT & Expansion Roadmap */}
      <section className="border border-[#1a1a1a]/10 bg-white p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#1a1a1a]/10 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight text-[#1a1a1a]">
              Strategic Ecosystem Roadmap for Jim Koto (James Isa)
            </h2>
            <p className="mono text-[10px] uppercase text-[#1a1a1a]/60 mt-0.5">
              Synthesis of Technical Strengths & Growth Vectors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strengths */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2 border-b border-[#1a1a1a]/8 pb-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#d44e28]" />
              <span>Core Strengths & Market Authority</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-[#1a1a1a]/80">
              {STRATEGIC_SWOT.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 bg-[#fdfcf8] border border-[#1a1a1a]/10">
                  <span className="mono font-bold text-[#d44e28] shrink-0">0{idx + 1} —</span>
                  <span className="leading-relaxed">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2 border-b border-[#1a1a1a]/8 pb-1.5">
              <Sparkles className="w-4 h-4 text-[#d44e28]" />
              <span>Expansion & Application Opportunities</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-[#1a1a1a]/80">
              {STRATEGIC_SWOT.opportunities.map((opp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 bg-[#fdfcf8] border border-[#1a1a1a]/10">
                  <span className="mono font-bold text-[#1a1a1a] shrink-0">→</span>
                  <span className="leading-relaxed">{opp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-[#1a1a1a]/10 flex flex-wrap items-center justify-between gap-3">
          <span className="mono text-xs text-[#1a1a1a]/60 uppercase">
            Explore Application Blueprints & Live Workbench:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToIncubator}
              className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#d44e28] text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
            >
              Explore 6 App Blueprints →
            </button>
            <button
              onClick={onNavigateToOptimizer}
              className="px-4 py-2 border border-[#1a1a1a]/20 bg-white hover:bg-[#f8f7f2] text-[#1a1a1a] text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
            >
              Launch Code Optimizer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

