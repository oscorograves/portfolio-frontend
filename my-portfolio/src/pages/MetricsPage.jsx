import React from 'react';
import { motion } from 'framer-motion';
import Resources from '../components/sections/Resources';

const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };

const MetricsPage = ({ t, fallbackMetrics, isDarkMode }) => {
    const [selectedChannel, setSelectedChannel] = React.useState('All');

    const filtered = selectedChannel === 'All' ? fallbackMetrics : fallbackMetrics.filter(m => m.channel === selectedChannel);
    const channels = ['All', ...new Set(fallbackMetrics.map(m => m.channel))];

    const totalSpend = filtered.reduce((a, c) => a + c.spend, 0);
    const avgCTR = filtered.length ? filtered.reduce((a, c) => a + c.ctr, 0) / filtered.length : 0;
    const avgCVR = filtered.length ? filtered.reduce((a, c) => a + c.cvr, 0) / filtered.length : 0;
    const avgROI = filtered.length ? filtered.reduce((a, c) => a + c.roi, 0) / filtered.length : 0;

    let topChannel = null, bestCvr = null, highestRoi = null;
    if (filtered.length > 0) {
        const cs = {}; filtered.forEach(m => { cs[m.channel] = (cs[m.channel] || 0) + m.spend; });
        const topName = Object.keys(cs).reduce((a, b) => cs[a] > cs[b] ? a : b);
        topChannel = { name: topName, spend: cs[topName].toLocaleString() };
        bestCvr = filtered.reduce((p, c) => p.cvr > c.cvr ? p : c);
        highestRoi = filtered.reduce((p, c) => p.roi > c.roi ? p : c);
    }

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white heading-glow mb-2">{t('metricsPage.title')}</h1>
                        <p className="text-zinc-500 text-sm">Campaign performance data across all channels</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {channels.map(ch => (
                            <button key={ch} onClick={() => setSelectedChannel(ch)}
                                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                                    selectedChannel === ch
                                        ? 'bg-amber-500 text-zinc-900 font-semibold shadow-lg shadow-amber-500/20'
                                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600 hover:text-zinc-300'
                                }`}>
                                {ch === 'All' ? t('metricsPage.filters.all') : ch}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={container}>
                    {/* Summary cards */}
                    <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { label: t('metricsPage.totalSpend'), pre: '$', val: (totalSpend / 1000).toFixed(1), suf: 'K' },
                            { label: t('metricsPage.avgCtr'), val: avgCTR.toFixed(2), suf: '%' },
                            { label: t('metricsPage.avgCvr'), val: avgCVR.toFixed(2), suf: '%' },
                            { label: t('metricsPage.avgRoi'), val: avgROI.toFixed(0), suf: '%' },
                        ].map((c, i) => (
                            <div key={i} className="bento-accent p-5 text-center">
                                <div className="section-label mb-2">{c.label}</div>
                                <div className="metric text-2xl md:text-3xl text-white">
                                    <span className="text-amber-500/60 text-[0.6em]">{c.pre || ''}</span>
                                    {c.val}
                                    <span className="text-amber-500/60 text-[0.6em] ml-0.5">{c.suf}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Table */}
                    <motion.div variants={item} className="bento-card overflow-hidden p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-[10px] text-zinc-500 uppercase bg-zinc-900/60 mono tracking-wider">
                                    <tr>
                                        <th className="px-5 py-3">{t('metricsPage.table.client')}</th>
                                        <th className="px-5 py-3">{t('metricsPage.table.channel')}</th>
                                        <th className="px-5 py-3 text-right">{t('metricsPage.table.spend')}</th>
                                        <th className="px-5 py-3 text-right">{t('metricsPage.table.ctr')}</th>
                                        <th className="px-5 py-3 text-right">{t('metricsPage.table.cpr')}</th>
                                        <th className="px-5 py-3 text-right">{t('metricsPage.table.cvr')}</th>
                                        <th className="px-5 py-3 text-right">{t('metricsPage.table.roi')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((r, i) => (
                                        <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                                            <td className="px-5 py-3.5 font-medium text-white">{r.client}</td>
                                            <td className="px-5 py-3.5 text-zinc-400">{r.channel}</td>
                                            <td className="px-5 py-3.5 text-right text-white mono"><span className="text-amber-500/60 text-xs">$</span>{r.spend.toLocaleString()}</td>
                                            <td className="px-5 py-3.5 text-right text-white mono">{r.ctr}<span className="text-zinc-600 text-xs">%</span></td>
                                            <td className="px-5 py-3.5 text-right text-white mono"><span className="text-amber-500/60 text-xs">$</span>{r.cpr}</td>
                                            <td className="px-5 py-3.5 text-right text-white mono">{r.cvr}<span className="text-zinc-600 text-xs">%</span></td>
                                            <td className="px-5 py-3.5 text-right text-emerald-400 font-semibold mono">{r.roi}<span className="text-emerald-400/50 text-xs">%</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Insights */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-5">{t('metricsPage.insights.title')}</h2>
                        <div className="grid md:grid-cols-3 gap-3">
                            {[
                                { label: t('metricsPage.insights.topChannel.title'), value: topChannel?.name, desc: topChannel ? t('metricsPage.insights.dynamicTopChannelDesc', { spend: topChannel.spend }) : t('metricsPage.insights.topChannel.desc') },
                                { label: t('metricsPage.insights.bestCvr.title'), value: bestCvr ? `${bestCvr.client} (${bestCvr.channel})` : '', desc: bestCvr ? t('metricsPage.insights.dynamicBestCvrDesc', { cvr: bestCvr.cvr }) : t('metricsPage.insights.bestCvr.desc') },
                                { label: t('metricsPage.insights.highestRoi.title'), value: highestRoi ? `${highestRoi.client} (${highestRoi.channel})` : '', desc: highestRoi ? t('metricsPage.insights.dynamicHighestRoiDesc', { roi: highestRoi.roi }) : t('metricsPage.insights.highestRoi.desc') },
                            ].map((ins, i) => (
                                <motion.div key={i} variants={item} className="bento-card p-5">
                                    <div className="section-label mb-2">{ins.label}</div>
                                    <div className="text-lg font-bold text-white mb-1">{ins.value}</div>
                                    <p className="text-xs text-zinc-500 leading-relaxed">{ins.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <Resources t={t} />
        </div>
    );
};

export default MetricsPage;
