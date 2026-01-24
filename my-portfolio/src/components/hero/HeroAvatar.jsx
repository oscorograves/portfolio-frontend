import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

const HeroAvatar = ({ metrics = [], onNavigate }) => {
    // --- 1. 3D Tilt / Magnetic Effect Setup ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [hoveredMetric, setHoveredMetric] = useState(null);

    // Smooth out the mouse movements
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        // Calculate position relative to center of component
        const xPos = clientX - left - width / 2;
        const yPos = clientY - top - height / 2;
        x.set(xPos);
        y.set(yPos);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        setHoveredMetric(null);
    }

    // Map mouse position to rotation (Tile Effect)
    const rotateX = useTransform(mouseY, [-150, 150], [15, -15]);
    const rotateY = useTransform(mouseX, [-150, 150], [-15, 15]);

    // --- Antigravity Float ---
    const floatAnimation = {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    // Positions for the 4 pointers (X Pattern / Corners)
    const pointerPositions = [
        { top: "14%", left: "14%", transform: "translateZ(40px)" },   // Top Left
        { top: "14%", right: "14%", transform: "translateZ(40px)" },  // Top Right
        { bottom: "14%", left: "14%", transform: "translateZ(40px)" }, // Bottom Left
        { bottom: "14%", right: "14%", transform: "translateZ(40px)" } // Bottom Right
    ];

    return (
        <motion.div
            className="hidden md:flex relative w-full h-80 items-center justify-center perspective-1000"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }} // CSS Perspective for 3D
        >
            {/* 3D Tilt Container */}
            <motion.div
                className="relative w-64 h-64 flex items-center justify-center" // Fixed size container for consistent positioning
                animate={floatAnimation}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
            >

                {/* --- 5. Interactive Reactor Ring (Replaces old ring) --- */}
                <motion.div
                    className="absolute -inset-8 rounded-full border border-amber-500/20 dark:border-yellow-400/20 border-dashed"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: "preserve-3d", transform: "translateZ(-20px)" }}
                    whileHover={{
                        scale: 1.1,
                        opacity: 0.8,
                        transition: { duration: 0.3 }
                    }}
                />

                {/* --- 3. Particle Effects --- */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-400 dark:bg-yellow-400 rounded-full"
                        initial={{
                            x: Math.random() * 200 - 100,
                            y: Math.random() * 200 - 100,
                            opacity: 0
                        }}
                        animate={{
                            y: [Math.random() * -20, Math.random() * 20],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                        style={{
                            left: "50%",
                            top: "50%",
                            transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`
                        }}
                    />
                ))}

                {/* The Glowing Atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-purple-600/20 dark:from-yellow-400/10 dark:to-orange-500/10 rounded-full blur-[40px]" style={{ transform: "translateZ(-10px)" }} />

                {/* The Image Link */}
                <a
                    href="https://www.instagram.com/oscorograves/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-transparent dark:border-gray-800 bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 group flex-shrink-0 cursor-pointer block hover:border-amber-600 dark:hover:border-yellow-400 transition-all outline-none"
                    style={{
                        WebkitTapHighlightColor: 'transparent',
                        transform: "translateZ(20px)" // Pop out effect
                    }}
                >
                    <img
                        src="/profile2.jpeg"
                        alt="Kanishk Singh"
                        className="w-full h-full rounded-full object-cover object-top scale-125 transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-150"
                    />

                    {/* Digital Noise Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

                    {/* Blue Tint (Disappears on Hover) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                </a>

                {/* --- Metric Pointers --- */}
                {metrics.map((metric, index) => (
                    <motion.div
                        key={index}
                        className="absolute p-2 cursor-pointer z-30 group" // z-30 to be above everything
                        style={{
                            ...pointerPositions[index],
                            // transform is handled in pointerPositions now
                        }}
                        onMouseEnter={() => setHoveredMetric(index)}
                        onMouseLeave={() => setHoveredMetric(null)}
                        onClick={() => onNavigate && onNavigate(metric.page)}
                    >
                        {/* The Dot */}
                        <motion.div
                            className="w-3 h-3 bg-amber-600 dark:bg-yellow-400 rounded-full shadow-lg shadow-amber-600/50 dark:shadow-yellow-400/50 ring-2 ring-white dark:ring-gray-900" // Added ring for contrast
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        />

                        {/* The Connecting Line (Optional - can be CSS only or simple svg) */}

                        {/* The Card */}
                        <AnimatePresence>
                            {hoveredMetric === index && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.8 }}
                                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 bg-white dark:bg-gray-900 px-4 py-3 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 whitespace-nowrap min-w-[120px] text-center z-40"
                                >
                                    <div className="text-xl font-bold text-gray-900 dark:text-white leading-none font-sans">{metric.value}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium font-sans">{metric.label}</div>
                                    {/* Little Arrow */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white dark:border-t-gray-900" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}

            </motion.div>
        </motion.div>
    );
};

export default HeroAvatar;
