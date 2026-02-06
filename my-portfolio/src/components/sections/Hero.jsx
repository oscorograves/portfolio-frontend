import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DownloadSimple, Envelope, LinkedinLogo, Phone } from 'phosphor-react';
import TypewriterText from '../ui/TypewriterText';
import HeroAvatar from '../hero/HeroAvatar';
import { DSButton } from '../../design-system/components';

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

const Hero = ({ t, navigate, fallbackMetrics }) => {
    return (
        <section className="border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
            <motion.div
                className="max-w-6xl mx-auto px-4 md:px-8 pt-6 pb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <TypewriterText
                            text={t('hero.name')}
                            className="text-4xl md:text-5xl font-bold text-gray-900 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:via-primary-400 dark:to-gray-200 mb-3"
                            Element="h1"
                        />
                        <TypewriterText
                            text={t('hero.role')}
                            className="text-xl text-gray-700 dark:text-gray-300 mb-6 font-medium"
                            Element="p"
                            delay={1.5}
                        />
                        <motion.p variants={itemVariants} className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                            {t('hero.description')}
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex gap-3 mb-8">
                            <DSButton onClick={() => navigate('/case-studies')}>
                                {t('hero.viewCaseStudies')}
                            </DSButton>
                            <DSButton
                                variant="secondary"
                                href="/resume.pdf"
                                download="Kanishk_Singh_Resume.pdf"
                                className="flex items-center justify-center gap-2"
                            >
                                <DownloadSimple className="w-5 h-5" weight="duotone" />
                                {t('hero.downloadCV')}
                            </DSButton>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-6"
                        >
                            <div className="flex items-center gap-2">
                                <Envelope className="w-5 h-5 text-amber-600 dark:text-yellow-400" weight="duotone" />
                                <a href="mailto:oscoro.graves@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">
                                    oscoro.graves@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <LinkedinLogo className="w-5 h-5 text-amber-600 dark:text-yellow-400" weight="duotone" />
                                <a href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
                                    LinkedIn
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-amber-600 dark:text-yellow-400" weight="duotone" />
                                <a href="tel:+918299406042" className="hover:text-black dark:hover:text-white transition-colors">
                                    +91 8299406042
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="space-y-4">
                        <HeroAvatar
                            onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)}
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
