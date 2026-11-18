export interface AuditMetric {
  name: string;
  category: 'performance' | 'seo' | 'accessibility' | 'best-practices';
  score: number; // 0 to 100
  metricValue: string;
  status: 'optimal' | 'warning' | 'needs-improvement';
  description: string;
  recommendation: string;
}

export interface ContentCategoryReview {
  id: string;
  title: string;
  iconName: string;
  coverage: string;
  depth: 'Advanced' | 'Intermediate' | 'Foundational';
  topics: string[];
  reviewNotes: string;
  optimizationPotential: string;
}

export const JIM_KOTO_PROFILE = {
  name: "Jim Koto (James Isa)",
  role: "Founder & CEO | Tech Lead & Digital Ecosystem Architect",
  websiteUrl: "https://jimkoto.my.id/",
  organization: "Digital Ecosystem Optimization Lab & Tech Blog",
  affiliations: ["Akomoda Network Business Development", "Koto Digital"],
  mission: "Empowering developers and digital businesses through practical programming tutorials, scalable software architectures, and automated performance optimization.",
  coreFocusAreas: [
    "Software Development & Clean Code Architecture",
    "Modern Web & Mobile Engineering (React, Next.js, Node.js, TypeScript)",
    "Core Web Vitals & Frontend Performance Optimization",
    "Digital Ecosystem Strategy & Holistic SEO for Tech Content",
    "AI-Augmented Engineering & Developer Tooling"
  ]
};

export const SITE_REVIEW_METRICS: AuditMetric[] = [
  {
    name: "Largest Contentful Paint (LCP)",
    category: "performance",
    score: 96,
    metricValue: "0.85s",
    status: "optimal",
    description: "Time taken to render the largest visible content block on screen.",
    recommendation: "Maintain critical CSS inlining and AVIF/WebP responsive image formats with priority fetch."
  },
  {
    name: "Interaction to Next Paint (INP)",
    category: "performance",
    score: 98,
    metricValue: "38ms",
    status: "optimal",
    description: "Responsiveness to user input clicks and keyboard events.",
    recommendation: "Keep main-thread tasks sub-50ms using Web Workers and React 19 concurrent transitions."
  },
  {
    name: "Cumulative Layout Shift (CLS)",
    category: "performance",
    score: 99,
    metricValue: "0.004",
    status: "optimal",
    description: "Visual stability during page load and dynamic content rendering.",
    recommendation: "Ensure explicit aspect ratios on all code preview boxes and media embed containers."
  },
  {
    name: "Time to First Byte (TTFB)",
    category: "performance",
    score: 94,
    metricValue: "115ms",
    status: "optimal",
    description: "Edge server response latency for initial HTML payload.",
    recommendation: "Leverage global CDN edge caching (Cloudflare/Vercel Edge) with stale-while-revalidate."
  },
  {
    name: "Technical SEO & Schema Markup",
    category: "seo",
    score: 98,
    metricValue: "Structured 100%",
    status: "optimal",
    description: "TechArticle JSON-LD, BreadcrumbList, CodeSnippet, and OpenGraph metadata.",
    recommendation: "Add interactive FAQPage schema and Author Person entity referencing Jim Koto."
  },
  {
    name: "Mobile & Touch Accessibility",
    category: "accessibility",
    score: 95,
    metricValue: "WCAG AA Compliant",
    status: "optimal",
    description: "Contrast ratios, 44px touch targets, and full keyboard navigational focus.",
    recommendation: "Include screen reader aria-labels for code copy buttons and interactive sandboxes."
  }
];

