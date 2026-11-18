import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Copy, 
  Check, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Code2, 
  Bookmark, 
  BookmarkCheck, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { TUTORIALS_DATA, TutorialItem } from '../data/tutorials';

export const TutorialsTab: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<TutorialItem>(TUTORIALS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const categories = ['All', 'Frontend', 'Backend', 'Performance', 'AI Integration', 'Architecture'];

  const filteredTutorials = TUTORIALS_DATA.filter((tut) => {
    const matchesCategory = selectedCategory === 'All' || tut.category === selectedCategory;
    const matchesSearch = 
      tut.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tut.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tut.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectTutorial = (tut: TutorialItem) => {
    setSelectedTutorial(tut);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleCopySnippet = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="border border-[#1a1a1a]/10 bg-white p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[#1a1a1a]/10 pb-4">
          <div className="space-y-1 max-w-2xl">
            <span className="mono inline-block text-[10px] text-[#d44e28] font-bold uppercase tracking-widest mb-1">
              Editorial Library • Tech Articles
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold tracking-tight text-[#1a1a1a]">
              Jim Koto Engineering Knowledge Base
            </h1>
            <p className="text-xs sm:text-sm text-[#1a1a1a]/70 font-serif italic">
              Panduan mendalam pemrograman, arsitektur software bersih (Clean Architecture), dan optimasi performa tinggi.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#888] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides & tags..."
              className="w-full pl-9 pr-4 py-2 border border-[#1a1a1a]/15 bg-[#fdfcf8] text-xs text-[#1a1a1a] placeholder-[#777] outline-none focus:bg-white mono transition"
            />
          </div>
        </div>

        {/* Category Filter Pills (Mobile/Tablet Wrapped) */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-medium tracking-wider">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border transition cursor-pointer font-bold ${
                selectedCategory === cat
                  ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'border-white/15 bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Reader on Left, Index Catalog on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Full Tutorial Article */}
        <div className="lg:col-span-2 space-y-6">
          <article className="border border-[#1a1a1a]/10 bg-white p-6 sm:p-10 space-y-8">
            {/* Meta Header */}
            <div className="space-y-3 pb-6 border-b border-[#1a1a1a]/10">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 text-[10px] mono uppercase tracking-wider border border-[#1a1a1a]/10 bg-[#f8f7f2] text-[#d44e28] font-bold">
                  {selectedTutorial.category}
                </span>
                <div className="flex items-center gap-3 text-xs text-[#1a1a1a]/60 mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedTutorial.readTime}
                  </span>
                  <span className="font-semibold text-[#1a1a1a]">{selectedTutorial.difficulty}</span>
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-semibold tracking-tight text-[#1a1a1a] leading-snug">
                {selectedTutorial.title}
              </h2>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#1a1a1a]/60 pt-2 border-t border-[#1a1a1a]/8 mt-2">
                <span className="font-serif italic text-[#1a1a1a]/80">By {selectedTutorial.author} • {selectedTutorial.publishDate}</span>
                <div className="flex items-center gap-1.5">
                  {selectedTutorial.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-[#f8f7f2] border border-[#1a1a1a]/10 text-[#1a1a1a]/70 mono text-[10px] rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Quote Box */}
            <div className="py-4 px-6 border-y border-[#1a1a1a]/10 text-base sm:text-lg text-[#1a1a1a]/80 leading-relaxed font-serif italic">
              "{selectedTutorial.summary}"
            </div>

            {/* Key Takeaways */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#1a1a1a]/8 pb-1.5">
                Key Architectural Takeaways
              </h3>
              <ul className="space-y-2.5">
                {selectedTutorial.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1a1a1a]/80">
                    <span className="mono font-bold text-[#d44e28] shrink-0 text-xs mt-0.5">0{idx + 1} —</span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Sections */}
            <div className="space-y-6 pt-4 border-t border-[#1a1a1a]/10">
              {selectedTutorial.contentSections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-serif font-semibold text-[#1a1a1a]">{sec.heading}</h4>
                  <p className="text-xs sm:text-sm text-[#1a1a1a]/70 leading-relaxed">{sec.body}</p>
                </div>
              ))}
            </div>

            {/* Code Snippets */}
            <div className="space-y-4 pt-4 border-t border-[#1a1a1a]/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#d44e28]" />
                <span>Production Code Snippets</span>
              </h3>

              {selectedTutorial.codeSnippets.map((snippet, idx) => (
                <div key={idx} className="border border-[#1a1a1a]/20 bg-[#1a1a1a] text-slate-200 overflow-hidden text-xs mono">
                  <div className="px-4 py-2 bg-[#262626] border-b border-[#333] flex items-center justify-between text-slate-300">
                    <span className="font-semibold text-white">{snippet.title}</span>
                    <button
                      onClick={() => handleCopySnippet(snippet.code, idx)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 border border-slate-600 bg-slate-800 hover:bg-white hover:text-[#1a1a1a] text-slate-200 text-[10px] uppercase font-bold transition cursor-pointer"
                    >
                      {copiedIndex === idx ? <Check className="w-3 h-3 text-[#d44e28]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedIndex === idx ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="p-4 text-slate-200 overflow-x-auto leading-relaxed max-h-[350px]">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              ))}
            </div>

            {/* Interactive Comprehension Quiz */}
            <div className="border border-[#1a1a1a]/10 bg-[#fdfcf8] p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#1a1a1a]/8 pb-2">
                <Sparkles className="w-4 h-4 text-[#d44e28]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
                  Editorial Knowledge Check
                </h4>
              </div>
              <p className="text-sm font-serif font-semibold text-[#1a1a1a]">
                {selectedTutorial.quiz.question}
              </p>

              <div className="space-y-2">
                {selectedTutorial.quiz.options.map((opt, idx) => {
                  const isChosen = selectedAnswer === idx;
                  const isCorrect = idx === selectedTutorial.quiz.correctIndex;
                  let btnStyle = 'border-[#1a1a1a]/15 bg-white text-[#1a1a1a] hover:border-[#d44e28]';

                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-800 font-medium';
                    } else if (isChosen && !isCorrect) {
                      btnStyle = 'border-[#d44e28] bg-rose-50 text-[#d44e28]';
                    }
                  } else if (isChosen) {
                    btnStyle = 'border-[#1a1a1a] bg-[#1a1a1a] text-white font-medium';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !quizSubmitted && setSelectedAnswer(idx)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-3 text-xs border transition flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                    >
                      <span className="mono text-[11px] font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={() => selectedAnswer !== null && setQuizSubmitted(true)}
                  disabled={selectedAnswer === null}
                  className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#d44e28] disabled:opacity-40 text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                >
                  Verify Answer
                </button>
              ) : (
                <div className="p-4 bg-white border border-[#1a1a1a]/15 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    {selectedAnswer === selectedTutorial.quiz.correctIndex ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct Answer
                      </span>
                    ) : (
                      <span className="text-[#d44e28] font-bold uppercase text-[11px] flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Review Required
                      </span>
                    )}
                  </div>
                  <p className="text-[#1a1a1a]/70 leading-relaxed">
                    {selectedTutorial.quiz.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#1a1a1a]/10">
              <div>
                <span className="mono text-[10px] text-[#1a1a1a]/50 uppercase block">Author</span>
                <p className="font-serif italic text-lg text-[#1a1a1a]">James Isa (Jim Koto)</p>
              </div>
              <div>
                <span className="mono text-[10px] text-[#1a1a1a]/50 uppercase block">Location</span>
                <p className="font-serif italic text-lg text-[#1a1a1a]">Jakarta, Indonesia</p>
              </div>
            </div>
          </article>
        </div>

        {/* Right 1 Column: Catalog Index */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#1a1a1a]/10 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">
              Issue Index ({filteredTutorials.length})
            </h3>
            {bookmarkedIds.size > 0 && (
              <span className="text-xs text-[#d44e28] mono font-bold">
                ★ {bookmarkedIds.size} Saved
              </span>
            )}
          </div>

          <div className="space-y-3">
            {filteredTutorials.map((tut) => {
              const isCurrent = selectedTutorial.id === tut.id;
              const isBookmarked = bookmarkedIds.has(tut.id);

              return (
                <div
                  key={tut.id}
                  onClick={() => handleSelectTutorial(tut)}
                  className={`cursor-pointer border p-4 transition space-y-2 ${
                    isCurrent
                      ? 'border-[#d44e28] bg-white ring-1 ring-[#d44e28]'
                      : 'border-[#1a1a1a]/10 bg-white hover:border-[#1a1a1a]/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 border-b border-[#1a1a1a]/8 pb-1.5">
                    <span className="mono text-[9px] uppercase px-1.5 py-0.5 border border-[#1a1a1a]/10 bg-[#f8f7f2] text-[#d44e28] font-bold">
                      {tut.category}
                    </span>
                    <button
                      onClick={(e) => toggleBookmark(tut.id, e)}
                      className="text-[#1a1a1a]/40 hover:text-[#d44e28] transition p-0.5"
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Guide'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-[#d44e28]" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h4 className="text-base font-serif font-semibold text-[#1a1a1a] line-clamp-2 leading-snug">
                    {tut.title}
                  </h4>

                  <div className="flex items-center justify-between text-[10px] text-[#1a1a1a]/60 mono pt-1">
                    <span>{tut.readTime}</span>
                    <span className="text-[#d44e28] font-bold uppercase tracking-wider flex items-center gap-0.5">
                      Read <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

