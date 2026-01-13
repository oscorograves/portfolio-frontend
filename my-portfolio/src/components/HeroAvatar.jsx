import { motion } from "framer-motion";

const HeroAvatar = () => {
    // 1. "Antigravity" Float Animation (The gentle bobbing)
    const floatAnimation = {
        y: [-15, 15, -15],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <motion.div
            className="hidden md:flex relative w-full h-72 items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* 2. Apply Float to the entire cluster */}
            <motion.div
                className="relative"
                animate={floatAnimation}
            >

                {/* The Reactor Ring (Spinning behind you) */}
                <motion.div
                    className="absolute -inset-6 rounded-full border border-blue-500/30 border-dashed"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* The Glowing Atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-purple-600/20 rounded-full blur-[40px]" />

                {/* The Image Frame (Crops your square image into a circle) */}
                <a
                    href="https://www.instagram.com/oscoro.graves/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-48 h-48 rounded-full overflow-hidden border border-gray-300 dark:border-gray-800 bg-gray-900 shadow-2xl z-10 group flex-shrink-0 cursor-pointer block hover:border-blue-600 dark:hover:border-yellow-400 transition-all outline-none"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                >

                    {/* ✅ YOUR SQUARE IMAGE GOES HERE */}
                    {/* 'object-cover' ensures it fills the circle perfectly without stretching */}
                    {/* Using profile2.jpeg as found in the directory */}
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
