import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, CalendarBlank, Robot, GraduationCap, Medal, DownloadSimple, ArrowUpRight } from 'phosphor-react';

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};
const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const RoleCard = ({ title, company, location, period, type, bullets }) => (
    <motion.div variants={item} className="bento-card p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    {type && <span className="badge-amber">{type}</span>}
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-blue-400" weight="duotone" />{company}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-rose-400" weight="duotone" />{location}</span>
                </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-zinc-500 shrink-0 mono">
                <CalendarBlank className="w-3.5 h-3.5 text-amber-500" weight="duotone" />{period}
            </div>
        </div>
        {Array.isArray(bullets) && bullets.length > 0 && (
            <ul className="space-y-2">
                {bullets.map((b, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex items-start gap-2.5 leading-relaxed">
                        <span className="text-amber-500/60 mt-1.5 shrink-0">▸</span>{b}
                    </li>
                ))}
            </ul>
        )}
    </motion.div>
);

const Experience = ({ t, isDarkMode }) => (
    <div className="pt-20 min-h-screen">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-white heading-glow mb-2">{t('experience.title')}</h1>
                    <p className="text-zinc-500 text-sm">Career timeline, education & certifications</p>
                </div>
                <a href="/resume.pdf" download="Kanishk_Singh_Resume.pdf"
                   className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-zinc-700 text-zinc-300 rounded-xl hover:border-zinc-500 hover:text-white transition-all">
                    <DownloadSimple className="w-4 h-4" weight="bold" />{t('experience.resumeDownload')}
                </a>
            </div>

            {/* Roles */}
            <motion.div className="space-y-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={container}>
                <RoleCard title={t('experience.roles.pocketfm.title')} company={t('experience.roles.pocketfm.company')} location={t('experience.roles.pocketfm.location')} period={t('experience.roles.pocketfm.period')} type={t('experience.roles.pocketfm.type')}
                    bullets={Array.isArray(t('experience.roles.pocketfm.bullets', { returnObjects: true })) ? t('experience.roles.pocketfm.bullets', { returnObjects: true }) : []} />
                <RoleCard title={t('experience.roles.intertek.title')} company={t('experience.roles.intertek.company')} location={t('experience.roles.intertek.location')} period={t('experience.roles.intertek.period')}
                    bullets={Array.isArray(t('experience.roles.intertek.bullets', { returnObjects: true })) ? t('experience.roles.intertek.bullets', { returnObjects: true }) : []} />
                <RoleCard title={t('experience.roles.tradebuilder.title')} company={t('experience.roles.tradebuilder.company')} location={t('experience.roles.tradebuilder.location')} period={t('experience.roles.tradebuilder.period')}
                    bullets={Array.isArray(t('experience.roles.tradebuilder.bullets', { returnObjects: true })) ? t('experience.roles.tradebuilder.bullets', { returnObjects: true }) : []} />
            </motion.div>

            {/* Projects */}
            <div className="mt-14">
                <h2 className="text-2xl font-bold text-white mb-5">Key Projects</h2>
                <motion.div variants={item} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bento-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                            <Robot className="w-5 h-5 text-purple-400" weight="duotone" />
                        </div>
                        <h3 className="font-bold text-white">{t('experience.roles.projects.leadEngine.title')}</h3>
                    </div>
                    <ul className="space-y-2">
                        {(Array.isArray(t('experience.roles.projects.leadEngine.bullets', { returnObjects: true })) ? t('experience.roles.projects.leadEngine.bullets', { returnObjects: true }) : []).map((b, i) => (
                            <li key={i} className="text-sm text-zinc-400 flex items-start gap-2.5 leading-relaxed">
                                <span className="text-amber-500/60 mt-1.5 shrink-0">▸</span>{b}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Education */}
            <div className="mt-14">
                <h2 className="text-2xl font-bold text-white mb-5">{t('experience.education')}</h2>
                <div className="space-y-3">
                    {(Array.isArray(t('experience.educationList', { returnObjects: true })) ? t('experience.educationList', { returnObjects: true }) : []).map((edu, i) => (
                        <motion.div key={i} variants={item} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bento-card p-6">
                            <div className="flex items-start gap-3 mb-2">
                                <GraduationCap className="w-5 h-5 text-amber-500 mt-0.5" weight="duotone" />
                                <div>
                                    <h3 className="font-bold text-white">{edu.degree}</h3>
                                    {edu.specialization && <p className="text-sm text-zinc-400">{edu.specialization}</p>}
                                </div>
                            </div>
                            <p className="text-sm text-zinc-500">{edu.institute}</p>
                            <p className="text-sm text-zinc-600 mono">{edu.locationYear}</p>
                            {edu.cgpa && <p className="text-sm font-semibold text-white mt-1">{edu.cgpa}</p>}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certifications */}
            <div className="mt-14">
                <h2 className="text-2xl font-bold text-white mb-5">{t('experience.certifications')}</h2>
                <motion.div variants={item} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bento-card p-6">
                    <ul className="space-y-2.5">
                        {(t('experience.certificationsList', { returnObjects: true }) || []).map((cert, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400">
                                <Medal className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" weight="duotone" />{cert}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    </div>
);

export default Experience;
