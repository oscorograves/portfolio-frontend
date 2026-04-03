import React from 'react';
import { motion } from 'framer-motion';
import { Target, Flask, ChartLineUp } from 'phosphor-react';

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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-amber-600 dark:border-yellow-400 heading-glow">{t('whatIOffer.title')}</h2>
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
                            icon: Target,
                            textClass: "text-rose-600 dark:text-rose-400",
                            bgClass: "bg-rose-500/10 dark:bg-rose-500/20"
                        },
                        {
                            title: t('whatIOffer.cro.title'),
                            description: t('whatIOffer.cro.desc'),
                            icon: Flask,
                            textClass: "text-emerald-600 dark:text-emerald-400",
                            bgClass: "bg-emerald-500/10 dark:bg-emerald-500/20"
                        },
                        {
                            title: t('whatIOffer.analytics.title'),
                            description: t('whatIOffer.analytics.desc'),
                            icon: ChartLineUp,
                            textClass: "text-blue-600 dark:text-blue-400",
                            bgClass: "bg-blue-500/10 dark:bg-blue-500/20"
                        }
                    ].map((service, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="ds-card-base ds-card-hover rounded-xl p-6"
                            whileHover={{ y: -5, boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}
                        >
                            <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${service.bgClass}`}>
                                <service.icon size={32} className={service.textClass} weight="duotone" />
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
