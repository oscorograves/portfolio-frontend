import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import React from 'react';

const CranePath = ({ d, delay, color }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        fps,
        frame: frame - delay,
        config: { damping: 200 },
    });

    const opacity = interpolate(progress, [0, 1], [0, 1]);
    const scale = interpolate(progress, [0, 1], [0.8, 1]);
    const y = interpolate(progress, [0, 1], [20, 0]);

    return (
        <path
            d={d}
            fill={color}
            style={{
                opacity,
                transform: `scale(${scale}) translateY(${y}px)`,
                transformOrigin: 'center center',
            }}
        />
    );
};

export const HeroAnimation = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fade in background
    const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    // Text animations
    const titleEnter = spring({
        fps,
        frame: frame - 40,
        config: { damping: 200 },
    });

    const subtitleEnter = spring({
        fps,
        frame: frame - 60,
        config: { damping: 200 },
    });

    return (
        <AbsoluteFill style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <AbsoluteFill style={{ opacity: bgOpacity, background: 'linear-gradient(to bottom right, #f3f4f6, #fee2e2)' }} />

            {/* Animated Crane */}
            <div style={{ width: 200, height: 200, position: 'relative', marginBottom: 40 }}>
                <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
                    {/* Top Wing - Amber 600 */}
                    <CranePath d="M12 3L2 12h3l7-6 7 6h3L12 3z" delay={10} color="#d97706" />
                    {/* Left Fold - Amber 700 */}
                    <CranePath d="M12 3v10l-4 4-2-3 6-11z" delay={15} color="#b45309" />
                    {/* Right Fold - Amber 500 */}
                    <CranePath d="M12 3v10l4 4 2-3-6-11z" delay={15} color="#f59e0b" />
                    {/* Body - Amber 800 */}
                    <CranePath d="M12 13l-4 4h8l-4-4z" delay={20} color="#92400e" />
                </svg>
            </div>

            {/* Text */}
            <div style={{ textAlign: 'center', zIndex: 10 }}>
                <h1 style={{
                    fontFamily: 'sans-serif',
                    fontWeight: 800,
                    fontSize: 60,
                    color: '#1f2937',
                    opacity: titleEnter,
                    transform: `translateY(${interpolate(titleEnter, [0, 1], [50, 0])}px)`
                }}>
                    KANISHK SINGH
                </h1>
                <p style={{
                    fontFamily: 'monospace',
                    fontSize: 30,
                    color: '#d97706',
                    marginTop: 10,
                    opacity: subtitleEnter,
                    transform: `translateY(${interpolate(subtitleEnter, [0, 1], [30, 0])}px)`
                }}>
                    Performance Marketing
                </p>
            </div>
        </AbsoluteFill>
    );
};
