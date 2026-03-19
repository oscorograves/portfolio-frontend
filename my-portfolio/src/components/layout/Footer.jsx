import React from 'react';
import { motion } from 'framer-motion';
import { Envelope, LinkedinLogo, InstagramLogo, GithubLogo, FilmStrip, Camera, Airplane, Book } from 'phosphor-react';

const Footer = ({ t }) => {
    return (
        <footer className="relative border-t border-gray-100/10 dark:border-white/5 pt-12 pb-12 bg-white/5 dark:bg-black/20 backdrop-blur-xl transition-all duration-500 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
                    
                    {/* Left: Combined Rights & Resource Links */}
                    <div className="flex flex-col gap-6 text-center md:text-left">
                        <div className="space-y-3">
                             <p className="text-[10px] text-gray-400 dark:text-gray-500 tracking-[0.15em] leading-relaxed uppercase font-mono font-medium max-w-sm mx-auto md:mx-0">
                                {t('footer.rights')}
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 pt-2 border-t border-gray-100/10 dark:border-white/5">
                                <motion.a 
                                    whileHover={{ y: -2, color: '#f59e0b' }}
                                    href="/color-rules.html" 
                                    className="text-[10px] font-mono text-gray-500 dark:text-gray-400 transition-all uppercase tracking-[0.2em] font-bold"
                                >
                                    {t('footer.links.rules')}
                                </motion.a>
                                <motion.a 
                                    whileHover={{ y: -2, color: '#f59e0b' }}
                                    href="/design-system.html" 
                                    className="text-[10px] font-mono text-gray-500 dark:text-gray-400 transition-all uppercase tracking-[0.2em] font-bold"
                                >
                                    {t('footer.links.system')}
                                </motion.a>
                                <motion.a 
                                    whileHover={{ y: -2, color: '#f59e0b' }}
                                    href="/sitemap.xml" 
                                    className="text-[10px] font-mono text-gray-500 dark:text-gray-400 transition-all uppercase tracking-[0.2em] font-bold"
                                >
                                    {t('footer.links.sitemap')}
                                </motion.a>
                            </div>
                        </div>
                    </div>

                    {/* Center: Off The Clock */}
                    <div className="flex flex-col items-center gap-6 justify-start pt-1">
                        <span className="text-[10px] font-bold text-gray-300 dark:text-gray-500 uppercase tracking-[0.3em] font-mono border-b border-amber-500/30 pb-1">
                            {t('footer.offClock')}
                        </span>
                        <div className="flex items-center gap-8">
                            {[
                                { Icon: FilmStrip, key: 'film' },
                                { Icon: Camera, key: 'photography' },
                                { Icon: Airplane, key: 'travel' },
                                { Icon: Book, key: 'journaling' }
                            ].map(({ Icon, key }) => (
                                <motion.div key={key} whileHover={{ y: -3, scale: 1.1 }} className="group relative cursor-help">
                                    <Icon className="w-6 h-6 text-gray-400 dark:text-gray-600 group-hover:text-amber-500 transition-all" weight="duotone" />
                                    <span className="text-[8px] font-mono text-amber-600 dark:text-amber-500/80 opacity-0 group-hover:opacity-100 transition-all absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap tracking-widest uppercase">
                                        {t(`footer.hobbies.${key}`)}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Socials */}
                    <div className="flex flex-col items-center md:items-end gap-6 justify-start pt-1">
                         <span className="text-[10px] font-bold text-gray-300 dark:text-gray-500 uppercase tracking-[0.3em] font-mono border-b border-amber-500/30 pb-1">
                            {t('footer.socials')}
                        </span>
                        <div className="flex items-center gap-4">
                            {[
                                { Icon: Envelope, href: "mailto:hi@scalewithkanishk.in", label: "EMAIL" },
                                { Icon: LinkedinLogo, href: "https://www.linkedin.com/in/kanishk-singh-ab90b2203/", label: "LINKEDIN" },
                                { Icon: InstagramLogo, href: "https://www.instagram.com/oscorograves/", label: "INSTAGRAM" },
                                { Icon: GithubLogo, href: "https://github.com/oscorograves", label: "GITHUB" }
                            ].map(({ Icon, href, label }) => (
                                <motion.a 
                                    key={label}
                                    href={href}
                                    target={href.startsWith('http') ? "_blank" : undefined}
                                    rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    whileHover={{ y: -3, scale: 1.1 }} 
                                    className="p-3 rounded-full bg-gray-100/5 dark:bg-white/5 text-gray-400 dark:text-gray-600 hover:text-amber-500 hover:bg-amber-500/10 transition-all group relative border border-white/5"
                                >
                                    <Icon className="w-5 h-5" weight="duotone" />
                                    <span className="text-[8px] font-mono text-amber-500/80 opacity-0 group-hover:opacity-100 transition-all absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap tracking-widest">
                                        {label}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-amber-500/5 blur-[120px] pointer-events-none" />
        </footer>
    );
};

export default Footer;
