import React from 'react';
import { motion } from 'framer-motion';

const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };

const TIMELINE_KEYS = ['start', 'early', 'mid', 'current', 'future'];

const MyStory = ({ t }) => {
    // Build timeline array from named keys
    const timeline = TIMELINE_KEYS.map(key => {
        const entry = t(`myStory.timeline.${key}`, { returnObjects: true });
        if (typeof entry === 'object' && entry.year) return entry;
        return null;
    }).filter(Boolean);

    const philosophy = t('myStory.philosophy.cards', { returnObjects: true });

    const colors = [
        { dot: 'bg-blue-500', accent: 'text-blue-400' },
        { dot: 'bg-emerald-500', accent: 'text-emerald-400' },
        { dot: 'bg-amber-500', accent: 'text-amber-400' },
        { dot: 'bg-rose-500', accent: 'text-rose-400' },
        { dot: 'bg-purple-500', accent: 'text-purple-400' },
    ];

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-12">
                <h1 className="text-4xl font-bold text-white mb-2 heading-glow">{t('myStory.hero.title')}</h1>
                <p className="text-zinc-500 mb-12 text-sm">{t('myStory.hero.subtitle')}</p>

                {/* Timeline */}
                <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={container}>
                    {/* Vertical line */}
                    <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 md:-translate-x-px" />

                    {timeline.map((entry, i) => {
                        const c = colors[i % colors.length];
                        const isLeft = i % 2 === 0;
                        return (
                            <motion.div key={i} variants={item}
                                className={`relative flex items-start mb-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                {/* Dot */}
                                <div className={`absolute left-5 md:left-1/2 w-3 h-3 ${c.dot} rounded-full -translate-x-1/2 mt-2 z-10 ring-4 ring-[#09090B]`} />
                                {/* Card */}
                                <div className={`ml-12 md:ml-0 ${isLeft ? 'md:w-1/2 md:pr-12 md:text-right' : 'md:w-1/2 md:pl-12'}`}>
                                    <div className="bento-card p-5">
                                        <div className={`text-xs mono ${c.accent} uppercase tracking-widest mb-1`}>{entry.year}</div>
                                        <h3 className="text-base font-bold text-white mb-1.5">{entry.title}</h3>
                                        <p className="text-sm text-zinc-500 leading-relaxed">{entry.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Philosophy */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-white mb-6 heading-glow">{t('myStory.philosophy.title')}</h2>
                    <motion.div className="grid md:grid-cols-3 gap-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={container}>
                        {Array.isArray(philosophy) && philosophy.map((card, i) => {
                            const accents = [
                                { bg: 'bg-purple-500/10', text: 'text-purple-400' },
                                { bg: 'bg-amber-500/10', text: 'text-amber-400' },
                                { bg: 'bg-sky-500/10', text: 'text-sky-400' },
                            ];
                            const a = accents[i] || accents[0];
                            return (
                                <motion.div key={i} variants={item} className="bento-card p-6">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 ${a.bg}`}>
                                        <span className={`text-lg font-bold mono ${a.text}`}>{i + 1}</span>
                                    </div>
                                    <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed">{card.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default MyStory;
