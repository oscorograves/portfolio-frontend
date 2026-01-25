import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Linkedin, Phone } from 'lucide-react';
import TypewriterText from '../ui/TypewriterText';
import HeroAvatar from '../hero/HeroAvatar';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const Hero = ({ t, setCurrentPage, fallbackMetrics }) => {
    return (
        <section className="border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
            <motion.div
                className="max-w-6xl mx-auto px-4 md:px-8 pt-6 pb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <TypewriterText
                            text={t('hero.name')}
                            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3"
                            Element="h1"
                        />
                        <TypewriterText
                            text={t('hero.role')}
                            className="text-xl text-gray-700 dark:text-gray-300 mb-6 font-medium"
                            Element="p"
                            delay={1.5} // Start after the name finishes (approx)
                        />
                        <motion.p variants={itemVariants} className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                            {t('hero.description')}
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex gap-3 mb-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCurrentPage('case-studies')}
                                className="px-5 py-2.5 bg-amber-600 dark:bg-yellow-400 text-white dark:text-gray-900 text-sm font-medium rounded hover:bg-amber-700 dark:hover:bg-yellow-300 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                {t('hero.viewCaseStudies')}
                            </motion.button>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/resume.pdf"
                                download="Kanishk_Singh_Resume.pdf"
                                className="px-5 py-2.5 border-2 border-amber-600 dark:border-yellow-400 text-amber-600 dark:text-yellow-400 text-sm font-medium rounded hover:bg-amber-50 dark:hover:bg-gray-900 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <Download className="w-4 h-4" />
                                {t('hero.downloadCV')}
                            </motion.a>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-6"
                        >
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
                                <a href="mailto:oscoro.graves@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">
                                    oscoro.graves@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Linkedin className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
                                <a href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
                                    LinkedIn
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
                                <a href="tel:+918299406042" className="hover:text-black dark:hover:text-white transition-colors">
                                    +91 8299406042
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="space-y-4">
                        <HeroAvatar
                            onNavigate={setCurrentPage}
                            metrics={[
                                { value: "2+", label: t('stats.yearsExp'), page: 'experience' },
                                { value: "$41K", label: t('stats.adSpend'), page: 'metrics' },
                                { value: "12+", label: t('stats.campaigns'), page: 'metrics' },
                                { value: `${Math.max(...fallbackMetrics.map(m => m.roi))}%`, label: t('stats.roi'), page: 'metrics' }
                            ]}
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
