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
        <section className="border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-amber-600 dark:border-yellow-400 heading-glow">{t('experience.skills')}</h2>
                <motion.div
                    className="grid md:grid-cols-3 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {(() => {
                        const icons = {
                            Target: <Megaphone className="w-8 h-8" weight="duotone" />,
                            TrendingUp: <RocketLaunch className="w-8 h-8" weight="duotone" />,
                            LineChart: <ChartPieSlice className="w-8 h-8" weight="duotone" />
                        };
                        return t('experience.competencies', { returnObjects: true })?.map((competency, i) => (
                            <motion.div key={i} variants={itemVariants} className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded p-5 hover:border-amber-600 dark:hover:border-yellow-400 transition-all outline outline-2 outline-offset-4 outline-gray-900" whileHover={{ y: -5 }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-14 h-14 bg-amber-600 dark:bg-yellow-400 rounded flex items-center justify-center text-white dark:text-gray-900">{icons[competency.icon]}</div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-base heading-glow">{competency.title}</h3>
                                </div>
                                <ul className="space-y-1.5">
                                    {competency.skills.map((skill, j) => (
                                        <motion.li
                                            key={j}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: j * 0.05 }}
                                            className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                                        >
                                            <span className="text-amber-600 dark:text-yellow-400 mt-1.5">•</span>
                                            <span>{skill}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ));
                    })()}
                </motion.div>
            </div>
        </section>
    );
};

export default Competencies;
