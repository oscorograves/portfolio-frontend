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
            className="relative w-full h-72 flex items-center justify-center"
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
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-white/10 bg-gray-900 shadow-2xl z-10 group">

                    {/* ✅ YOUR SQUARE IMAGE GOES HERE */}
                    {/* 'object-cover' ensures it fills the circle perfectly without stretching */}
                    {/* Using profile2.jpg as found in the directory */}
                    <img
                        src="/profile2.jpg"
                        alt="Kanishk Singh"
                        className="w-full h-full object-cover object-top transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                    />

                    {/* Digital Noise Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

                    {/* Blue Tint (Disappears on Hover) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                </div>

                {/* Floating Status Chip */}
                <motion.div
                    className="absolute -right-6 bottom-4 bg-gray-900/90 border border-green-500/30 px-3 py-1.5 rounded text-xs font-mono text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-center gap-2 z-20 backdrop-blur-md"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    ONLINE
                </motion.div>

            </motion.div>
        </motion.div>
    );
};

export default HeroAvatar;
