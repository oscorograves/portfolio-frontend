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
        <section className="transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-primary-500 dark:border-primary-400">{t('experience.digitalSkills')}</h2>
                <motion.div
                    className="grid md:grid-cols-2 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t('experience.platformsParams')}</h3>
                        <motion.div
                            className="flex flex-wrap gap-2"
                            variants={containerVariants}
                        >
                            {['Google Ads', 'Meta Ads Manager', 'LinkedIn Ads', 'GA4', 'HubSpot', 'SEMrush', 'Ahrefs', 'Optimizely'].map(skill => (
                                <motion.span
                                    key={skill}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.1 }}
                                    className="px-3 py-1.5 bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 cursor-default hover:bg-gray-100 dark:hover:bg-dark-bg hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t('experience.languages')}</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700 dark:text-gray-300">{t('experience.languageList.hindi')}</span>
                                <motion.span
                                    whileHover={{ scale: 1.1 }}
                                    className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-700 px-2 py-1 rounded cursor-default hover:bg-gray-100 dark:hover:bg-dark-bg hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    {t('experience.languageLevels.native')}
                                </motion.span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700 dark:text-gray-300">{t('experience.languageList.english')}</span>
                                <motion.span
                                    whileHover={{ scale: 1.1 }}
                                    className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-700 px-2 py-1 rounded cursor-default hover:bg-gray-100 dark:hover:bg-dark-bg hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    {t('experience.languageLevels.c1')}
                                </motion.span>

                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700 dark:text-gray-300">{t('experience.languageList.dutch')}</span>
                                <motion.span
                                    whileHover={{ scale: 1.1 }}
                                    className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-700 px-2 py-1 rounded cursor-default hover:bg-gray-100 dark:hover:bg-dark-bg hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    {t('experience.languageLevels.a2')}
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default DigitalSkills;
