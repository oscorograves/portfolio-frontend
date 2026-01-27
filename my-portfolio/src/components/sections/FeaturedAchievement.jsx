import React from 'react';
import { motion } from 'framer-motion';
import { CaretRight } from 'phosphor-react';

const FeaturedAchievement = ({ t, setCurrentPage, isDarkMode }) => {
    return (
        <section className="border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-amber-600 dark:border-yellow-400">{t('featuredWork.title')}</h2>
                <motion.div

                    className="bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:border-amber-600 dark:hover:border-yellow-400 transition-all group cursor-pointer outline outline-2 outline-offset-4 outline-gray-900 outline-2"
                    data-cursor="pointer"
                    role="button"
                    onClick={() => {
                        setCurrentPage('case-studies');
                        setTimeout(() => {
                            const element = document.getElementById('packt');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        }, 100);
                    }}
                    whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="mb-2">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('featuredWork.packtTitle')}</h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">{t('featuredWork.projectSubtitle')}</p>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{t('featuredWork.projectDesc')}</p>
                        </div>
                        <CaretRight className="w-6 h-6 text-gray-400 group-hover:text-amber-600 dark:group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" weight="duotone" />
                    </div>
                    {/* Mobile: 2 columns, Desktop: 4 columns */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                        {[
                            { label: t('featuredWork.metrics.attendees'), value: '150' },
                            { label: t('featuredWork.metrics.netNew'), value: '80%+' },
                            { label: t('featuredWork.metrics.cac'), value: '$23' },
                            { label: t('featuredWork.metrics.roas'), value: '4.3×' }
                        ].map((metric, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-3 text-center">
                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{metric.label}</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedAchievement;
