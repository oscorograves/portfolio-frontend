import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Funnel,
    Clock,
    Eye,
    Cursor,
    ChartBar,
    ArrowsClockwise,
    Warning,
    Rocket,
    DeviceMobile,
    Stack,
    Info,
    Gear,
    CaretDown,
    CaretUp,
    CheckCircle,
    XCircle,
    Link as LinkIcon,
    Flask,
} from 'phosphor-react';

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const standardWindows = [
    {
        category: 'Click-Through',
        icon: Cursor,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10 dark:bg-blue-500/10',
        border: 'border-blue-400/30',
        items: [
            { label: '1-day click', desc: 'Conversions within 1 day after a click' },
            { label: '7-day click', desc: 'Conversions within 7 days after a click' },
        ],
    },
    {
        category: 'View-Through',
        icon: Eye,
        color: 'text-violet-500',
        bg: 'bg-violet-500/10 dark:bg-violet-500/10',
        border: 'border-violet-400/30',
        items: [
            { label: '1-day view', desc: 'Conversions within 1 day after seeing (not clicking) your ad' },
            { label: '1-day engage-through', desc: 'Conversions within 1 day after 5+ sec video watch, likes, shares, saves, or comments (updated March 2026)' },
            { label: 'None', desc: 'Turn view/engage attribution off — click-only mode' },
        ],
    },
];

const commonCombinations = [
    { combo: '7-day click + 1-day view + 1-day engage-through', useCase: 'Default for most conversion campaigns', recommended: true },
    { combo: '7-day click only', useCase: 'Stricter attribution, no view-through credit', recommended: false },
    { combo: '1-day click + 1-day view', useCase: 'Conservative — short purchase journeys', recommended: false },
    { combo: '1-day click only', useCase: 'Ultra-conservative — high cross-channel overlap or lift-test accounts', recommended: false },
];

const reportingWindows = [
    { window: '1-day click', desc: 'Conversions within 1 day of click', useCase: 'Impulse buys, immediate actions', optimizable: true },
    { window: '7-day click', desc: 'Conversions within 7 days of click', useCase: 'Short-to-mid funnels', optimizable: true },
    { window: '1-day view', desc: 'Conversions within 1 day of impression', useCase: 'Brand awareness lift', optimizable: true },
    { window: '1-day engage-through', desc: 'Conversions within 1 day after social engagement or 5+ sec video view', useCase: 'Social + video engagement credit', optimizable: true },
    { window: '28-day click', desc: 'Conversions within 28 days of click', useCase: 'Long consideration cycles', optimizable: false },
];

const nativeModels = [
    { name: 'Standard Attribution', desc: 'Last click/view within chosen windows (1d/7d click, 1d view, 1d engage-through)', available: true },
    { name: 'Incremental Attribution', desc: 'AI-powered model (launched April 2025) — measures true ad lift via test/control groups, filtering organic conversions', available: true },
    { name: 'Data-Driven', desc: 'Not natively available in Meta', available: false },
    { name: 'Linear / Time-Decay', desc: 'Not natively available — use third-party tools', available: false },
    { name: 'U-Shaped / Position-Based', desc: 'Not natively available — use third-party tools', available: false },
];

const thirdPartyOptions = [
    { name: 'Multi-Touch Attribution', desc: 'Distributes credit across all touchpoints using linear, time-decay, position-based, or data-driven models' },
    { name: 'Server-Side Tracking (CAPI)', desc: 'Conversions API for privacy-safe, higher-accuracy tracking beyond browser limits' },
    { name: 'GA4 / Northbeam / Triple Whale', desc: 'Popular integrations — often show 15–30% more conversions than Meta\'s native reporting' },
    { name: 'Adobe Analytics', desc: 'Enterprise-grade cross-channel attribution with full journey visibility' },
];

const retentionGoals = [
    { goal: 'Day 2 Retention', desc: 'Optimize for users who open the app on Day 2 post-install', requirement: '7-day click reporting view', available: true },
    { goal: 'Day 7 Retention', desc: 'Optimize for users who open the app on Day 7 post-install', requirement: '28-day click attribution window', available: true },
    { goal: 'Day 30 Retention', desc: 'Cohort metric — not directly optimizable', requirement: 'Use MMPs or D7 proxies (D7 open + Purchase correlates r=0.8+ to D30 LTV)', available: false },
];

