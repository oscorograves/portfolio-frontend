import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

const FounderInterview = () => {
    const frame = useCurrentFrame();

    // Waveform simulation
    const bars = Array(20).fill(0).map((_, i) => {
        const speed = (i + 1) * 0.5;
        const height = interpolate(Math.sin(frame / 5 + i), [-1, 1], [20, 100]);
        return height;
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#fffbe6', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #d97706',
                marginBottom: 40,
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}>
                <img
                    src="https://via.placeholder.com/200"
                    alt="Founder"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center', height: 120 }}>
                {bars.map((h, i) => (
                    <div key={i} style={{
                        width: 10,
                        height: h,
                        backgroundColor: '#d97706',
                        borderRadius: 5
                    }} />
                ))}
            </div>

            <div style={{
                marginTop: 40,
                backgroundColor: 'white',
                padding: '20px 40px',
                borderRadius: 20,
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                maxWidth: '80%',
                textAlign: 'center'
            }}>
                <p style={{ fontSize: 24, fontFamily: 'sans-serif', color: '#4b5563' }}>
                    "The key to growth is understanding <span style={{ color: '#d97706', fontWeight: 'bold' }}>human behavior</span>, not just metrics."
                </p>
            </div>
            <p style={{ marginTop: 20, fontSize: 18, color: '#9ca3af', fontWeight: 'bold' }}>FOUNDER STORIES • EP. 42</p>
        </AbsoluteFill>
    );
};

export default FounderInterview;
