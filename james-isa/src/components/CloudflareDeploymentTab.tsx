import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Database, 
  Globe, 
  Copy, 
  Check, 
  RefreshCw, 
  CheckCircle2, 
  ExternalLink, 
  Terminal, 
  Server, 
  Layers, 
  FileCode2, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Table,
  Lock
} from 'lucide-react';
import { fetchArticlesFromCMS, LiveArticle, CMSResponse } from '../services/googleSheetsCms';

export const CloudflareDeploymentTab: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<CMSResponse | null>(null);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<LiveArticle | null>(null);

  const loadInitialData = async () => {
    setIsSyncing(true);
    const data = await fetchArticlesFromCMS();
    setSyncResult(data);
    if (data.articles.length > 0) {
      setSelectedArticle(data.articles[0]);
    }
    setIsSyncing(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    const data = await fetchArticlesFromCMS();
    setSyncResult(data);
    if (data.articles.length > 0) {
      setSelectedArticle(data.articles[0]);
    }
    setIsSyncing(false);
  };

  const copyToClipboard = (text: string, fileKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(fileKey);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const cloudflareWorkerCode = `/**
 * Cloudflare Worker: Secure Headless CMS Edge Proxy
 * Domain: jimkoto.my.id
 * Security: Uses Cloudflare Environment Secret (env.GOOGLE_SHEET_ID)
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Strict CORS Headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 2. Secure Route: /api/articles (Fetches Sheet ID from env secret)
    if (url.pathname === "/api/articles" || url.pathname === "/api/cms/articles") {
      const cache = caches.default;
      const cacheKey = new Request(url.toString(), request);
      let cachedResponse = await cache.match(cacheKey);

      if (cachedResponse) {
        return cachedResponse; // Instant Edge Cache Hit (<20ms)
      }

      // Secure retrieval of Sheet ID from Worker Environment Secret
      const sheetId = env.GOOGLE_SHEET_ID;
      if (!sheetId) {
        return new Response(
          JSON.stringify({ error: "GOOGLE_SHEET_ID secret is not configured in Cloudflare Worker environment" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      try {
        const gvizUrl = \`https://docs.google.com/spreadsheets/d/\${sheetId}/gviz/tq?tqx=out:json\`;
        const res = await fetch(gvizUrl);
        const text = await res.text();
        const jsonMatch = text.match(/google\\.visualization\\.Query\\.setResponse\\(([\\s\\S]*)\\);/);
        
        if (!jsonMatch) {
          throw new Error("Unable to parse Google Sheet payload");
        }

        const data = JSON.parse(jsonMatch[1]);
        const cols = (data.table?.cols || []).map((c, i) => (c?.label || \`col_\${i}\`).trim().toLowerCase());
        const rows = data.table?.rows || [];

        const articles = rows.map((r, idx) => {
          const getVal = (colIndex) => r?.c?.[colIndex]?.v ?? r?.c?.[colIndex]?.f ?? "";
          const findCol = (keys) => {
            const index = cols.findIndex((name) => keys.some((k) => name.includes(k)));
            return index !== -1 ? String(getVal(index)) : "";
          };

          const title = findCol(["title", "judul", "name"]) || getVal(0) || \`Article #\${idx + 1}\`;
          return {
            id: \`article-\${idx + 1}\`,
            slug: findCol(["slug", "url"]) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            title,
            category: findCol(["category", "kategori", "topic"]) || "Engineering",
            author: findCol(["author", "penulis"]) || "Jim Koto (James Isa)",
            publishDate: findCol(["date", "tanggal"]) || "2026",
            readTime: findCol(["read", "time"]) || "5 min read",
            tags: (findCol(["tags", "tag"]) || "Tech, Architecture").split(/[,#|]/).map(t => t.trim()),
            summary: findCol(["summary", "ringkasan", "desc"]) || findCol(["content"]).slice(0, 160),
            content: findCol(["content", "konten", "body"]) || "",
            codeSnippet: findCol(["code", "snippet"]) || ""
          };
        }).filter(a => a.title && a.title.trim() !== "");

        const responsePayload = JSON.stringify({
          status: "success",
          source: "Cloudflare Edge + Secure Isolated Google Sheets CMS",
          timestamp: new Date().toISOString(),
          count: articles.length,
          articles
        });

        const response = new Response(responsePayload, {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400",
            "X-Powered-By": "Jim Koto Edge Worker"
          }
        });

        // Store into Cloudflare Global Edge Cache
        ctx.waitUntil(cache.put(cacheKey, response.clone()));
        return response;
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message, fallback: true }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    return new Response(
      JSON.stringify({ message: "Jim Koto Cloudflare Worker API is Active", domain: "jimkoto.my.id" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};`;

  const wranglerConfig = `name = "jimkoto-api"
main = "worker.js"
compatibility_date = "2026-08-01"

routes = [
  { pattern = "jimkoto.my.id/api/*", zone_name = "jimkoto.my.id" },
  { pattern = "api.jimkoto.my.id/*", zone_name = "jimkoto.my.id" }
]

# Set secret via CLI: npx wrangler secret put GOOGLE_SHEET_ID
[vars]
ENVIRONMENT = "production"`;

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="border border-[#1a1a1a]/10 bg-white p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[#1a1a1a]/10 pb-4">
          <div className="space-y-1 max-w-2xl">
            <span className="mono inline-block text-[10px] text-[#d44e28] font-bold uppercase tracking-widest mb-1">
              Architecture Blueprint • Isolated Server CMS & Edge Proxy
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold tracking-tight text-[#1a1a1a]">
              Secure Live Deployment: Cloudflare Worker + Headless CMS
            </h1>
            <p className="text-xs sm:text-sm text-[#1a1a1a]/70 font-serif italic">
              Fungsi pengambilan data Google Sheets telah <strong>dipisahkan secara aman di backend server / edge proxy</strong> tanpa mengekspos ID spreadsheet ke browser atau client bundle publik.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#d44e28] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Test Backend Proxy (/api/cms/articles)'}</span>
            </button>
          </div>
        </div>

        {/* Security & Isolation Status Bar */}
        <div className="p-4 bg-[#fdfcf8] border border-[#1a1a1a]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#d44e28]" />
            <span className="mono font-bold uppercase text-[11px] text-[#1a1a1a]">Security Architecture:</span>
            <span className="mono text-xs text-[#1a1a1a] bg-[#f8f7f2] px-2 py-0.5 border border-[#1a1a1a]/15 font-medium">
              ID Isolated in Server Environment (env.GOOGLE_SHEET_ID)
            </span>
          </div>

          <div className="flex items-center gap-3 mono text-[11px]">
            <span className="flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${syncResult?.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              <span className="uppercase">{syncResult?.status === 'online' ? 'Proxy Online' : 'Fallback Mode'}</span>
            </span>
            <span className="text-[#1a1a1a]/50 uppercase">Zero Client Leakage</span>
          </div>
        </div>
      </div>

      {/* 3-Step Secure Implementation Architecture */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-[#1a1a1a]/10 bg-white p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1a1a1a]/8 pb-2">
            <span className="mono text-[10px] font-bold uppercase tracking-widest text-[#d44e28]">Step 01</span>
            <Lock className="w-4 h-4 text-[#1a1a1a]/70" />
          </div>
          <h3 className="text-lg font-serif font-semibold text-[#1a1a1a]">Set Secret via CLI / Env</h3>
          <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">
            Simpan ID spreadsheet sebagai secret terenkripsi di Cloudflare Worker atau file <code className="mono text-[10px] bg-[#f8f7f2] px-1 py-0.5">.env</code> server:
          </p>
          <div className="p-2.5 bg-[#fdfcf8] border border-[#1a1a1a]/10 text-[11px] mono text-[#d44e28] break-all">
            $ npx wrangler secret put GOOGLE_SHEET_ID
          </div>
        </div>

        <div className="border border-[#1a1a1a]/10 bg-white p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1a1a1a]/8 pb-2">
            <span className="mono text-[10px] font-bold uppercase tracking-widest text-[#d44e28]">Step 02</span>
            <Cloud className="w-4 h-4 text-[#1a1a1a]/70" />
          </div>
          <h3 className="text-lg font-serif font-semibold text-[#1a1a1a]">Deploy Edge Proxy</h3>
          <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">
            Deploy worker sebagai reverse proxy yang melayani endpoint <code className="mono text-[10px] bg-[#f8f7f2] px-1 py-0.5">/api/articles</code> dengan edge caching 3600 detik.
          </p>
          <div className="p-2.5 bg-[#fdfcf8] border border-[#1a1a1a]/10 text-[11px] mono text-[#1a1a1a]">
            $ npx wrangler deploy
          </div>
        </div>

        <div className="border border-[#1a1a1a]/10 bg-white p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1a1a1a]/8 pb-2">
            <span className="mono text-[10px] font-bold uppercase tracking-widest text-[#d44e28]">Step 03</span>
            <Globe className="w-4 h-4 text-[#1a1a1a]/70" />
          </div>
          <h3 className="text-lg font-serif font-semibold text-[#1a1a1a]">Connect jimkoto.my.id</h3>
          <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">
            Frontend client memanggil endpoint relatif <code className="mono text-[10px] bg-[#f8f7f2] px-1 py-0.5">/api/cms/articles</code> tanpa mengetahui Google Sheet ID aslinya.
          </p>
          <div className="p-2.5 bg-[#fdfcf8] border border-[#1a1a1a]/10 text-[11px] text-[#d44e28] font-bold mono">
            ✓ 100% Client-Safe & Private
          </div>
        </div>
      </section>

      {/* Live Headless CMS Article Explorer */}
      <section className="border border-[#1a1a1a]/10 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1a1a1a]/10 pb-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight text-[#1a1a1a]">
              Live Articles Synchronized via Secure Proxy
            </h2>
            <p className="mono text-[11px] tracking-wider text-[#1a1a1a]/60 uppercase mt-0.5">
              Source: {syncResult?.source || 'Syncing...'} ({syncResult?.articles.length || 0} Articles Detected)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs mono text-[#d44e28]">
            <ShieldCheck className="w-4 h-4" />
            <span>Encrypted Server-Side Fetch</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Article List */}
          <div className="lg:col-span-5 space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {syncResult?.articles.map((art) => {
              const isSelected = selectedArticle?.id === art.id;
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className={`cursor-pointer border p-4 transition space-y-2 ${
                    isSelected
                      ? 'border-[#d44e28] bg-white ring-1 ring-[#d44e28]'
                      : 'border-[#1a1a1a]/10 bg-white hover:border-[#1a1a1a]/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mono uppercase text-[#1a1a1a]/60 border-b border-[#1a1a1a]/8 pb-1">
                    <span>{art.category}</span>
                    <span className="mono text-[#1a1a1a]">{art.readTime}</span>
                  </div>
                  <h4 className="text-base font-serif font-semibold text-[#1a1a1a] leading-snug">
                    {art.title}
                  </h4>
                  <p className="text-xs text-[#1a1a1a]/70 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Live Article View */}
          <div className="lg:col-span-7 border border-[#1a1a1a]/10 bg-[#fdfcf8] p-6 space-y-4 flex flex-col justify-between">
            {selectedArticle ? (
              <div className="space-y-4">
                <div className="space-y-2 border-b border-[#1a1a1a]/10 pb-3">
                  <div className="flex items-center justify-between text-[10px] mono uppercase">
                    <span className="bg-[#1a1a1a] text-white px-2 py-0.5">{selectedArticle.category}</span>
                    <span className="text-[#1a1a1a]/60 mono">{selectedArticle.publishDate}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1a1a1a]">
                    {selectedArticle.title}
                  </h3>
                  <p className="text-xs text-[#1a1a1a]/60 mono">By {selectedArticle.author}</p>
                </div>

                <div className="text-xs sm:text-sm text-[#1a1a1a]/80 leading-relaxed space-y-3 font-serif">
                  <p className="italic text-[#1a1a1a]">"{selectedArticle.summary}"</p>
                  <div className="whitespace-pre-wrap font-sans text-xs bg-white p-3 border border-[#1a1a1a]/10 max-h-40 overflow-y-auto">
                    {selectedArticle.content}
                  </div>
                </div>

                {selectedArticle.codeSnippet && (
                  <div className="space-y-1">
                    <span className="mono text-[10px] font-bold uppercase text-[#1a1a1a] tracking-wider">Code Snippet:</span>
                    <pre className="bg-[#1a1a1a] text-slate-200 p-3 mono text-xs overflow-x-auto max-h-32">
                      <code>{selectedArticle.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-[#1a1a1a]/50 font-serif italic">
                Select an article on the left to preview.
              </div>
            )}

            <div className="pt-4 border-t border-[#1a1a1a]/10 flex items-center justify-between text-xs text-[#1a1a1a]/60 mono">
              <span>Client Endpoint: /api/cms/articles</span>
              <span className="text-[#d44e28] font-bold">Secure JSON Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* Production Deployment Files: worker.js & wrangler.toml */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Worker.js */}
        <div className="border border-[#1a1a1a]/10 bg-white overflow-hidden flex flex-col">
          <div className="px-4 py-2.5 bg-[#f8f7f2] border-b border-[#1a1a1a]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-[#d44e28]" />
              <span className="mono text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
                worker.js (Cloudflare Worker Code)
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(cloudflareWorkerCode, 'worker')}
              className="inline-flex items-center gap-1 px-2.5 py-1 border border-[#1a1a1a]/15 bg-white hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] text-xs font-semibold uppercase transition cursor-pointer"
            >
              {copiedFile === 'worker' ? <Check className="w-3.5 h-3.5 text-[#d44e28]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFile === 'worker' ? 'Copied' : 'Copy worker.js'}</span>
            </button>
          </div>

          <div className="p-3 bg-[#1a1a1a] flex-1 overflow-auto">
            <pre className="text-slate-200 mono text-xs p-2 leading-relaxed max-h-[380px]">
              <code>{cloudflareWorkerCode}</code>
            </pre>
          </div>
        </div>

        {/* wrangler.toml */}
        <div className="border border-[#1a1a1a]/10 bg-white overflow-hidden flex flex-col">
          <div className="px-4 py-2.5 bg-[#f8f7f2] border-b border-[#1a1a1a]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#d44e28]" />
              <span className="mono text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
                wrangler.toml (Deployment Config)
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(wranglerConfig, 'wrangler')}
              className="inline-flex items-center gap-1 px-2.5 py-1 border border-[#1a1a1a]/15 bg-white hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] text-xs font-semibold uppercase transition cursor-pointer"
            >
              {copiedFile === 'wrangler' ? <Check className="w-3.5 h-3.5 text-[#d44e28]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFile === 'wrangler' ? 'Copied' : 'Copy wrangler.toml'}</span>
            </button>
          </div>

          <div className="p-3 bg-[#1a1a1a] flex-1 overflow-auto">
            <pre className="text-slate-200 mono text-xs p-2 leading-relaxed max-h-[380px]">
              <code>{wranglerConfig}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};
