import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';

const MusicPlayer = ({ t }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const iframeRef = useRef(null);
    const widgetRef = useRef(null);

    // SoundCloud Playlist URL (Top 50 Global or similar popular chart)
    // Using a reliable Chart Playlist.
    const PLAYLIST_URL = "https://soundcloud.com/soundcloud-hustle/sets/top-50-soundcloud-play";

    useEffect(() => {
        // 1. Load the SoundCloud Widget API script
        const script = document.createElement('script');
        script.src = "https://w.soundcloud.com/player/api.js";
        script.async = true;

        script.onload = () => {
            // 2. Initialize Widget upon script load
            if (window.SC && iframeRef.current) {
                const widget = window.SC.Widget(iframeRef.current);
                widgetRef.current = widget;

                // 3. Bind Events
                widget.bind(window.SC.Widget.Events.READY, () => {
                    // console.log('SC Widget Ready');
                    widget.getSounds((sounds) => {
                        // console.log("Playlist loaded", sounds.length);
                    });
                });

                widget.bind(window.SC.Widget.Events.PLAY, () => {
                    setIsPlaying(true);
                    widget.getCurrentSound((sound) => {
                        if (sound) {
                            setCurrentTrack({
                                title: sound.title,
                                artist: sound.user.username,
                                artwork_url: sound.artwork_url ? sound.artwork_url.replace('-large', '-t500x500') : null // Get higher res
                            });
                        }
                    });
                });

                widget.bind(window.SC.Widget.Events.PAUSE, () => {
                    setIsPlaying(false);
                });

                widget.bind(window.SC.Widget.Events.FINISH, () => {
                    setIsPlaying(false);
                });
            }
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup: remove script if unmounted (rare for global player)
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const togglePlay = () => {
        if (widgetRef.current) {
            widgetRef.current.toggle();
        }
    };

    const nextTrack = () => {
        if (widgetRef.current) {
            widgetRef.current.next();
        }
    };

    const prevTrack = () => {
        if (widgetRef.current) {
            widgetRef.current.prev();
        }
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 120 }}
            className="fixed bottom-4 right-4 md:right-6 z-50"
        >
            {/* Hidden SoundCloud Iframe */}
            <iframe
                ref={iframeRef}
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(PLAYLIST_URL)}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                style={{ display: 'none' }} // Hide the default player
            ></iframe>

            {/* Custom Visual Player */}
            <div className="bg-gray-800/90 dark:bg-gray-900/50 backdrop-blur-lg text-white border border-white/10 rounded-full px-3 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-4">

                {/* Song Info */}
                <div className="flex items-center gap-3 overflow-hidden max-w-[150px] md:max-w-[200px]">
                    {/* Artwork / Vinyl Animation */}
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center overflow-hidden border border-white/10 ${isPlaying ? 'animate-spin-slow' : ''}`}>
                        {currentTrack?.artwork_url ? (
                            <img src={currentTrack.artwork_url} alt="Art" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                        )}
                    </div>

                    <div className="flex flex-col min-w-0">
                        {/* Scroll text if too long? For now truncate */}
                        <span className="text-xs font-bold truncate" title={currentTrack?.title || t('music.title')}>
                            {currentTrack?.title || t('music.title')}
                        </span>
                        <span className="text-[10px] text-gray-400 truncate">
                            {currentTrack?.artist || "SoundCloud Top 50"}
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
