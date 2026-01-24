import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram, Github, Film, Camera, Plane, Book } from 'lucide-react';

const Footer = ({ t }) => {
    return (
        <footer className="border-t border-gray-300 dark:border-gray-800 py-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Left: Legal Text */}
                <div className="text-center md:text-left md:w-1/3 order-3 md:order-1">
                    <p className="text-[10px] text-gray-500 dark:text-gray-500 font-mono tracking-tight leading-relaxed">
                        {t('footer.rights')}
                    </p>
                </div>

                {/* Center: Off The Clock (Hobbies) - Compact Integration */}
                <div className="flex flex-col items-center gap-3 md:w-1/3 order-1 md:order-2">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest font-mono">
                        {t('footer.offClock')}
                    </span>
                    <div className="flex items-center gap-6">
                        <motion.div whileHover={{ y: -2 }} className="flex flex-col items-center gap-1 group cursor-default relative">
                            <Film className="w-4 h-4 text-gray-400 group-hover:text-amber-600 dark:text-gray-600 dark:group-hover:text-yellow-400 transition-colors" />
                            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">{t('footer.hobbies.film')}</span>
                        </motion.div>
                        <motion.div whileHover={{ y: -2 }} className="flex flex-col items-center gap-1 group cursor-default relative">
                            <Camera className="w-4 h-4 text-gray-400 group-hover:text-amber-600 dark:text-gray-600 dark:group-hover:text-yellow-400 transition-colors" />
                            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">{t('footer.hobbies.photography')}</span>
                        </motion.div>
                        <motion.div whileHover={{ y: -2 }} className="flex flex-col items-center gap-1 group cursor-default relative">
                            <Plane className="w-4 h-4 text-gray-400 group-hover:text-amber-600 dark:text-gray-600 dark:group-hover:text-yellow-400 transition-colors" />
                            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">{t('footer.hobbies.travel')}</span>
                        </motion.div>
                        <motion.div whileHover={{ y: -2 }} className="flex flex-col items-center gap-1 group cursor-default relative">
                            <Book className="w-4 h-4 text-gray-400 group-hover:text-amber-600 dark:text-gray-600 dark:group-hover:text-yellow-400 transition-colors" />
                            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">{t('footer.hobbies.journaling')}</span>
                        </motion.div>
                    </div>
                </div>

                {/* Right: Social Icons */}
                <div className="flex items-center justify-center md:justify-end gap-3 md:w-1/3 order-2 md:order-3">
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
        </footer>
    );
};

export default Footer;
