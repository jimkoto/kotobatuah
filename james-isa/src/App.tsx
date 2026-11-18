import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Cloud, LayoutGrid, Terminal, BookOpen, Cpu } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { EditorialHomepageTab } from './components/EditorialHomepageTab';
import { JimKotoReviewTab } from './components/JimKotoReviewTab';
import { CloudflareDeploymentTab } from './components/CloudflareDeploymentTab';
import { AppIncubatorTab } from './components/AppIncubatorTab';
import { CodeOptimizerTab } from './components/CodeOptimizerTab';
import { TutorialsTab } from './components/TutorialsTab';
import { AiTechAdvisorTab } from './components/AiTechAdvisorTab';
import { Footer } from './components/Footer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { GeminiAssistantWidget } from './components/GeminiAssistantWidget';
import { CookieBanner } from './components/CookieBanner';
import { LegalModals, LegalModalType } from './components/LegalModals';

const DEVSTUDIO_SUBTABS = [
  { id: 'review', label: 'Audit & Review', icon: ShieldCheck },
  { id: 'cloudflare', label: 'Cloudflare Edge', icon: Cloud },
  { id: 'incubator', label: 'App Blueprints', icon: LayoutGrid },
  { id: 'optimizer', label: 'Code Optimizer', icon: Terminal },
  { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
  { id: 'advisor', label: 'AI Tech Advisor', icon: Cpu },
] as const;

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [advisorPrompt, setAdvisorPrompt] = useState<string>('');
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);
  const [directSlug, setDirectSlug] = useState<string>('');
  const [isGeminiOpen, setIsGeminiOpen] = useState<boolean>(false);

  // Handle URL pathname routing (e.g. /tips-yang-bisa-anda-ikuti-jika-ingin or #artikel-pilar)
  useEffect(() => {
    const processRoute = () => {
      const pathname = window.location.pathname.replace(/^\/|\/$/g, '');
      const hash = window.location.hash;

      if (pathname && pathname !== 'index.html' && !pathname.startsWith('api/')) {
        setActiveTab('home');
        setDirectSlug(pathname);
        setTimeout(() => {
          document.getElementById('artikel-pilar')?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      } else if (hash.includes('artikel-pilar')) {
        setActiveTab('home');
        setTimeout(() => {
          document.getElementById('artikel-pilar')?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    };

    processRoute();
    window.addEventListener('popstate', processRoute);
    window.addEventListener('hashchange', processRoute);
    return () => {
      window.removeEventListener('popstate', processRoute);
      window.removeEventListener('hashchange', processRoute);
    };
  }, []);

  const handleQuickAudit = () => {
    setActiveTab('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdvisorWithPrompt = (prompt: string) => {
    setAdvisorPrompt(prompt);
    setActiveTab('advisor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDevStudioView = activeTab !== 'home';

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-[#f59e0b] selection:text-[#070610] overflow-x-hidden relative w-full">
      {/* Simplified Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickAudit={handleQuickAudit}
        onOpenGemini={() => setIsGeminiOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 overflow-x-hidden">
        {isDevStudioView && (
          <div className="mb-8 border border-white/10 bg-[#0d0c1a]/90 rounded-xl p-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleNavigate('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Beranda</span>
              </button>
              <span className="text-xs mono text-slate-400 hidden sm:inline">
                DevStudio & Tech Intelligence Hub
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              {DEVSTUDIO_SUBTABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleNavigate(tab.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      active
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'home' && (
          <EditorialHomepageTab onNavigate={handleNavigate} initialSlug={directSlug} />
        )}

        {activeTab === 'review' && (
          <JimKotoReviewTab
            onNavigateToIncubator={() => setActiveTab('incubator')}
            onNavigateToOptimizer={() => setActiveTab('optimizer')}
            onNavigateToTutorials={() => setActiveTab('tutorials')}
          />
        )}

        {activeTab === 'cloudflare' && <CloudflareDeploymentTab />}

        {activeTab === 'incubator' && (
          <AppIncubatorTab onOpenAdvisorWithPrompt={handleOpenAdvisorWithPrompt} />
        )}

        {activeTab === 'optimizer' && <CodeOptimizerTab />}

        {activeTab === 'tutorials' && <TutorialsTab />}

        {activeTab === 'advisor' && <AiTechAdvisorTab initialPrompt={advisorPrompt} />}
      </main>

      {/* Gemini AI Floating Assistant (Bottom-Left) */}
      <GeminiAssistantWidget
        onNavigateTab={handleNavigate}
        forceOpen={isGeminiOpen}
        onCloseForce={() => setIsGeminiOpen(false)}
      />

      {/* Dynamic Floating WhatsApp Button (Bottom-Right) */}
      <FloatingWhatsAppButton />

      {/* Dynamic Cookies Consent Banner */}
      <CookieBanner onOpenCookiesModal={() => setActiveLegalModal('cookies')} />

      {/* Interactive Legal Modals */}
      <LegalModals
        activeModal={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
        onNavigate={handleNavigate}
      />

      {/* Synergized Footer with Verified Social Media Accounts */}
      <Footer
        onOpenLegalModal={(type) => setActiveLegalModal(type)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
