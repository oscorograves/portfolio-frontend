import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, RocketLaunch, ChartPieSlice } from 'phosphor-react';

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

const Competencies = ({ t }) => {
    return (
        <section className="border-b border-retro-border">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
                <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-primary-600 heading-glow">{t('experience.skills')}</h2>
                <motion.div
                    className="grid md:grid-cols-3 gap-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {(() => {
                        const iconData = {
                            Target: { icon: Megaphone, textClass: 'text-rose-500', bgClass: 'bg-rose-500/10' },
                            TrendingUp: { icon: RocketLaunch, textClass: 'text-amber-500', bgClass: 'bg-amber-500/10' },
                            LineChart: { icon: ChartPieSlice, textClass: 'text-indigo-500', bgClass: 'bg-indigo-500/10' }
                        };
                        const competencies = t('experience.competencies', { returnObjects: true });
                        // Guard against non-array values during translation loading
                        if (!Array.isArray(competencies)) return null;
                        return competencies.map((competency, i) => {
                            const IconSetup = iconData[competency.icon] || { icon: Megaphone, textClass: 'text-gray-400', bgClass: 'bg-gray-800' };
                            const CompIcon = IconSetup.icon;
                            return (
                            <motion.div key={i} variants={itemVariants} className="bento-card p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-12 h-12 ${IconSetup.bgClass} rounded-sm flex items-center justify-center shrink-0`}>
                                        <CompIcon className={`w-6 h-6 ${IconSetup.textClass}`} weight="duotone" />
                                    </div>
                                    <h3 className="font-bold text-white text-base">{competency.title}</h3>
                                </div>
                                <ul className="space-y-1.5">
                                    {Array.isArray(competency.skills) && competency.skills.map((skill, j) => (
                                        <motion.li
                                            key={j}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: j * 0.05 }}
                                            className="text-sm text-gray-400 flex items-start gap-2"
                                        >
                                            <span className="text-primary-500 mt-1.5">•</span>
                                            <span>{skill}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                            );
                        });
                    })()}
                </motion.div>
            </div>
        </section>
    );
};

export default Competencies;
