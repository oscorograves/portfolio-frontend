import React from 'react';
import { motion } from 'framer-motion';

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

const DigitalSkills = ({ t }) => {
    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
                <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-primary-600 heading-glow">{t('experience.digitalSkills')}</h2>
                <motion.div
                    className="grid md:grid-cols-2 gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants} className="bento-card p-5">
                        <h3 className="font-bold text-white mb-3">{t('experience.platformsParams')}</h3>
                        <motion.div
                            className="flex flex-wrap gap-2"
                            variants={containerVariants}
                        >
                            {['Google Ads', 'Meta Ads Manager', 'LinkedIn Ads', 'GA4', 'HubSpot', 'SEMrush', 'Ahrefs', 'Optimizely'].map(skill => (
                                <motion.span
                                    key={skill}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-3 py-1.5 bg-[#0a0a0a] border border-retro-border rounded-sm text-sm text-gray-400 cursor-default hover:border-primary-500 hover:text-primary-500 transition-colors font-mono"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="bento-card p-5">
                        <h3 className="font-bold text-white mb-3">{t('experience.languages')}</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">{t('experience.languageList.hindi')}</span>
                                <span className="text-xs text-gray-500 bg-[#0a0a0a] border border-retro-border px-2 py-1 rounded-sm font-mono hover:border-primary-500 hover:text-primary-500 transition-colors cursor-default">
                                    {t('experience.languageLevels.native')}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">{t('experience.languageList.english')}</span>
                                <span className="text-xs text-gray-500 bg-[#0a0a0a] border border-retro-border px-2 py-1 rounded-sm font-mono hover:border-primary-500 hover:text-primary-500 transition-colors cursor-default">
                                    {t('experience.languageLevels.c1')}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">{t('experience.languageList.dutch')}</span>
                                <span className="text-xs text-gray-500 bg-[#0a0a0a] border border-retro-border px-2 py-1 rounded-sm font-mono hover:border-primary-500 hover:text-primary-500 transition-colors cursor-default">
                                    {t('experience.languageLevels.a2')}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default DigitalSkills;
