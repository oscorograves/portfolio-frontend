import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { TrendingUp, Target, LineChart, ChevronRight, Play, X, Menu, Filter, Mail, Phone, MapPin, Linkedin, Download, Calendar, Briefcase, GraduationCap, Award, Film, Camera, Plane, BookOpen, Sun, Moon, Instagram, Globe, Bot, MessageSquare, Megaphone, Rocket, PieChart, Construction } from 'lucide-react';
import { metricsAPI } from './services/api.js';
import { translations } from './translations.js';
import NetworkBackground from './components/NetworkBackground';

// HARDCODED FALLBACK DATA
const fallbackMetrics = [
  { client: 'Pocket FM', channel: 'Meta', spend: 45000, ctr: 3.2, cpl: 12, cvr: 4.8, roi: 280 },
  { client: 'Packt', channel: 'Meta', spend: 1800, ctr: 2.4, cpl: 24, cvr: 6.1, roi: 830 },
  { client: 'Intertek', channel: 'Google Ads', spend: 62000, ctr: 2.1, cpl: 85, cvr: 8.2, roi: 340 },
  { client: 'Jones Road Beauty', channel: 'Direct', spend: 0, ctr: 0, cpl: 0, cvr: 3.4, roi: 0 },
  { client: 'Pocket FM', channel: 'Google Ads', spend: 28000, ctr: 2.8, cpl: 15, cvr: 5.2, roi: 245 },
  { client: 'B2B SaaS', channel: 'LinkedIn', spend: 38000, ctr: 1.8, cpl: 95, cvr: 12.1, roi: 420 },
  { client: 'E-commerce', channel: 'Meta', spend: 52000, ctr: 4.1, cpl: 8, cvr: 3.2, roi: 190 },
  { client: 'B2B SaaS', channel: 'Meta', spend: 41000, ctr: 2.9, cpl: 42, cvr: 9.8, roi: 380 }
];

const PageWrapper = ({ children, className }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={containerVariants}
    className={className}
  >
    {children}
  </motion.div>
);

// Global Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Default false (browser policy)
  const [volume, setVolume] = useState(0.5);
  const audioRef = React.useRef(null);

  // Handle Play/Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Autoplay blocked by browser"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Attempt Autoplay on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      // Try to play automatically
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false)); // Autoplay was prevented
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 120 }}
      className="fixed bottom-4 right-4 md:right-6 z-50"
    >
      {/* The Audio Element (Hidden) */}
      <audio ref={audioRef} src="/song.mp3" loop />

      {/* The Visual Player */}
      <div className="bg-gray-800/90 dark:bg-gray-900/50 backdrop-blur-lg text-white border border-white/10 rounded-full px-3 py-2 shadow-2xl flex items-center justify-between gap-4">

        {/* Song Info */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
            <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold truncate">Portfolio Mix</span>
            <span className="text-[10px] text-gray-400 truncate">Kanishk Singh</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
            <ChevronRight className="w-5 h-5 rotate-180" /> {/* Reuse Chevron as Prev */}
          </button>

          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            {isPlaying ? (
              // Pause Icon (Manual primitive to avoid importing new icon)
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-black rounded-full"></div>
                <div className="w-1 h-3 bg-black rounded-full"></div>
              </div>
            ) : (
              <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
            )}
          </button>

          <button className="text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
            <ChevronRight className="w-5 h-5" /> {/* Next */}
          </button>
        </div>

      </div>
    </motion.div>
  );
};

