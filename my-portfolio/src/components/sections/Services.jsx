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
        <section className="border-b border-retro-border">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
                <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-primary-600 heading-glow">{t('whatIOffer.title')}</h2>
                <motion.div
                    className="grid md:grid-cols-3 gap-3"
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
                            textClass: "text-rose-500",
                            bgClass: "bg-rose-500/10"
                        },
                        {
                            title: t('whatIOffer.cro.title'),
                            description: t('whatIOffer.cro.desc'),
                            icon: Flask,
                            textClass: "text-emerald-500",
                            bgClass: "bg-emerald-500/10"
                        },
                        {
                            title: t('whatIOffer.analytics.title'),
                            description: t('whatIOffer.analytics.desc'),
                            icon: ChartLineUp,
                            textClass: "text-blue-500",
                            bgClass: "bg-blue-500/10"
                        }
                    ].map((service, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="bento-card p-5 group"
                            whileHover={{ y: -3 }}
                        >
                            <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 ${service.bgClass}`}>
                                <service.icon size={28} className={service.textClass} weight="duotone" />
                            </div>
                            <h3 className="text-base font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">{service.title}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
