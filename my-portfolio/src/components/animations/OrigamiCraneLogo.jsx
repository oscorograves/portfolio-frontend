import React from 'react';
import { motion } from 'framer-motion';

const OrigamiCraneLogo = () => (
    <div className="relative flex items-center justify-center w-8 h-8 mr-1.5">
        <div className="absolute inset-0 bg-zinc-800 rounded-lg" />
        <motion.svg viewBox="0 0 24 24" className="relative z-10 w-5 h-5 text-amber-400"
            fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            animate={{ y: [0, -2.5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <path d="M12 3L2 12h3l7-6 7 6h3L12 3z" />
            <path d="M12 3v10l-4 4-2-3 6-11z" />
            <path d="M12 3v10l4 4 2-3-6-11z" />
            <path d="M12 13l-4 4h8l-4-4z" />
        </motion.svg>
    </div>
);

export default OrigamiCraneLogo;