const FireflyBackground = () => {
  // Generate 30 fireflies with stable random values
  const fireflies = React.useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal start
      bottom: Math.random() * 40, // Start in the bottom 40% of screen
      size: Math.random() * 6 + 4, // Bigger size (4px - 10px)
      duration: Math.random() * 5 + 5, // Slow float (5s - 10s)
      delay: Math.random() * 5,
      xOffset: Math.random() * 50 - 25, // Pre-calculate random x offset
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* z-0 ensures it sits on the base layer. 
         We will make sure your content is z-10.
      */}

      {fireflies.map((p) => (
        <motion.div
          key={p.id}
          // Blue in light mode, Yellow (Gold) in dark mode
          className="absolute rounded-full bg-blue-400 dark:bg-yellow-400 shadow-[0_0_10px_rgba(96,165,250,0.6)] dark:shadow-[0_0_10px_rgba(250,204,21,0.6)]"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: p.size,
            height: p.size,
            opacity: 0, // Start invisible
          }}
          animate={{
            // Float UP and drift SIDEWAYS
            y: [0, -150],
            x: [0, p.xOffset],
            opacity: [0, 0.8, 0], // Fade in to 80% opacity, then out
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

const CustomCursor = ({ isDarkMode }) => {
  // We use standard useState here (no "React." prefix)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // Don't render anything until mouse moves (prevents some hydration errors)
  if (!isVisible) return null;

  return (
    <>
      {/* Small Dot */}
      <motion.div
        className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] hidden md:block ${isDarkMode ? 'bg-yellow-400' : 'bg-blue-600'
          }`}
        animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
        transition={{ type: "tween", ease: "backOut", duration: 0 }}
      />

      {/* Large Ring */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 border-2 rounded-full pointer-events-none z-[9999] hidden md:block ${isDarkMode ? 'border-yellow-400' : 'border-blue-600'
          }`}
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
    </>
  );
};

const WipModal = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white dark:bg-gray-900 border border-blue-500/30 dark:border-yellow-400/30 rounded-2xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
      >
        {/* Decorative Background */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 dark:bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center relative z-10">
          <div className="w-16 h-16 bg-blue-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-yellow-400">
            <Construction className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('wip.title')}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {t('wip.message')}
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-blue-600 dark:bg-yellow-400 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            {t('wip.close')}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const OrigamiCraneLogo = () => {
  return (
    <div className="relative flex items-center justify-center w-12 h-12 mr-3">
      {/* 1. The Circle Background */}
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-full" />

      {/* 2. The Floating Crane SVG */}
      <motion.svg
        viewBox="0 0 24 24"
        className="relative z-10 w-8 h-8 text-blue-600 dark:text-yellow-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        // The "Antigravity" Float Effect
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* The Origami Shape (Geometric vector paths) */}
        <path d="M12 3L2 12h3l7-6 7 6h3L12 3z" /> {/* Top Wing */}
        <path d="M12 3v10l-4 4-2-3 6-11z" />      {/* Left Fold */}
        <path d="M12 3v10l4 4 2-3-6-11z" />       {/* Right Fold */}
        <path d="M12 13l-4 4h8l-4-4z" />          {/* Body */}
      </motion.svg>
    </div>
  );
};

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showWip, setShowWip] = useState(false);
  const [selectedCreative, setSelectedCreative] = useState(null);
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

  const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <nav className="fixed top-0 left-0 right-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-b border-white/20 dark:border-gray-800 z-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">

            {/* Logo Section */}
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            >
              <OrigamiCraneLogo />
              <span>Kanishk Singh</span>
            </button>

            {/* Desktop Navigation (Hidden on Mobile) */}
            <div className="hidden md:flex gap-1">
              {['home', 'experience', 'case-studies', 'creative-lab', 'metrics'].map(page => (
                <button
                  key={page}
                  onClick={() => {
                    if (page === 'creative-lab') {
                      setShowWip(true);
                    } else {
                      setCurrentPage(page);
                    }
                  }}
                  className={`relative px-4 py-2 text-sm transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 ${currentPage === page
                    ? 'text-white dark:text-gray-900'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' // Hover effect only on non-active items
                    }`}
                >
                  {/* The Background Pill Animation */}
                  {currentPage === page && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-600 dark:bg-yellow-400 rounded"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      style={{ zIndex: 0 }} // Behind the text
                    />
                  )}
                  {/* The Text (Must be higher z-index relative to pill) */}
                  <span className="relative z-10">
                    {t(`nav.${page.replace(/-./g, x => x[1].toUpperCase())}`)}
                  </span>
                </button>
              ))}
            </div>

            {/* Language Selector */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'nl' : 'en')}
              className="flex items-center gap-1 p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-full transition-colors mr-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-full transition-colors mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button (Visible ONLY on Mobile) */}
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Dropdown (Slides down when menu is open) */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden pt-4 pb-2 border-t border-gray-100 dark:border-gray-800 mt-4 space-y-2 overflow-hidden"
              >
                {['home', 'experience', 'case-studies', 'creative-lab', 'metrics'].map(page => (
                  <button
                    key={page}
                    onClick={() => {
                      if (page === 'creative-lab') {
                        setShowWip(true);
                        setIsMenuOpen(false);
                      } else {
                        setCurrentPage(page);
                        setIsMenuOpen(false); // Close menu after clicking
                      }
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${currentPage === page
                      ? 'bg-blue-600 dark:bg-yellow-400 text-white dark:text-gray-900'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                  >
                    {page.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    );
  };

  const HomePage = () => (
    <div className="pt-32">
      {/* Header Section */}
      <section className="border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
        <motion.div
          className="max-w-6xl mx-auto px-8 pt-6 pb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <motion.h1 variants={itemVariants} className="text-5xl font-bold text-gray-900 dark:text-white mb-3">Kanishk Singh</motion.h1>
              <motion.p variants={itemVariants} className="text-xl text-gray-700 dark:text-gray-300 mb-6 font-medium">{t('hero.role')}</motion.p>
              <motion.p variants={itemVariants} className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {t('hero.description')}
              </motion.p>
              <motion.div variants={itemVariants} className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage('case-studies')}
                  className="px-5 py-2.5 bg-blue-600 dark:bg-yellow-400 text-white dark:text-gray-900 text-sm font-medium rounded hover:bg-blue-700 dark:hover:bg-yellow-300 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  {t('hero.viewCaseStudies')}
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  download="Kanishk_Singh_Resume.pdf"
                  className="px-5 py-2.5 border-2 border-blue-600 dark:border-yellow-400 text-blue-600 dark:text-yellow-400 text-sm font-medium rounded hover:bg-blue-50 dark:hover:bg-gray-900 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <Download className="w-4 h-4" />
                  {t('hero.downloadCV')}
                </motion.a>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">


              <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-4">
                <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-3">{t('hero.contactInfo')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <a href="mailto:oscoro.graves@gmail.com" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">oscoro.graves@gmail.com</a>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <a
                      href="tel:+918299406042"
                      className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    >
                      +91 8299406042
                    </a>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{t('hero.location')}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <Linkedin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {/* UPDATED LINKEDIN LINK */}
                    <a href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors break-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-4">
                <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-3">Key Metrics</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'CTR', value: '+16%' },
                    { label: 'CPA', value: '−14%' },
                    { label: 'MQL', value: '+22%' },
                    { label: 'CVR', value: '+18%' }
                  ].map((kpi, i) => (
                    <motion.div
                      key={i}
                      className="bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded p-2 text-center cursor-pointer hover:border-blue-600 dark:hover:border-yellow-400 transition-all"
                      onClick={() => setCurrentPage('metrics')}
                      whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
                    >
                      <div className="text-xs text-gray-600 dark:text-gray-400">{kpi.label}</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{kpi.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Key Metrics Bar */}
      <div className="bg-blue-600 dark:bg-gray-900 text-white py-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* CHANGED: grid-cols-2 for mobile, md:grid-cols-4 for desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">

            <div className="p-2">
              <div className="text-3xl md:text-4xl font-bold mb-1">2+</div>
              <div className="text-sm md:text-base text-blue-100 dark:text-gray-400">{t('stats.yearsExp')}</div>
            </div>

            <div className="p-2">
              <div className="text-3xl md:text-4xl font-bold mb-1">$267K</div>
              <div className="text-sm md:text-base text-blue-100 dark:text-gray-400">{t('stats.adSpend')}</div>
            </div>

            <div className="p-2">
              <div className="text-3xl md:text-4xl font-bold mb-1">25+</div>
              <div className="text-sm md:text-base text-blue-100 dark:text-gray-400">{t('stats.campaigns')}</div>
            </div>

            <div className="p-2">
              <div className="text-3xl md:text-4xl font-bold mb-1">8.3×</div>
              <div className="text-sm md:text-base text-blue-100 dark:text-gray-400">{t('stats.roi')}</div>
            </div>

          </div>
        </div>
      </div>

      {/* Featured Achievement */}
      <section className="border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-blue-600 dark:border-yellow-400">{t('featuredWork.title')}</h2>
          <motion.div

            className="bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:border-blue-600 dark:hover:border-yellow-400 transition-all group cursor-pointer"
            onClick={() => {
              setCurrentPage('case-studies');
              setTimeout(() => {
                const element = document.getElementById('packt');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, 100);
            }}
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="mb-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Packt Events</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Paid GTM & Audience Acquisition</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t('featuredWork.projectDesc')}</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
            </div>
            {/* Mobile: 2 columns, Desktop: 4 columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              {[
                { label: t('featuredWork.metrics.attendees'), value: '150' },
                { label: t('featuredWork.metrics.netNew'), value: '95%' },
                { label: t('featuredWork.metrics.cac'), value: '$12' },
                { label: t('featuredWork.metrics.roas'), value: '8.3×' }
              ].map((metric, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-3 text-center">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{metric.label}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What I Offer */}
      <section className="border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-blue-600 dark:border-yellow-400">{t('whatIOffer.title')}</h2>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              {
                title: t('whatIOffer.paidMedia.title'),
                description: t('whatIOffer.paidMedia.desc'),
                icon: <Target className="w-5 h-5" />
              },
              {
                title: t('whatIOffer.cro.title'),
                description: t('whatIOffer.cro.desc'),
                icon: <TrendingUp className="w-5 h-5" />
              },
              {
                title: t('whatIOffer.analytics.title'),
                description: t('whatIOffer.analytics.desc'),
                icon: <LineChart className="w-5 h-5" />
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded-xl p-6 hover:border-blue-600 dark:hover:border-yellow-400 transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="w-10 h-10 bg-blue-600 dark:bg-yellow-400 rounded-lg flex items-center justify-center text-white dark:text-gray-900 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-blue-600 dark:border-yellow-400">{t('experience.skills')}</h2>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {(() => {
              const icons = { Target: <Megaphone className="w-5 h-5" />, TrendingUp: <Rocket className="w-5 h-5" />, LineChart: <PieChart className="w-5 h-5" /> };
              return t('experience.competencies', { returnObjects: true })?.map((competency, i) => (
                <motion.div key={i} variants={itemVariants} className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded p-5 hover:border-blue-600 dark:hover:border-yellow-400 transition-all" whileHover={{ y: -5 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-blue-600 dark:bg-yellow-400 rounded flex items-center justify-center text-white dark:text-gray-900">{icons[competency.icon]}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base">{competency.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {competency.skills.map((skill, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.1 }}
                        className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                      >
                        <span className="text-gray-400 mt-1.5">•</span>
                        <span>{skill}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ));
            })()}
          </motion.div>
        </div>
      </section>

      {/* Digital Skills */}
      {/* Digital Skills */}
      <section className="transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-blue-600 dark:border-yellow-400">Digital Skills</h2>
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t('experience.platformsParams')}</h3>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
              >
                {['Google Ads', 'Meta Ads Manager', 'LinkedIn Ads', 'GA4', 'HubSpot', 'SEMrush', 'Ahrefs', 'Optimizely'].map(skill => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6", color: "#111827" }}
                    className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t('experience.languages')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Hindi</span>
                  <motion.span
                    whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6", color: "#111827" }}
                    className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-2 py-1 rounded cursor-default"
                  >
                    {t('experience.languageLevels.native')}
                  </motion.span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">English</span>
                  <motion.span
                    whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6", color: "#111827" }}
                    className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-2 py-1 rounded cursor-default"
                  >
                    {t('experience.languageLevels.c1')}
                  </motion.span>

                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dutch</span>
                  {/* UPDATED DUTCH SKILL */}
                  <motion.span
                    whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6", color: "#111827" }}
                    className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-2 py-1 rounded cursor-default"
                  >
                    {t('experience.languageLevels.a2')}
                  </motion.span>

                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );

  const ExperiencePage = () => (
    <div className="pt-20 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b-2 border-blue-600 dark:border-yellow-400">
          {t('experience.title')}
        </h1>

        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Pocket FM */}
          <motion.div
            variants={itemVariants}
            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-6"
            whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#2563eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('experience.roles.pocketfm.title')}</h3>
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-xs font-medium text-gray-700 dark:text-gray-300">
                    {t('experience.roles.pocketfm.type')}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    Pocket FM
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Remote
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('experience.roles.pocketfm.period')}</span>
              </div>
            </div>
            <ul className="space-y-2">
              {t('experience.roles.pocketfm.bullets').map((bullet, k) => (
                <li key={k} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Intertek */}
          <motion.div
            variants={itemVariants}
            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-6"
            whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#2563eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('experience.roles.intertek.title')}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    {t('experience.roles.intertek.company')}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {t('experience.roles.intertek.location')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                {t('experience.roles.intertek.period')}
              </div>
            </div>
            <ul className="space-y-2">
              {t('experience.roles.intertek.bullets').map((bullet, k) => (
                <li key={k} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tradebuilder */}
          <motion.div
            variants={itemVariants}
            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-6"
            whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#2563eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('experience.roles.tradebuilder.title')}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    Tradebuilder Inc.
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Remote
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                {t('experience.roles.tradebuilder.period')}
              </div>
            </div>
            <ul className="space-y-2">
              {t('experience.roles.tradebuilder.bullets').map((bullet, k) => (
                <li key={k} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ABP */}
          <motion.div
            variants={itemVariants}
            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-6"
            whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#2563eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('experience.roles.abp.title')}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    {t('experience.roles.abp.company')}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {t('experience.roles.abp.location')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                {t('experience.roles.abp.period')}
              </div>
            </div>
            <ul className="space-y-2">
              {t('experience.roles.abp.bullets').map((bullet, k) => (
                <li key={k} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Projects */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-blue-600 dark:border-yellow-400">
            Key Projects
          </h2>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5"
              whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#2563eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{t('experience.roles.projects.customGpt.title')}</h3>
                </div>
              </div>
              <ul className="space-y-2">
                {t('experience.roles.projects.customGpt.bullets').map((bullet, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="text-gray-400 mt-1.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5"
              whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#2563eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{t('experience.roles.projects.chatbot.title')}</h3>
                </div>
              </div>
              <ul className="space-y-2">
                {t('experience.roles.projects.chatbot.bullets').map((bullet, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="text-gray-400 mt-1.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Education - Added mt-12 for spacing */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-blue-600 dark:border-yellow-400">{t('experience.education')}</h2>
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded p-6"
            whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#2563eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <GraduationCap className="w-5 h-5 text-gray-900 dark:text-white mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Bachelor of Business Administration</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">Marketing Specialization</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Jaypee Institute of Information Technology</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Noida, India • 2020 – 2023</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">CGPA: 7.7 / 10</p>
          </motion.div>
        </div>

        {/* Certifications - Added mt-12 for spacing */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-blue-600 dark:border-yellow-400">{t('experience.certifications')}</h2>
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded p-6"
            whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#2563eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
          >
            <ul className="space-y-3">
              {[
                'Google Ads Certification (Skillshop)',
                'Social Media Marketing (HubSpot)',
                'Fundamentals of Digital Marketing (Google)',
                'SEO Certification (HubSpot)'
              ].map((cert, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Award className="w-4 h-4 text-gray-900 dark:text-white mt-0.5 flex-shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
  const CaseStudiesPage = () => {
    const caseStudies = [
      {
        id: 'packt',
        title: t('caseStudies.packt.title'),
        projectTitle: t('caseStudies.packt.projectTitle'),
        clientName: t('caseStudies.packt.clientName'),
        badgeText: t('caseStudies.packt.badge'),
        category: t('caseStudies.packt.category'),
        client: "Packt",
        problem: t('caseStudies.packt.problem'),
        actions: t('caseStudies.packt.actions'),
        results: [
          { metric: t('featuredWork.metrics.attendees'), value: "150" },
          { metric: t('featuredWork.metrics.netNew'), value: "95%" },
          { metric: t('featuredWork.metrics.cac'), value: "$12" },
          { metric: t('featuredWork.metrics.roas'), value: "8.3×" }
        ]
      },
      {
        id: 'jrb',
        title: t('caseStudies.jrb.title'),
        projectTitle: t('caseStudies.jrb.projectTitle'),
        clientName: t('caseStudies.jrb.clientName'),
        badgeText: t('caseStudies.jrb.badge'),
        category: t('caseStudies.jrb.category'),
        client: "Jones Road Beauty",
        problem: t('caseStudies.jrb.problem'),
        actions: t('caseStudies.jrb.actions'),
        results: [
          { metric: "Test Clusters", value: "5" },
          { metric: "Funnel Zones", value: "4" },
          { metric: "Month-1 Focus", value: "Revenue efficiency" },
          { metric: "Outcome", value: "Scalable CRO backlog" }
        ]
      },
      {
        id: 'audio',
        title: t('caseStudies.audio.title'),
        projectTitle: t('caseStudies.audio.projectTitle'),
        clientName: t('caseStudies.audio.clientName'),
        badgeText: t('caseStudies.audio.badge'),
        category: t('caseStudies.audio.category'),
        client: "Audio Streaming Platform",
        problem: t('caseStudies.audio.problem'),
        actions: t('caseStudies.audio.actions'),
        results: [
          { metric: "CTR", value: "+16%" },
          { metric: "CPA", value: "−14%" },
          { metric: "Creative Variants Tested", value: "12+" },
          { metric: "Scale Phase", value: "Stable" }
        ]
      }
    ];

    return (
      <div className="pt-20 min-h-screen transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Case Studies</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 pb-4 border-b-2 border-blue-600 dark:border-yellow-400">Detailed performance marketing projects and results</p>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {caseStudies.map((study, i) => (
              <motion.div
                key={i}
                id={study.id}
                variants={itemVariants}
                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded overflow-hidden"
                whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-blue-600 dark:bg-gray-800 text-white px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{study.clientName}</h2>
                      <div className="text-lg text-blue-100 dark:text-gray-400 font-medium">
                        {study.projectTitle}
                      </div>
                    </div>
                    <div className="text-xs bg-white/20 px-3 py-1 rounded whitespace-nowrap ml-4">
                      {study.badgeText}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-2 tracking-wide">{t('caseStudies.labels.problem')}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{study.problem}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-2 tracking-wide">{t('caseStudies.labels.actions')}</h3>
                    <ul className="space-y-1.5">
                      {study.actions.map((action, j) => (
                        <li key={j} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-3 tracking-wide">{t('caseStudies.labels.results')}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {study.results.map((result, j) => (
                        <div key={j} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded p-3 text-center">
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{result.metric}</div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  };

  const CreativeLabPage = () => {
    const creatives = [
      { goal: t('creativeLab.goals.brandAwareness'), ctr: '2.8%', cpl: '$12' },
      { goal: t('creativeLab.goals.leadGen'), ctr: '3.2%', cpl: '$18' },
      { goal: t('creativeLab.goals.appInstall'), ctr: '4.1%', cpl: '$8' },
      { goal: t('creativeLab.goals.retargeting'), ctr: '5.2%', cpl: '$15' },
      { goal: t('creativeLab.goals.productLaunch'), ctr: '3.9%', cpl: '$22' },
      { goal: t('creativeLab.goals.eventReg'), ctr: '3.5%', cpl: '$14' },
      { goal: t('creativeLab.goals.contentDownload'), ctr: '2.9%', cpl: '$10' },
      { goal: t('creativeLab.goals.webinarSignup'), ctr: '4.3%', cpl: '$25' },
      { goal: t('creativeLab.goals.trialConv'), ctr: '3.7%', cpl: '$30' }
    ];

    const videos = [
      { title: 'Product Demo Ad', type: t('creativeLab.videoTypes.adEdit'), duration: '0:30' },
      { title: 'Brand Story', type: t('creativeLab.videoTypes.promo'), duration: '1:15' },
      { title: 'Founder Interview', type: t('creativeLab.videoTypes.podcast'), duration: '2:45' },
      { title: 'Feature Highlight', type: t('creativeLab.videoTypes.adEdit'), duration: '0:45' }
    ];

    return (
      <div className="pt-20 min-h-screen transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{t('creativeLab.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 pb-4 border-b-2 border-blue-600 dark:border-yellow-400">{t('creativeLab.subtitle')}</p>

          {/* Ad Creatives */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('creativeLab.adCreatives')}</h2>
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {creatives.map((creative, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  onClick={() => setSelectedCreative(creative)}
                  className="aspect-square bg-white/40 dark:bg-gray-900/40 border border-gray-300 dark:border-gray-800 rounded cursor-pointer hover:border-blue-600 dark:hover:border-yellow-400 transition-all group"
                  whileHover="hover"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                    <motion.div
                      variants={{ hover: { scale: 1.2 } }}
                      className="w-12 h-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-600 dark:group-hover:bg-yellow-400 group-hover:border-blue-600 dark:group-hover:border-yellow-400 transition-all"
                    >
                      <Play className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-white dark:group-hover:text-gray-900 transition-all" />
                    </motion.div>
                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">{creative.goal}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Video Content */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('creativeLab.videoContent')}</h2>
            <motion.div
              className="grid md:grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {videos.map((video, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover="hover"
                  className="bg-white/40 dark:bg-gray-900/40 border border-gray-300 dark:border-gray-800 rounded overflow-hidden hover:border-blue-600 dark:hover:border-yellow-400 transition-all group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center relative">
                    <motion.div
                      variants={{ hover: { scale: 1.2 } }}
                      className="w-14 h-14 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-yellow-400 group-hover:border-blue-600 dark:group-hover:border-yellow-400 transition-all"
                    >
                      <Play className="w-7 h-7 text-gray-700 dark:text-white group-hover:text-white dark:group-hover:text-gray-900 transition-all" />
                    </motion.div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">{video.type}</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{video.duration}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{video.title}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Creative Modal */}
        {selectedCreative && (
          <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-6">
            <div className="bg-white dark:bg-gray-900 border-2 border-blue-600 dark:border-yellow-400 rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-blue-600 dark:bg-gray-800 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-gray-800 dark:border-gray-700">
                <h3 className="text-lg font-bold">{t('creativeLab.modal.title')}</h3>
                <button onClick={() => setSelectedCreative(null)} className="hover:bg-white/20 p-1 rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded mb-6 border border-gray-300 dark:border-gray-700"></div>

                <div className="space-y-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-300 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('creativeLab.metrics.goal')}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedCreative.goal}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-300 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('creativeLab.metrics.ctr')}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedCreative.ctr}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('creativeLab.metrics.cpl')}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedCreative.cpl}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };



  const MetricsPage = () => {
    const [filterChannel, setFilterChannel] = useState('all');


    // Initialize WITH data so there is no loading flash
    const [metrics, setMetrics] = useState(fallbackMetrics);
    const [summary, setSummary] = useState(null);

    // Fetch in background (Silent Update)
    useEffect(() => {
      const fetchMetrics = async () => {
        try {
          const data = filterChannel === 'all'
            ? await metricsAPI.getAll()
            : await metricsAPI.getByChannel(filterChannel);

          if (data && (data.metrics || data.metricsData)) {
            setMetrics(data.metrics || data.metricsData);
            setSummary(data.summary || null);
          }
        } catch {
          console.log('Using fallback data (API Silent Fail)');
          // No action needed, we already have fallback data set
          if (filterChannel !== 'all') {
            setMetrics(fallbackMetrics.filter(m => m.channel === filterChannel));
          }
        }
      };
      fetchMetrics();
    }, [filterChannel]);

    // Handle filtering locally for fallback if needed, or use state
    const displayMetrics = metrics;

    const totalSpend = summary?.totalSpend || displayMetrics.reduce((sum, m) => sum + m.spend, 0);
    const avgCTR = summary?.avgCTR || (displayMetrics.length ? displayMetrics.reduce((sum, m) => sum + m.ctr, 0) / displayMetrics.length : 0);
    const avgCVR = summary?.avgCVR || (displayMetrics.length ? displayMetrics.reduce((sum, m) => sum + m.cvr, 0) / displayMetrics.length : 0);
    const avgROI = summary?.avgROI || (displayMetrics.length ? displayMetrics.reduce((sum, m) => sum + m.roi, 0) / displayMetrics.length : 0);

    return (
      <div className="pt-20 min-h-screen pb-32 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{t('metricsPage.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 pb-4 border-b-2 border-blue-600 dark:border-yellow-400">{t('metricsPage.subtitle')}</p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Summary Cards */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-4 mb-8">
              <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 text-center hover:border-blue-600 dark:hover:border-yellow-400 transition-all">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('metricsPage.totalSpend')}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">${(totalSpend / 1000).toFixed(1)}K</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 text-center hover:border-blue-600 dark:hover:border-yellow-400 transition-all">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('metricsPage.avgCtr')}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{avgCTR.toFixed(2)}%</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 text-center hover:border-blue-600 dark:hover:border-yellow-400 transition-all">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('metricsPage.avgCvr')}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{avgCVR.toFixed(2)}%</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 text-center hover:border-blue-600 dark:hover:border-yellow-400 transition-all">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('metricsPage.avgRoi')}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{avgROI.toFixed(0)}%</div>
              </motion.div>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded p-4 overflow-x-auto whitespace-nowrap no-scrollbar">
              <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase">{t('metricsPage.filters.channel')}</span>
              {['all', 'Meta', 'Google Ads', 'LinkedIn', 'Direct'].map(channel => (
                <button
                  key={channel}
                  onClick={() => setFilterChannel(channel)}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${filterChannel === channel
                    ? 'bg-blue-600 text-white dark:bg-yellow-400 dark:text-gray-900'
                    : 'bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  {channel === 'all' ? t('metricsPage.filters.all') : channel}
                </button>
              ))}
            </motion.div>

            {/* Table */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="overflow-x-auto border rounded-lg border-gray-200 dark:border-gray-800">
                <table className="w-full">
                  <thead className="bg-blue-600 dark:bg-gray-800 text-white">
                    <tr>
                      {[
                        t('metricsPage.table.client'),
                        t('metricsPage.table.channel'),
                        t('metricsPage.table.spend'),
                        t('metricsPage.table.ctr'),
                        t('metricsPage.table.cpl'),
                        t('metricsPage.table.cvr'),
                        t('metricsPage.table.roi')
                      ].map(header => (
                        <th key={header} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 dark:divide-gray-800 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md">
                    {displayMetrics.map((row, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">{row.client}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {row.channel}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">${row.spend.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">{row.ctr}%</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">${row.cpl}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">{row.cvr}%</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <span className="font-bold text-green-700 dark:text-green-400">{row.roi}%</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Signal Boxes */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('metricsPage.insights.title')}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#2563eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('metricsPage.insights.topChannel.title')}</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{t('metricsPage.insights.topChannel.name')}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {t('metricsPage.insights.topChannel.desc')}
                  </p>
                </motion.div>
                <motion.div whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#2563eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('metricsPage.insights.bestCvr.title')}</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{t('metricsPage.insights.bestCvr.name')}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {t('metricsPage.insights.bestCvr.desc')}
                  </p>
                </motion.div>
                <motion.div whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#2563eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('metricsPage.insights.highestRoi.title')}</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{t('metricsPage.insights.highestRoi.name')}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {t('metricsPage.insights.highestRoi.desc')}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer className="bg-white dark:bg-gray-900 py-12 transition-colors duration-300 relative z-10">
      <div className="max-w-6xl mx-auto px-8">

        {/* Top Section: Contact & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <motion.a
              href="https://www.instagram.com/oscorograves/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-800 shrink-0 cursor-pointer block hover:border-blue-600 dark:hover:border-yellow-400 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/profile.jpeg"
                alt="Kanishk Singh"
                className="w-full h-full object-cover object-bottom scale-[1.75]"
              />
            </motion.a>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {t('footer.copyright')}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <motion.a
              href="mailto:oscoro.graves@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4" /> {t('footer.emailMe')}
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </motion.a>
            <motion.a
              href="https://www.instagram.com/oscorograves/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-4 h-4" /> Instagram
            </motion.a>
          </div>
        </div>



        {/* Bottom Section: Hobbies */}
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-4">
            {t('footer.offClock')}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-white transition-colors cursor-default">
              <Film className="w-4 h-4" /> {t('footer.hobbies.film')}
            </span>
            <span className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-white transition-colors cursor-default">
              <Camera className="w-4 h-4" /> {t('footer.hobbies.photography')}
            </span>
            <span className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-white transition-colors cursor-default">
              <Plane className="w-4 h-4" /> {t('footer.hobbies.travel')}
            </span>
            <span className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-white transition-colors cursor-default">
              <BookOpen className="w-4 h-4" /> {t('footer.hobbies.journaling')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 relative overflow-hidden">
      {/* Solid Background Base */}
      <div className="fixed inset-0 -z-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300" />

      {/* Animated Background Gradients - Global */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/30 dark:bg-blue-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>

      {/* Network Graph Background */}
      <NetworkBackground isDarkMode={isDarkMode} />
      <CustomCursor isDarkMode={isDarkMode} />
      <NavBar />

      {/* Main Content Grows to fill space */}
      <div className="flex-grow z-10 relative">
        {currentPage === 'home' && <PageWrapper><HomePage /></PageWrapper>}
        {currentPage === 'experience' && <PageWrapper><ExperiencePage /></PageWrapper>}
        {currentPage === 'case-studies' && <PageWrapper><CaseStudiesPage /></PageWrapper>}
        {currentPage === 'creative-lab' && <PageWrapper><CreativeLabPage /></PageWrapper>}
        {currentPage === 'metrics' && <PageWrapper><MetricsPage /></PageWrapper>}
      </div>

      <Footer />
      <MusicPlayer />
      <FireflyBackground />
      <WipModal isOpen={showWip} onClose={() => setShowWip(false)} t={t} />
    </div>
  );
}