import React from 'react';
import { motion } from 'framer-motion';

const OrigamiCraneLogo = () => {
    return (
        <div className="relative flex items-center justify-center w-12 h-12 mr-3">
            {/* 1. The Circle Background */}
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-full" />

            {/* 2. The Floating Crane SVG */}
            <motion.svg
                viewBox="0 0 24 24"
                className="relative z-10 w-8 h-8 text-amber-600 dark:text-yellow-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                // The "Antigravity" Float Effect
                animate={{ y: [0, -4, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* The Origami Shape (Geometric vector paths) */}
                <path d="M12 3L2 12h3l7-6 7 6h3L12 3z" /> {/* Top Wing */}
                <path d="M12 3v10l-4 4-2-3 6-11z" />      {/* Left Fold */}
                <path d="M12 3v10l4 4 2-3-6-11z" />       {/* Right Fold */}
                <path d="M12 13l-4 4h8l-4-4z" />          {/* Body */}
            </motion.svg>
        </div>
    );
};

export default OrigamiCraneLogo;
