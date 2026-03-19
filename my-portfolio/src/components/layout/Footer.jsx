import React from 'react';
import { motion } from 'framer-motion';
import { Envelope, LinkedinLogo, InstagramLogo, GithubLogo, FilmStrip, Camera, Airplane, Book } from 'phosphor-react';

const Footer = ({ t }) => {
    return (
        <footer className="border-t border-gray-300 dark:border-gray-800 py-3 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 font-mono">
                    
                    {/* Left: Combined Rights & Resource Links */}
                    <div className="md:w-1/3 text-center md:text-left">
                        <p className="text-[8px] md:text-[9px] text-gray-500 dark:text-gray-600 tracking-wider leading-tight uppercase font-medium">
                            {t('footer.rights')}
                        </p>
                    </div>

                    {/* Center: Off The Clock */}
                    <div className="flex items-center gap-6 md:w-1/3 justify-center">
                        <span className="text-[9px] font-bold text-gray-400 dark:text-gray-700 uppercase tracking-[0.2em] whitespace-nowrap">
                            {t('footer.offClock')}
                        </span>
                        <div className="flex items-center gap-4">
                            <motion.div whileHover={{ y: -1 }} className="group relative cursor-help">
                                <FilmStrip className="w-4 h-4 text-gray-400 dark:text-gray-700 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors" weight="duotone" />
                                <span className="text-[8px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">{t('footer.hobbies.film')}</span>
                            </motion.div>
                            <motion.div whileHover={{ y: -1 }} className="group relative cursor-help">
                                <Camera className="w-4 h-4 text-gray-400 dark:text-gray-700 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors" weight="duotone" />
                                <span className="text-[8px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">{t('footer.hobbies.photography')}</span>
                            </motion.div>
                            <motion.div whileHover={{ y: -1 }} className="group relative cursor-help">
                                <Airplane className="w-4 h-4 text-gray-400 dark:text-gray-700 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors" weight="duotone" />
                                <span className="text-[8px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">{t('footer.hobbies.travel')}</span>
                            </motion.div>
                            <motion.div whileHover={{ y: -1 }} className="group relative cursor-help">
                                <Book className="w-4 h-4 text-gray-400 dark:text-gray-700 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors" weight="duotone" />
                                <span className="text-[8px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">{t('footer.hobbies.journaling')}</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right: Socials */}
                    <div className="flex items-center justify-center md:justify-end gap-3 md:w-1/3 group">
                         <span className="text-[9px] font-bold text-gray-400 dark:text-gray-700 uppercase tracking-[0.2em]">
                            {t('footer.socials')}
                        </span>
                        <div className="flex items-center gap-1">
                            <motion.a href="mailto:hi@scalewithkanishk.in" whileHover={{ y: -1 }} className="p-1 px-2 text-gray-400 dark:text-gray-700 hover:text-amber-600 dark:hover:text-amber-500 transition-all uppercase text-[10px] tracking-widest font-bold">EM</motion.a>
                            <motion.a href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/" target="_blank" rel="noopener noreferrer" whileHover={{ y: -1 }} className="p-1 px-2 text-gray-400 dark:text-gray-700 hover:text-amber-600 dark:hover:text-amber-500 transition-all uppercase text-[10px] tracking-widest font-bold">LN</motion.a>
                            <motion.a href="https://www.instagram.com/oscorograves/" target="_blank" rel="noopener noreferrer" whileHover={{ y: -1 }} className="p-1 px-2 text-gray-400 dark:text-gray-700 hover:text-amber-600 dark:hover:text-amber-500 transition-all uppercase text-[10px] tracking-widest font-bold">IN</motion.a>
                            <motion.a href="https://github.com/oscorograves" target="_blank" rel="noopener noreferrer" whileHover={{ y: -1 }} className="p-1 px-2 text-gray-400 dark:text-gray-700 hover:text-amber-600 dark:hover:text-amber-500 transition-all uppercase text-[10px] tracking-widest font-bold">GH</motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