const aemEvents = [
    'Purchase (IAP revenue)', 'Subscribe', 'Lead / Complete Registration',
    'Add to Cart / Initiate Checkout', 'Achieve Level / Tutorial Complete',
    'App Install / Download', 'View Content', 'Page View / Session Start',
];

const adSetStructure = [
    {
        name: 'Broad Advantage+',
        segment: 'Prospecting',
        audience: 'Age 18–45, your locations',
        exclusions: 'Purchasers (7/30d)',
        bidding: 'Lowest Cost',
        budget: '$300–500',
        signal: 'ROAS >1.2×',
    },
    {
        name: 'LAL 1%',
        segment: 'Prospecting',
        audience: '30d purchasers (custom → LAL)',
        exclusions: 'None',
        bidding: 'Target ROAS 1.3×',
        budget: '$400',
        signal: 'ROAS >1.4×',
    },
    {
        name: 'Funnel Warm',
        segment: 'Retargeting',
        audience: 'Add to Cart + Initiate Checkout (1–7d)',
        exclusions: 'Purchasers',
        bidding: 'Lowest Cost',
        budget: '$150',
        signal: 'Purchase >12%',
    },
    {
        name: 'Engagers',
        segment: 'Retargeting',
        audience: '50% video view (3d)',
        exclusions: 'None',
        bidding: 'Lowest Cost',
        budget: '$150',
        signal: 'ROAS >1.6×',
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, title, subtitle, color = 'text-blue-500' }) {
    return (
        <div className="flex items-start gap-4 mb-6">
            <div className={`p-2.5 rounded-xl bg-blue-500/10 border border-blue-400/20 flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${color}`} weight="duotone" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
        </div>
    );
}

function Card({ children, className = '' }) {
    return (
        <div className={`bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-xl p-5 ${className}`}>
            {children}
        </div>
    );
}

function CalloutBox({ type = 'info', children }) {
    const styles = {
        info: { border: 'border-blue-400/40', bg: 'bg-blue-500/8', icon: Info, iconColor: 'text-blue-400' },
        warning: { border: 'border-amber-400/40', bg: 'bg-amber-500/8', icon: Warning, iconColor: 'text-amber-400' },
        success: { border: 'border-green-400/40', bg: 'bg-green-500/8', icon: Rocket, iconColor: 'text-green-400' },
        gear: { border: 'border-gray-400/30', bg: 'bg-gray-500/8', icon: Gear, iconColor: 'text-gray-400' },
        link: { border: 'border-violet-400/40', bg: 'bg-violet-500/8', icon: LinkIcon, iconColor: 'text-violet-400' },
    };
    const s = styles[type];
    const IconComp = s.icon;
    return (
        <div className={`flex gap-3 items-start rounded-xl border ${s.border} ${s.bg} p-4 mt-4`}>
            <IconComp className={`w-5 h-5 flex-shrink-0 mt-0.5 ${s.iconColor}`} weight="duotone" />
            <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{children}</div>
        </div>
    );
}

