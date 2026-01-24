import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FireflyBackground = () => {
    // Generate 30 fireflies with stable random values
    const fireflies = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // Random horizontal start
            bottom: Math.random() * 40, // Start in the bottom 40% of screen
            size: Math.random() * 6 + 4, // Bigger size (4px - 10px)
            duration: Math.random() * 5 + 5, // Slow float (5s - 10s)
            delay: Math.random() * 5,
            xOffset: Math.random() * 50 - 25, // Pre-calculate random x offset
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {fireflies.map((p) => (
                <motion.div
                    key={p.id}
                    // Orange in light mode, Yellow (Gold) in dark mode
                    className="absolute rounded-full bg-amber-400 dark:bg-yellow-400 shadow-[0_0_20px_rgba(251,146,60,0.8)] dark:shadow-[0_0_20px_rgba(250,204,21,0.8)]"
                    style={{
                        left: `${p.left}%`,
                        bottom: `${p.bottom}%`,
                        width: p.size,
                        height: p.size,
                        opacity: 0, // Start invisible
                    }}
                    animate={{
                        // Float UP and drift SIDEWAYS
                        y: [0, -150],
                        x: [0, p.xOffset],
                        opacity: [0, 0.8, 0], // Fade in to 80% opacity, then out
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default FireflyBackground;
