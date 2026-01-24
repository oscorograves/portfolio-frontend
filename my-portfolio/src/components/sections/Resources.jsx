import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileSpreadsheet, ExternalLink } from 'lucide-react';

const Resources = ({ t }) => {
    return (
        <section className="py-12 mt-12 transition-colors duration-300">
            {/* Top Divider Line (Page Divider) */}
            <div className="w-full h-0.5 bg-amber-600 dark:bg-yellow-400 mb-12 opacity-80" />

            <div className="max-w-4xl mx-auto px-4">
                {/* Section Title with Underline */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-mono">
                        Resources
                    </h2>
                    <div className="w-24 h-1 bg-amber-600 dark:bg-yellow-400" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Professional Reference (LOR) */}
                    <motion.a
                        href="/Professional_LOR.pdf"
                        target="_blank"
                        className="group flex items-start gap-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-amber-600 dark:hover:border-yellow-400 transition-all cursor-pointer shadow-sm hover:shadow-md"
                        whileHover={{ y: -4 }}
                    >
                        {/* Icon Container - Square Style */}
                        <div className="p-3 bg-amber-100 dark:bg-yellow-900/30 border border-amber-200 dark:border-yellow-700/50 rounded-lg text-amber-600 dark:text-yellow-400 group-hover:bg-amber-600 group-hover:text-white dark:group-hover:bg-yellow-400 dark:group-hover:text-gray-900 transition-colors">
                            <Download className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-mono group-hover:text-amber-600 dark:group-hover:text-yellow-400 transition-colors">
                                    Professional Reference
                                </h3>
                                <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                                Letter of Recommendation detailing professional impact, strategic thinking, and campaign performance.
                            </p>
                        </div>
                    </motion.a>

                    {/* Performance Monitoring Sheet */}
                    <motion.a
                        href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTDn-lJIO3TJJ1TQLIFIbFLYzGo-nYZUv0ID45PnaV-OqqrH8GvU88k-Fvd117bCOKZNcsRH_l79FPd/pubhtml"
                        target="_blank"
                        className="group flex items-start gap-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-amber-600 dark:hover:border-yellow-400 transition-all cursor-pointer shadow-sm hover:shadow-md"
                        whileHover={{ y: -4 }}
                    >
                        {/* Icon Container - Square Style */}
                        <div className="p-3 bg-amber-100 dark:bg-yellow-900/30 border border-amber-200 dark:border-yellow-700/50 rounded-lg text-amber-600 dark:text-yellow-400 group-hover:bg-amber-600 group-hover:text-white dark:group-hover:bg-yellow-400 dark:group-hover:text-gray-900 transition-colors">
                            <FileSpreadsheet className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-mono group-hover:text-amber-600 dark:group-hover:text-yellow-400 transition-colors">
                                    Live Performance Tracker
                                </h3>
                                <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                                Automated Google Sheets dashboard for real-time campaign analytics and cross-channel reporting.
                            </p>
                        </div>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default Resources;
