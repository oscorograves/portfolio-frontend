import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendUp, ChartLineUp } from 'phosphor-react';

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

const Services = ({ t }) => {
    return (
        <section className="border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-primary-500 dark:border-primary-400 heading-glow">{t('whatIOffer.title')}</h2>
                <motion.div
                    className="grid md:grid-cols-3 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {[
                        {
                            title: t('whatIOffer.paidMedia.title'),
                            description: t('whatIOffer.paidMedia.desc'),
                            icon: <Target className="w-8 h-8" weight="duotone" />
                        },
                        {
                            title: t('whatIOffer.cro.title'),
                            description: t('whatIOffer.cro.desc'),
                            icon: <TrendUp className="w-8 h-8" weight="duotone" />
                        },
                        {
                            title: t('whatIOffer.analytics.title'),
                            description: t('whatIOffer.analytics.desc'),
                            icon: <ChartLineUp className="w-8 h-8" weight="duotone" />
                        }
                    ].map((service, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="bg-white/40 dark:bg-dark-surface/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded-xl p-6 hover:border-primary-500 dark:hover:border-primary-400 transition-all outline outline-2 outline-offset-4 outline-dark-bg"
                            whileHover={{ y: -5 }}
                        >
                            <div className="w-14 h-14 bg-primary-500 dark:bg-primary-500 rounded-lg flex items-center justify-center text-white dark:text-gray-900 mb-4">
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 heading-glow">{service.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
