import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import {
    Envelope, LinkedinLogo, GithubLogo, InstagramLogo, Phone,
    Target, Flask, ChartLineUp, ArrowRight, DownloadSimple,
    MapPin, ArrowUpRight
} from 'phosphor-react';

/* ── Animation Variants ── */
const card = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { delay: i * 0.07, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }
    })
};

const Home = ({ t, navigate, fallbackMetrics, isDarkMode, careerStats }) => {
    const totalSpend = fallbackMetrics.reduce((acc, c) => acc + c.spend, 0);
    const spendK = Math.round(totalSpend / 1000);
    const maxROI = Math.max(...fallbackMetrics.map(m => m.roi));
    const packt = fallbackMetrics.find(m => m.client === 'Packt') || { spend: 12000, cpr: 60, roi: 175, netNew: 93 };
    const packtAttendees = Math.round(packt.spend / packt.cpr);

    return (
        <div className="pt-20 pb-20">
            <div className="max-w-[1100px] mx-auto px-4 md:px-6">

                {/* ═══════════════════════════════════════
                    ROW 1 — HERO + PHOTO
                   ═══════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-3">

                    {/* Hero Card */}
                    <motion.div
                        custom={0} initial="hidden" animate="visible" variants={card}
                        className="bento-card lg:col-span-3 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden min-h-[320px]"
                    >
                        {/* Warm gradient glow */}
                        <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-500/8 rounded-full blur-[100px] pointer-events-none glow-pulse" />
                        <div className="absolute -bottom-32 -left-20 w-60 h-60 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-5">
                                <MapPin className="w-3.5 h-3.5 text-amber-500" weight="fill" />
                                <span className="section-label text-zinc-400">Groningen, NL</span>
                            </div>

                            <h1 className="text-4xl md:text-[3.2rem] font-bold text-white leading-[1.1] mb-3 tracking-tight">
                                {t('hero.name')}
                            </h1>
                            <p className="text-lg md:text-xl text-amber-400 font-medium mb-5">
                                {t('hero.role')}
                            </p>
                            <p className="text-[15px] text-zinc-400 leading-relaxed max-w-lg mb-8">
                                {t('hero.description')}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 relative z-10">
                            <button
                                onClick={() => navigate('/case-studies')}
                                className="px-6 py-2.5 text-sm font-semibold bg-amber-500 text-zinc-900 rounded-xl hover:bg-amber-400 transition-all cursor-pointer hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.97]"
                            >
                                {t('hero.viewCaseStudies')}
                            </button>
                            <a
                                href="/resume.pdf" download="Kanishk_Singh_Resume.pdf"
                                className="px-6 py-2.5 text-sm font-semibold border border-zinc-700 text-zinc-300 rounded-xl hover:border-zinc-500 hover:text-white transition-all flex items-center gap-2 hover:bg-zinc-800/50"
                            >
                                <DownloadSimple className="w-4 h-4" weight="bold" />
                                Download CV
                            </a>
                        </div>
                    </motion.div>

                    {/* Photo + Socials Card */}
                    <motion.div
                        custom={1} initial="hidden" animate="visible" variants={card}
                        className="bento-card lg:col-span-2 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden"
                    >
                        {/* Subtle radial glow behind photo */}
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

                        <a
                            href="https://www.instagram.com/oscorograves/" target="_blank" rel="noopener noreferrer"
                            className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-zinc-700 hover:border-amber-500/60 transition-all mb-5 group block ring-4 ring-zinc-800/50"
                        >
                            <img
                                src="/profile2.jpeg" alt="Kanishk Singh"
                                loading="eager" decoding="async"
                                className="w-full h-full object-cover object-top scale-125 filter grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </a>

                        <div className="flex items-center gap-5 mb-4">
                            {[
                                { Icon: Envelope, href: "mailto:hi@scalewithkanishk.in", label: "Email" },
                                { Icon: LinkedinLogo, href: "https://www.linkedin.com/in/kanishk-singh-ab90b2203/", label: "LinkedIn" },
                                { Icon: GithubLogo, href: "https://github.com/oscorograves", label: "GitHub" },
                                { Icon: InstagramLogo, href: "https://www.instagram.com/oscorograves/", label: "Instagram" },
                            ].map(({ Icon, href, label }) => (
                                <a key={label} href={href} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    className="text-zinc-500 hover:text-amber-400 transition-colors" title={label}>
                                    <Icon className="w-5 h-5" weight="duotone" />
                                </a>
                            ))}
                        </div>
                        <p className="text-[12px] mono text-zinc-600 tracking-wider">hi@scalewithkanishk.in</p>
                    </motion.div>
                </div>

                {/* ═══════════════════════════════════════
                    ROW 2 — KEY METRICS (4 cards)
                   ═══════════════════════════════════════ */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                    {[
                        { val: 2, suffix: '+', label: t('stats.yearsExp'), link: '/experience' },
                        { val: spendK, prefix: '$', suffix: 'K', label: t('stats.adSpend'), link: '/metrics' },
                        { val: 12, suffix: '+', label: t('stats.campaigns'), link: '/metrics' },
                        { val: maxROI, suffix: '%', label: t('stats.roi'), link: '/metrics' },
                    ].map((s, i) => (
                        <motion.div
                            key={i} custom={i + 2} initial="hidden" animate="visible" variants={card}
                            onClick={() => navigate(s.link)}
                            className="bento-accent p-5 cursor-pointer group text-center"
                        >
                            <div className="metric text-3xl md:text-4xl text-white group-hover:text-amber-400 transition-colors">
                                <span className="text-amber-500/70 text-[0.6em]">{s.prefix || ''}</span>
                                <CountUp end={s.val} duration={2.5} enableScrollSpy scrollSpyOnce />
                                <span className="text-amber-500/70 text-[0.6em] ml-0.5">{s.suffix}</span>
                            </div>
                            <p className="section-label mt-2 text-zinc-500 group-hover:text-zinc-400 transition-colors">{s.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* ═══════════════════════════════════════
                    ROW 3 — FEATURED WORK + SERVICES + CONTACT
                   ═══════════════════════════════════════ */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-3">

                    {/* Featured Case Study */}
                    <motion.div
                        custom={6} initial="hidden" animate="visible" variants={card}
                        className="bento-card md:col-span-3 p-6 cursor-pointer group relative overflow-hidden"
                        onClick={() => { navigate('/case-studies'); setTimeout(() => { const el = document.getElementById('packt'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100); }}
                    >

                        <div className="flex items-center justify-between mb-4">
                            <span className="section-label">{t('featuredWork.title')}</span>
                            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" weight="bold" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                            {t('featuredWork.packtTitle')}
                        </h3>
                        <p className="text-sm text-zinc-500 mb-5 mono">{t('featuredWork.projectSubtitle')}</p>

                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { l: t('featuredWork.metrics.attendees'), v: String(packtAttendees) },
                                { l: t('featuredWork.metrics.netNew'), v: `${packt.netNew}%` },
                                { l: t('featuredWork.metrics.cac'), v: `$${packt.cpr}` },
                                { l: t('featuredWork.metrics.roas'), v: `${(packt.roi / 100).toFixed(2).replace(/\.00$/, '')}×` },
                            ].map((m, i) => (
                                <div key={i} className="bg-zinc-900/80 rounded-xl p-3 text-center border border-zinc-800/50">
                                    <div className="text-[10px] mono text-zinc-500 uppercase tracking-wider mb-1">{m.l}</div>
                                    <div className="metric text-lg text-amber-400">{m.v}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        custom={7} initial="hidden" animate="visible" variants={card}
                        className="bento-card md:col-span-2 p-6"
                    >
                        <span className="section-label mb-5 block">{t('whatIOffer.title')}</span>

                        <div className="space-y-4">
                            {[
                                { icon: Target, title: t('whatIOffer.paidMedia.title'), color: 'text-rose-400', bg: 'bg-rose-500/10' },
                                { icon: Flask, title: t('whatIOffer.cro.title'), color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                                { icon: ChartLineUp, title: t('whatIOffer.analytics.title'), color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-3 group">
                                    <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center shrink-0`}>
                                        <s.icon size={18} className={s.color} weight="duotone" />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{s.title}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Card */}
                    <motion.div
                        custom={8} initial="hidden" animate="visible" variants={card}
                        className="bento-card md:col-span-1 p-6 flex flex-col justify-between"
                    >
                        <span className="section-label mb-4 block">Contact</span>

                        <div className="space-y-3 flex-1">
                            <a href="mailto:hi@scalewithkanishk.in" className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors text-xs mono">
                                <Envelope className="w-3.5 h-3.5 shrink-0" weight="duotone" />
                                <span className="truncate">Email</span>
                            </a>
                            <a href="tel:+918299406042" className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors text-xs mono">
                                <Phone className="w-3.5 h-3.5 shrink-0" weight="duotone" />
                                <span>+91 8299 406042</span>
                            </a>
                            <div className="flex items-center gap-2 text-zinc-400 text-xs mono">
                                <MapPin className="w-3.5 h-3.5 shrink-0" weight="duotone" />
                                <span>Groningen, NL</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/my-story')}
                            className="w-full mt-4 px-4 py-2 text-xs font-semibold bg-zinc-800 text-zinc-300 rounded-xl hover:bg-zinc-700 hover:text-white transition-all cursor-pointer border border-zinc-700 hover:border-zinc-600"
                        >
                            My Story →
                        </button>
                    </motion.div>
                </div>

                {/* ═══════════════════════════════════════
                    ROW 4 — SKILLS MARQUEE
                   ═══════════════════════════════════════ */}
                <motion.div
                    custom={9} initial="hidden" animate="visible" variants={card}
                    className="bento-card p-0 overflow-hidden"
                >
                    <div className="py-3 px-6 border-b border-zinc-800">
                        <span className="section-label">{t('experience.platformsParams') || 'Platforms & Tools'}</span>
                    </div>
                    <div className="overflow-hidden py-4 px-2">
                        <div className="marquee-track flex gap-3 whitespace-nowrap">
                            {[...['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'GA4', 'HubSpot', 'SEMrush', 'Ahrefs', 'Optimizely', 'n8n', 'Airtable', 'Slack', 'Google Sheets'],
                            ...['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'GA4', 'HubSpot', 'SEMrush', 'Ahrefs', 'Optimizely', 'n8n', 'Airtable', 'Slack', 'Google Sheets']
                            ].map((s, i) => (
                                <span key={i} className="text-[13px] mono text-zinc-500 px-3 py-1.5 border border-zinc-800 rounded-lg hover:border-amber-500/40 hover:text-amber-400 transition-all cursor-default inline-block">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ═══════════════════════════════════════
                    ROW 5 — QUICK NAV (page links)
                   ═══════════════════════════════════════ */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                    {[
                        { path: '/experience', label: t('nav.experience'), desc: 'Roles & career', color: 'from-blue-500/10' },
                        { path: '/case-studies', label: t('nav.caseStudies'), desc: '3 deep dives', color: 'from-amber-500/10' },
                        { path: '/my-story', label: t('nav.myStory'), desc: 'Timeline & philosophy', color: 'from-purple-500/10' },
                        { path: '/metrics', label: t('nav.metrics'), desc: 'Campaign data', color: 'from-emerald-500/10' },
                    ].map((r, i) => (
                        <motion.div key={i} custom={10 + i} initial="hidden" animate="visible" variants={card}>
                            <Link
                                to={r.path}
                                className="bento-card block p-5 group hover:bg-zinc-800/80 relative overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${r.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{r.label}</h3>
                                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" weight="bold" />
                                    </div>
                                    <p className="text-[11px] text-zinc-600 mono">{r.desc}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Home;
