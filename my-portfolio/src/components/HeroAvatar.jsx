import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const HeroAvatar = () => {
    // --- 1. 3D Tilt / Magnetic Effect Setup ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);

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
                className="relative"
                animate={floatAnimation}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
            >

                {/* --- 5. Interactive Reactor Ring (Replaces old ring) --- */}
                <motion.div
                    className="absolute -inset-8 rounded-full border border-blue-500/20 border-dashed"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: "preserve-3d", TestZ: -20 }}
                    whileHover={{
                        scale: 1.1,
                        borderColor: "rgba(37, 99, 235, 0.6)", // blue-600
                        transition: { duration: 0.3 }
                    }}
                >
                    {/* Inner faster ring */}
                    <motion.div
                        className="absolute inset-2 rounded-full border border-purple-500/20 border-dotted"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>

                {/* --- 3. Particle Effects --- */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full"
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
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-purple-600/20 rounded-full blur-[40px] translate-z-[-10px]" />

                {/* The Image Link */}
                <a
                    href="https://www.instagram.com/oscoro.graves/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-48 h-48 rounded-full overflow-hidden border border-gray-300 dark:border-gray-800 bg-gray-900 shadow-2xl z-10 group flex-shrink-0 cursor-pointer block hover:border-blue-600 dark:hover:border-yellow-400 transition-all outline-none"
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

            </motion.div>
        </motion.div>
    );
};

export default HeroAvatar;
