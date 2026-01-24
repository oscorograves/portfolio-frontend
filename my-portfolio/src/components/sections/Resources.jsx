import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileSpreadsheet } from 'lucide-react';

const Resources = ({ t }) => {
    return (
        <section className="py-12 mt-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-mono">
                Resources
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Download LOR */}
                <motion.a
                    href="/LOR.pdf"
                    target="_blank"
                    className="flex items-center gap-4 p-5 bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-amber-600 dark:hover:border-yellow-400 transition-all cursor-pointer group"
                    whileHover={{ y: -3 }}
                >
                    <div className="p-3 bg-amber-100 dark:bg-yellow-900/30 rounded-full text-amber-600 dark:text-yellow-400 group-hover:bg-amber-600 group-hover:text-white dark:group-hover:bg-yellow-400 dark:group-hover:text-gray-900 transition-colors">
                        <Download className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white font-mono">Download LOR</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Letter of Recommendation</p>
                    </div>
                </motion.a>

                {/* Performance Monitoring Sheet */}
                <motion.a
                    href="https://docs.google.com/spreadsheets"
                    target="_blank"
                    className="flex items-center gap-4 p-5 bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-amber-600 dark:hover:border-yellow-400 transition-all cursor-pointer group"
                    whileHover={{ y: -3 }}
                >
                    <div className="p-3 bg-amber-100 dark:bg-yellow-900/30 rounded-full text-amber-600 dark:text-yellow-400 group-hover:bg-amber-600 group-hover:text-white dark:group-hover:bg-yellow-400 dark:group-hover:text-gray-900 transition-colors">
                        <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white font-mono">Performance Sheet</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Google Monitoring Template</p>
                    </div>
                </motion.a>
            </div>
        </section>
    );
};

export default Resources;
