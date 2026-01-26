import React from 'react';
import { motion } from 'framer-motion';
import { ArrowSquareOut, Barricade } from 'phosphor-react';

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

const CaseStudies = ({ t, isDarkMode }) => {
    const caseStudies = [
        {
            id: 'packt',
            title: t('caseStudies.packt.title'),
            projectTitle: t('caseStudies.packt.projectTitle'),
            clientName: t('caseStudies.packt.clientName'),
            badgeText: t('caseStudies.packt.badge'),
            category: t('caseStudies.packt.category'),
            problem: t('caseStudies.packt.problem'),
            actions: t('caseStudies.packt.actions', { returnObjects: true }),
            results: [
                { metric: t('featuredWork.metrics.attendees'), value: "150" },
                { metric: t('featuredWork.metrics.netNew'), value: "80%+" },
                { metric: t('featuredWork.metrics.cac'), value: "$23" },
                { metric: t('featuredWork.metrics.roas'), value: "4.3×" }
            ],
            notionLink: "https://www.notion.so/Scaling-Paid-GTM-for-Events-2e75649dae6380c49e61c8425a4fb4e7?source=copy_link",
            experiments: t('caseStudies.packt.experimentsData', { returnObjects: true }) || []
        },
        {
            id: 'jrb',
            title: t('caseStudies.jrb.title'),
            projectTitle: t('caseStudies.jrb.projectTitle'),
            clientName: t('caseStudies.jrb.clientName'),
            badgeText: t('caseStudies.jrb.badge'),
            category: t('caseStudies.jrb.category'),
            problem: t('caseStudies.jrb.problem'),
            actions: t('caseStudies.jrb.actions', { returnObjects: true }),
            results: [
                { metric: t('caseStudies.jrb.resultsData.testClusters'), value: "5" },
                { metric: t('caseStudies.jrb.resultsData.funnelZones'), value: "4" },
                { metric: t('caseStudies.jrb.resultsData.month1Focus'), value: t('caseStudies.jrb.resultsData.month1FocusValue') },
                { metric: t('caseStudies.jrb.resultsData.outcome'), value: t('caseStudies.jrb.resultsData.outcomeValue') }
            ],
            notionLink: "https://www.notion.so/30-Day-Conversion-Revenue-Lift-Roadmap-2e75649dae63804895b3fae043d1993a?source=copy_link",
            experiments: t('caseStudies.jrb.experimentsData', { returnObjects: true }) || []
        },
        {
            id: 'audio',
            title: t('caseStudies.audio.title'),
            projectTitle: t('caseStudies.audio.projectTitle'),
            clientName: t('caseStudies.audio.clientName'),
            badgeText: t('caseStudies.audio.badge'),
            category: t('caseStudies.audio.category'),
            problem: t('caseStudies.audio.problem'),
            actions: t('caseStudies.audio.actions', { returnObjects: true }),
            results: [
                { metric: t("caseStudies.audio.results.ctr"), value: "+16%" },
                { metric: t("caseStudies.audio.results.cpa"), value: "−14%" },
                { metric: t("caseStudies.audio.results.variants"), value: "12+" },
                { metric: t("caseStudies.audio.results.scale"), value: t("caseStudies.audio.results.stable") }
            ],
            notionLink: "https://www.notion.so/Scaling-User-Acquisition-2eb5649dae6380b98236eeafece26268?source=copy_link"
        }
    ];

    return (
        <div className="pt-20 min-h-screen transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{t('caseStudies.title')}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 pb-4 border-b-2 border-amber-600 dark:border-yellow-400">{t('caseStudies.subtitle')}</p>

                <motion.div
                    className="space-y-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {caseStudies.map((study, i) => (
                        <motion.div
                            key={i}
                            id={study.id}
                            variants={itemVariants}
                            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded overflow-hidden hover:border-amber-600 dark:hover:border-yellow-400 transition-all group outline outline-2 outline-offset-4 outline-gray-900 outline-2"
                            whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="bg-gradient-to-r from-orange-600 to-red-600 dark:bg-none dark:bg-gray-800 text-white px-6 py-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">{study.clientName}</h2>
                                        <div className="text-lg text-orange-100 dark:text-gray-400 font-medium">
                                            {study.projectTitle}
                                        </div>
                                    </div>
                                    <div className="text-xs bg-white/20 px-3 py-1 rounded whitespace-nowrap ml-4">
                                        {study.badgeText}
                                    </div>
                                </div>
                                {study.notionLink && (
                                    <div className="mt-3">
                                        <a
                                            href={study.notionLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-sm font-medium text-orange-100 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
                                        >
                                            {t('caseStudies.viewProjectLog')} <ArrowSquareOut className="w-4 h-4 text-blue-200" weight="duotone" />
                                        </a>
                                    </div>
                                )}
                                {study.comingSoonLog && (
                                    <div className="mt-3">
                                        <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-100 cursor-default opacity-80">
                                            {t('caseStudies.projectLogComingSoon')} <Barricade className="w-4 h-4 text-orange-300" weight="duotone" />
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 space-y-5">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-2 tracking-wide">{t('caseStudies.labels.problem')}</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{study.problem}</p>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-2 tracking-wide">{t('caseStudies.labels.actions')}</h3>
                                    <ul className="space-y-1.5">
                                        {study.actions.map((action, j) => (
                                            <li key={j} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                                <span className="text-gray-400 mt-1">•</span>
                                                <span>{action}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-3 tracking-wide">{t('caseStudies.labels.results')}</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {study.results.map((result, j) => (
                                            <div key={j} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded p-3 text-center">
                                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{result.metric}</div>
                                                <div className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">{result.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {study.notionLink && (
                                    <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
                                        <a
                                            href={study.notionLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium rounded transition-colors"
                                        >
                                            {t('caseStudies.viewExperimentLog')} <ArrowSquareOut className="w-4 h-4 text-blue-500" weight="duotone" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div >
    );
};

export default CaseStudies;
