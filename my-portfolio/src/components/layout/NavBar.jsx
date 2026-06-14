import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { List, Globe, X } from 'phosphor-react';
import OrigamiCraneLogo from '../animations/OrigamiCraneLogo';

const navRoutes = [
    { path: '/', key: 'home', labelKey: 'home' },
    { path: '/experience', key: 'experience', labelKey: 'experience' },
    { path: '/case-studies', key: 'case-studies', labelKey: 'caseStudies' },
    { path: '/my-story', key: 'my-story', labelKey: 'myStory' },
    { path: '/metrics', key: 'metrics', labelKey: 'metrics' }
];

const NavBar = ({ currentPage, navigate, showWip, setShowWip, isDarkMode, setIsDarkMode, language, setLanguage, t }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-[#09090B]/80 backdrop-blur-xl border-b border-zinc-800/60 z-[1000]">
            <div className="max-w-[1100px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors">
                    <OrigamiCraneLogo />
                    <span className="font-bold text-[15px] tracking-tight hidden sm:inline">{t('hero.name')}</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navRoutes.map(route => (
                        <Link key={route.key} to={route.path}
                            className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-colors ${
                                currentPage === route.key ? 'text-zinc-900' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            {currentPage === route.key && (
                                <motion.div layoutId="nav-pill"
                                    className="absolute inset-0 bg-amber-400 rounded-lg"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                    style={{ zIndex: 0 }}
                                />
                            )}
                            <span className="relative z-10">{t(`nav.${route.labelKey}`)}</span>
                        </Link>
                    ))}
                </div>

                {/* Right side controls */}
                <div className="flex items-center gap-1">
                    {/* Language */}
                    <div className="relative">
                        <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-zinc-500 hover:text-amber-400 rounded-lg transition-colors text-xs mono">
                            <Globe className="w-4 h-4" weight="duotone" />
                            <span>{language.toUpperCase()}</span>
                        </button>
                        <AnimatePresence>
                            {isLangMenuOpen && (
                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                                    className="absolute right-0 mt-1 w-32 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50">
                                    {[{ code: 'en', label: 'English' }, { code: 'de', label: 'Deutsch' }, { code: 'nl', label: 'Nederlands' }].map(lang => (
                                        <button key={lang.code}
                                            onClick={() => { setLanguage(lang.code); setIsLangMenuOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors hover:bg-zinc-800 ${
                                                language === lang.code ? 'text-amber-400 font-semibold' : 'text-zinc-400'
                                            }`}>
                                            {lang.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="md:hidden border-t border-zinc-800 overflow-hidden">
                        <div className="px-4 py-3 space-y-1">
                            {navRoutes.map(route => (
                                <Link key={route.key} to={route.path} onClick={() => setIsMenuOpen(false)}
                                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                                        currentPage === route.key ? 'bg-amber-500 text-zinc-900 font-semibold' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                    }`}>
                                    {t(`nav.${route.labelKey}`)}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;
