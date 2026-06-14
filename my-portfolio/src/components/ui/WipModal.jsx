import React from 'react';
import { motion } from 'framer-motion';
import { Barricade } from 'phosphor-react';

const WipModal = ({ isOpen, onClose, t }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bento-card p-8 max-w-sm w-full text-center">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Barricade className="w-7 h-7 text-amber-500" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t('wip.title')}</h3>
                <p className="text-zinc-400 mb-6 text-sm leading-relaxed">{t('wip.message')}</p>
                <button onClick={onClose}
                    className="w-full py-2.5 bg-amber-500 text-zinc-900 font-semibold rounded-xl hover:bg-amber-400 transition-colors cursor-pointer">
                    {t('wip.close')}
                </button>
            </motion.div>
        </div>
    );
};

export default WipModal;
