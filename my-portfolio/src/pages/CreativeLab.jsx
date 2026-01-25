import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'phosphor-react';

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

const CreativeLab = ({ t }) => {
    const [selectedCreative, setSelectedCreative] = useState(null);

    const creatives = [
        { goal: t('creativeLab.goals.brandAwareness'), ctr: '2.8%', cpl: '$12' },
        { goal: t('creativeLab.goals.leadGen'), ctr: '3.2%', cpl: '$18' },
        { goal: t('creativeLab.goals.appInstall'), ctr: '4.1%', cpl: '$8' },
        { goal: t('creativeLab.goals.retargeting'), ctr: '5.2%', cpl: '$15' },
        { goal: t('creativeLab.goals.productLaunch'), ctr: '3.9%', cpl: '$22' },
        { goal: t('creativeLab.goals.eventReg'), ctr: '3.5%', cpl: '$14' },
        { goal: t('creativeLab.goals.contentDownload'), ctr: '2.9%', cpl: '$10' },
        { goal: t('creativeLab.goals.webinarSignup'), ctr: '4.3%', cpl: '$25' },
        { goal: t('creativeLab.goals.trialConv'), ctr: '3.7%', cpl: '$30' }
    ];

    const videos = [
        { title: t('creativeLab.videoTitles.productDemo'), type: t('creativeLab.videoTypes.adEdit'), duration: '0:30' },
        { title: t('creativeLab.videoTitles.brandStory'), type: t('creativeLab.videoTypes.promo'), duration: '1:15' },
        { title: t('creativeLab.videoTitles.founderInterview'), type: t('creativeLab.videoTypes.podcast'), duration: '2:45' },
        { title: t('creativeLab.videoTitles.featureHighlight'), type: t('creativeLab.videoTypes.adEdit'), duration: '0:45' }
    ];

    return (
        <div className="pt-20 min-h-screen transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{t('creativeLab.title')}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 pb-4 border-b-2 border-amber-600 dark:border-yellow-400">{t('creativeLab.subtitle')}</p>

                {/* Ad Creatives */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('creativeLab.adCreatives')}</h2>
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {creatives.map((creative, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                onClick={() => setSelectedCreative(creative)}
                                className="aspect-square bg-white/40 dark:bg-gray-900/40 border border-gray-300 dark:border-gray-800 rounded cursor-pointer hover:border-amber-600 dark:hover:border-yellow-400 transition-all group outline outline-2 outline-offset-4 outline-gray-900 outline-2"
                                whileHover="hover"
                            >
                                <div className="w-full h-full flex flex-col items-center justify-center p-4 relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                                    <motion.div
                                        variants={{ hover: { scale: 1.2 } }}
                                        className="w-12 h-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center mb-3 group-hover:bg-amber-600 dark:group-hover:bg-yellow-400 group-hover:border-amber-600 dark:group-hover:border-yellow-400 transition-all"
                                    >
                                        <Play className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-white dark:group-hover:text-gray-900 transition-all" weight="duotone" />
                                    </motion.div>
                                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">{creative.goal}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Video Content */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('creativeLab.videoContent')}</h2>
                    <motion.div
                        className="grid md:grid-cols-2 gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {videos.map((video, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover="hover"
                                className="bg-white/40 dark:bg-gray-900/40 border border-gray-300 dark:border-gray-800 rounded overflow-hidden hover:border-amber-600 dark:hover:border-yellow-400 transition-all group cursor-pointer outline outline-2 outline-offset-4 outline-gray-900 outline-2"
                            >
                                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center relative">
                                    <motion.div
                                        variants={{ hover: { scale: 1.2 } }}
                                        className="w-14 h-14 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center group-hover:bg-amber-600 dark:group-hover:bg-yellow-400 group-hover:border-amber-600 dark:group-hover:border-yellow-400 transition-all"
                                    >
                                        <Play className="w-8 h-8 text-gray-700 dark:text-white group-hover:text-white dark:group-hover:text-gray-900 transition-all" weight="duotone" />
                                    </motion.div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">{video.type}</span>
                                        <span className="text-xs text-gray-600 dark:text-gray-400">{video.duration}</span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{video.title}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Creative Modal */}
            {selectedCreative && (
                <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-6">
                    <div className="bg-white dark:bg-gray-900 border-2 border-amber-600 dark:border-yellow-400 rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-orange-600 to-red-600 dark:bg-gray-800 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-gray-800 dark:border-gray-700">
                            <h3 className="text-lg font-bold">{t('creativeLab.modal.title')}</h3>
                            <button onClick={() => setSelectedCreative(null)} className="hover:bg-white/20 p-1 rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2">
                                <X className="w-5 h-5" weight="duotone" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded mb-6 border border-gray-300 dark:border-gray-700"></div>

                            <div className="space-y-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-4">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-300 dark:border-gray-700">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('creativeLab.metrics.goal')}</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{selectedCreative.goal}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-300 dark:border-gray-700">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('creativeLab.metrics.ctr')}</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{selectedCreative.ctr}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('creativeLab.metrics.cpl')}</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{selectedCreative.cpl}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreativeLab;
