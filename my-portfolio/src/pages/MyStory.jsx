
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
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

            {/* HER0 SECTION */}
            <motion.div
                className="text-center mb-32 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h1
                    className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400 mb-6"
                >
                    {t('myStory.hero.title')}
                </motion.h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
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
            <div className="relative mb-40">
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
                                    <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t(`myStory.timeline.${item.key}.year`)}</h3>
                                    <h4 className={`text-xl font-semibold mb-3 ${item.color}`}>{t(`myStory.timeline.${item.key}.title`)}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
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
            <motion.div
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('myStory.philosophy.title')}
                    </h2>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t('myStory.philosophy.cards').length > 0 && [0, 1, 2].map((i) => {
                        const PhilIcon = philosophyIcons[i];
                        // Accessing array content from translation helper if it returns array, 
                        // but currently t() might strictly return string or object. 
                        // Assuming t returns array for 'cards' key or we access by index.
                        // My translation helper t() usually returns a value. 
                        // Let's assume t('myStory.philosophy.cards') returns the array directly 
                        // OR we map manually if the helper doesn't support array return well, 
                        // but standard i18n simple implementations might.
                        // Let's rely on the passed prop t to handle array or use object keys if needed.
                        // Checking translations.js structure: cards is an array of objects.

                        // Safe access pattern if t returns object with numeric keys or array
                        const cards = t('myStory.philosophy.cards', { returnObjects: true });
                        const card = Array.isArray(cards) ? cards[i] : cards[i];

                        return (
                            <motion.div
                                key={i}
                                className="bg-white dark:bg-gray-900/50 p-8 rounded-2xl border-2 border-gray-900 dark:border-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 group"
                            >
                                <div className="mb-6 inline-block p-4 rounded-xl bg-gray-50 dark:bg-gray-800 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors border-2 border-gray-900 dark:border-gray-100">
                                    <PhilIcon size={32} className="text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400" weight="duotone" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {card.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {card.desc}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>

        </div>
    );
};

export default MyStory;
