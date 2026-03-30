import React from 'react';
import { motion } from 'framer-motion';
import { ArrowSquareOut, Barricade, ArrowRight } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

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

const CaseStudies = ({ t, isDarkMode, fallbackMetrics = [] }) => {
    const navigate = useNavigate();
    const packtMetrics = fallbackMetrics?.find(m => m.client === 'Packt') || { spend: 12000, cpr: 60, roi: 175, netNew: 93 };
    const packtAttendees = Math.round(packtMetrics.spend / packtMetrics.cpr);
    const packtRoas = (packtMetrics.roi / 100).toFixed(2).replace(/\.00$/, '');

    const audioMetrics = fallbackMetrics?.find(m => m.client === 'Pocket FM' && m.channel === 'Meta') || { volumeGrowth: 245, cpaReduction: 14, ctr: 2.8, d7Retention: 26 };

    const caseStudies = [
        {
            id: 'packt',
            title: t('caseStudies.packt.title'),
            projectTitle: t('caseStudies.packt.projectTitle'),
            clientName: t('caseStudies.packt.clientName'),
            badgeText: t('caseStudies.packt.badge'),
            category: t('caseStudies.packt.category'),
            problem: t('caseStudies.packt.problem', {
                attendees: packtAttendees,
                cac: packtMetrics.cpr,
                netNew: packtMetrics.netNew
            }),
            actions: t('caseStudies.packt.actions', { returnObjects: true }),
            results: [
                { metric: t('featuredWork.metrics.attendees'), value: String(packtAttendees) },
                { metric: t('featuredWork.metrics.netNew'), value: `${packtMetrics.netNew}%+` },
                { metric: t('featuredWork.metrics.cac'), value: `$${packtMetrics.cpr}` },
                { metric: t('featuredWork.metrics.roas'), value: `${packtRoas}×` }
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
                { metric: t("caseStudies.audio.results.volume"), value: `+${audioMetrics.volumeGrowth}%` },
                { metric: t("caseStudies.audio.results.cpa"), value: `-${audioMetrics.cpaReduction}%` },
                { metric: t("caseStudies.audio.results.ctr"), value: `${audioMetrics.ctr}%` },
                { metric: t("caseStudies.audio.results.retention"), value: `>${audioMetrics.d7Retention}%` }
            ],
            notionLink: "https://www.notion.so/Scaling-User-Acquisition-2eb5649dae6380b98236eeafece26268?source=copy_link",
            experiments: t('caseStudies.audio.experimentsData', { returnObjects: true }) || []
        }
    ];

    return (
        <div className="pt-20 min-h-screen transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 heading-glow">{t('caseStudies.title')}</h1>
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
                            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded overflow-hidden hover:border-amber-600 dark:hover:border-yellow-400 transition-all group"
                            whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="bg-gradient-to-r from-orange-600 to-red-600 dark:bg-none dark:bg-gray-900/60 text-white px-6 py-4">
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
                                {study.internalLink && (
                                    <div className="mt-3">
                                        <button
                                            onClick={() => navigate(study.internalLink)}
                                            className="inline-flex items-center gap-1 text-sm font-medium text-orange-100 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
                                        >
                                            View Architecture Details <ArrowRight className="w-4 h-4 text-blue-200" weight="bold" />
                                        </button>
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
                                {(() => {
                                    const formatBodyText = (text) => {
                                        if (typeof text !== 'string') return text;
                                        const parts = text.split(/(\$?\d+[\.,]?\d*(?:%|\+|x|×)*)/i);
                                        return parts.map((part, index) => {
                                            if (/^\$?\d+[\.,]?\d*(?:%|\+|x|×)*$/i.test(part)) {
                                                return <span key={index} className="text-blue-600 dark:text-blue-400 font-mono font-bold tracking-tight">{part}</span>;
                                            }
                                            return part;
                                        });
                                    };

                                    return (
                                        <>
                                            <div>
                                                <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-2 tracking-wide">{t('caseStudies.labels.problem')}</h3>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{formatBodyText(study.problem)}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-2 tracking-wide">{t('caseStudies.labels.actions')}</h3>
                                                <ul className="space-y-1.5">
                                                    {Array.isArray(study.actions) ? study.actions.map((action, j) => (
                                                        <li key={j} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                                            <span className="text-amber-600 dark:text-yellow-400 mt-1">•</span>
                                                            <span className="leading-relaxed">{formatBodyText(action)}</span>
                                                        </li>
                                                    )) : (
                                                        <li className="text-sm text-gray-500 italic">No actions available</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </>
                                    );
                                })()}

                                <div>
                                    <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-3 tracking-wide">{t('caseStudies.labels.results')}</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {study.results.map((result, j) => {
                                            // Helper to distinguish numbers and text
                                            const formatValue = (val) => {
                                                if (typeof val !== 'string') return val;
                                                const parts = val.split(/([\d.,]+)/);
                                                return parts.map((part, index) => {
                                                    if (/^[\d.,]+$/.test(part)) {
                                                        return <span key={index} className="font-mono">{part}</span>;
                                                    } else if (part) {
                                                        // Text or symbols
                                                        return <span key={index} className="text-[15px] font-sans font-semibold tracking-wide text-blue-500 dark:text-blue-400/90 mx-[1px]">{part}</span>;
                                                    }
                                                    return null;
                                                });
                                            };
                                            
                                            return (
                                                <div key={j} className="bg-gray-50 dark:bg-gray-900/40 border border-gray-300 dark:border-gray-800 rounded p-3 text-center">
                                                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{result.metric}</div>
                                                    <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-500 tracking-tight">
                                                        {formatValue(result.value)}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {study.notionLink && (
                                    <div className="pt-5 border-t border-gray-300 dark:border-gray-800">
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
                                {study.internalLink && (
                                    <div className="pt-5 border-t border-gray-300 dark:border-gray-800">
                                        <button
                                            onClick={() => navigate(study.internalLink)}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700 text-sm font-bold uppercase tracking-wide rounded transition-colors"
                                        >
                                            Explore Architecture <ArrowRight className="w-4 h-4 text-white" weight="bold" />
                                        </button>
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
