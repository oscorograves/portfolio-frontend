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

const MetricsPage = ({ t, fallbackMetrics, isDarkMode }) => {
    // Aggregate Metrics Logic (Simplified for static display)
    const totalSpend = fallbackMetrics.reduce((acc, curr) => acc + curr.spend, 0);
    const avgCTR = fallbackMetrics.reduce((acc, curr) => acc + curr.ctr, 0) / fallbackMetrics.length;
    const avgCVR = fallbackMetrics.reduce((acc, curr) => acc + curr.cvr, 0) / fallbackMetrics.length;
    const avgROI = fallbackMetrics.reduce((acc, curr) => acc + curr.roi, 0) / fallbackMetrics.length;

    return (
        <div className="pt-20 min-h-screen transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b-2 border-amber-600 dark:border-yellow-400">
                    {t('metricsPage.title')}
                </h1>

                <motion.div
                    className="space-y-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {/* Summary Cards */}
                    <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-4 mb-8">
                        <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 text-center hover:border-amber-600 dark:hover:border-yellow-400 transition-all outline outline-2 outline-offset-4 outline-gray-900 outline-2">
                            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2 font-mono">{t('metricsPage.totalSpend')}</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white font-mono">${(totalSpend / 1000).toFixed(1)}K</div>
                        </motion.div>
                        <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 text-center hover:border-amber-600 dark:hover:border-yellow-400 transition-all outline outline-2 outline-offset-4 outline-gray-900 outline-2">
                            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2 font-mono">{t('metricsPage.avgCtr')}</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white font-mono">{avgCTR.toFixed(2)}%</div>
                        </motion.div>
                        <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 text-center hover:border-amber-600 dark:hover:border-yellow-400 transition-all outline outline-2 outline-offset-4 outline-gray-900 outline-2">
                            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2 font-mono">{t('metricsPage.avgCvr')}</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white font-mono">{avgCVR.toFixed(2)}%</div>
                        </motion.div>
                        <motion.div whileHover={{ y: -5 }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 text-center hover:border-amber-600 dark:hover:border-yellow-400 transition-all outline outline-2 outline-offset-4 outline-gray-900 outline-2">
                            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2 font-mono">{t('metricsPage.avgRoi')}</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white font-mono">{avgROI.toFixed(0)}%</div>
                        </motion.div>
                    </motion.div>

                    {/* Detailed Table */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded overflow-hidden shadow-lg"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-600 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">{t('metricsPage.table.client')}</th>
                                        <th scope="col" className="px-6 py-3">{t('metricsPage.table.channel')}</th>
                                        <th scope="col" className="px-6 py-3 text-right">{t('metricsPage.table.spend')}</th>
                                        <th scope="col" className="px-6 py-3 text-right">{t('metricsPage.table.ctr')}</th>
                                        <th scope="col" className="px-6 py-3 text-right">{t('metricsPage.table.cpl')}</th>
                                        <th scope="col" className="px-6 py-3 text-right">{t('metricsPage.table.cvr')}</th>
                                        <th scope="col" className="px-6 py-3 text-right">{t('metricsPage.table.roi')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fallbackMetrics.map((row, index) => (
                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.client}</td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{row.channel}</td>
                                            <td className="px-6 py-4 text-right text-gray-900 dark:text-white font-mono">${row.spend}</td>
                                            <td className="px-6 py-4 text-right text-gray-900 dark:text-white font-mono">{row.ctr}%</td>
                                            <td className="px-6 py-4 text-right text-gray-900 dark:text-white font-mono">${row.cpl}</td>
                                            <td className="px-6 py-4 text-right text-gray-900 dark:text-white font-mono">{row.cvr}%</td>
                                            <td className="px-6 py-4 text-right text-green-600 dark:text-green-400 font-bold font-mono">{row.roi}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Insights Section */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('metricsPage.insights.title')}</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <motion.div whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 outline outline-2 outline-offset-4 outline-gray-900 outline-2">
                                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2 font-mono">{t('metricsPage.insights.topChannel.title')}</div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{t('metricsPage.insights.topChannel.name')}</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    {t('metricsPage.insights.topChannel.desc')}
                                </p>
                            </motion.div>
                            <motion.div whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 outline outline-2 outline-offset-4 outline-gray-900 outline-2">
                                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2 font-mono">{t('metricsPage.insights.bestCvr.title')}</div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{t('metricsPage.insights.bestCvr.name')}</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    {t('metricsPage.insights.bestCvr.desc')}
                                </p>
                            </motion.div>
                            <motion.div whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 outline outline-2 outline-offset-4 outline-gray-900 outline-2">
                                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2 font-mono">{t('metricsPage.insights.highestRoi.title')}</div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{t('metricsPage.insights.highestRoi.name')}</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    {t('metricsPage.insights.highestRoi.desc')}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MetricsPage;
