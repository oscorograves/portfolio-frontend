import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileSpreadsheet, ExternalLink } from 'lucide-react';

const Resources = ({ t }) => {
    return (
        <section className="py-12 mt-8 border-t border-gray-300 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-8">
                {/* Section Title (Matched to DigitalSkills/Services) */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-amber-600 dark:border-yellow-400 font-mono">
                    Resources
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Professional Reference (LOR) */}
                    <motion.a
                        href="/Professional_LOR.pdf"
                        target="_blank"
                        className="group flex items-start gap-4 p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded-xl hover:border-amber-600 dark:hover:border-yellow-400 transition-all outline outline-2 outline-offset-4 outline-gray-900 outline-2 cursor-pointer"
                        whileHover={{ y: -5 }}
                    >
                        {/* Icon Container (Matched to Services: Solid Amber) */}
                        <div className="w-10 h-10 bg-amber-600 dark:bg-yellow-400 rounded-lg flex items-center justify-center text-white dark:text-gray-900 shrink-0">
                            <Download className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-yellow-400 transition-colors">
                                    Professional Reference
                                </h3>
                                <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                                Letter of Recommendation detailing professional impact, strategic thinking, and campaign performance.
                            </p>
                        </div>
                    </motion.a>

                    {/* Promotions Monitoring Sheet */}
                    <motion.a
                        href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTDn-lJIO3TJJ1TQLIFIbFLYzGo-nYZUv0ID45PnaV-OqqrH8GvU88k-Fvd117bCOKZNcsRH_l79FPd/pubhtml"
                        target="_blank"
                        className="group flex items-start gap-4 p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded-xl hover:border-amber-600 dark:hover:border-yellow-400 transition-all outline outline-2 outline-offset-4 outline-gray-900 outline-2 cursor-pointer"
                        whileHover={{ y: -5 }}
                    >
                        {/* Icon Container (Matched to Services: Solid Amber) */}
                        <div className="w-10 h-10 bg-amber-600 dark:bg-yellow-400 rounded-lg flex items-center justify-center text-white dark:text-gray-900 shrink-0">
                            <FileSpreadsheet className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-yellow-400 transition-colors">
                                    Promotions Monitoring Sheet - 2024
                                </h3>
                                <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                                Ad performance sheet from 2024
                            </p>
                        </div>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default Resources;
