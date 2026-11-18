export interface TutorialQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TutorialItem {
  id: string;
  title: string;
  slug: string;
  category: 'Frontend' | 'Backend' | 'Performance' | 'DevOps & Cloud' | 'AI Integration' | 'Architecture';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  publishDate: string;
  author: string;
  summary: string;
  tags: string[];
  keyTakeaways: string[];
  codeSnippets: {
    language: string;
    title: string;
    code: string;
  }[];
  contentSections: {
    heading: string;
    body: string;
  }[];
  quiz: TutorialQuiz;
}

export const TUTORIALS_DATA: TutorialItem[] = [
  {
    id: "react-19-server-components",
    title: "React 19 & Next.js 15 Server Components (RSC) Architecture in Practice",
    slug: "react-19-server-components-architecture",
    category: "Frontend",
    difficulty: "Advanced",
    readTime: "8 min read",
    publishDate: "August 2026",
    author: "Jim Koto (James Isa)",
    summary: "Deep dive into React Server Components, streaming SSR, and zero-bundle server logic to achieve sub-second LCP and crystal-clear data separation.",
    tags: ["React 19", "Next.js 15", "RSC", "Performance", "TypeScript"],
    keyTakeaways: [
      "Keep heavy dependencies (markdown parsers, date formatters, database clients) on the server side to ship zero JS to the client.",
      "Use Suspense boundaries strategically around asynchronous data fetches to enable progressive HTML streaming.",
      "Pass server actions as standard props or form action handlers with automatic optimistic UI updates."
    ],
    codeSnippets: [
      {
        language: "tsx",
        title: "Server Component Data Fetching with Suspense Boundary",
        code: `// app/articles/page.tsx (Server Component by default)
import { Suspense } from 'react';
import { ArticleListSkeleton } from '@/components/ArticleListSkeleton';
import { ArticleGrid } from '@/components/ArticleGrid';

export const revalidate = 3600; // Edge Cache for 1 hour (ISR)

export default async function ArticlesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Engineering Tutorials</h1>
        <p className="text-slate-400">Curated by Jim Koto Tech Lab</p>
      </header>

      {/* Streaming SSR: The shell renders instantly while data streams */}
      <Suspense fallback={<ArticleListSkeleton count={6} />}>
        <ArticleGrid />
      </Suspense>
    </main>
  );
}`
      },
      {
        language: "tsx",
        title: "Async Data Fetching inside Server Component",
        code: `// components/ArticleGrid.tsx (Server Component)
import { db } from '@/db';
import { articles } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { ArticleCard } from './ArticleCard';

export async function ArticleGrid() {
  // Direct database query with zero API roundtrips
  const allArticles = await db.select().from(articles).orderBy(desc(articles.createdAt)).limit(12);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}`
      }
    ],
    contentSections: [
      {
        heading: "1. The Shift from Client-Heavy to Zero-Bundle Server Components",
        body: "In traditional React client-side rendering (CSR), the entire application bundle—including database clients, schema validators, and data transformers—was downloaded and parsed by the user's mobile CPU. With React 19 Server Components, code executed on the server produces serialized UI nodes, resulting in 0 KB of client JavaScript footprint for read-only pages."
      },
      {
        heading: "2. Strategic Suspense & Progressive Hydration",
        body: "Instead of waiting for the slowest database query before sending any HTML byte, Next.js 15 streams the static navigation shell immediately (giving a TTFB under 100ms), and fills in the dynamic components as their promises resolve via HTTP chunked transfer encoding."
      }
    ],
    quiz: {
      question: "What is the primary benefit of React Server Components (RSC) regarding client bundle size?",
      options: [
        "Server Components compress PNG images into WebP automatically.",
        "Dependencies used strictly inside Server Components (like database drivers and parsers) are never bundled into the client JavaScript.",
        "They eliminate the need for CSS in modern web applications.",
        "They force all state to be stored in the browser's LocalStorage."
      ],
      correctIndex: 1,
      explanation: "Correct! Server Components run only on the server, meaning all their import statements and heavy libraries contribute zero bytes to the client JavaScript bundle sent to users."
    }
  },
  {
    id: "core-web-vitals-subsecond",
    title: "Sub-Second Core Web Vitals in Practice: Eliminating Layout Shifts & Long Tasks",
    slug: "sub-second-core-web-vitals-optimization",
    category: "Performance",
    difficulty: "Intermediate",
    readTime: "6 min read",
    publishDate: "August 2026",
    author: "Jim Koto (James Isa)",
    summary: "Actionable engineering techniques to achieve a 100/100 Lighthouse score, LCP < 0.8s, CLS < 0.01, and INP < 50ms across all device viewports.",
    tags: ["Core Web Vitals", "LCP", "CLS", "INP", "Performance"],
    keyTakeaways: [
      "Always declare explicit width/height or aspect-ratio CSS rules on dynamic images, embeds, and code containers to guarantee zero CLS.",
      "Preload your primary font (WOFF2) with fetchpriority='high' and use font-display: swap to prevent invisible text during font loading.",
      "Break long JavaScript main-thread tasks using scheduler.yield() or requestIdleCallback to keep Interaction to Next Paint (INP) under 50ms."
    ],
    codeSnippets: [
      {
        language: "html",
        title: "Optimized HTML Head for Instant Font & Hero Asset Loading",
        code: `<!-- Critical Font Preloading with Crossorigin -->
<link
  rel="preload"
  href="/fonts/inter-latin-var.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
  fetchpriority="high"
/>

<!-- Hero Image Preload with Responsive Source Attributes -->
<link
  rel="preload"
  as="image"
  href="/images/hero-banner.avif"
  type="image/avif"
  fetchpriority="high"
/>`
      },
      {
        language: "typescript",
        title: "Yielding Main Thread to Prevent High INP on Heavy Computations",
        code: `// Yield to the browser main thread between heavy processing chunks
export async function processLargeDatasetWithYield<T, R>(
  items: T[],
  processItem: (item: T) => R
): Promise<R[]> {
  const results: R[] = [];
  const CHUNK_SIZE = 50;

  for (let i = 0; i < items.length; i++) {
    results.push(processItem(items[i]));

    // Every 50 items, yield back to the browser to handle user clicks and scrolls
    if (i % CHUNK_SIZE === 0 && i > 0) {
      if ('scheduler' in window && 'yield' in (window as any).scheduler) {
        await (window as any).scheduler.yield();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
  }

  return results;
}`
      }
    ],
    contentSections: [
      {
        heading: "1. Solving Cumulative Layout Shift (CLS) Permanently",
        body: "CLS is often caused by late-arriving ads, unsized images, or asynchronous font swaps. By adopting rigid container aspect ratios and reserving placeholder heights via skeleton CSS containers, layout shifts are reduced to zero."
      },
      {
        heading: "2. The New INP (Interaction to Next Paint) Metric",
        body: "INP replaced FID as a Core Web Vital. While FID only measured the first click, INP measures the worst response across the entire page visit. Heavy event listeners must be debounced and long iterations broken down with scheduler.yield()."
      }
    ],
    quiz: {
      question: "Which web standard API allows JavaScript to yield execution back to the browser's main thread to maintain low INP during heavy loops?",
      options: [
        "document.write()",
        "scheduler.yield() or setTimeout(..., 0)",
        "window.alert()",
        "history.pushState()"
      ],
      correctIndex: 1,
      explanation: "Correct! scheduler.yield() (with a fallback to setTimeout(0)) voluntarily pauses JavaScript execution so the browser can process pending user inputs, clicks, and frame paints."
    }
  },
  {
    id: "fullstack-gemini-sdk",
    title: "Building Production Full-Stack AI Features with Server-Side Google GenAI SDK",
    slug: "fullstack-gemini-sdk-node-react",
    category: "AI Integration",
    difficulty: "Advanced",
    readTime: "10 min read",
    publishDate: "August 2026",
    author: "Jim Koto (James Isa)",
    summary: "Architecting a secure, high-speed AI pipeline with Node.js Express and React using the latest @google/genai SDK, structured JSON output, and robust error resilience.",
    tags: ["Gemini 3.7", "@google/genai", "Node.js", "Express", "TypeScript"],
    keyTakeaways: [
      "Always initialize GoogleGenAI strictly on the server-side with process.env.GEMINI_API_KEY and custom User-Agent headers.",
      "Use responseSchema with strict Type Enums to guarantee parseable JSON responses without messy regex extraction.",
      "Implement structured rate-limiting, error fallbacks, and streaming for optimal UX during long generations."
    ],
    codeSnippets: [
      {
        language: "typescript",
        title: "Server-Side Google GenAI SDK Initialization & Schema Generation",
        code: `import { GoogleGenAI, Type } from '@google/genai';
import express from 'express';

const app = express();
app.use(express.json());

// Server-side Gemini client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: { 'User-Agent': 'aistudio-build' }
  }
});

app.post('/api/ai/code-audit', async (req, res) => {
  try {
    const { sourceCode } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: \`Audit this code for security vulnerabilities and performance bottlenecks:\\n\${sourceCode}\`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: 'Score out of 100' },
            vulnerabilities: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            refactoredCode: { type: Type.STRING }
          },
          required: ['score', 'vulnerabilities', 'refactoredCode']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});`
      }
    ],
    contentSections: [
      {
        heading: "1. Security & Separation of Concerns",
        body: "Never invoke AI APIs directly from client browser bundles. Keeping all GenAI interactions behind server-side Express or Edge middleware protects sensitive API keys, enforces user rate-limits, and sanitizes untrusted inputs."
      },
      {
        heading: "2. Leveraging Type-Safe JSON Schemas",
        body: "By supplying a strict responseSchema definition using the @google/genai Type enum, Gemini guarantees mathematically valid JSON matching your exact TypeScript interface."
      }
    ],
    quiz: {
      question: "Where should the GoogleGenAI client SDK be instantiated in a production web application?",
      options: [
        "In the React component's useEffect hook in the browser.",
        "Strictly on the server side (Node.js/Express/Edge) to protect API keys and sanitize inputs.",
        "In a public script tag inside index.html.",
        "In a browser cookie."
      ],
      correctIndex: 1,
      explanation: "Correct! Gemini API calls must always be made from server-side code to keep API credentials secure and prevent client-side credential exposure."
    }
  },
  {
    id: "clean-architecture-typescript",
    title: "Clean Architecture & Domain-Driven Design in Modern TypeScript",
    slug: "clean-architecture-domain-driven-design-typescript",
    category: "Architecture",
    difficulty: "Advanced",
    readTime: "7 min read",
    publishDate: "August 2026",
    author: "Jim Koto (James Isa)",
    summary: "Structuring enterprise-ready TypeScript applications using Entities, Use Cases, Repository Pattern, and Dependency Inversion.",
    tags: ["Clean Architecture", "DDD", "TypeScript", "Design Patterns"],
    keyTakeaways: [
      "Keep core business domain logic 100% free of external framework and database dependencies.",
      "Define repository interfaces in the domain layer and implement them in the infrastructure layer (Dependency Inversion Principle).",
      "Use explicit Result types instead of throwing exceptions for predictable control flow."
    ],
    codeSnippets: [
      {
        language: "typescript",
        title: "Domain Layer Entity & Repository Interface",
        code: `// domain/entities/Article.ts
export interface ArticleProps {
  id: string;
  title: string;
  slug: string;
  content: string;
  viewCount: number;
  publishedAt: Date;
}

export class Article {
  private constructor(private readonly props: ArticleProps) {}

  static create(props: Omit<ArticleProps, 'id' | 'viewCount' | 'publishedAt'>): Article {
    return new Article({
      ...props,
      id: crypto.randomUUID(),
      viewCount: 0,
      publishedAt: new Date()
    });
  }

  incrementView(): void {
    this.props.viewCount += 1;
  }

  get id() { return this.props.id; }
  get title() { return this.props.title; }
  get viewCount() { return this.props.viewCount; }
}

// domain/repositories/IArticleRepository.ts
export interface IArticleRepository {
  findById(id: string): Promise<Article | null>;
  save(article: Article): Promise<void>;
}`
      }
    ],
    contentSections: [
      {
        heading: "1. The Dependency Rule",
        body: "Source code dependencies must point only inward toward higher-level policies. Nothing in an inner circle can know anything at all about something in an outer circle (e.g. database schema, web framework, UI)."
      }
    ],
    quiz: {
      question: "According to Clean Architecture, which layer should contain core business rules without any framework or database imports?",
      options: [
        "The Controller layer",
        "The Domain Entity layer",
        "The React UI component layer",
        "The Docker container layer"
      ],
      correctIndex: 1,
      explanation: "Correct! The Domain Entity layer sits at the center and must remain pure and free from any UI, database, or third-party framework dependencies."
    }
  }
];
