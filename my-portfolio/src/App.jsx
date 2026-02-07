import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Layout (always needed)
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

// UI (critical for layout)
import PageWrapper from './components/ui/PageWrapper';
import NoiseOverlay from './components/ui/NoiseOverlay';
import ScrollProgress from './components/ui/ScrollProgress';

// Animations (keep as direct imports - small and needed for visual experience)
import FireflyBackground from './components/animations/FireflyBackground';
import CustomCursor from './components/animations/CustomCursor';
import NetworkBackground from './components/animations/NetworkBackground';

// Lazy load pages (route-based code splitting)
const Home = lazy(() => import('./pages/Home'));
const Experience = lazy(() => import('./pages/Experience'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CreativeLab = lazy(() => import('./pages/CreativeLab'));
const MyStory = lazy(() => import('./pages/MyStory'));
const MetricsPage = lazy(() => import('./pages/MetricsPage'));

// Lazy Load Modal
const WipModal = lazy(() => import('./components/ui/WipModal'));

// Loading spinner component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// FALLBACK DATA
const fallbackMetrics = [
  { client: 'Pocket FM', channel: 'Meta', spend: 6000, ctr: 2.6, cpl: 12.80, cvr: 4.2, roi: 250 },
  { client: 'Packt', channel: 'Meta', spend: 3500, ctr: 2.3, cpl: 23.00, cvr: 5.8, roi: 329 },
  { client: 'Intertek', channel: 'Google Ads', spend: 8500, ctr: 2.2, cpl: 15.30, cvr: 6.5, roi: 320 },
  { client: 'Pocket FM', channel: 'Google Ads', spend: 5200, ctr: 2.7, cpl: 16.90, cvr: 4.8, roi: 240 },
  { client: 'B2B SaaS', channel: 'LinkedIn', spend: 4800, ctr: 1.4, cpl: 58.20, cvr: 9.2, roi: 380 },
  { client: 'E-commerce', channel: 'Meta', spend: 7200, ctr: 3.1, cpl: 11.90, cvr: 3.8, roi: 220 },
  { client: 'B2B SaaS', channel: 'Meta', spend: 5500, ctr: 2.5, cpl: 7.50, cvr: 7.5, roi: 340 }
];

// Route configuration
const routes = [
  { path: '/', key: 'home' },
  { path: '/experience', key: 'experience' },
  { path: '/case-studies', key: 'caseStudies' },
  { path: '/my-story', key: 'myStory' },
  { path: '/metrics', key: 'metrics' },
  { path: '/creative-lab', key: 'creativeLab' }
];

export default function Portfolio() {
  const [showWip, setShowWip] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const language = i18n.resolvedLanguage || 'en';
  const setLanguage = (lang) => i18n.changeLanguage(lang);

  // Derive current page from pathname
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    return path.slice(1); // Remove leading slash
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 relative overflow-hidden">
      <ScrollProgress isDarkMode={isDarkMode} />
      <NoiseOverlay />

      {/* Solid Background Base */}
      <div className="fixed inset-0 -z-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300" />

      {/* Animated Background Gradients - Global */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 dark:bg-primary-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent-500/10 dark:bg-accent-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-400/10 dark:bg-gray-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>

      {/* Background Effects */}
      <NetworkBackground isDarkMode={isDarkMode} />
      <FireflyBackground />
      <CustomCursor isDarkMode={isDarkMode} />

      <NavBar
        currentPage={getCurrentPage()}
        navigate={navigate}
        showWip={showWip}
        setShowWip={setShowWip}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {/* Main Content Grows to fill space */}
      {/* Main Content with lazy-loaded pages */}
      <div className="flex-grow z-10 relative">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={
              <PageWrapper>
                <Home
                  t={t}
                  navigate={navigate}
                  fallbackMetrics={fallbackMetrics}
                  isDarkMode={isDarkMode}
                />
              </PageWrapper>
            } />
            <Route path="/experience" element={
              <PageWrapper>
                <Experience t={t} isDarkMode={isDarkMode} />
              </PageWrapper>
            } />
            <Route path="/case-studies" element={
              <PageWrapper>
                <CaseStudies t={t} isDarkMode={isDarkMode} />
              </PageWrapper>
            } />
            <Route path="/my-story" element={
              <PageWrapper>
                <MyStory t={t} />
              </PageWrapper>
            } />
            <Route path="/metrics" element={
              <PageWrapper>
                <MetricsPage t={t} fallbackMetrics={fallbackMetrics} isDarkMode={isDarkMode} />
              </PageWrapper>
            } />
            <Route path="/creative-lab" element={
              <PageWrapper>
                <CreativeLab t={t} />
              </PageWrapper>
            } />
          </Routes>
        </Suspense>
      </div>

      <Footer t={t} />

      {/* Modals */}
      <Suspense fallback={null}>
        {showWip && <WipModal isOpen={showWip} onClose={() => setShowWip(false)} t={t} />}
      </Suspense>
    </div>
  );
}