import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram, Github } from 'lucide-react';

const Footer = ({ t }) => {
    return (
        <footer className="border-t border-gray-300 dark:border-gray-800 py-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6">

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
        </footer>
    );
};

export default Footer;
