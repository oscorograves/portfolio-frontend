import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { List, Globe, X } from 'phosphor-react';
import OrigamiCraneLogo from '../animations/OrigamiCraneLogo';
import ThemeToggle from '../theme/ThemeToggle';

// Route configuration
const navRoutes = [
    { path: '/', key: 'home', labelKey: 'home' },
    { path: '/experience', key: 'experience', labelKey: 'experience' },
    { path: '/case-studies', key: 'case-studies', labelKey: 'caseStudies' },
    { path: '/my-story', key: 'my-story', labelKey: 'myStory' },
    { path: '/metrics', key: 'metrics', labelKey: 'metrics' }
];

const NavBar = ({
    currentPage,
    navigate,
    showWip,
    setShowWip,
    isDarkMode,
    setIsDarkMode,
    language,
    setLanguage,
    t
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/50 dark:bg-dark-bg/50 backdrop-blur-lg border-b border-gray-900 dark:border-gray-800 z-[1000] transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
                <div className="flex items-center justify-between">

                    {/* Logo Section */}
                    <Link
                        to="/"
                        className="flex items-center text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                    >
                        <OrigamiCraneLogo />
                        <span>{t('hero.name')}</span>
                    </Link>

                    {/* Desktop Navigation (Hidden on Mobile) */}
                    <div className="hidden md:flex gap-1">
                        {navRoutes.map(route => (
                            <Link
                                key={route.key}
                                to={route.path}
                                className={`relative px-4 py-2 text-sm transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 ${currentPage === route.key
                                    ? 'text-white dark:text-gray-900'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                {/* The Background Pill Animation */}
                                {currentPage === route.key && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-amber-600 dark:bg-yellow-400 rounded"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        style={{ zIndex: 0 }}
                                    />
                                )}
                                {/* The Text */}
                                <span className="relative z-10">
                                    {t(`nav.${route.labelKey}`)}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Language Selector Dropdown */}
                    <div className="relative mr-2">
                        <button
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="flex items-center gap-1 p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-full transition-colors text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 group relative"
                        >
                            <Globe className="w-5 h-5 text-blue-500" weight="duotone" />
                            <span>{language.toUpperCase()}</span>
                            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none bg-white dark:bg-dark-surface px-2 py-1 rounded shadow-sm border border-gray-200 dark:border-gray-700">Change Language</span>
                        </button>

                        <AnimatePresence>
                            {isLangMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-2 w-32 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-50"
                                >
                                    {[
                                        { code: 'en', label: 'English' },
                                        { code: 'de', label: 'Deutsch' },
                                        { code: 'nl', label: 'Nederlands' }
                                    ].map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setIsLangMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${language === lang.code
                                                ? 'text-amber-600 dark:text-yellow-400 font-bold'
                                                : 'text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Dark Mode Toggle */}
                    <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

                    {/* Mobile Menu Button (Visible ONLY on Mobile) */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-7 h-7" weight="duotone" /> : <List className="w-7 h-7" weight="duotone" />}
                    </button>
                </div>

                {/* Mobile Navigation Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="md:hidden pt-4 pb-2 border-t border-gray-100 dark:border-gray-800 mt-4 space-y-2 overflow-hidden relative z-[1001]"
                        >
                            {navRoutes.map(route => (
                                <Link
                                    key={route.key}
                                    to={route.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 font-mono ${currentPage === route.key
                                        ? 'bg-amber-600 dark:bg-yellow-400 text-white dark:text-gray-900'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {t(`nav.${route.labelKey}`)}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default NavBar;
