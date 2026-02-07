import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, className, Element = "h1", delay = 0.3 }) => {
    // Ensure text is a string and memoize letters based on text changes
    const safeText = typeof text === 'string' ? text : '';
    const letters = useMemo(() => Array.from(safeText), [safeText]);
    const MotionComponent = motion[Element] || motion.div;

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay }
        }
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        hidden: {
            opacity: 0,
            x: -10,
        }
    };

    // Don't render until we have text (prevents partial animations)
    if (!safeText) {
        return null;
    }

    return (
        <MotionComponent
            className={className}
            variants={container}
            initial="hidden"
            animate="visible" // Use animate instead of whileInView to trigger on text change
            key={safeText} // Re-animate when text changes
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </MotionComponent>
    );
};

export default TypewriterText;

