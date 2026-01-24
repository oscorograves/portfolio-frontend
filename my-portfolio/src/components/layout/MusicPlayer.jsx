import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';

const MusicPlayer = ({ t }) => {
    const [isPlaying, setIsPlaying] = useState(false); // Default false (browser policy)
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef(null);

    // Handle Play/Pause
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false));
            }
        }
    };

    // Attempt Autoplay on mount
    useEffect(() => {
        const playAudio = async () => {
            if (audioRef.current) {
                audioRef.current.volume = volume;
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    setIsPlaying(false);
                    // If autoplay fails, wait for user interaction
                    const enableAudio = async () => {
                        if (audioRef.current) {
                            try {
                                await audioRef.current.play();
                                setIsPlaying(true);
                                document.removeEventListener('click', enableAudio);
                                document.removeEventListener('keydown', enableAudio);
                            } catch (e) {
                                // Keep listening if it fails again (unlikely on interaction)
                            }
                        }
                    };
                    document.addEventListener('click', enableAudio);
                    document.addEventListener('keydown', enableAudio);
                }
            }
        };

        playAudio();
    }, []);

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 120 }}
            className="fixed bottom-4 right-4 md:right-6 z-50"
        >
            {/* The Audio Element (Hidden) */}
            <audio ref={audioRef} src="/song.mp3" loop autoPlay />

            {/* The Visual Player */}
            <div className="bg-gray-800/90 dark:bg-gray-900/50 backdrop-blur-lg text-white border border-white/10 rounded-full px-3 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-4">

                {/* Song Info */}
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
                        <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold truncate">{t('music.title')}</span>
                        <span className="text-[10px] text-gray-400 truncate">{t('music.artist')}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
                        <ChevronRight className="w-5 h-5 rotate-180" /> {/* Reuse Chevron as Prev */}
                    </button>

                    <button
                        onClick={togglePlay}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                    >
                        {isPlaying ? (
                            // Pause Icon (Manual primitive to avoid importing new icon)
                            <div className="flex gap-1">
                                <div className="w-1 h-3 bg-black rounded-full"></div>
                                <div className="w-1 h-3 bg-black rounded-full"></div>
                            </div>
                        ) : (
                            <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                        )}
                    </button>

                    <button className="text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
                        <ChevronRight className="w-5 h-5" /> {/* Next */}
                    </button>
                </div>

            </div>
        </motion.div>
    );
};

export default MusicPlayer;
