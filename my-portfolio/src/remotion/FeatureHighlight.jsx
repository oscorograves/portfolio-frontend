import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

const FeatureHighlight = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const items = [
        { title: "Analytics", color: "#3b82f6", grid: "col-span-2" },
        { title: "AI", color: "#8b5cf6", grid: "col-span-1" },
        { title: "Global", color: "#10b981", grid: "col-span-1" },
        { title: "Scale", color: "#f59e0b", grid: "col-span-2" },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: 'white', padding: 60 }}>
            <div className="grid grid-cols-3 gap-6 w-full h-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30, width: '100%', height: '100%' }}>
                {items.map((item, i) => {
                    const progress = spring({
                        frame: frame - (i * 10),
                        fps,
                        config: { stiffness: 100 }
                    });

                    return (
                        <div key={i} style={{
                            backgroundColor: item.color,
                            borderRadius: 30,
                            gridColumn: i === 0 || i === 3 ? 'span 2' : 'span 1',
                            transform: `scale(${progress})`,
                            opacity: progress,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 0, // Reset for child
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}>
                            <span style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'sans-serif' }}>{item.title}</span>
                        </div>
                    );
                })}
            </div>
            <div style={{
                position: 'absolute',
                bottom: 40,
                right: 60,
                fontSize: 24,
                fontFamily: 'sans-serif',
                color: '#9ca3af',
                fontWeight: 'bold'
            }}>
                FEATURE HIGHLIGHTS
            </div>
        </AbsoluteFill>
    );
};

export default FeatureHighlight;
