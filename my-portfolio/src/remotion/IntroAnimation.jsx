import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import React from 'react';

export const IntroAnimation = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        fps,
        frame,
        config: {
            damping: 200,
        },
    });

    const opacity = spring({
        fps,
        frame: frame - 20,
        config: {
            damping: 200,
        },
    });

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                fontSize: 80,
                fontWeight: 'bold',
            }}
        >
            <div style={{ transform: `scale(${scale})` }}>
                Hello
            </div>
            <div style={{ opacity, fontSize: 40, marginTop: 20 }}>
                Welcome to my portfolio
            </div>
        </AbsoluteFill>
    );
};
