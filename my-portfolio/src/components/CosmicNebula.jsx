import { motion } from "framer-motion";

const CosmicNebula = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* 1. Deep Indigo Blob (Top Left) */}
            <motion.div
                className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-indigo-900/20 dark:bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 2. Purple Mist (Bottom Right) */}
            <motion.div
                className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-purple-900/20 dark:bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen"
                animate={{
                    x: [0, -30, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

export default CosmicNebula;
