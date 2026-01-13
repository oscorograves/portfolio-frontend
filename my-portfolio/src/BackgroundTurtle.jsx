import { motion } from "framer-motion";
import React from 'react';

const BackgroundTurtle = () => {
    // 1. The "Crossing" Animation (Left to Right across the screen)
    const crossingVariants = {
        animate: {
            x: ['-20vw', '120vw'], // Start way off-left, end way off-right
            transition: {
                duration: 80, // Takes 80 seconds to cross (very slow and calming)
                repeat: Infinity,
                ease: "linear",
                delay: -40, // Start halfway through the animation (visible immediately)
            }
        }
    };

    // 2. The "Floating" Animation (Bobbing and tilting up and down)
    const floatingVariants = {
        animate: {
            y: [0, -20, 0], // Bob up and down
            rotateZ: [-2, 3, -2], // Slight tilt like it's swimming
            transition: {
                duration: 8, // 8 seconds for one full bob cycle
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        // Outer container handles horizontal movement across screen
        <motion.div
            className="fixed top-1/3 left-0 z-[9] pointer-events-none opacity-50"
            variants={crossingVariants}
            animate="animate"
            initial={false} // Start animation immediately without jumping to initial state
        >
            {/* Inner container handles vertical bobbing */}
            <motion.div variants={floatingVariants} animate="animate">

                {/* The Geometric Turtle SVG */}
                <svg
                    width="150"
                    height="100"
                    viewBox="0 0 150 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    // Using text-teal-300 gives it a nice subtle sea-green color. 
                    // Change to text-blue-300 or text-gray-300 if you prefer.
                    className="text-teal-300"
                >
                    {/* Main Shell Body (Solid low opacity) */}
                    <path
                        d="M40 50 C 40 25, 110 25, 110 50 C 110 75, 40 75, 40 50 Z"
                        fill="currentColor"
                        className="opacity-50"
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
                    {/* Flippers (Triangular geometric shapes) */}
                    <path d="M35 40 L 10 20 L 25 50 Z" fill="currentColor" /> {/* Front Left */}
                    <path d="M35 60 L 10 80 L 25 50 Z" fill="currentColor" /> {/* Back Left */}
                </svg>

            </motion.div>
        </motion.div>
    );
};

export default BackgroundTurtle;
