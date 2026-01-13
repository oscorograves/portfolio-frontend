import React from 'react';
import { motion } from 'framer-motion';
import {
    Database,
    Compass,
    Rocket,
    RefreshCw,
    TrendingUp,
    Target,
    ListOrdered,
    PieChart,
    Filter,
    Code,
    GitFork,
    Scale,
    Infinity as InfinityIcon,
    ArrowRight,
    Zap,
    Cpu
} from 'lucide-react';

const GrowthSystem = () => {
    return (
        <section className="bg-slate-950 text-white py-24 overflow-hidden relative font-sans">
            {/* Background Tech Gird */}
            <div className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-blue-400 mb-3 uppercase">The Growth Operating System</h2>
                    <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Engineered for Velocity
                    </h3>
                    <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                        A closed-loop system where data fuels strategy, execution, and compounding optimization.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* --- LEFT: The Flywheel --- */}
                    <div className="lg:col-span-8 relative min-h-[600px] flex items-center justify-center">

                        {/* Connecting Circle/Cycle Lines */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                            <div className="w-[500px] h-[500px] rounded-full border-2 border-dashed border-slate-500 animate-spin-slow" style={{ animationDuration: '60s' }} />
                            <div className="absolute w-[400px] h-[400px] rounded-full border border-slate-700" />
                        </div>

                        {/* --- CENTRAL HUB --- */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
                            <div className="w-24 h-24 bg-slate-900 rounded-full border-2 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)] flex items-center justify-center relative z-20">
                                <Cpu className="w-10 h-10 text-indigo-400" />
                            </div>
                            <div className="mt-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded border border-indigo-500/30">
                                <span className="text-xs font-bold text-indigo-300 tracking-wider">DATA INTELLIGENCE HUB</span>
                            </div>
                            {/* Data Streams connecting to phases */}
                            <div className="absolute top-0 left-1/2 w-0.5 h-[140px] bg-gradient-to-t from-indigo-500 to-transparent -translate-x-1/2 -z-10 -translate-y-[100%]" />
                            <div className="absolute bottom-0 right-0 w-0.5 h-[140px] bg-gradient-to-b from-indigo-500 to-transparent rotate-[120deg] origin-top-left -z-10" />
                            <div className="absolute bottom-0 left-0 w-0.5 h-[140px] bg-gradient-to-b from-indigo-500 to-transparent -rotate-[120deg] origin-top-right -z-10" />
                        </div>

                        {/* --- PHASE 1: PLAN (Top) --- */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72">
                            <PhaseCard
                                title="PLAN"
                                color="blue"
                                icon={Compass}
                                position="top"
                            >
                                <ModuleItem icon={TrendingUp} label="Establish Baselines" />
                                <ModuleItem icon={Target} label="Reverse-Engineer Goals" />
                                <ModuleItem icon={ListOrdered} label="Hypothesis Backlog" />
                            </PhaseCard>
                        </div>

                        {/* --- PHASE 2: EXECUTE (Bottom Right) --- */}
                        <div className="absolute bottom-10 right-0 lg:right-10 w-72">
                            <PhaseCard
                                title="EXECUTE"
                                color="yellow"
                                icon={Rocket}
                                position="right"
                            >
                                <ModuleItem icon={PieChart} label="80/20 Budget Slicing" highlight />
                                <ModuleItem icon={Filter} label="Full-Funnel Arch." />
                                <ModuleItem icon={Code} label="Pixel/Server Tracking" />
                            </PhaseCard>
                        </div>

                        {/* --- PHASE 3: ITERATE (Bottom Left) --- */}
                        <div className="absolute bottom-10 left-0 lg:left-10 w-72">
                            <PhaseCard
                                title="ITERATE"
                                color="teal"
                                icon={RefreshCw}
                                position="left"
                            >
                                <ModuleItem icon={GitFork} label="'Kill or Scale' Protocol" highlight />
                                <ModuleItem icon={Scale} label="Unit Economics Opt." />
                                <ModuleItem icon={InfinityIcon} label="Compounding Loops" />
                            </PhaseCard>
                        </div>

                        {/* Directional Arrows (Decorative) */}
                        <ArrowArc className="absolute top-1/4 right-1/4 text-slate-700 w-16 h-16 rotate-45" />
                        <ArrowArc className="absolute bottom-0 left-1/2 text-slate-700 w-16 h-16 rotate-[160deg]" />
                        <ArrowArc className="absolute top-1/2 left-10 text-slate-700 w-16 h-16 -rotate-[100deg]" />

                    </div>

                    {/* --- RIGHT: Scoreboard --- */}
                    <div className="lg:col-span-4 mt-12 lg:mt-0">
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-500 to-teal-500" />

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                <h4 className="text-lg font-mono font-bold text-slate-200 tracking-wider">THE SCOREBOARD</h4>
                            </div>

                            <div className="space-y-4">
                                <ScoreMetric
                                    label="LTV:CAC RATIO"
                                    value="4.5:1"
                                    trend="+12%"
                                    color="text-emerald-400"
                                />
                                <ScoreMetric
                                    label="MER / ROAS"
                                    value="3.8x"
                                    trend="Stable"
                                    color="text-blue-400"
                                />
                                <ScoreMetric
                                    label="PAYBACK VELOCITY"
                                    value="< 45 Days"
                                    trend="Fast"
                                    color="text-yellow-400"
                                />
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-800">
                                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                                    <Zap className="w-4 h-4 text-yellow-500" />
                                    <span>LIVE SYSTEM MONITORING</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Sub Components ---

const PhaseCard = ({ title, color, icon: Icon, children, position }) => {
    const colors = {
        blue: { border: 'border-blue-500', text: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'shadow-blue-500/20' },
        yellow: { border: 'border-yellow-500', text: 'text-yellow-400', bg: 'bg-yellow-500/10', glow: 'shadow-yellow-500/20' },
        teal: { border: 'border-teal-500', text: 'text-teal-400', bg: 'bg-teal-500/10', glow: 'shadow-teal-500/20' },
    };

    const theme = colors[color];

    return (
        <div className={`
            bg-slate-900/90 backdrop-blur-sm border ${theme.border} p-5 rounded-xl 
            shadow-[0_0_20px_rgba(0,0,0,0.3)] ${theme.glow}
            transform transition-all duration-300 hover:scale-105 hover:bg-slate-800
        `}>
            <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
                <div className={`p-2 rounded-lg ${theme.bg}`}>
                    <Icon className={`w-5 h-5 ${theme.text}`} />
                </div>
                <h4 className={`text-lg font-bold tracking-wide ${theme.text}`}>{title}</h4>
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
};

const ModuleItem = ({ icon: Icon, label, highlight }) => (
    <div className={`flex items-center gap-3 text-sm ${highlight ? 'text-white font-medium' : 'text-slate-400'}`}>
        <Icon className={`w-4 h-4 ${highlight ? 'text-white' : 'text-slate-500'}`} />
        <span>{label}</span>
    </div>
);

const ScoreMetric = ({ label, value, trend, color }) => (
    <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 flex justify-between items-end">
        <div>
            <div className="text-xs font-mono text-slate-500 mb-1">{label}</div>
            <div className={`text-2xl font-mono font-bold ${color}`}>{value}</div>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded">
            {trend}
        </div>
    </div>
);

const ArrowArc = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10,50 Q50,0 90,50" />
        <path d="M85,40 L90,50 L80,55" fill="currentColor" stroke="none" />
    </svg>
);

export default GrowthSystem;
