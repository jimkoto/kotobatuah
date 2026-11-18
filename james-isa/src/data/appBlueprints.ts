export interface AppBlueprint {
  id: string;
  title: string;
  category: 'Developer Platform' | 'Performance Tool' | 'AI & Automation' | 'DevOps & Cloud' | 'Monetization & SaaS';
  tagline: string;
  summary: string;
  impactScore: number; // 1-100
  developmentComplexity: 'Moderate' | 'Advanced' | 'Enterprise';
  estimatedDevTime: string;
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    caching: string;
    aiEngine?: string;
  };
  keyFeatures: string[];
  optimizationGains: {
    metric: string;
    before: string;
    after: string;
    impact: string;
  }[];
  architectureHighlights: string[];
  starterSnippet: {
    language: string;
    filename: string;
    code: string;
  };
}

export const APP_BLUEPRINTS: AppBlueprint[] = [
  {
    id: "techhub-pro",
    title: "TechHub Pro - Modern Interactive Tech Blog & LMS",
    category: "Developer Platform",
    tagline: "High-performance developer publishing platform with interactive sandboxes and real-time code runners.",
    summary: "A next-generation tech publishing platform designed specifically for coding tutorials. Features built-in Monaco/WebContainers code execution, interactive knowledge check quizzes, reading progress syncing, and automatic MDX syntax highlighting.",
    impactScore: 97,
    developmentComplexity: "Advanced",
    estimatedDevTime: "2-3 weeks",
    techStack: {
      frontend: "React 19, TypeScript, Tailwind CSS v4, Monaco Editor",
      backend: "Node.js Express / Edge Runtime",
      database: "PostgreSQL / SQLite with Drizzle ORM",
      caching: "Cloudflare Edge + Redis Cache-Aside",
      aiEngine: "Gemini 3.7 Flash for Auto-Generated Quizzes & Summaries"
    },
    keyFeatures: [
      "In-browser runnable code sandboxes for React, TypeScript, Python, and SQL",
      "Interactive knowledge checks with instant explanation & score tracking",
      "Automated MDX-to-JSON-LD TechArticle schema injection for top Google rankings",
      "Dark/Light high-contrast syntax highlighting with zero layout shifts",
      "Developer bookmarking, reading notes, and offline-first IndexedDB sync"
    ],
    optimizationGains: [
      { metric: "Reader Engagement Time", before: "1m 45s", after: "5m 20s", impact: "+205% session duration" },
      { metric: "Core Web Vitals LCP", before: "1.9s", after: "0.62s", impact: "Instantaneous Edge SSR" },
      { metric: "Organic Search CTR", before: "2.8%", after: "7.4%", impact: "Rich Snippets & Code schema" }
    ],
    architectureHighlights: [
      "Static Site Generation (SSG) with Incremental Static Regeneration (ISR)",
      "Client-side Web Worker sandboxing to run code without backend server costs",
      "Edge-side content negotiation for ultra-compressed AVIF and WebP images"
    ],
    starterSnippet: {
      language: "typescript",
      filename: "src/components/InteractiveCodeRunner.tsx",
      code: `import React, { useState } from 'react';

interface CodeRunnerProps {
  initialCode: string;
  language: 'javascript' | 'typescript';
}

export const InteractiveCodeRunner: React.FC<CodeRunnerProps> = ({ initialCode, language }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const executeCode = () => {
    setIsRunning(true);
    const logs: string[] = [];
    const customConsole = {
      log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
      error: (...args: any[]) => logs.push(\`[ERROR] \${args.join(' ')}\`)
    };

    try {
      const runFn = new Function('console', code);
      runFn(customConsole);
      setOutput(logs.join('\\n') || 'Execution finished with no output.');
    } catch (err: any) {
      setOutput(\`Runtime Error: \${err.message}\`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden text-slate-100 font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700">
        <span className="text-xs text-cyan-400 font-semibold">{language.toUpperCase()} RUNTIME</span>
        <button 
          onClick={executeCode}
          disabled={isRunning}
          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white rounded text-xs font-sans font-medium transition"
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>
      <textarea 
        value={code} 
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-32 p-3 bg-transparent text-slate-200 outline-none resize-none"
      />
      {output && (
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-xs text-emerald-400 whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
};`
    }
  },
  {
    id: "speedpulse-optimizer",
    title: "SpeedPulse - Core Web Vitals & Web Asset Optimizer",
    category: "Performance Tool",
    tagline: "Automated frontend performance auditor, bundle analyzer, and critical asset optimizer.",
    summary: "An active optimization tool that inspects web pages and scripts, simulates Core Web Vitals under throttled network conditions, identifies uncompressed bundles, generates critical inline CSS, and optimizes font delivery.",
    impactScore: 95,
    developmentComplexity: "Moderate",
    estimatedDevTime: "1-2 weeks",
    techStack: {
      frontend: "React 19, TypeScript, Tailwind CSS, Lucide Icons",
      backend: "Node.js Performance Observer & Puppeteer Runner",
      database: "Redis / In-memory time-series store",
      caching: "Edge CDN Headers",
      aiEngine: "Gemini 3.7 Flash for Automated Refactoring Recommendations"
    },
    keyFeatures: [
      "Real-time Core Web Vitals analyzer (LCP, INP, CLS, TTFB, FCP)",
      "Unused JavaScript & CSS tree-shaking detector with visual treemap",
      "Automated font preloading snippet generator with display: swap",
      "WebP/AVIF image format pipeline calculation and byte savings estimator",
      "Instant 1-Click Code Patch Generator for Vite & Next.js configs"
    ],
    optimizationGains: [
      { metric: "Total Bundle Size", before: "480 KB", after: "142 KB", impact: "-70.4% script payload" },
      { metric: "Interaction to Next Paint", before: "180ms", after: "32ms", impact: "82% faster user response" },
      { metric: "Google PageSpeed Score", before: "71/100", after: "99/100", impact: "+28 points gain" }
    ],
    architectureHighlights: [
      "Headless Chrome protocol for synthetic user journey tracing",
      "Client-side AST parser (Babel/SWC) for instant bundle analysis without uploads",
      "Zero-dependency lightweight client metrics beacon (< 1.2 KB)"
    ],
    starterSnippet: {
      language: "typescript",
      filename: "src/utils/performanceObserver.ts",
      code: `export interface WebVitalsReport {
  lcp: number | null;
  inp: number | null;
  cls: number;
  ttfb: number | null;
}

export function initWebVitalsObserver(onReport: (report: WebVitalsReport) => void) {
  const report: WebVitalsReport = { lcp: null, inp: null, cls: 0, ttfb: null };

  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  // LCP Observer
  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      report.lcp = Math.round(lastEntry.startTime);
      onReport({ ...report });
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {}

  // CLS Observer
  try {
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any) {
        if (!entry.hadRecentInput) {
          report.cls += entry.value;
        }
      }
      report.cls = Number(report.cls.toFixed(4));
      onReport({ ...report });
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {}

  // TTFB Navigation
  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navEntry) {
    report.ttfb = Math.round(navEntry.responseStart);
    onReport({ ...report });
  }
}`
    }
  },
  {
    id: "devsnippet-vault",
    title: "DevSnippet & Architecture Template Library",
    category: "Developer Platform",
    tagline: "Curated, battle-tested software architecture templates and production-ready snippets.",
    summary: "A developer repository featuring tested design patterns, fullstack boilerplates (Next.js 15, Vite React 19, Express, Fastify), Docker setups, and CI/CD pipelines with one-click export and CLI scaffolding.",
    impactScore: 92,
    developmentComplexity: "Moderate",
    estimatedDevTime: "1-2 weeks",
    techStack: {
      frontend: "React 19, TypeScript, Tailwind CSS, Motion",
      backend: "Node.js Express / Edge API",
      database: "PostgreSQL / SQLite",
      caching: "Client-side LocalStorage & SWR",
      aiEngine: "Gemini 3.7 Flash for Custom Architecture Generation"
    },
    keyFeatures: [
      "Categorized architecture patterns (Repository Pattern, CQRS, Event-Driven, Clean DDD)",
      "One-click copy, download as ZIP, or npx cli generator command",
      "TypeScript strict mode validation for every code sample",
      "Live interactive architecture dependency graph visualizer",
      "Community rating, version compatibility badges, and comments"
    ],
    optimizationGains: [
      { metric: "Project Setup Time", before: "4 hours", after: "3 minutes", impact: "Instant production scaffolding" },
      { metric: "Architecture Tech Debt", before: "High", after: "Minimal", impact: "Standardized Clean Design" },
      { metric: "Developer Onboarding", before: "5 days", after: "1 day", impact: "Pre-documented domain layers" }
    ],
    architectureHighlights: [
      "Modular file hierarchy conforming to strict Clean Architecture boundaries",
      "Automated ESLint and TypeScript compilation verification",
      "Extensible plugin system for adding new framework templates"
    ],
    starterSnippet: {
      language: "typescript",
      filename: "src/patterns/ResultPattern.ts",
      code: `// Type-safe functional error handling without throw/try-catch overhead
export type Result<T, E = Error> = 
  | { success: true; data: T; error?: never }
  | { success: false; error: E; data?: never };

export const Result = {
  ok: <T>(data: T): Result<T, never> => ({ success: true, data }),
  fail: <E>(error: E): Result<never, E> => ({ success: false, error }),
  
  fromPromise: async <T, E = Error>(
    promise: Promise<T>,
    errorHandler?: (err: unknown) => E
  ): Promise<Result<T, E>> => {
    try {
      const data = await promise;
      return Result.ok(data);
    } catch (err) {
      const error = errorHandler ? errorHandler(err) : (err as E);
      return Result.fail(error);
    }
  }
};`
    }
  },
  {
    id: "ai-seo-copilot",
    title: "AI SEO & Schema.org JSON-LD Engine for Tech Publishers",
    category: "AI & Automation",
    tagline: "Automated technical SEO metadata, JSON-LD schema builder, and search intent optimizer.",
    summary: "An intelligent content assistant built for tech bloggers and documentation authors. Generates rich structured data (TechArticle, HowTo, FAQPage, SoftwareSourceCode), meta tags, open graph banners, and semantic keyword clusters.",
    impactScore: 94,
    developmentComplexity: "Moderate",
    estimatedDevTime: "1-2 weeks",
    techStack: {
      frontend: "React 19, TypeScript, Tailwind CSS",
      backend: "Node.js Server with @google/genai SDK",
      database: "PostgreSQL",
      caching: "Edge API",
      aiEngine: "Gemini 3.7 Flash for Semantic Analysis & Schema Generation"
    },
    keyFeatures: [
      "Instant Schema.org JSON-LD validator and generator for coding tutorials",
      "Semantic keyword density & search intent alignment checker",
      "Social preview generator (Twitter Card, LinkedIn, OpenGraph) with live preview",
      "Automated FAQ generation extracted directly from tutorial code and headers",
      "Internal linking suggestions across Jim Koto's article ecosystem"
    ],
    optimizationGains: [
      { metric: "Google Rich Results Eligibility", before: "30%", after: "100%", impact: "Full Schema.org conformance" },
      { metric: "Article Publishing Speed", before: "45 mins", after: "5 mins", impact: "Automated SEO meta creation" },
      { metric: "Search Visibility Index", before: "Baseline", after: "+140%", impact: "Semantic entity clustering" }
    ],
    architectureHighlights: [
      "Server-side Gemini 3.7 Flash schema extraction with strict JSON validation",
      "Zero client-side API key leakage with strict Express proxy routes",
      "Live JSON-LD schema linter conforming to Google Search Central requirements"
    ],
    starterSnippet: {
      language: "typescript",
      filename: "src/utils/schemaGenerator.ts",
      code: `export interface TechArticleMetadata {
  title: string;
  description: string;
  url: string;
  authorName: string;
  authorUrl: string;
  datePublished: string;
  programmingLanguage: string;
}

export function generateTechArticleSchema(meta: TechArticleMetadata): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": meta.title,
    "description": meta.description,
    "url": meta.url,
    "inLanguage": "en-US",
    "programmingLanguage": meta.programmingLanguage,
    "author": {
      "@type": "Person",
      "name": meta.authorName,
      "url": meta.authorUrl,
      "jobTitle": "Founder & CEO"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jim Koto Digital Ecosystem Lab",
      "url": "https://jimkoto.my.id/"
    },
    "datePublished": meta.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": meta.url
    }
  };

  return JSON.stringify(schema, null, 2);
}`
    }
  },
  {
    id: "api-sandbox-mock",
    title: "Micro-SaaS API Mock & Benchmarking Engine",
    category: "Developer Platform",
    tagline: "Interactive API prototyping sandbox, latency simulator, and endpoint benchmark studio.",
    summary: "Allows developers to rapidly define mock REST and GraphQL endpoints, inject simulated network latencies or error rates, inspect request/response payloads, and benchmark backend throughput before building production databases.",
    impactScore: 91,
    developmentComplexity: "Advanced",
    estimatedDevTime: "2-3 weeks",
    techStack: {
      frontend: "React 19, TypeScript, Tailwind CSS",
      backend: "Node.js Express with in-memory routing engine",
      database: "SQLite in memory",
      caching: "Edge KV Store",
      aiEngine: "Gemini 3.7 Flash for Synthetic Mock Data Generation"
    },
    keyFeatures: [
      "Instant mock endpoint creation with zero backend configuration",
      "Simulated latency jitter (50ms to 2000ms) and chaos engineering failure rates",
      "Automated TypeScript interface export from JSON response payloads",
      "Visual request inspector with headers, query params, and status codes",
      "Throughput load simulation with requests-per-second chart"
    ],
    optimizationGains: [
      { metric: "Frontend Unblocking Speed", before: "3 days waiting for API", after: "5 mins with mock", impact: "Zero frontend downtime" },
      { metric: "Edge Latency Testing", before: "Unmeasured", after: "Predictable p99", impact: "Realistic offline/slow 3G testing" }
    ],
    architectureHighlights: [
      "In-browser Service Worker mock interception for ultra-fast zero-network tests",
      "Dynamic synthetic data generation matching complex nested relational schemas",
      "OpenAPI 3.1 YAML and JSON import/export compatibility"
    ],
    starterSnippet: {
      language: "typescript",
      filename: "src/mocks/apiMockHandler.ts",
      code: `export interface MockEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  statusCode: number;
  delayMs: number;
  responseBody: any;
}

export class MockEngine {
  private endpoints: Map<string, MockEndpoint> = new Map();

  register(endpoint: MockEndpoint) {
    this.endpoints.set(\`\${endpoint.method}:\${endpoint.path}\`, endpoint);
  }

  async handle(method: string, path: string): Promise<{ status: number; body: any }> {
    const key = \`\${method}:\${path}\`;
    const endpoint = this.endpoints.get(key);

    if (!endpoint) {
      return { status: 404, body: { error: \`Endpoint \${method} \${path} not found\` } };
    }

    if (endpoint.delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, endpoint.delayMs));
    }

    return { status: endpoint.statusCode, body: endpoint.responseBody };
  }
}`
    }
  },
  {
    id: "ecomonitor-cloud",
    title: "EcoMonitor - Cloud & Infrastructure Cost/Performance Dashboard",
    category: "DevOps & Cloud",
    tagline: "Track hosting performance, edge cache hit rates, and compute cost efficiency.",
    summary: "A unified telemetry and optimization dashboard for cloud infrastructure. Analyzes CDN cache ratios, serverless execution durations, cold start impacts, and cloud egress costs with automated recommendations for high-efficiency scaling.",
    impactScore: 89,
    developmentComplexity: "Enterprise",
    estimatedDevTime: "3-4 weeks",
    techStack: {
      frontend: "React 19, TypeScript, Tailwind CSS, Recharts",
      backend: "Node.js Express with Cloud Telemetry Aggregator",
      database: "TimescaleDB / ClickHouse",
      caching: "Redis Edge",
      aiEngine: "Gemini 3.7 Flash for Infrastructure Cost Anomaly Detection"
    },
    keyFeatures: [
      "Edge cache hit ratio tracking (Target: >95% edge delivery)",
      "Serverless cold start duration monitoring and provisioned concurrency sizing",
      "Monthly cloud hosting cost projection with automated waste identification",
      "Carbon footprint & compute energy efficiency index",
      "Automated alerting via Webhooks and Telegram/Discord bots"
    ],
    optimizationGains: [
      { metric: "Monthly Cloud Bill", before: "$420/mo", after: "$115/mo", impact: "-72.6% compute cost reduction" },
      { metric: "Edge Cache Hit Rate", before: "68%", after: "96.4%", impact: "Significant backend offloading" },
      { metric: "Serverless Cold Starts", before: "850ms", after: "45ms", impact: "Optimal warmup orchestration" }
    ],
    architectureHighlights: [
      "Lightweight push-based metrics collector with batch flushing",
      "Anomaly detection model for sudden traffic surges or DDOS patterns",
      "Role-based multi-tenant access control for engineering teams"
    ],
    starterSnippet: {
      language: "typescript",
      filename: "src/telemetry/costEstimator.ts",
      code: `export interface CloudMetrics {
  totalRequests: number;
  edgeHits: number;
  originExecutions: number;
  avgDurationMs: number;
  bandwidthGb: number;
}

export function calculateHostingEfficiency(metrics: CloudMetrics) {
  const cacheHitRatio = (metrics.edgeHits / (metrics.totalRequests || 1)) * 100;
  const edgeCost = metrics.totalRequests * 0.0000005; // $0.50 per 1M
  const computeCost = metrics.originExecutions * (metrics.avgDurationMs / 1000) * 0.00001667;
  const egressCost = metrics.bandwidthGb * 0.08;
  const totalCost = edgeCost + computeCost + egressCost;

  return {
    cacheHitRatio: Number(cacheHitRatio.toFixed(1)),
    estimatedCost: Number(totalCost.toFixed(2)),
    potentialSavingsWith95PercentCache: Number((computeCost * 0.7).toFixed(2))
  };
}`
    }
  }
];
