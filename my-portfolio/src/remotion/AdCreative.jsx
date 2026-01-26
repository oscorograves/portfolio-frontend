import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const AdCreative = ({ goal = "Lead Gen", ctr = "3.2%", cpl = "$15", themeColor = "#d97706" }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animations
    const titleOpacity = spring({ frame, fps, to: 1, config: { stiffness: 100 } });
    const titleScale = spring({ frame, fps, to: 1, from: 0.5, config: { stiffness: 100 } });

    const metricsEnter = spring({ frame: frame - 30, fps, config: { damping: 10 } });

    // Rotating background
    const rotation = interpolate(frame, [0, 300], [0, 360]);

    return (
        <AbsoluteFill style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            {/* Animated Background Shapes */}
            <div style={{
                position: 'absolute',
                width: '150%',
                height: '150%',
                background: `conic-gradient(from 0deg, ${themeColor}22, white, ${themeColor}22)`,
                transform: `rotate(${rotation}deg)`,
                zIndex: 0
            }} />

            {/* Main Title */}
            <div style={{
                zIndex: 1,
                opacity: titleOpacity,
                transform: `scale(${titleScale})`,
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: 80,
                    fontWeight: 'bold',
                    color: '#1f2937',
                    fontFamily: 'sans-serif',
                    marginBottom: 20
                }}>
                    {goal.toUpperCase()}
                </h1>
                <div style={{ width: 100, height: 8, backgroundColor: themeColor, margin: '0 auto', borderRadius: 4 }} />
            </div>

            {/* Metrics Cards */}
            <div style={{
                zIndex: 1,
                display: 'flex',
                gap: 40,
                marginTop: 60,
                opacity: frame > 30 ? metricsEnter : 0,
                transform: `translateY(${(1 - metricsEnter) * 50}px)`
            }}>
                <MetricCard label="CTR" value={ctr} color={themeColor} />
                <MetricCard label="CPL" value={cpl} color={themeColor} />
            </div>
        </AbsoluteFill>
    );
};

const MetricCard = ({ label, value, color }) => (
    <div style={{
        backgroundColor: 'white',
        padding: '20px 40px',
        borderRadius: 16,
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: `2px solid ${color}44`
    }}>
        <span style={{ fontSize: 24, color: '#6b7280', fontWeight: '600' }}>{label}</span>
        <span style={{ fontSize: 48, color: color, fontWeight: 'bold' }}>{value}</span>
    </div>
);

export default AdCreative;