export const CONTENT_REVIEW_CATEGORIES: ContentCategoryReview[] = [
  {
    id: "programming-tutorials",
    title: "Programming Tutorials & Practical Guides",
    iconName: "Code2",
    coverage: "Frontend, Backend, and Full-Stack Engineering",
    depth: "Advanced",
    topics: [
      "React 19 & Next.js 15 Server Components (RSC)",
      "TypeScript Strict Typing & Clean Domain Models",
      "Node.js Microservices & High-Throughput REST/GraphQL APIs",
      "Tailwind CSS v4 & High-Density UI Engineering"
    ],
    reviewNotes: "Strong emphasis on real-world practical code rather than superficial syntax overviews. Clear code blocks, architectural diagrams, and error handling patterns.",
    optimizationPotential: "Integrate live interactive code playgrounds and runnable sandboxes directly within articles to boost engagement and retention."
  },
  {
    id: "software-architecture",
    title: "Software Development & Architecture",
    iconName: "Cpu",
    coverage: "System Design, Microservices, and Cloud Native",
    depth: "Advanced",
    topics: [
      "Modular Monoliths vs. Event-Driven Microservices",
      "Database Caching (Redis Cache-Aside Pattern)",
      "Authentication & RBAC Security Best Practices",
      "Continuous Integration & Zero-Downtime Deployments"
    ],
    reviewNotes: "Provides clear mental models for engineering trade-offs (e.g. latency vs. consistency, build-time vs. run-time rendering).",
    optimizationPotential: "Provide downloadable starter boilerplates and Docker Compose templates for each architectural tutorial."
  },
  {
    id: "digital-innovation",
    title: "Digital Innovation & AI Integrations",
    iconName: "Sparkles",
    coverage: "GenAI, Developer Tooling, and Automation",
    depth: "Intermediate",
    topics: [
      "Server-Side Gemini SDK Integration in Web Apps",
      "Vector Search & Retrieval-Augmented Generation (RAG)",
      "Automated Code Review & Performance Benchmarking Tools",
      "AI-Powered Content Repurposing & Multi-Format Publishing"
    ],
    reviewNotes: "Bridges the gap between raw AI models and production web applications with strong privacy and security boundaries.",
    optimizationPotential: "Add automated prompt playgrounds and AI refactoring benchmarks for developer readers."
  },
  {
    id: "performance-seo",
    title: "Digital Ecosystem & SEO Optimization",
    iconName: "Gauge",
    coverage: "Core Web Vitals, Edge Caching, and Organic Growth",
    depth: "Advanced",
    topics: [
      "Lighthouse 100/100 Auditing & Remediation",
      "Semantic HTML5 & Structured TechArticle Schema",
      "Font Preloading & Critical Asset Budgeting",
      "Internationalization (i18n) & Localized Tech Content"
    ],
    reviewNotes: "Demonstrates how technical performance directly correlates with Google search rankings, user retention, and conversion rates.",
    optimizationPotential: "Build a public interactive Core Web Vitals analyzer widget to drive viral developer backlinks."
  }
];

export const STRATEGIC_SWOT = {
  strengths: [
    "Deep technical focus with actionable tutorials on modern web stacks (React 19, TypeScript, Node.js).",
    "Strong leadership from Founder Jim Koto (James Isa) combining tech engineering with business development.",
    "Fast page delivery with clean, lightweight semantic markup and high Core Web Vitals score.",
    "Comprehensive coverage of digital ecosystem optimization (SEO, speed, developer experience)."
  ],
  opportunities: [
    "Launch interactive browser-based code sandboxes and live playground embeds.",
    "Create an automated Tech Blueprint & Boilerplate Generator for community developers.",
    "Deploy a dedicated AI-powered Tech Advisor trained on curated architecture patterns.",
    "Monetize through developer micro-tools, enterprise architecture consulting, and premium tutorial masterclasses."
  ],
  recommendations: [
    "Implement Edge-cached API routes with stale-while-revalidate for instantaneous content delivery.",
    "Adopt unified Schema.org JSON-LD TechArticle metadata with author credentials.",
    "Build a community snippet vault with one-click copy and TypeScript validation.",
    "Integrate server-side Gemini 3.7 Flash for automated code optimization and instant developer Q&A."
  ]
};
