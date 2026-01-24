import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = ({ isDarkMode }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };
        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Small Dot */}
            <motion.div
                className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[99999] hidden md:block ${isDarkMode ? 'bg-yellow-400' : 'bg-amber-600'}`}
                animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
                transition={{ type: "tween", ease: "backOut", duration: 0 }}
            />

            {/* Large Ring */}
            <motion.div
                className={`fixed top-0 left-0 w-8 h-8 border-2 rounded-full pointer-events-none z-[99999] hidden md:block ${isDarkMode ? 'border-yellow-400' : 'border-amber-600'}`}
                animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            />
        </>
    );
};

export default CustomCursor;
