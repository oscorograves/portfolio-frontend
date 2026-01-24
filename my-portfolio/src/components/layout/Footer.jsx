import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram, Github, Film, Camera, Plane, Book } from 'lucide-react';

const Footer = ({ t }) => {
    return (
        <footer className="border-t border-gray-300 dark:border-gray-800 py-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8">

                {/* Top Section: Off The Clock (Hobbies) */}
                <div className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6 font-mono">
                        {t('footer.offClock')}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <Film className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
                            <span className="text-sm font-mono">{t('footer.hobbies.film')}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <Camera className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
                            <span className="text-sm font-mono">{t('footer.hobbies.photography')}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <Plane className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
                            <span className="text-sm font-mono">{t('footer.hobbies.travel')}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <Book className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
                            <span className="text-sm font-mono">{t('footer.hobbies.journaling')}</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Legal & Social */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">

                    {/* Left: Legal Text */}
                    <div className="text-center md:text-left">
                        <p className="text-xs text-gray-500 dark:text-gray-500 font-mono tracking-tight leading-relaxed max-w-2xl">
                            {t('footer.rights')}
                        </p>
                    </div>

                    {/* Right: Social Icons */}
                    <div className="flex items-center gap-4">
                        <motion.a
                            href="mailto:oscoro.graves@gmail.com"
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-amber-600 dark:hover:text-yellow-400 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Email"
                        >
                            <Mail className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                            href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-amber-600 dark:hover:text-yellow-400 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                            href="https://www.instagram.com/oscorograves/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-amber-600 dark:hover:text-yellow-400 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Instagram"
                        >
                            <Instagram className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                            href="https://github.com/oscorograves"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-amber-600 dark:hover:text-yellow-400 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </motion.a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
