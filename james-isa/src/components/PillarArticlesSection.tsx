import React, { useState, useEffect } from 'react';
import {
  Clock,
  Share2,
  Check,
  RefreshCw,
  ChevronRight,
  X,
  Code2,
  Search,
  LayoutGrid,
  List,
  BookOpen,
} from 'lucide-react';
import {
  fetchArticlesFromCMS,
  LiveArticle,
  OFFICIAL_SHEET_ID,
} from '../services/googleSheetsCms';

interface PillarArticlesSectionProps {
  onNavigate?: (tabId: string) => void;
  initialSlug?: string;
}

export const PillarArticlesSection: React.FC<PillarArticlesSectionProps> = ({
  initialSlug,
}) => {
  const [articles, setArticles] = useState<LiveArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeArticle, setActiveArticle] = useState<LiveArticle | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(6);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setVisibleCount(6);
  };

  const openArticle = (art: LiveArticle) => {
    setActiveArticle(art);
    if (window.history.pushState) {
      window.history.pushState({ slug: art.slug }, art.title, `/${art.slug}`);
    }
  };

  const closeArticle = () => {
    setActiveArticle(null);
    if (window.history.pushState) {
      window.history.pushState({}, '', '/');
    }
  };

  const loadPillarData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchArticlesFromCMS();
      setArticles(res.articles);

      const currentPath = window.location.pathname.replace(/^\/|\/$/g, '');
      const urlParams = new URLSearchParams(window.location.search);
      const rawTarget =
        initialSlug ||
        currentPath ||
        urlParams.get('slug') ||
        (window.location.hash.includes('slug=')
          ? window.location.hash.split('slug=')[1]
          : null);

      if (rawTarget && rawTarget !== '' && rawTarget !== 'index.html') {
        const cleanTarget = decodeURIComponent(rawTarget)
          .toLowerCase()
          .replace(/^https?:\/\/[^\/]+\/?/, '')
          .replace(/^\/+|\/+$/g, '');
        const matched = res.articles.find((a) => {
          const aSlug = a.slug.toLowerCase().replace(/^\/+|\/+$/g, '');
          return (
            aSlug === cleanTarget ||
            cleanTarget.includes(aSlug) ||
            aSlug.includes(cleanTarget) ||
            a.title.toLowerCase().includes(cleanTarget)
          );
        });
        if (matched) {
          setActiveArticle(matched);
        }
      }
    } catch (e) {
      console.error('Error fetching pillar articles:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPillarData();

    const handlePopState = () => {
      const currentPath = window.location.pathname.replace(/^\/|\/$/g, '');
      if (currentPath && articles.length > 0) {
        const matched = articles.find((a) => a.slug === currentPath);
        if (matched) setActiveArticle(matched);
        else setActiveArticle(null);
      } else {
        setActiveArticle(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [initialSlug]);

  useEffect(() => {
    if (activeArticle) {
      document.title = `${activeArticle.title} | Jim Koto · Akomoda Network`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', activeArticle.summary);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', activeArticle.title);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', activeArticle.summary);
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', `https://jimkoto.my.id/${activeArticle.slug}`);
      if (activeArticle.imageUrl) {
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) ogImage.setAttribute('content', activeArticle.imageUrl);
      }

      let scriptTag = document.getElementById('json-ld-article') as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'json-ld-article';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: activeArticle.title,
        description: activeArticle.summary,
        image: activeArticle.imageUrl || 'https://jimkoto.my.id/bio/assets/jim-koto-avatar-512.png',
        author: {
          '@type': 'Person',
          name: activeArticle.author || 'Jim Koto (James Isa)',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Jim Koto DevStudio · Akomoda Network',
          url: 'https://jimkoto.my.id',
        },
        datePublished: activeArticle.publishDate,
        mainEntityOfPage: `https://jimkoto.my.id/${activeArticle.slug}`,
      });
    } else {
      document.title = 'Jim Koto | Akomoda Network · Kesadaran Adalah Anugerah';
      const scriptTag = document.getElementById('json-ld-article');
      if (scriptTag) scriptTag.remove();
    }
  }, [activeArticle]);

  const handleCopyLink = (slug: string, id: string) => {
    const url = `https://jimkoto.my.id/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const allCategories: string[] = [
    'All',
    ...Array.from(new Set<string>(articles.map((a) => a.category).filter(Boolean))),
  ];

  const filteredArticles = articles.filter((art) => {
    const matchCategory =
      selectedCategory === 'All' ||
      art.category === selectedCategory ||
      art.tags?.includes(selectedCategory);
    const query = searchQuery.toLowerCase().trim();
    const matchSearch =
      !query ||
      art.title.toLowerCase().includes(query) ||
      art.summary?.toLowerCase().includes(query) ||
      art.category.toLowerCase().includes(query) ||
      art.tags?.some((t) => t.toLowerCase().includes(query));
    return matchCategory && matchSearch;
  });

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  return (
    <section id="artikel-pilar" className="scroll-mt-24 space-y-6 w-full">
      {/* Section Header matching Screenshot 2 */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Build Log · Hybrid Source Cloudflare + GoogleSheetID
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Artikel pilar dan dokumentasi rekayasa sistem yang tersinkronisasi dari Google Sheets CMS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 text-xs mono text-slate-400">
          <span>
            {articles.length > 0 ? `${articles.length} Artikel Live` : 'Menghubungkan...'}
          </span>
          <span aria-hidden="true">·</span>
          <span>Live dari /api/articles</span>
          <button
            type="button"
            onClick={loadPillarData}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Sinkronisasi...' : 'Sync'}</span>
          </button>
        </div>
      </div>

      {/* Clean Search + Category Filter + View Mode Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari judul artikel atau topik..."
              aria-label="Cari artikel"
              className="w-full pl-10 pr-8 py-2 bg-[#0d0c1a]/90 border border-white/15 focus:border-amber-400 rounded-lg text-xs text-white placeholder-slate-500 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                aria-label="Hapus pencarian"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            aria-label="Filter kategori artikel"
            className="px-3 py-2 bg-[#0d0c1a]/90 border border-white/15 focus:border-amber-400 text-slate-200 rounded-lg text-xs font-semibold mono cursor-pointer outline-none"
          >
            {allCategories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#0d0c1a] text-white">
                {cat === 'All' ? 'Semua Kategori' : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#0d0c1a]/90 border border-white/10 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'list'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
        </div>
      </div>

      {/* Article Cards / List */}
      {isLoading ? (
        <div className="p-12 border border-white/10 bg-[#0d0c1a]/90 rounded-xl text-center space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin text-amber-400 mx-auto" />
          <p className="text-xs mono text-slate-300">
            Memuat artikel dari Google Sheets CMS ({OFFICIAL_SHEET_ID})...
          </p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="p-8 border border-white/10 bg-[#0d0c1a]/90 rounded-xl text-center text-xs mono text-slate-300 space-y-3">
          <p>
            Tidak ada artikel yang cocok dengan filter &ldquo;{selectedCategory}&rdquo;
            {searchQuery ? ` atau kata kunci "${searchQuery}"` : ''}.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
      ) : viewMode === 'list' ? (
        <div className="divide-y divide-white/10 border border-white/10 bg-[#0d0c1a]/90 rounded-xl overflow-hidden">
          {visibleArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => openArticle(art)}
              className="p-5 hover:bg-white/[0.03] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#070610] border border-white/10 shrink-0 flex items-center justify-center">
                  {art.imageUrl ? (
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <BookOpen className="w-5 h-5 text-amber-400" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] mono text-slate-400">
                    <span className="text-amber-300 font-semibold">{art.publishDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{art.summary}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyLink(art.slug, art.id);
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors cursor-pointer"
                  title="Salin tautan"
                >
                  {copiedId === art.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
                <span className="px-3.5 py-2 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1">
                  <span>Baca</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleArticles.map((art) => (
            <article
              key={art.id}
              className="rounded-xl border border-white/10 bg-[#0d0c1a]/90 hover:border-white/25 p-5 flex flex-col justify-between transition-colors group"
            >
              <div className="space-y-3.5">
                {art.imageUrl && (
                  <div
                    onClick={() => openArticle(art)}
                    className="w-full h-44 rounded-lg overflow-hidden bg-[#070610] border border-white/10 cursor-pointer"
                  >
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const parent = e.currentTarget.parentElement;
                        if (parent) parent.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Clean Zero-Pill Metadata Line */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] mono text-slate-400">
                  <span className="text-amber-300">{art.publishDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.category}</span>
                </div>

                <h3
                  onClick={() => openArticle(art)}
                  className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer leading-snug"
                >
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-xs mono">
                <span className="text-slate-400 inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{art.readTime}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(art.slug, art.id)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors cursor-pointer"
                    title="Salin tautan URL langsung artikel"
                  >
                    {copiedId === art.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => openArticle(art)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-colors inline-flex items-center gap-1 cursor-pointer text-xs"
                  >
                    <span>Baca</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && filteredArticles.length > visibleCount && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((prev) => Math.min(prev + 6, filteredArticles.length))
            }
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs cursor-pointer transition-colors"
          >
            Muat Lebih Banyak ({filteredArticles.length - visibleCount} lagi)
          </button>
          <button
            type="button"
            onClick={() => setVisibleCount(filteredArticles.length)}
            className="px-4 py-2.5 bg-[#0d0c1a] hover:bg-white/10 text-slate-200 rounded-lg text-xs font-semibold border border-white/15 cursor-pointer transition-colors"
          >
            Tampilkan Semua ({filteredArticles.length})
          </button>
        </div>
      )}

      {/* Full Article Modal Reader */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0d0c1a] border border-white/20 rounded-2xl max-w-3xl w-full p-5 sm:p-8 space-y-5 text-white shadow-2xl relative my-3 max-h-[92vh] flex flex-col justify-between">
            <div className="space-y-2.5 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs mono text-slate-400">
                  <span className="text-amber-300 font-semibold">{activeArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.publishDate}</span>
                </div>
                <button
                  type="button"
                  onClick={closeArticle}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Tutup Artikel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl sm:text-3xl font-bold text-white leading-tight">
                {activeArticle.title}
              </h2>

              <div className="text-xs mono text-slate-400">
                Penulis: <span className="text-slate-200">{activeArticle.author}</span>
              </div>
            </div>

            <div className="overflow-y-auto pr-2 space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed">
              {activeArticle.imageUrl && (
                <div className="w-full max-h-80 sm:max-h-96 rounded-xl overflow-hidden bg-[#070610] border border-white/10">
                  <img
                    src={activeArticle.imageUrl}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {activeArticle.summary && (
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl font-serif italic text-amber-200 text-sm sm:text-base">
                  &ldquo;{activeArticle.summary}&rdquo;
                </div>
              )}

              {activeArticle.content && (
                <div
                  className="article-rich-content space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-amber-300 [&>h2]:mt-6 [&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-white [&>p]:leading-relaxed [&>p]:mb-4 [&>a]:text-amber-300 [&>a]:underline [&_img]:rounded-xl [&_img]:max-w-full [&_img]:my-4 [&_img]:mx-auto [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-white/20 [&_th]:p-3 [&_th]:bg-black/40 [&_td]:border [&_td]:border-white/15 [&_td]:p-3 [&_td]:bg-black/20"
                  dangerouslySetInnerHTML={{ __html: activeArticle.content }}
                />
              )}

              {activeArticle.codeSnippet && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs mono text-amber-300 font-semibold">
                    <Code2 className="w-4 h-4" />
                    <span>Kode Arsitektur:</span>
                  </div>
                  <pre className="p-4 bg-[#070610] border border-white/15 rounded-xl text-emerald-300 text-xs mono overflow-x-auto leading-relaxed">
                    {activeArticle.codeSnippet}
                  </pre>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs mono">
              <div className="text-slate-400 truncate max-w-md">
                URL: <span className="text-slate-200">https://jimkoto.my.id/{activeArticle.slug}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyLink(activeArticle.slug, activeArticle.id)}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer font-semibold"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>{copiedId === activeArticle.id ? 'Tersalin!' : 'Salin URL'}</span>
                </button>
                <button
                  type="button"
                  onClick={closeArticle}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
