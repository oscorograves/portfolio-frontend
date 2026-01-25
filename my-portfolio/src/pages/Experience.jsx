import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, CalendarBlank, Robot, ChatCircle, GraduationCap, Medal } from 'phosphor-react';

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

const Experience = ({ t, isDarkMode }) => {
    return (
        <div className="pt-20 min-h-screen transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b-2 border-amber-600 dark:border-yellow-400">
                    {t('experience.title')}
                </h1>

                <motion.div
                    className="space-y-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {/* Pocket FM */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-6 outline outline-2 outline-offset-4 outline-gray-900 outline-2"
                        whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('experience.roles.pocketfm.title')}</h3>
                                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-xs font-medium text-gray-700 dark:text-gray-300">
                                        {t('experience.roles.pocketfm.type')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" weight="duotone" />
                                        Pocket FM
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" weight="duotone" />
                                        Remote
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                <CalendarBlank className="w-4 h-4" weight="duotone" />
                                <span>{t('experience.roles.pocketfm.period')}</span>
                            </div>
                        </div>
                        <ul className="space-y-2">
                            {t('experience.roles.pocketfm.bullets').map((bullet, k) => (
                                <li key={k} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                    <span className="text-gray-400 mt-1.5">•</span>
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Intertek */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-6 outline outline-2 outline-offset-4 outline-gray-900 outline-2"
                        whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('experience.roles.intertek.title')}</h3>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" weight="duotone" />
                                        {t('experience.roles.intertek.company')}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" weight="duotone" />
                                        {t('experience.roles.intertek.location')}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                <CalendarBlank className="w-4 h-4" weight="duotone" />
                                {t('experience.roles.intertek.period')}
                            </div>
                        </div>
                        <ul className="space-y-2">
                            {t('experience.roles.intertek.bullets').map((bullet, k) => (
                                <li key={k} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                    <span className="text-gray-400 mt-1.5">•</span>
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Tradebuilder */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-6 outline outline-2 outline-offset-4 outline-gray-900 outline-2"
                        whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('experience.roles.tradebuilder.title')}</h3>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" weight="duotone" />
                                        Tradebuilder Inc.
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" weight="duotone" />
                                        Remote
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                <CalendarBlank className="w-4 h-4" weight="duotone" />
                                {t('experience.roles.tradebuilder.period')}
                            </div>
                        </div>
                        <ul className="space-y-2">
                            {t('experience.roles.tradebuilder.bullets').map((bullet, k) => (
                                <li key={k} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                    <span className="text-gray-400 mt-1.5">•</span>
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* ABP */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-6 outline outline-2 outline-offset-4 outline-gray-900 outline-2"
                        whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('experience.roles.abp.title')}</h3>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" weight="duotone" />
                                        {t('experience.roles.abp.company')}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" weight="duotone" />
                                        {t('experience.roles.abp.location')}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                <CalendarBlank className="w-4 h-4" weight="duotone" />
                                {t('experience.roles.abp.period')}
                            </div>
                        </div>
                        <ul className="space-y-2">
                            {t('experience.roles.abp.bullets').map((bullet, k) => (
                                <li key={k} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                    <span className="text-gray-400 mt-1.5">•</span>
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Projects */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-amber-600 dark:border-yellow-400">
                        Key Projects
                    </h2>

                    <motion.div
                        className="grid md:grid-cols-2 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 outline outline-2 outline-offset-4 outline-gray-900 outline-2"
                            whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                                    <Robot className="w-6 h-6" weight="duotone" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{t('experience.roles.projects.customGpt.title')}</h3>
                                </div>
                            </div>
                            <ul className="space-y-2">
                                {t('experience.roles.projects.customGpt.bullets').map((bullet, i) => (
                                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                        <span className="text-gray-400 mt-1.5">•</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-5 outline outline-2 outline-offset-4 outline-gray-900 outline-2"
                            whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                                    <ChatCircle className="w-6 h-6" weight="duotone" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{t('experience.roles.projects.chatbot.title')}</h3>
                                </div>
                            </div>
                            <ul className="space-y-2">
                                {t('experience.roles.projects.chatbot.bullets').map((bullet, i) => (
                                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                        <span className="text-gray-400 mt-1.5">•</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Education - Added mt-12 for spacing */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-amber-600 dark:border-yellow-400">{t('experience.education')}</h2>
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-6 outline outline-2 outline-offset-4 outline-gray-900 outline-2"
                        whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                    >
                        <div className="flex items-start gap-3 mb-3">
                            <GraduationCap className="w-6 h-6 text-gray-900 dark:text-white mt-0.5" weight="duotone" />
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{t('experience.educationDetails.degree')}</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{t('experience.educationDetails.specialization')}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('experience.educationDetails.institute')}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('experience.educationDetails.locationYear')}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{t('experience.educationDetails.cgpa')}</p>
                    </motion.div>
                </div>

                {/* Certifications - Added mt-12 for spacing */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-amber-600 dark:border-yellow-400">{t('experience.certifications')}</h2>
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded p-6 outline outline-2 outline-offset-4 outline-gray-900 outline-2"
                        whileHover={{ y: -5, borderColor: isDarkMode ? '#facc15' : '#ea580c', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                    >
                        <ul className="space-y-3">
                            {(t('experience.certificationsList', { returnObjects: true }) || []).map((cert, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <Medal className="w-5 h-5 text-gray-900 dark:text-white mt-0.5 flex-shrink-0" weight="duotone" />
                                    <span>{cert}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Experience;
