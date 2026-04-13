import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CaretDown } from 'phosphor-react';

/**
 * FashionD2CDashboard
 * D2C fashion brand Meta campaign performance dashboard
 * showing funnel metrics, spend breakdown, and weekly trends.
 */
const FashionD2CDashboard = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (window.location.hash === '#d2c-dashboard') {
            setIsExpanded(true);
            setTimeout(() => {
                const el = document.getElementById('d2c-dashboard');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }

        let script = document.querySelector('script[src*="chart.umd"]');
        const initChart = () => {
            if (!chartRef.current || !window.Chart) return;
            // Destroy previous instance if any
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            chartInstance.current = new window.Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
                    datasets: [
                        {
                            label: 'ROAS',
                            data: [2.1, 2.4, 2.9, 3.1, 3.0, 3.8, 3.4, 3.3],
                            borderColor: '#378ADD',
                            backgroundColor: 'rgba(55,138,221,0.08)',
                            borderWidth: 2,
                            pointBackgroundColor: '#378ADD',
                            pointRadius: 4,
                            fill: true,
                            tension: 0.35,
                        },
                        {
                            label: 'Target (3x)',
                            data: [3, 3, 3, 3, 3, 3, 3, 3],
                            borderColor: '#1D9E75',
                            borderWidth: 1.5,
                            borderDash: [6, 4],
                            pointRadius: 0,
                            fill: false,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: {
                            min: 1.5,
                            max: 4.5,
                            ticks: {
                                callback: (v) => v.toFixed(1) + 'x',
                                color: '#888780',
                                font: { size: 11 },
                            },
                            grid: { color: 'rgba(136,135,128,0.15)' },
                        },
                        x: {
                            ticks: {
                                color: '#888780',
                                font: { size: 11 },
                                autoSkip: false,
                            },
                            grid: { display: false },
                        },
                    },
                },
            });
        };

        if (!script) {
            script = document.createElement('script');
            script.src =
                'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
            script.onload = initChart;
            document.body.appendChild(script);
        } else if (window.Chart) {
            initChart();
        } else {
            script.addEventListener('load', initChart);
        }

        return () => {
            if (script) {
                script.removeEventListener('load', initChart);
            }
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);

    return (
        <div id="d2c-dashboard" className="ds-card-base rounded-xl p-6 md:p-8 transition-colors duration-300">
            {/* SEO-only heading */}
            <h2 className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
                D2C fashion brand Meta campaign performance dashboard showing funnel
                metrics, spend breakdown, and weekly trends
            </h2>

            {/* Header / Summary Section mimicking FeaturedAchievement */}
            <div
                className="flex items-start justify-between mb-6 cursor-pointer group select-none"
                onClick={() => setIsExpanded(!isExpanded)}
                data-cursor="pointer"
                role="button"
            >
                <div>
                    <div className="mb-3">
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white m-0 group-hover:text-amber-600 dark:group-hover:text-yellow-400 transition-colors">
                                Fashion D2C
                            </h3>
                            <div className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded whitespace-nowrap">
                                Growth Stage
                            </div>
                        </div>
                        <div className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                            Meta Campaign
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-mono tracking-tight m-0 mb-3 block">
                        April 2026 · ₹2,50,000 monthly budget
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl m-0">
                        A granular breakdown of the Meta Ads funnel showcasing top-line commercial outcomes versus in-platform proxies. Covers acquisition health pacing, full-funnel budget allocation, and weekly return on ad spend elasticity.
                    </p>
                </div>

                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-gray-400 group-hover:text-amber-600 dark:group-hover:text-yellow-400 transition-colors pt-1 ml-4 shrink-0"
                >
                    <CaretDown size={28} weight="duotone" />
                </motion.div>
            </div>

            {/* Top-line performance ALWAYS VISIBLE (Summary Mode) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pb-2">
                <MetricCard label="Total spend" value="₹2.5L" sub="₹8,065/day avg" />
                <MetricCard label="Revenue attributed" value="₹8.25L" sub="7-day click window" subType="good" />
                <MetricCard label="ROAS (in-platform)" value="3.3x" sub="Blended MER: 2.1x" subType="warn" />
                <MetricCard label="Purchases" value="412" sub="New customers: 298" />
            </div>

            {/* EXPANDABLE SECTION */}
            <motion.div
                initial={false}
                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <div className="pt-6 pb-6 mt-8 border-t border-gray-200 dark:border-gray-800">
                    {/* ── Funnel metrics ── */}
                    <SectionLabel>Funnel metrics</SectionLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                        <MetricCard label="CPM" value="₹312" sub="Up 14% MoM" subType="warn" />
                        <MetricCard
                            label="CTR"
                            value="1.48%"
                            sub="Above 1% benchmark"
                            subType="good"
                        />
                        <MetricCard
                            label="CPC"
                            value="₹21"
                            sub="Healthy for apparel"
                            subType="good"
                        />
                        <MetricCard
                            label="Frequency"
                            value="2.4"
                            sub="Within 1.5–3 range"
                            subType="good"
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-2.5">
                        <MetricCard
                            label="CVR (link click → purchase)"
                            value="3.5%"
                            sub="Strong for cold ToF"
                            subType="good"
                        />
                        <MetricCard label="AOV" value="₹2,003" sub="Target: ₹2,000+" />
                        <MetricCard
                            label="Add-to-cart rate"
                            value="9.2%"
                            sub="Good intent signal"
                            subType="good"
                        />
                        <MetricCard
                            label="Checkout abandon"
                            value="61%"
                            sub="Industry avg: 55–65%"
                            subType="warn"
                        />
                    </div>

                    {/* ── Acquisition health ── */}
                    <SectionLabel>Acquisition health</SectionLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                        <MetricCard
                            label="CPP (Cost per purchase)"
                            value="₹607"
                            sub="₹2.5L ÷ 412"
                        />
                        <MetricCard
                            label="NCAC (new customers)"
                            value="₹839"
                            sub="Monitor vs. LTV"
                            subType="warn"
                        />
                        <MetricCard
                            label="Est. LTV (12mo)"
                            value="₹4,200"
                            sub="LTV:CAC = 5:1"
                            subType="good"
                        />
                        <MetricCard
                            label="MER"
                            value="2.1x"
                            sub="Target 2.5x+ at scale"
                            subType="warn"
                        />
                    </div>

                    {/* ── Budget split ── */}
                    <SectionLabel>Budget split</SectionLabel>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-start">
                        {/* Progress bars */}
                        <div>
                            <BudgetBar
                                label="Prospecting (ToF)"
                                amount="₹1,75,000 · 70%"
                                pct={70}
                                color="#378ADD"
                            />
                            <BudgetBar
                                label="Retargeting (BoF)"
                                amount="₹62,500 · 25%"
                                pct={25}
                                color="#1D9E75"
                            />
                            <BudgetBar
                                label="Retention / CRM"
                                amount="₹12,500 · 5%"
                                pct={5}
                                color="#BA7517"
                                last
                            />
                        </div>

                        {/* Split-detail cards */}
                        <div className="grid grid-cols-2 gap-2">
                            <MetricCard
                                label="ToF ROAS"
                                value="2.6x"
                                sub="Broad + LAA"
                                small
                            />
                            <MetricCard
                                label="BoF ROAS"
                                value="5.8x"
                                sub="Engagement retargeting"
                                small
                            />
                            <MetricCard
                                label="Hook rate (3s)"
                                value="34%"
                                sub="Target: 30%+"
                                subType="good"
                                small
                            />
                            <MetricCard
                                label="Video completion"
                                value="18%"
                                sub="Improve mid-video"
                                subType="warn"
                                small
                            />
                        </div>
                    </div>

                    {/* ── Weekly ROAS trend ── */}
                    <SectionLabel>Weekly ROAS trend</SectionLabel>
                    <div className="relative w-full" style={{ height: 220 }}>
                        <canvas
                            ref={chartRef}
                            role="img"
                            aria-label="Line chart showing weekly ROAS over 8 weeks, starting at 2.1 and peaking at 3.8 in week 6"
                        >
                            Weekly ROAS: W1: 2.1, W2: 2.4, W3: 2.9, W4: 3.1, W5: 3.0, W6:
                            3.8, W7: 3.4, W8: 3.3
                        </canvas>
                    </div>

                    {/* Legend */}
                    <div className="flex gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <span
                                className="inline-block rounded-sm"
                                style={{ width: 10, height: 2, background: '#378ADD' }}
                            />
                            Weekly ROAS
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <span
                                className="inline-block rounded-sm opacity-70"
                                style={{ width: 10, height: 2, background: '#1D9E75' }}
                            />
                            Target 3x
                        </span>
                    </div>

                    {/* ── Key observations ── */}
                    <div className="mt-6 ds-card-base ds-card-hover rounded-lg p-5">
                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-3 tracking-wide">
                            Key observations
                        </p>
                        <p className="text-[13px] text-gray-600 dark:text-gray-400 m-0 mb-2 leading-relaxed">
                            In-platform ROAS (3.3x) is inflated vs. blended MER (2.1x) — typical
                            view-through attribution gap. Optimize toward MER.
                        </p>
                        <p className="text-[13px] text-gray-600 dark:text-gray-400 m-0 mb-2 leading-relaxed">
                            CPM rising 14% MoM signals audience saturation — time to refresh
                            creatives or expand targeting pool.
                        </p>
                        <p className="text-[13px] text-gray-600 dark:text-gray-400 m-0 leading-relaxed">
                            Video hook rate is solid (34%) but completion drops at 18% —
                            mid-video engagement needs work.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

/* ── Sub-components ── */

const SectionLabel = ({ children }) => (
    <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-4 mt-8 tracking-wide">
        {children}
    </p>
);

const subTypeClasses = {
    good: 'text-green-600 dark:text-green-400',
    warn: 'text-amber-600 dark:text-yellow-400',
    bad: 'text-red-600 dark:text-red-400',
};

const formatValue = (val) => {
    if (typeof val !== 'string') return val;
    const parts = val.split(/([\d.,]+)/);
    return parts.map((part, index) => {
        if (/^[\d.,]+$/.test(part)) {
            return <span key={index} className="font-mono">{part}</span>;
        } else if (part) {
            return <span key={index} className="text-[0.8em] font-sans font-semibold tracking-wide opacity-80 mx-[1px]">{part}</span>;
        }
        return null;
    });
};

const MetricCard = ({ label, value, sub, subType, small }) => (
    <div className="ds-card-base ds-card-hover rounded-lg p-5">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2 font-mono">
            {label}
        </p>
        <div
            className={`font-bold text-gray-900 dark:text-white m-0 tracking-tight font-mono ${small ? 'text-xl' : 'text-3xl'}`}
        >
            {formatValue(value)}
        </div>
        {sub && (
            <p
                className={`text-xs mt-1.5 m-0 ${subType ? subTypeClasses[subType] : 'text-gray-500 dark:text-gray-400'}`}
            >
                {sub}
            </p>
        )}
    </div>
);

const BudgetBar = ({ label, amount, pct, color, last }) => (
    <>
        <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase font-mono">
                {label}
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white tracking-tight font-mono">
                {formatValue(amount)}
            </span>
        </div>
        <div
            className={`bg-gray-200 dark:bg-gray-800 rounded h-2 ${last ? '' : 'mb-4'}`}
        >
            <div
                className="h-2 rounded"
                style={{ width: `${pct}%`, background: color }}
            />
        </div>
    </>
);

export default FashionD2CDashboard;
