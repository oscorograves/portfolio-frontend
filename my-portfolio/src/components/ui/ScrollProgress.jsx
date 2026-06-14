import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';


const ScrollProgress = ({ isDarkMode }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[1002] bg-amber-500"
            style={{ scaleX }}
        />
    );
};

export default ScrollProgress;
