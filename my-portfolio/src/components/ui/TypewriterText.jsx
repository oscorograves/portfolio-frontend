import React from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, className, Element = "h1", delay = 0.3 }) => {
    // Split text into array of letters
    const letters = Array.from(text);
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

    return (
        <MotionComponent
            className={className}
            variants={container}
            initial="hidden"
            whileInView="visible" // Animate when in view
            viewport={{ once: true }} // Only once
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
