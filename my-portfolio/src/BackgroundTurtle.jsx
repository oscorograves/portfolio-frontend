import { motion } from "framer-motion";
import React from 'react';

const BackgroundTurtle = () => {
    // Flipper animation variants
    const flipperVariants = {
        rest: { rotate: 0 },
        paddling: {
            rotate: [0, -25, 0], // Rotate back and forth
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror"
            }
        },
        paddlingOffset: {
            rotate: [0, -25, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
                delay: 0.5 // Offset for natural swimming motion
            }
        }
    };

    const headVariants = {
        floating: {
            rotate: [-2, 5, -2],
            x: [0, 2, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            className="fixed top-1/3 left-0 pointer-events-none"
            style={{ zIndex: 9 }}
            initial={{ x: "50vw", opacity: 0 }}
            animate={{
                x: ["100vw", "-20vw"],
                opacity: 0.8
            }}
            transition={{
                x: {
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0
                },
                opacity: { duration: 1 }
            }}
        >
            <motion.div
                animate={{ y: [0, -15, 0], rotateZ: [-1, 2, -1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg
                    width="200"
                    height="140"
                    viewBox="0 0 200 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-600 dark:text-teal-300 transition-colors duration-300"
                    style={{ filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.2))" }}
                >
                    {/* --- Back Flippers (Behind Shell) --- */}
                    <motion.g
                        variants={flipperVariants}
                        animate="paddlingOffset"
                        style={{ originX: "60px", originY: "80px" }} // Pivot point near body connection
                    >
                        {/* Back Left Leg */}
                        <path d="M50 85 L 20 110 L 40 120 L 70 100 Z" fill="currentColor" opacity="0.6" />
                    </motion.g>

                    <motion.g
                        variants={flipperVariants}
                        animate="paddlingOffset"
                        style={{ originX: "60px", originY: "50px" }} // Pivot point
                    >
                        {/* Back Right Leg */}
                        <path d="M50 45 L 20 20 L 40 10 L 70 30 Z" fill="currentColor" opacity="0.6" />
                    </motion.g>

                    {/* --- Head and Neck --- */}
                    <motion.g variants={headVariants} animate="floating" style={{ originX: "140px", originY: "65px" }}>
                        {/* Neck */}
                        <path d="M140 55 L 170 60 L 170 70 L 140 75 Z" fill="currentColor" />
                        {/* Head Circle */}
                        <ellipse cx="175" cy="65" rx="18" ry="14" fill="currentColor" />
                        {/* Eye */}
                        <circle cx="180" cy="60" r="2" fill="white" fillOpacity="0.8" />
                    </motion.g>

                    {/* --- Front Flippers (Main Paddles) --- */}
                    <motion.g
                        variants={flipperVariants}
                        animate="paddling"
                        style={{ originX: "130px", originY: "85px" }}
                    >
                        {/* Front Left Flipper */}
                        <path d="M120 85 C 100 130, 60 120, 70 100 L 130 80 Z" fill="currentColor" opacity="0.9" />
                    </motion.g>

                    <motion.g
                        variants={flipperVariants}
                        animate="paddling"
                        style={{ originX: "130px", originY: "45px" }}
                    >
                        {/* Front Right Flipper */}
                        <path d="M120 45 C 100 -5, 60 10, 70 30 L 130 50 Z" fill="currentColor" opacity="0.9" />
                    </motion.g>

                    {/* --- The Shell (Top Layer) --- */}
                    <g>
                        {/* Main Dome */}
                        <path
                            d="M60 65 C 60 20, 150 20, 150 65 C 150 110, 60 110, 60 65 Z"
                            fill="currentColor"
                            className="text-blue-700 dark:text-teal-400"
                        />

                        {/* 3D Shell Plates (Styled for depth) */}
                        <path d="M90 65 L 120 65 L 105 40 Z" fill="white" fillOpacity="0.1" /> {/* Top Plate */}
                        <path d="M90 65 L 120 65 L 105 90 Z" fill="black" fillOpacity="0.1" /> {/* Bottom Plate */}
                        <path d="M75 65 L 90 65 L 75 40 Z" fill="white" fillOpacity="0.05" /> {/* Rear Top */}
                        <path d="M135 65 L 120 65 L 135 40 Z" fill="white" fillOpacity="0.05" /> {/* Front Top */}

                        {/* Shell Rim/Outline */}
                        <path
                            d="M60 65 C 60 20, 150 20, 150 65 C 150 110, 60 110, 60 65 Z"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeOpacity="0.5"
                            fill="none"
                        />
                    </g>
                </svg>
            </motion.div>
        </motion.div>
    );
};

export default BackgroundTurtle;
