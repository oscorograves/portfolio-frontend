import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import PageWrapper from './components/ui/PageWrapper';
import ScrollProgress from './components/ui/ScrollProgress';
import CustomCursor from './components/animations/CustomCursor';
import Home from './pages/Home';
import { routes as routeConfig, CAREER_STATS } from './routes-config';
import useTheme from './hooks/useTheme';
import useSEO from './hooks/useSEO';
import useScrollToTop from './hooks/useScrollToTop';
import useLanguage from './hooks/useLanguage';

const Experience = lazy(() => import('./pages/Experience'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const MyStory = lazy(() => import('./pages/MyStory'));
const MetricsPage = lazy(() => import('./pages/MetricsPage'));
const WipModal = lazy(() => import('./components/ui/WipModal'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-amber-500 mono text-sm animate-pulse">Loading…</div>
  </div>
);

const fallbackMetrics = [
  { client: 'Pocket FM', channel: 'Meta', spend: 6000, ctr: 2.8, cpr: 10.75, cvr: 4.2, roi: 250, volumeGrowth: 245, cpaReduction: 14, d7Retention: 26 },
  { client: 'Packt', channel: 'Meta', spend: 12000, ctr: 2.3, cpr: 60, cvr: 5.8, roi: 175, netNew: 93 },
  { client: 'Intertek', channel: 'Google Ads', spend: 8500, ctr: 2.2, cpr: 15.30, cvr: 6.5, roi: 320 },
  { client: 'Pocket FM', channel: 'Google Ads', spend: 5200, ctr: 2.7, cpr: 16.90, cvr: 4.8, roi: 240 },
  { client: 'B2B SaaS', channel: 'LinkedIn', spend: 4800, ctr: 1.4, cpr: 58.20, cvr: 9.2, roi: 380 },
  { client: 'E-commerce', channel: 'Meta', spend: 7200, ctr: 3.1, cpr: 11.90, cvr: 3.8, roi: 220 },
  { client: 'B2B SaaS', channel: 'Meta', spend: 5500, ctr: 2.5, cpr: 7.50, cvr: 7.5, roi: 340 }
];

export default function Portfolio() {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [showWip, setShowWip] = useState(false);
  const [isDarkMode, setIsDarkMode] = useTheme();

  useSEO();
  useScrollToTop();

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    return path.slice(1);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#09090B]">
      <ScrollProgress isDarkMode={true} />

      {/* Subtle grain overlay */}
      <div className="grain-overlay" />

      <CustomCursor isDarkMode={true} />

      <NavBar
        currentPage={getCurrentPage()}
        navigate={navigate}
        showWip={showWip} setShowWip={setShowWip}
        isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}
        language={language} setLanguage={setLanguage}
        t={t}
      />

      <div className="flex-grow z-10 relative">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={
              <PageWrapper><Home t={t} navigate={navigate} fallbackMetrics={fallbackMetrics} isDarkMode={isDarkMode} careerStats={CAREER_STATS} /></PageWrapper>
            } />
            <Route path="/experience" element={
              <PageWrapper><Experience t={t} isDarkMode={isDarkMode} /></PageWrapper>
            } />
            <Route path="/case-studies" element={
              <PageWrapper><CaseStudies t={t} isDarkMode={isDarkMode} fallbackMetrics={fallbackMetrics} /></PageWrapper>
            } />
            <Route path="/my-story" element={
              <PageWrapper><MyStory t={t} /></PageWrapper>
            } />
            <Route path="/metrics" element={
              <PageWrapper><MetricsPage t={t} fallbackMetrics={fallbackMetrics} isDarkMode={isDarkMode} /></PageWrapper>
            } />
            <Route path="*" element={
              <PageWrapper>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-7xl font-bold text-white mb-4 metric">404</h1>
                  <p className="text-lg text-zinc-500 mb-8 mono">Page not found</p>
                  <Link to="/" className="px-6 py-3 bg-amber-500 text-zinc-900 rounded-xl font-semibold hover:bg-amber-400 transition-colors">
                    Back to Home
                  </Link>
                </div>
              </PageWrapper>
            } />
          </Routes>
        </Suspense>
      </div>

      <Footer t={t} />

      <Suspense fallback={null}>
        {showWip && <WipModal isOpen={showWip} onClose={() => setShowWip(false)} t={t} />}
      </Suspense>
    </div>
  );
}
