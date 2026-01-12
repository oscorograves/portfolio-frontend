import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { TrendingUp, Target, LineChart, ChevronRight, Play, X, Menu, Filter, Mail, Phone, MapPin, Linkedin, Download, Calendar, Briefcase, GraduationCap, Award, Film, Camera, Plane, BookOpen, Sun, Moon, Instagram, Globe, Bot, MessageSquare } from 'lucide-react';
import { metricsAPI } from './services/api.js';
import { translations } from './translations.js';

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
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-auto z-50"
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

const FooterParticles = () => {
  // Generate particles with stable random values
  const particles = React.useMemo(() => {
    return [...Array(40)].map(() => ({
      size: Math.random() * 8 + 4, // Random size between 4px (w-1) and 12px (w-3)
      left: Math.random() * 100, // 0% to 100%
      bottom: Math.random() * 100, // 0% to 100% relative to container
      duration: Math.random() * 5 + 3, // 3s to 8s
      delay: Math.random() * 2 // Random start delay
    }));
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-64 -z-10 overflow-hidden pointer-events-none"
      style={{
        maskImage: 'linear-gradient(to top, black, transparent)',
        WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
      }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-orange-500 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            opacity: 0.2 // Base low opacity
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const ShootingStars = () => {
  // Generate shooting stars with stable random values
  const stars = React.useMemo(() => {
    return [...Array(8)].map(() => ({
      left: Math.random() * 100, // Random start position 0% to 100%
      delay: Math.random() * 10 + 5, // Random delay between 5s and 15s
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 w-24 bg-gradient-to-r from-transparent via-gray-400 to-transparent rotate-45"
          style={{
            top: -100,
            left: `${star.left}%`
          }}
          animate={{
            top: '100vh',
            x: -500, // Move diagonally to the left
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: star.delay
          }}
        />
      ))}
    </div>
  );
};

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState('home');
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
            <div className="flex items-center gap-3">
              <img
                src="/profile.jpeg"
                alt="Kanishka Singh"
                className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
              />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">Kanishk Singh</div>
              </div>
            </div>

            {/* Desktop Navigation (Hidden on Mobile) */}
            <div className="hidden md:flex gap-1">
              {['home', 'experience', 'case-studies', 'creative-lab', 'metrics'].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`relative px-4 py-2 text-sm transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 ${currentPage === page
                    ? 'text-white dark:text-gray-900'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' // Hover effect only on non-active items
                    }`}
                >
                  {/* The Background Pill Animation */}
                  {currentPage === page && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-gray-900 dark:bg-white rounded"
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
                      setCurrentPage(page);
                      setIsMenuOpen(false); // Close menu after clicking
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 ${currentPage === page
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
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
    <div className="pt-16">
      {/* Header Section */}
      <section className="bg-gray-50 dark:bg-gray-950 border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
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
                  className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded hover:bg-gray-800 dark:hover:bg-gray-100 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                >
                  {t('hero.viewCaseStudies')}
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  download="Kanishk_Singh_Resume.pdf"
                  className="px-5 py-2.5 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white text-sm font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-900 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
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
                    <a href="mailto:oscoro.graves@gmail.com" className="hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">oscoro.graves@gmail.com</a>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <a
                      href="tel:+918299406042"
                      className="hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
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
                    <a href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors break-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
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
                      className="bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded p-2 text-center"
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
      <div className="bg-gray-900 dark:bg-gray-900 text-white py-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* CHANGED: grid-cols-2 for mobile, md:grid-cols-4 for desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">

            <div className="p-2">
              <div className="text-3xl md:text-4xl font-bold mb-1">2+</div>
              <div className="text-sm md:text-base text-gray-400">{t('stats.yearsExp')}</div>
            </div>

            <div className="p-2">
              <div className="text-3xl md:text-4xl font-bold mb-1">$267K</div>
              <div className="text-sm md:text-base text-gray-400">{t('stats.adSpend')}</div>
            </div>

            <div className="p-2">
              <div className="text-3xl md:text-4xl font-bold mb-1">25+</div>
              <div className="text-sm md:text-base text-gray-400">{t('stats.campaigns')}</div>
            </div>

            <div className="p-2">
              <div className="text-3xl md:text-4xl font-bold mb-1">830%</div>
              <div className="text-sm md:text-base text-gray-400">{t('stats.roi')}</div>
            </div>

          </div>
        </div>
      </div>

      {/* Featured Achievement */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gray-900 dark:border-white">{t('featuredWork.title')}</h2>
          <motion.div
            className="bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:border-gray-900 dark:hover:border-white transition-all group cursor-pointer"
            onClick={() => setCurrentPage('case-studies')}
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('featuredWork.subtitle')}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('featuredWork.projectTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t('featuredWork.projectDesc')}</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
            {/* Mobile: 2 columns, Desktop: 4 columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              {[
                { label: t('featuredWork.metrics.attendees'), value: '150' },
                { label: t('featuredWork.metrics.netNew'), value: '95%' },
                { label: t('featuredWork.metrics.cac'), value: '£12' },
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
      <section className="bg-gray-50 dark:bg-gray-950 border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gray-900 dark:border-white">{t('whatIOffer.title')}</h2>
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
                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded-xl p-6 hover:border-gray-900 dark:hover:border-white transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="w-10 h-10 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-gray-900 mb-4">
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
      <section className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gray-900 dark:border-white">{t('experience.skills')}</h2>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {(() => {
              const icons = { Target: <Target className="w-5 h-5" />, TrendingUp: <TrendingUp className="w-5 h-5" />, LineChart: <LineChart className="w-5 h-5" /> };
              return t('experience.competencies', { returnObjects: true })?.map((competency, i) => (
                <motion.div key={i} variants={itemVariants} className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded p-5 hover:border-gray-900 dark:hover:border-white transition-all" whileHover={{ y: -5 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-gray-900 dark:bg-white rounded flex items-center justify-center text-white dark:text-gray-900">{icons[competency.icon]}</div>
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
      <section className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gray-900 dark:border-white">Digital Skills</h2>
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
                    whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
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
                    whileHover={{ scale: 1.1 }}
                    className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-2 py-1 rounded cursor-default"
                  >
                    {t('experience.languageLevels.native')}
                  </motion.span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">English</span>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-2 py-1 rounded cursor-default"
                  >
                    {t('experience.languageLevels.c1')}
                  </motion.span>

                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dutch</span>
                  {/* UPDATED DUTCH SKILL */}
                  <motion.span
                    whileHover={{ scale: 1.1 }}
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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b-2 border-gray-900 dark:border-white">
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
            whileHover={{ y: -5, borderColor: '#111827', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
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
            whileHover={{ y: -5, borderColor: '#111827', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
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
            whileHover={{ y: -5, borderColor: '#111827', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
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
            whileHover={{ y: -5, borderColor: '#111827', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gray-900 dark:border-white">
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
              whileHover={{ y: -5 }}
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
              whileHover={{ y: -5 }}
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gray-900 dark:border-white">{t('experience.education')}</h2>
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded p-6"
            whileHover={{ y: -5 }}
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gray-900 dark:border-white">{t('experience.certifications')}</h2>
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded p-6"
            whileHover={{ y: -5 }}
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
        title: t('caseStudies.packt.title'),
        category: t('caseStudies.packt.category'),
        client: "Packt",
        problem: t('caseStudies.packt.problem'),
        actions: t('caseStudies.packt.actions'),
        results: [
          { metric: t('featuredWork.metrics.attendees'), value: "150" },
          { metric: t('featuredWork.metrics.netNew'), value: "95%" },
          { metric: t('featuredWork.metrics.cac'), value: "£12" },
          { metric: t('featuredWork.metrics.roas'), value: "8.3×" }
        ]
      },
      {
        title: t('caseStudies.jrb.title'),
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
        title: t('caseStudies.audio.title'),
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
      <div className="pt-20 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Case Studies</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 pb-4 border-b-2 border-gray-900 dark:border-white">Detailed performance marketing projects and results</p>

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
                variants={itemVariants}
                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded overflow-hidden"
                whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wide mb-1 opacity-80">{study.category}</div>
                      <h2 className="text-xl font-bold">{study.title}</h2>
                    </div>
                    <div className="text-xs bg-white/20 px-3 py-1 rounded">
                      {study.client}
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
      <div className="pt-20 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{t('creativeLab.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 pb-4 border-b-2 border-gray-900 dark:border-white">{t('creativeLab.subtitle')}</p>

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
                  className="aspect-square bg-white/40 dark:bg-gray-900/40 border-2 border-gray-300 dark:border-gray-800 rounded cursor-pointer hover:border-gray-900 dark:hover:border-white transition-all group"
                  whileHover="hover"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                    <motion.div
                      variants={{ hover: { scale: 1.2 } }}
                      className="w-12 h-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center mb-3 group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:border-gray-900 dark:group-hover:border-white transition-all"
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
                  className="bg-white/40 dark:bg-gray-900/40 border border-gray-300 dark:border-gray-800 rounded overflow-hidden hover:border-gray-900 dark:hover:border-white transition-all group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center relative">
                    <motion.div
                      variants={{ hover: { scale: 1.2 } }}
                      className="w-14 h-14 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:border-gray-900 dark:group-hover:border-white transition-all"
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
            <div className="bg-white dark:bg-gray-900 border-2 border-gray-900 dark:border-white rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-gray-800 dark:border-gray-700">
                <h3 className="text-lg font-bold">{t('creativeLab.modal.title')}</h3>
                <button onClick={() => setSelectedCreative(null)} className="hover:bg-white/20 p-1 rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
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
    // HARDCODED FALLBACK DATA (Defined here to use for initialization)
    const fallbackMetrics = [
      { client: 'Pocket FM', channel: 'Meta', spend: 45000, ctr: 3.2, cpl: 12, cvr: 4.8, roi: 280 },
      { client: 'Packt', channel: 'Meta', spend: 1800, ctr: 2.4, cpl: 14, cvr: 6.1, roi: 830 },
      { client: 'Intertek', channel: 'Google Ads', spend: 62000, ctr: 2.1, cpl: 85, cvr: 8.2, roi: 340 },
      { client: 'Jones Road Beauty', channel: 'Direct', spend: 0, ctr: 0, cpl: 0, cvr: 3.4, roi: 0 },
      { client: 'Pocket FM', channel: 'Google Ads', spend: 28000, ctr: 2.8, cpl: 15, cvr: 5.2, roi: 245 },
      { client: 'B2B SaaS', channel: 'LinkedIn', spend: 38000, ctr: 1.8, cpl: 95, cvr: 12.1, roi: 420 },
      { client: 'E-commerce', channel: 'Meta', spend: 52000, ctr: 4.1, cpl: 8, cvr: 3.2, roi: 190 },
      { client: 'B2B SaaS', channel: 'Meta', spend: 41000, ctr: 2.9, cpl: 42, cvr: 9.8, roi: 380 }
    ];

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
        } catch (err) {
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
      <div className="pt-20 bg-gray-50 dark:bg-gray-950 min-h-screen pb-32 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{t('metricsPage.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 pb-4 border-b-2 border-gray-900 dark:border-white">{t('metricsPage.subtitle')}</p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Summary Cards */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-4 mb-8">
              <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 text-center">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('metricsPage.totalSpend')}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">${(totalSpend / 1000).toFixed(1)}K</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 text-center">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('metricsPage.avgCtr')}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{avgCTR.toFixed(2)}%</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 text-center">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('metricsPage.avgCvr')}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{avgCVR.toFixed(2)}%</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 text-center">
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
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 ${filterChannel === channel
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
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
                  <thead className="bg-gray-900 dark:bg-gray-800 text-white">
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
                <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('metricsPage.insights.topChannel.title')}</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{t('metricsPage.insights.topChannel.name')}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {t('metricsPage.insights.topChannel.desc')}
                  </p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">{t('metricsPage.insights.bestCvr.title')}</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{t('metricsPage.insights.bestCvr.name')}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {t('metricsPage.insights.bestCvr.desc')}
                  </p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5">
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
    <footer className="bg-white dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-8">

        {/* Top Section: Contact & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {t('footer.copyright')}
          </div>

          <div className="flex items-center gap-6">
            <motion.a
              href="mailto:oscoro.graves@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4" /> {t('footer.emailMe')}
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </motion.a>
            <motion.a
              href="https://www.instagram.com/oscorograves/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
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
            <span className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors cursor-default">
              <Film className="w-4 h-4" /> {t('footer.hobbies.film')}
            </span>
            <span className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors cursor-default">
              <Camera className="w-4 h-4" /> {t('footer.hobbies.photography')}
            </span>
            <span className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors cursor-default">
              <Plane className="w-4 h-4" /> {t('footer.hobbies.travel')}
            </span>
            <span className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors cursor-default">
              <BookOpen className="w-4 h-4" /> {t('footer.hobbies.journaling')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 relative">
      {/* Solid Background Base */}
      <div className="fixed inset-0 -z-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300" />

      {/* Animated Background Gradients - Global */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/30 dark:bg-blue-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>
      <NavBar />

      {/* Main Content Grows to fill space */}
      <div className="flex-grow">
        {currentPage === 'home' && <PageWrapper><HomePage /></PageWrapper>}
        {currentPage === 'experience' && <PageWrapper><ExperiencePage /></PageWrapper>}
        {currentPage === 'case-studies' && <PageWrapper><CaseStudiesPage /></PageWrapper>}
        {currentPage === 'creative-lab' && <PageWrapper><CreativeLabPage /></PageWrapper>}
        {currentPage === 'metrics' && <PageWrapper><MetricsPage /></PageWrapper>}
      </div>

      <Footer />
      <MusicPlayer />
      <FooterParticles />
      <ShootingStars />
    </div>
  );
}