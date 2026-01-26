import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const ProductDemo = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 20], [0, 1]);
    const slideUp = spring({ frame, fps, from: 100, to: 0 });

    const cursorX = interpolate(frame, [40, 70, 100], [200, 400, 400], { extrapolateRight: 'clamp' });
    const cursorY = interpolate(frame, [40, 70, 100], [500, 300, 300], { extrapolateRight: 'clamp' });
    const clickScale = spring({ frame: frame - 70, fps, from: 1, to: 0.8, config: { stiffness: 200 } });
    const clickReset = spring({ frame: frame - 75, fps, from: 0.8, to: 1, config: { stiffness: 200 } });

    const scale = frame > 70 && frame < 75 ? clickScale : (frame >= 75 ? clickReset : 1);

    return (
        <AbsoluteFill style={{ backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ opacity, transform: `translateY(${slideUp}px)`, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Mockup Mobile Phone */}
                <div style={{
                    width: 360,
                    height: 640,
                    border: '12px solid #374151',
                    borderRadius: 30,
                    backgroundColor: '#1f2937',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    {/* Header */}
                    <div style={{ height: 60, backgroundColor: '#374151', display: 'flex', alignItems: 'center', paddingLeft: 20 }}>
                        <div style={{ width: 100, height: 10, backgroundColor: '#6b7280', borderRadius: 5 }}></div>
                    </div>

                    {/* Content Items */}
                    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 15 }}>
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} style={{
                                height: 80,
                                backgroundColor: '#374151',
                                borderRadius: 10,
                                transform: `translateX(${interpolate(frame, [20 + i * 5, 40 + i * 5], [-50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                                opacity: interpolate(frame, [20 + i * 5, 40 + i * 5], [0, 1])
                            }} />
                        ))}
                    </div>

                    {/* Button */}
                    <div style={{
                        position: 'absolute',
                        bottom: 40,
                        left: 40,
                        right: 40,
                        height: 50,
                        backgroundColor: '#3b82f6',
                        borderRadius: 25,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        transform: `scale(${frame > 70 && frame < 80 ? 0.95 : 1})`
                    }}>
                        GET STARTED
                    </div>

                    {/* Cursor */}
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        border: '2px solid white',
                        transform: `translate(${cursorX - 180}px, ${cursorY - 320}px) scale(${scale})`, // Adjust coord system approx
                        zIndex: 100
                    }} />

                </div>
            </div>
            <h2 style={{ position: 'absolute', bottom: 50, color: 'white', fontFamily: 'sans-serif', opacity }}>
                Intuitive Mobile Experience
            </h2>
        </AbsoluteFill>
    );
};

export default ProductDemo;
