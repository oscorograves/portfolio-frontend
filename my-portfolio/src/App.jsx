import React, { useState, useEffect, Suspense } from 'react';
import { translations } from './translations.js';

// Hooks
import useMousePosition from './hooks/useMousePosition';

// Layout
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';


// Animations
import FireflyBackground from './components/animations/FireflyBackground';
import CustomCursor from './components/animations/CustomCursor';
import NetworkBackground from './components/animations/NetworkBackground';

// UI
import PageWrapper from './components/ui/PageWrapper';

// Pages
import Home from './pages/Home';
import Experience from './pages/Experience';
import CaseStudies from './pages/CaseStudies';
import CreativeLab from './pages/CreativeLab';
import MetricsPage from './pages/MetricsPage';

// Lazy Load Modal
const WipModal = React.lazy(() => import('./components/ui/WipModal'));

// FALLBACK DATA (Keep here or move to a constants file)
const fallbackMetrics = [
  { client: 'Pocket FM', channel: 'Meta', spend: 6000, ctr: 2.6, cpl: 12.80, cvr: 4.2, roi: 250 },
  { client: 'Packt', channel: 'Meta', spend: 3500, ctr: 2.3, cpl: 23.00, cvr: 5.8, roi: 329 },
  { client: 'Intertek', channel: 'Google Ads', spend: 8500, ctr: 2.2, cpl: 15.30, cvr: 6.5, roi: 320 },
  { client: 'Pocket FM', channel: 'Google Ads', spend: 5200, ctr: 2.7, cpl: 16.90, cvr: 4.8, roi: 240 },
  { client: 'B2B SaaS', channel: 'LinkedIn', spend: 4800, ctr: 1.4, cpl: 58.20, cvr: 9.2, roi: 380 },
  { client: 'E-commerce', channel: 'Meta', spend: 7200, ctr: 3.1, cpl: 11.90, cvr: 3.8, roi: 220 },
  { client: 'B2B SaaS', channel: 'Meta', spend: 5500, ctr: 2.5, cpl: 7.50, cvr: 7.5, roi: 340 }
];

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showWip, setShowWip] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  // Translation Helper
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (let k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 relative overflow-hidden">
      {/* Solid Background Base */}
      <div className="fixed inset-0 -z-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300" />

      {/* Animated Background Gradients - Global */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-200/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-300/30 dark:bg-red-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>

      {/* Network Background */}
      <NetworkBackground isDarkMode={isDarkMode} />
      <FireflyBackground />
      <CustomCursor isDarkMode={isDarkMode} />

      <NavBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        showWip={showWip}
        setShowWip={setShowWip}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {/* Main Content Grows to fill space */}
      <div className="flex-grow z-10 relative">
        {currentPage === 'home' &&
          <PageWrapper>
            <Home
              t={t}
              setCurrentPage={setCurrentPage}
              fallbackMetrics={fallbackMetrics}
              isDarkMode={isDarkMode}
            />
          </PageWrapper>
        }
        {currentPage === 'experience' &&
          <PageWrapper>
            <Experience t={t} isDarkMode={isDarkMode} />
          </PageWrapper>
        }
        {currentPage === 'case-studies' &&
          <PageWrapper>
            <CaseStudies t={t} isDarkMode={isDarkMode} />
          </PageWrapper>
        }
        {currentPage === 'creative-lab' &&
          <PageWrapper>
            <CreativeLab t={t} />
          </PageWrapper>
        }
        {currentPage === 'metrics' &&
          <PageWrapper>
            <MetricsPage t={t} fallbackMetrics={fallbackMetrics} isDarkMode={isDarkMode} />
          </PageWrapper>
        }
      </div>

      <Footer t={t} />


      {/* Modals */}
      <Suspense fallback={null}>
        {showWip && <WipModal isOpen={showWip} onClose={() => setShowWip(false)} t={t} />}
      </Suspense>
    </div>
  );
}