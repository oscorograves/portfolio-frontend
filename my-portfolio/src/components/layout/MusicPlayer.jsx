import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Pause } from 'lucide-react';

const MusicPlayer = ({ t }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Track Info
    const trackInfo = {
        title: "Portfolio Mix",
        artist: "Kanishk Singh",
        artwork: "/crane_logo.jpeg" // Using existing logo as artwork or could be profile
    };

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio("/song.mp3");
        audioRef.current.loop = true;

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Playback failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        // Restart track for "next" since it's a single mix
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            if (!isPlaying) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const prevTrack = () => {
        // Restart track for "prev"
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            if (!isPlaying) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 120 }}
            className="fixed bottom-4 right-4 md:right-6 z-50"
        >
            {/* Custom Visual Player */}
            <div className="bg-gray-800/90 dark:bg-gray-900/50 backdrop-blur-lg text-white border border-white/10 rounded-full px-3 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-4">

                {/* Song Info */}
                <div className="flex items-center gap-3 overflow-hidden max-w-[150px] md:max-w-[200px]">
                    {/* Artwork / Vinyl Animation */}
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center overflow-hidden border border-white/10 ${isPlaying ? 'animate-spin-slow' : ''}`}>
                        {/* Using crane logo as fallback artwork if available, else standard div */}
                        <img src={trackInfo.artwork} alt="Art" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex flex-col min-w-0">
                        {/* Scroll text if too long? For now truncate */}
                        <span className="text-xs font-bold truncate" title={trackInfo.title}>
                            {trackInfo.title}
                        </span>
                        <span className="text-[10px] text-gray-400 truncate">
                            {trackInfo.artist}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={prevTrack}
                        className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                    >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>

                    <button
                        onClick={togglePlay}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform focus:outline-none"
                    >
                        {isPlaying ? (
                            <div className="flex gap-1">
                                <div className="w-1 h-3 bg-black rounded-full"></div>
                                <div className="w-1 h-3 bg-black rounded-full"></div>
                            </div>
                        ) : (
                            <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                        )}
                    </button>

                    <button
                        onClick={nextTrack}
                        className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </motion.div>
    );
};

export default MusicPlayer;
