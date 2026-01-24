import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Construction } from 'lucide-react';

const WipModal = ({ isOpen, onClose, t }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-900 border border-amber-500/30 dark:border-yellow-400/30 rounded-2xl p-8 max-w-sm w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
            >
                {/* Decorative Background */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 dark:bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="text-center relative z-10">
                    <div className="w-16 h-16 bg-amber-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-yellow-400">
                        <Construction className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('wip.title')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {t('wip.message')}
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-amber-600 dark:bg-yellow-400 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-amber-700 dark:hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus-visible:ring-amber-500 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-900 font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                        {t('wip.close')}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default WipModal;
