import React from 'react';
import { motion } from 'framer-motion';
import { CaretRight } from 'phosphor-react';

const FeaturedAchievement = ({ t, navigate, isDarkMode, fallbackMetrics = [] }) => {
    const packtMetrics = (fallbackMetrics && fallbackMetrics.find(m => m.client === 'Packt')) || { spend: 12000, cpr: 60, roi: 175, netNew: 93 };
    const packtAttendees = Math.round(packtMetrics.spend / packtMetrics.cpr);
    const packtRoas = (packtMetrics.roi / 100).toFixed(2).replace(/\.00$/, '');

    return (
        <section className="border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-amber-600 dark:border-yellow-400">{t('featuredWork.title')}</h2>
                <motion.div

                    className="ds-card-base ds-card-hover rounded-xl p-8 group cursor-pointer"
                    data-cursor="pointer"
                    role="button"
                    onClick={() => {
                        navigate('/case-studies');
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
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {(() => {
                                    const text = t('featuredWork.projectDesc', { attendees: packtAttendees, netNew: packtMetrics.netNew });
                                    const parts = text.split(/(\$?\d+[\.,]?\d*(?:%|\+|x|×)*)/i);
                                    return parts.map((part, index) => {
                                        if (/^\$?\d+[\.,]?\d*(?:%|\+|x|×)*$/i.test(part)) {
                                            return <span key={index} className="text-blue-600 dark:text-blue-400 font-mono font-bold tracking-tight">{part}</span>;
                                        }
                                        return part;
                                    });
                                })()}
                            </p>
                        </div>
                        <CaretRight className="w-6 h-6 text-gray-400 group-hover:text-amber-600 dark:group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" weight="duotone" />
                    </div>
                    {/* Mobile: 2 columns, Desktop: 4 columns */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                        {(() => {
                            const formatValue = (val) => {
                                if (typeof val !== 'string') return val;
                                const parts = val.split(/([\d.,]+)/);
                                return parts.map((part, index) => {
                                    if (/^[\d.,]+$/.test(part)) {
                                        return <span key={index} className="font-mono">{part}</span>;
                                    } else if (part) {
                                        return <span key={index} className="text-[15px] font-sans font-semibold tracking-wide text-blue-500 dark:text-blue-400/90 mx-[1px]">{part}</span>;
                                    }
                                    return null;
                                });
                            };

                            return [
                                { label: t('featuredWork.metrics.attendees'), value: String(packtAttendees) },
                                { label: t('featuredWork.metrics.netNew'), value: `${packtMetrics.netNew}%+` },
                                { label: t('featuredWork.metrics.cac'), value: `$${packtMetrics.cpr}` },
                                { label: t('featuredWork.metrics.roas'), value: `${packtRoas}×` }
                            ].map((metric, i) => (
                                <div key={i} className="ds-card-base rounded p-3 text-center">
                                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{metric.label}</div>
                                    <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-500 tracking-tight">{formatValue(metric.value)}</div>
                                </div>
                            ));
                        })()}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedAchievement;
