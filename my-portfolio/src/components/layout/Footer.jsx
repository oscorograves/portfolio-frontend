import React from 'react';
import { motion } from 'framer-motion';
import { Envelope, LinkedinLogo, InstagramLogo, GithubLogo, FilmStrip, Camera, Airplane, Book } from 'phosphor-react';

const Footer = ({ t }) => (
    <footer className="border-t border-zinc-800 py-10 bg-[#09090B]">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

                {/* Left: Copyright */}
                <div className="space-y-3 text-center md:text-left">
                    <p className="text-[11px] text-zinc-600 leading-relaxed mono">
                        {t('footer.rights')}
                    </p>
                    <a href="https://scalewithkanishk.in/sitemap.xml"
                       className="text-[10px] mono text-zinc-600 hover:text-amber-400 transition-colors uppercase tracking-wider font-semibold">
                        {t('footer.links.sitemap')}
                    </a>
                </div>

                {/* Center: Off The Clock */}
                <div className="flex flex-col items-center gap-3">
                    <span className="section-label text-zinc-600">{t('footer.offClock')}</span>
                    <div className="flex items-center gap-5">
                        {[
                            { Icon: FilmStrip, key: 'film' },
                            { Icon: Camera, key: 'photography' },
                            { Icon: Airplane, key: 'travel' },
                            { Icon: Book, key: 'journaling' }
                        ].map(({ Icon, key }) => (
                            <motion.div key={key} whileHover={{ y: -2 }} className="group relative cursor-help">
                                <Icon className="w-4.5 h-4.5 text-zinc-600 group-hover:text-amber-400 transition-colors" weight="duotone" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Socials */}
                <div className="flex flex-col items-center md:items-end gap-3">
                    <span className="section-label text-zinc-600">{t('footer.socials')}</span>
                    <div className="flex items-center gap-4">
                        {[
                            { Icon: Envelope, href: "mailto:hi@scalewithkanishk.in" },
                            { Icon: LinkedinLogo, href: "https://www.linkedin.com/in/kanishk-singh-ab90b2203/" },
                            { Icon: InstagramLogo, href: "https://www.instagram.com/oscorograves/" },
                            { Icon: GithubLogo, href: "https://github.com/oscorograves" }
                        ].map(({ Icon, href }, i) => (
                            <motion.a key={i} href={href} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                                whileHover={{ y: -2 }} className="text-zinc-600 hover:text-amber-400 transition-colors">
                                <Icon className="w-4.5 h-4.5" weight="duotone" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
