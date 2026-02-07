import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const KeyMetricsBase = ({ t, navigate, fallbackMetrics }) => {
    return (
        <div className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 dark:bg-none dark:bg-gray-900 dark:border-y dark:border-gray-800 text-white py-12 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">

                    <div className="p-2">
                        <motion.div
                            className="text-3xl md:text-4xl font-bold mb-1 inline-block cursor-pointer font-mono"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => {
                                navigate('/experience');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <CountUp end={2} duration={2.5} suffix="+" enableScrollSpy scrollSpyOnce />
                        </motion.div>
                        <div className="text-sm md:text-base text-orange-100 dark:text-gray-400">{t('stats.yearsExp')}</div>
                    </div>

                    <div className="p-2">
                        <motion.div
                            className="text-3xl md:text-4xl font-bold mb-1 inline-block cursor-pointer font-mono"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => {
                                navigate('/metrics');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <CountUp end={41} duration={2.5} prefix="$" suffix="K" enableScrollSpy scrollSpyOnce />
                        </motion.div>
                        <div className="text-sm md:text-base text-orange-100 dark:text-gray-400">{t('stats.adSpend')}</div>
                    </div>

                    <div className="p-2">
                        <motion.div
                            className="text-3xl md:text-4xl font-bold mb-1 inline-block cursor-pointer font-mono"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => {
                                navigate('/metrics');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <CountUp end={12} duration={2.5} suffix="+" enableScrollSpy scrollSpyOnce />
                        </motion.div>
                        <div className="text-sm md:text-base text-orange-100 dark:text-gray-400">{t('stats.campaigns')}</div>
                    </div>

                    <div className="p-2">
                        <motion.div
                            className="text-3xl md:text-4xl font-bold mb-1 inline-block cursor-pointer font-mono"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => {
                                navigate('/metrics');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <CountUp end={Math.max(...fallbackMetrics.map(m => m.roi))} duration={2.5} suffix="%" enableScrollSpy scrollSpyOnce />
                        </motion.div>
                        <div className="text-sm md:text-base text-orange-100 dark:text-gray-400">{t('stats.roi')}</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default KeyMetricsBase;
