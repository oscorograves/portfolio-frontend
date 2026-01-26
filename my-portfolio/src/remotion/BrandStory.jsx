import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';

const BrandStory = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const zoom = interpolate(frame, [0, 300], [1, 1.2]);
    const textY = interpolate(frame, [0, 100], [50, 0], { extrapolateRight: 'clamp' });
    const textOpacity = interpolate(frame, [0, 30], [0, 1]);

    // Second scene
    const scene2Opacity = interpolate(frame, [120, 150], [0, 1]);

    return (
        <AbsoluteFill style={{ backgroundColor: 'black', color: 'white' }}>
            {/* Background Image Placeholder (Gradient for now) */}
            <AbsoluteFill style={{
                background: 'linear-gradient(45deg, #4f46e5, #9333ea)',
                transform: `scale(${zoom})`,
                opacity: 0.6
            }} />

            {/* Scene 1 */}
            <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: interpolate(frame, [120, 140], [1, 0]) }}>
                <h1 style={{
                    fontSize: 80,
                    fontWeight: 900,
                    fontFamily: 'serif',
                    transform: `translateY(${textY}px)`,
                    opacity: textOpacity,
                    textAlign: 'center'
                }}>
                    WE BUILD <br /> <span style={{ color: '#fbbf24' }}>LEGACIES</span>
                </h1>
            </AbsoluteFill>

            {/* Scene 2 */}
            <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: scene2Opacity }}>
                <h1 style={{
                    fontSize: 80,
                    fontWeight: 900,
                    fontFamily: 'serif',
                    textAlign: 'center'
                }}>
                    NOT JUST <br /> <span style={{ color: '#fbbf24' }}>CAMPAIGNS</span>
                </h1>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

export default BrandStory;
