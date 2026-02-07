
import React from 'react';
import { motion } from 'framer-motion';
import { CaretDown, Student, Rocket, Target, ChartLineUp, Brain, PaintBrush, Funnel } from 'phosphor-react';

const MyStory = ({ t }) => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    const lineVariants = {
        hidden: { pathLength: 0 },
        visible: {
            pathLength: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
        }
    };

    const timelineData = [
        {
            key: 'start',
            icon: Student,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',
            borderColor: 'border-blue-200 dark:border-blue-800'
        },
        {
            key: 'early',
            icon: Rocket,
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
            borderColor: 'border-emerald-200 dark:border-emerald-800'
        },
        {
            key: 'mid',
            icon: Target,
            color: 'text-amber-500',
            bgColor: 'bg-amber-500/10 dark:bg-amber-500/20',
            borderColor: 'border-amber-200 dark:border-amber-800'
        },
        {
            key: 'current',
            icon: ChartLineUp,
            color: 'text-rose-500',
            bgColor: 'bg-rose-500/10 dark:bg-rose-500/20',
            borderColor: 'border-rose-200 dark:border-rose-800'
        }
    ];

    const philosophyIcons = [Brain, PaintBrush, Funnel];


    return (
        <div className="min-h-screen py-24">

            {/* HER0 SECTION */}
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-32 relative pt-8 md:pt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                >
                    {t('myStory.hero.title')}
                </motion.h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                    {t('myStory.hero.subtitle')}
                </p>

                <motion.div
                    className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <CaretDown size={32} className="text-gray-400 dark:text-gray-600" />
                </motion.div>
            </motion.div>


            {/* TIMELINE SECTION */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-40">
                {/* Connecting Line (Desktop) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent transform -translate-x-1/2 hidden md:block" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="space-y-20"
                >
                    {timelineData.map((item, index) => {
                        const Icon = item.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={item.key}
                                className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8 md:gap-0`}
                                variants={itemVariants}
                            >
                                {/* Content Card */}
                                <div className={`flex-1 w-full md:w-1/2 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} text-center md:text-left`}>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t(`myStory.timeline.${item.key}.year`)}</h3>
                                    <h4 className={`text-lg font-semibold mb-2 ${item.color}`}>{t(`myStory.timeline.${item.key}.title`)}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {t(`myStory.timeline.${item.key}.desc`)}
                                    </p>
                                </div>

                                {/* Center Node */}
                                <div className="relative z-10 flex-shrink-0">
                                    <motion.div
                                        className={`w-16 h-16 rounded-full flex items-center justify-center ${item.bgColor} border-2 ${item.borderColor} shadow-lg backdrop-blur-sm`}
                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Icon size={32} className={item.color} weight="duotone" />
                                    </motion.div>
                                </div>

                                {/* Empty Space for Alignment */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>


            {/* PHILOSOPHY SECTION */}
            <section className="border-t border-gray-300 dark:border-gray-800 transition-colors duration-300">
                <motion.div
                    className="max-w-6xl mx-auto px-8 py-12"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-amber-600 dark:border-yellow-400">
                        {t('myStory.philosophy.title')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {(() => {
                            const cards = t('myStory.philosophy.cards', { returnObjects: true });
                            if (!Array.isArray(cards)) return null;
                            return cards.map((card, i) => {
                                const PhilIcon = philosophyIcons[i];
                                return (
                                    <motion.div
                                        key={i}
                                        className="bg-white/40 dark:bg-dark-surface/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded-xl p-6 hover:border-primary-500 dark:hover:border-primary-400 transition-all outline outline-2 outline-offset-4 outline-dark-bg group"
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="w-14 h-14 bg-amber-600 dark:bg-yellow-400 rounded-lg flex items-center justify-center text-white dark:text-gray-900 mb-4">
                                            <PhilIcon size={32} weight="duotone" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                            {card?.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {card?.desc}
                                        </p>
                                    </motion.div>
                                );
                            });
                        })()}
                    </div>
                </motion.div>
            </section>

        </div>
    );
};

export default MyStory;
