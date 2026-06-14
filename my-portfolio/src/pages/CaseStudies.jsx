import React from 'react';
import { motion } from 'framer-motion';
import { ArrowSquareOut, Barricade, ArrowRight, ArrowUpRight } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const CaseStudies = ({ t, isDarkMode, fallbackMetrics = [] }) => {
    const navigate = useNavigate();
    const packt = fallbackMetrics.find(m => m.client === 'Packt') || { spend: 12000, cpr: 60, roi: 175, netNew: 93 };
    const audio = fallbackMetrics.find(m => m.client === 'Pocket FM' && m.channel === 'Meta') || { volumeGrowth: 245, cpaReduction: 14, ctr: 2.8, d7Retention: 26 };

    const studies = [
        {
            id: 'packt', title: t('caseStudies.packt.clientName'), project: t('caseStudies.packt.projectTitle'),
            badge: t('caseStudies.packt.badge'), color: 'from-amber-500/15',
            problem: t('caseStudies.packt.problem', { attendees: Math.round(packt.spend / packt.cpr), cac: packt.cpr, netNew: packt.netNew }),
            actions: t('caseStudies.packt.actions', { returnObjects: true }),
            results: [
                { l: t('featuredWork.metrics.attendees'), v: String(Math.round(packt.spend / packt.cpr)) },
                { l: t('featuredWork.metrics.netNew'), v: `${packt.netNew}%+` },
                { l: t('featuredWork.metrics.cac'), v: `$${packt.cpr}` },
                { l: t('featuredWork.metrics.roas'), v: `${(packt.roi / 100).toFixed(2).replace(/\.00$/, '')}×` },
            ],
            link: "https://www.notion.so/Scaling-Paid-GTM-for-Events-2e75649dae6380c49e61c8425a4fb4e7",
        },
        {
            id: 'jrb', title: t('caseStudies.jrb.clientName'), project: t('caseStudies.jrb.projectTitle'),
            badge: t('caseStudies.jrb.badge'), color: 'from-blue-500/15',
            problem: t('caseStudies.jrb.problem'),
            actions: t('caseStudies.jrb.actions', { returnObjects: true }),
            results: [
                { l: t('caseStudies.jrb.resultsData.testClusters'), v: "5" },
                { l: t('caseStudies.jrb.resultsData.funnelZones'), v: "4" },
                { l: t('caseStudies.jrb.resultsData.month1Focus'), v: t('caseStudies.jrb.resultsData.month1FocusValue') },
                { l: t('caseStudies.jrb.resultsData.outcome'), v: t('caseStudies.jrb.resultsData.outcomeValue') },
            ],
            link: "https://www.notion.so/30-Day-Conversion-Revenue-Lift-Roadmap-2e75649dae63804895b3fae043d1993a",
        },
        {
            id: 'audio', title: t('caseStudies.audio.clientName'), project: t('caseStudies.audio.projectTitle'),
            badge: t('caseStudies.audio.badge'), color: 'from-emerald-500/15',
            problem: t('caseStudies.audio.problem'),
            actions: t('caseStudies.audio.actions', { returnObjects: true }),
            results: [
                { l: t("caseStudies.audio.results.volume"), v: `+${audio.volumeGrowth}%` },
                { l: t("caseStudies.audio.results.cpa"), v: `-${audio.cpaReduction}%` },
                { l: t("caseStudies.audio.results.ctr"), v: `${audio.ctr}%` },
                { l: t("caseStudies.audio.results.retention"), v: `>${audio.d7Retention}%` },
            ],
            link: "https://www.notion.so/Scaling-User-Acquisition-2eb5649dae6380b98236eeafece26268",
        }
    ];

    const fmt = (text) => {
        if (typeof text !== 'string') return text;
        return text.split(/(\$?\d+[\.,]?\d*(?:%|\+|x|×)*)/).map((part, i) =>
            /^\$?\d+[\.,]?\d*(?:%|\+|x|×)*$/.test(part) ? <span key={i} className="text-amber-400 font-semibold mono">{part}</span> : part
        );
    };

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-12">
                <h1 className="text-4xl font-bold text-white mb-2 heading-glow">{t('caseStudies.title')}</h1>
                <p className="text-zinc-500 mb-10 text-sm">{t('caseStudies.subtitle')}</p>

                <motion.div className="space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={container}>
                    {studies.map((s, i) => (
                        <motion.div key={i} id={s.id} variants={item} className="bento-card overflow-hidden group">
                            {/* Header */}
                            <div className={`relative px-6 py-5 bg-gradient-to-r ${s.color} to-transparent border-b border-zinc-800`}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">{s.title}</h2>
                                        <p className="text-sm text-zinc-400">{s.project}</p>
                                    </div>
                                    <span className="badge-amber">{s.badge}</span>
                                </div>
                                {s.link && (
                                    <a href={s.link} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs mono text-zinc-400 hover:text-amber-400 transition-colors mt-3">
                                        {t('caseStudies.viewProjectLog')} <ArrowUpRight className="w-3.5 h-3.5" weight="bold" />
                                    </a>
                                )}
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-5">
                                <div>
                                    <h3 className="section-label mb-2">{t('caseStudies.labels.problem')}</h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed">{fmt(s.problem)}</p>
                                </div>
                                <div>
                                    <h3 className="section-label mb-2">{t('caseStudies.labels.actions')}</h3>
                                    <ul className="space-y-1.5">
                                        {Array.isArray(s.actions) ? s.actions.map((a, j) => (
                                            <li key={j} className="text-sm text-zinc-400 flex items-start gap-2.5 leading-relaxed">
                                                <span className="text-amber-500/60 mt-1.5 shrink-0">▸</span>{fmt(a)}
                                            </li>
                                        )) : null}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="section-label mb-3">{t('caseStudies.labels.results')}</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {s.results.map((r, j) => (
                                            <div key={j} className="bg-zinc-900/80 border border-zinc-800/50 rounded-xl p-3 text-center">
                                                <div className="text-[10px] mono text-zinc-500 uppercase tracking-wider mb-1">{r.l}</div>
                                                <div className="metric text-xl text-amber-400">{r.v}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default CaseStudies;
