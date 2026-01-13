import { motion } from "framer-motion";
import React from 'react';

const BackgroundTurtle = () => {
    return (
        <motion.div
            className="fixed top-1/3 left-0 pointer-events-none"
            style={{ zIndex: 9 }} // Explicit inline style for Z-Index to be safe
            initial={{ x: "50vw", opacity: 0 }} // Start in center, invisible
            animate={{
                x: ["100vw", "-20vw"], // Move from Right to Left
                opacity: 0.8 // Fade in to 80% opacity
            }}
            transition={{
                x: {
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0
                },
                opacity: { duration: 1 } // Quick fade in
            }}
        >
            {/* Inner bobbing animation */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotateZ: [-2, 2, -2]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <svg
                    width="150"
                    height="100"
                    viewBox="0 0 150 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-600 dark:text-teal-300 transition-colors duration-300"
                    style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))" }} // Add shadow for "pop"
                >
                    {/* Main Shell Body */}
                    <path
                        d="M40 50 C 40 25, 110 25, 110 50 C 110 75, 40 75, 40 50 Z"
                        fill="currentColor"
                        className="opacity-80" // Solid body
                    />
                    {/* Shell Geometric Pattern Lines */}
                    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M75 30 L 55 45 L 60 65 L 90 65 L 95 45 L 75 30 Z" fill="none" />
                        <path d="M55 45 L 30 50" />
                        <path d="M60 65 L 40 80" />
                        <path d="M90 65 L 110 80" />
                        <path d="M95 45 L 120 50" />
                    </g>
                    {/* Head */}
                    <circle cx="130" cy="50" r="12" fill="currentColor" />
                    {/* Flippers */}
                    <path d="M35 40 L 10 20 L 25 50 Z" fill="currentColor" />
                    <path d="M35 60 L 10 80 L 25 50 Z" fill="currentColor" />
                </svg>
            </motion.div>
        </motion.div>
    );
};

export default BackgroundTurtle;