function Accordion({ title, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-4 text-left bg-white/30 dark:bg-gray-900/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
            >
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{title}</span>
                {open ? (
                    <CaretUp className="w-4 h-4 text-gray-400" weight="bold" />
                ) : (
                    <CaretDown className="w-4 h-4 text-gray-400" weight="bold" />
                )}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 py-4 bg-white/20 dark:bg-gray-900/20 border-t border-gray-200 dark:border-gray-800">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const AttributionPage = ({ isDarkMode }) => {
    const [activeTab, setActiveTab] = useState('standard');

    const tabs = [
        { id: 'standard', label: 'Standard Attribution', icon: Cursor },
        { id: 'reporting', label: 'Reporting Windows', icon: ChartBar },
        { id: 'models', label: 'Native Models', icon: Stack },
        { id: 'retention', label: 'Retention & AEM', icon: DeviceMobile },
        { id: 'campaign', label: 'IAP Setup', icon: Rocket },
    ];

    return (
        <div className="pt-20 min-h-screen transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">

                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-400/25">
                            <Flask className="w-7 h-7 text-blue-500" weight="duotone" />
                        </div>
                        <div>
                            <div className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-0.5">My Playbook</div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                                Meta Attribution
                                <span className="text-blue-500"> Notes</span>
                            </h1>
                        </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-sm leading-relaxed ml-[52px]">
                        Working notes I keep updated from running Meta campaigns across app installs, IAP, and lead gen. These are the attribution setups, reporting tricks, and campaign structures I actually use.
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                    {tabs.map(tab => {
                        const IconComp = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${isActive
                                    ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25'
                                    : 'bg-white/40 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-500'
                                    }`}
                            >
                                <IconComp className="w-4 h-4" weight={isActive ? 'fill' : 'duotone'} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* ── TAB: Standard Attribution ── */}
                <AnimatePresence mode="wait">
                    {activeTab === 'standard' && (
                        <motion.div key="standard" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }} className="space-y-6">
                            <motion.div variants={itemVariants}>
                                <Card>
                                    <SectionHeader icon={Funnel} title="Standard Attribution" subtitle="The default model I use for most campaigns. Last eligible touchpoint within your chosen windows." color="text-blue-500" />
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Set at the <strong className="text-gray-900 dark:text-white">ad set level</strong>, Standard Attribution credits the <em>last</em> eligible Meta touchpoint within your selected click or view window. Incremental Attribution is a separate opt-in.
                                    </p>
                                    <CalloutBox type="gear">
                                        <strong>Where I set this:</strong> Per ad set in Ads Manager → "Attribution Setting" (sometimes hidden under "Show more options"). For comparing windows side-by-side, I use Columns → "Compare Attribution Settings" in reporting.
                                    </CalloutBox>
                                </Card>
                            </motion.div>

                            {/* Window Cards */}
                            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
                                {standardWindows.map(w => {
                                    const IconComp = w.icon;
                                    return (
                                        <Card key={w.category}>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className={`p-2 rounded-lg ${w.bg} border ${w.border}`}>
                                                    <IconComp className={`w-5 h-5 ${w.color}`} weight="duotone" />
                                                </div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">{w.category} Windows</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {w.items.map(item => (
                                                    <div key={item.label} className="flex gap-3">
                                                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${w.color.replace('text-', 'bg-')}`} />
                                                        <div>
                                                            <div className={`text-sm font-mono font-semibold ${w.color}`}>{item.label}</div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>
                                    );
                                })}
                            </motion.div>

                            {/* Common Combinations Table */}
                            <motion.div variants={itemVariants}>
                                <Card>
                                    <SectionHeader icon={ArrowsClockwise} title="Common Standard Combinations" color="text-blue-500" />
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-200 dark:border-gray-800">
                                                    <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase font-mono">Combination</th>
                                                    <th className="text-left py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase font-mono">Use Case</th>
                                                    <th className="text-center py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase font-mono">Rec.</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                {commonCombinations.map((row, i) => (
                                                    <tr key={i} className="hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors">
                                                        <td className="py-3 pr-4 font-mono text-blue-600 dark:text-blue-400 text-xs">{row.combo}</td>
                                                        <td className="py-3 text-gray-600 dark:text-gray-300 text-xs">{row.useCase}</td>
                                                        <td className="py-3 text-center">
                                                            {row.recommended
                                                                ? <span className="inline-flex items-center gap-1 text-xs font-mono text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">✓ Default</span>
                                                                : null}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ── TAB: Reporting Windows ── */}
                    {activeTab === 'reporting' && (
                        <motion.div key="reporting" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }} className="space-y-6">
                            <motion.div variants={itemVariants}>
                                <Card>
                                    <SectionHeader icon={ChartBar} title="Reporting Attribution Windows" subtitle="These are the windows I compare when diagnosing performance gaps between what Meta reports and what actually converts." color="text-blue-500" />
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-200 dark:border-gray-800">
                                                    {['Window', 'Description', 'Use Case', 'Optimizable'].map(h => (
                                                        <th key={h} className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase font-mono">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                {reportingWindows.map((row, i) => (
                                                    <tr key={i} className="hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors">
                                                        <td className="py-3 pr-4 font-mono text-blue-600 dark:text-blue-400 text-xs whitespace-nowrap">{row.window}</td>
                                                        <td className="py-3 pr-4 text-gray-600 dark:text-gray-300 text-xs">{row.desc}</td>
                                                        <td className="py-3 pr-4 text-gray-500 dark:text-gray-400 text-xs">{row.useCase}</td>
                                                        <td className="py-3 text-center">
                                                            {row.optimizable
                                                                ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" weight="fill" />
                                                                : <XCircle className="w-5 h-5 text-gray-400 mx-auto" weight="fill" />}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Third-Party */}
                            <motion.div variants={itemVariants}>
                                <Card>
                                    <SectionHeader icon={LinkIcon} title="Third-Party Reporting" subtitle="The tools I cross-reference against Meta's native numbers. Especially useful for multi-channel clients." color="text-violet-500" />
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {thirdPartyOptions.map((o, i) => (
                                            <div key={i} className="flex gap-3 p-3 rounded-lg bg-violet-500/5 border border-violet-400/20">
                                                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{o.name}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{o.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <CalloutBox type="warning">
                                        <strong>No native time-decay in Meta.</strong> I've had to rely on Northbeam and GA4 for time-decay and multi-touch models. Meta simply doesn't offer these natively.
                                    </CalloutBox>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ── TAB: Native Models ── */}
                    {activeTab === 'models' && (
                        <motion.div key="models" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }} className="space-y-6">
                            <motion.div variants={itemVariants}>
                                <Card>
                                    <SectionHeader icon={Stack} title="Meta's Native Attribution Models" color="text-blue-500" />
                                    <div className="space-y-3">
                                        {nativeModels.map((m, i) => (
                                            <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${m.available ? 'bg-green-500/5 border-green-400/25' : 'bg-gray-500/5 border-gray-300/25 opacity-70'}`}>
                                                {m.available
                                                    ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" weight="fill" />
                                                    : <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" weight="fill" />}
                                                <div>
                                                    <div className={`text-sm font-semibold ${m.available ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>{m.name}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{m.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ── TAB: Retention & AEM ── */}
                    {activeTab === 'retention' && (
                        <motion.div key="retention" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }} className="space-y-6">
                            {/* Retention */}
                            <motion.div variants={itemVariants}>
                                <Card>
                                    <SectionHeader icon={DeviceMobile} title="Retention Optimization" subtitle="The retention goals I've used for app install campaigns. Only available under App Promotion → App Installs." color="text-blue-500" />
                                    <div className="space-y-3">
                                        {retentionGoals.map((g, i) => (
                                            <div key={i} className={`p-4 rounded-xl border ${g.available ? 'bg-blue-500/5 border-blue-400/25' : 'bg-gray-500/5 border-gray-300/25'}`}>
                                                <div className="flex items-center gap-2 mb-1">
                                                    {g.available
                                                        ? <CheckCircle className="w-4 h-4 text-blue-500" weight="fill" />
                                                        : <XCircle className="w-4 h-4 text-gray-400" weight="fill" />}
                                                    <span className="font-semibold text-sm text-gray-900 dark:text-white">{g.goal}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 ml-6">{g.desc}</p>
                                                <p className="text-xs font-mono text-blue-600 dark:text-blue-400 ml-6 mt-1">Requires: {g.requirement}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <CalloutBox type="link">
                                        <strong>Something that tripped me up early on:</strong> the event (e.g. Day 7 open) and the attribution window (e.g. 7-day click) are set together at the ad set level. Both determine if and when the event gets credited to your ad.
                                    </CalloutBox>
                                </Card>
                            </motion.div>

                            {/* AEM */}
                            <motion.div variants={itemVariants}>
                                <Card>
                                    <SectionHeader icon={Stack} title="Aggregated Event Measurement (AEM)" subtitle="Privacy-safe measurement for iOS opt-outs + SKAN complement" color="text-violet-500" />
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Accordion title="Pre-June 2025: Original 8 Prioritized Events" defaultOpen={true}>
                                            <ol className="space-y-1.5">
                                                {aemEvents.map((e, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                                                        <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-600 dark:text-violet-400 font-bold text-xs flex items-center justify-center flex-shrink-0 font-mono">{i + 1}</span>
                                                        {e}
                                                    </li>
                                                ))}
                                            </ol>
                                        </Accordion>
                                        <Accordion title="Post-June 2025 (Current)" defaultOpen={true}>
                                            <div className="space-y-3">
                                                <div className="flex gap-2 text-xs text-gray-600 dark:text-gray-300">
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" weight="fill" />
                                                    <span><strong>No cap</strong> — all standard/custom events auto-processed (AEM tab removed)</span>
                                                </div>
                                                <div className="flex gap-2 text-xs text-gray-600 dark:text-gray-300">
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" weight="fill" />
                                                    <span><strong>Still active</strong> — privacy-safe measurement for iOS opt-outs</span>
                                                </div>
                                                <div className="flex gap-2 text-xs text-gray-600 dark:text-gray-300">
                                                    <Gear className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" weight="duotone" />
                                                    <span><strong>Setup</strong> — verify domain/app; events fire via SDK/CAPI → Meta handles aggregation</span>
                                                </div>
                                            </div>
                                        </Accordion>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ── TAB: IAP Campaign Setup ── */}
                    {activeTab === 'campaign' && (
                        <motion.div key="campaign" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }} className="space-y-6">
                            <motion.div variants={itemVariants}>
                                <Card>
                                    <SectionHeader icon={Rocket} title="IAP Campaign Setup (Post-Jan 2026)" subtitle="The structure I'm running after Meta dropped granular interest targeting. Heavy on Advantage+ and broad prospecting." color="text-blue-500" />

                                    {/* Campaign Level */}
                                    <div className="mb-6">
                                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase font-mono tracking-widest mb-3">Campaign Level</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {[
                                                { label: 'Objective', value: 'App Promotion → App Events → fb_mobile_purchase (revenue value)' },
                                                { label: 'Attribution', value: 'Standard 7-day click + 1-day view + 1-day engage-through' },
                                                { label: 'Budget', value: 'CBO $2k–5k/day (auto-allocates)' },
                                            ].map(item => (
                                                <div key={item.label} className="p-3 rounded-lg bg-blue-500/5 border border-blue-400/20">
                                                    <div className="text-xs font-mono text-blue-500 uppercase mb-1">{item.label}</div>
                                                    <div className="text-sm text-gray-700 dark:text-gray-200">{item.value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Ad Sets Table */}
                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase font-mono tracking-widest mb-3">Ad Set Structure (4–6 Sets)</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs">
                                            <thead>
                                                <tr className="border-b border-gray-200 dark:border-gray-800">
                                                    {['Ad Set', 'Segment', 'Audience', 'Bidding', 'Budget', 'Scale Signal'].map(h => (
                                                        <th key={h} className="text-left py-2 pr-3 font-semibold text-gray-400 uppercase font-mono">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                {adSetStructure.map((row, i) => (
                                                    <tr key={i} className="hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors">
                                                        <td className="py-3 pr-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">{row.name}</td>
                                                        <td className="py-3 pr-3">
                                                            <span className={`px-2 py-0.5 rounded-full font-mono text-xs ${row.segment === 'Prospecting' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'}`}>
                                                                {row.segment}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 pr-3 text-gray-600 dark:text-gray-300">{row.audience}</td>
                                                        <td className="py-3 pr-3 font-mono text-gray-700 dark:text-gray-300">{row.bidding}</td>
                                                        <td className="py-3 pr-3 font-mono font-semibold text-gray-900 dark:text-white">{row.budget}</td>
                                                        <td className="py-3 text-green-600 dark:text-green-400 font-mono">{row.signal}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Why This Works */}
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase font-mono tracking-widest mb-3">Why This Works (2026 Reality)</h3>
                                        <div className="grid md:grid-cols-3 gap-3">
                                            {[
                                                { label: 'No Interests', desc: 'LALs + Broad = ~25% better ROAS vs. interest targeting' },
                                                { label: 'CBO', desc: 'Auto-optimizes budget across winning ad sets in real time' },
                                                { label: 'Events Drive Everything', desc: '50+ Purchase/week per ad set needed to exit learning phase' },
                                            ].map(item => (
                                                <div key={item.label} className="p-3 rounded-lg bg-green-500/5 border border-green-400/20">
                                                    <div className="text-xs font-mono font-bold text-green-600 dark:text-green-400 mb-1">{item.label}</div>
                                                    <div className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <CalloutBox type="success">
                                        <strong>My scaling rule:</strong> Test 7 to 14 days. Kill anything under 1.0x ROAS. Scale winners by 3x. Always cross-check against MMP for true LTV.
                                    </CalloutBox>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default AttributionPage;
