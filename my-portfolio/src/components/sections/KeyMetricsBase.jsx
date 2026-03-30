import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const KeyMetricsBase = ({ t, navigate, fallbackMetrics }) => {
    const totalSpend = fallbackMetrics.reduce((acc, curr) => acc + curr.spend, 0);
    const spendValue = Math.round(totalSpend / 1000);

    return (
        <div className="relative py-12 transition-colors duration-300 border-b border-gray-300 dark:border-gray-800">
            {/* Light mode: orange gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 dark:hidden" />
            {/* Dark mode: match cards */}
            <div className="absolute inset-0 hidden dark:block bg-gray-900/40 backdrop-blur-md border-y border-gray-800" />
            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 text-white dark:text-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">

                    <div className="p-2">
                        <motion.div
                            className="text-3xl md:text-4xl font-bold mb-1 inline-flex items-baseline justify-center cursor-pointer font-mono tracking-tight"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => {
                                navigate('/experience');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <CountUp end={2} duration={2.5} enableScrollSpy scrollSpyOnce />
                            <span className="text-[0.75em] font-sans font-bold opacity-80 tracking-wide ml-[2px]">+</span>
                        </motion.div>
                        <div className="text-sm md:text-base text-orange-100 dark:text-gray-400">{t('stats.yearsExp')}</div>
                    </div>

                    <div className="p-2">
                        <motion.div
                            className="text-3xl md:text-4xl font-bold mb-1 inline-flex items-baseline justify-center cursor-pointer font-mono tracking-tight"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => {
                                navigate('/metrics');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <span className="text-[0.75em] font-sans font-bold opacity-80 tracking-wide mr-[2px]">$</span>
                            <CountUp end={spendValue} duration={2.5} enableScrollSpy scrollSpyOnce />
                            <span className="text-[0.75em] font-sans font-bold opacity-80 tracking-wide ml-[2px]">K</span>
                        </motion.div>
                        <div className="text-sm md:text-base text-orange-100 dark:text-gray-400">{t('stats.adSpend')}</div>
                    </div>

                    <div className="p-2">
                        <motion.div
                            className="text-3xl md:text-4xl font-bold mb-1 inline-flex items-baseline justify-center cursor-pointer font-mono tracking-tight"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => {
                                navigate('/metrics');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <CountUp end={12} duration={2.5} enableScrollSpy scrollSpyOnce />
                            <span className="text-[0.75em] font-sans font-bold opacity-80 tracking-wide ml-[2px]">+</span>
                        </motion.div>
                        <div className="text-sm md:text-base text-orange-100 dark:text-gray-400">{t('stats.campaigns')}</div>
                    </div>

                    <div className="p-2">
                        <motion.div
                            className="text-3xl md:text-4xl font-bold mb-1 inline-flex items-baseline justify-center cursor-pointer font-mono tracking-tight"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => {
                                navigate('/metrics');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <CountUp end={Math.max(...fallbackMetrics.map(m => m.roi))} duration={2.5} enableScrollSpy scrollSpyOnce />
                            <span className="text-[0.75em] font-sans font-bold opacity-80 tracking-wide ml-[2px]">%</span>
                        </motion.div>
                        <div className="text-sm md:text-base text-orange-100 dark:text-gray-400">{t('stats.roi')}</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default KeyMetricsBase;
