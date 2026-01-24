import React, { useEffect, useRef } from 'react';

const AuraBackground = ({ isDarkMode }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let t = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Orb configuration
        const orbs = [
            { x: 0.2, y: 0.2, r: 0.4, color: isDarkMode ? [79, 70, 229] : [199, 210, 254], speed: 0.002, offset: 0 },   // Indigo
            { x: 0.8, y: 0.3, r: 0.35, color: isDarkMode ? [217, 70, 239] : [245, 208, 254], speed: 0.003, offset: 2 }, // Fuchsia
            { x: 0.5, y: 0.8, r: 0.5, color: isDarkMode ? [245, 158, 11] : [253, 230, 138], speed: 0.001, offset: 4 },  // Amber
            { x: 0.1, y: 0.9, r: 0.3, color: isDarkMode ? [14, 165, 233] : [186, 230, 253], speed: 0.0025, offset: 1 }, // Sky
        ];

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            t += 1;

            ctx.clearRect(0, 0, w, h);

            // Draw background base
            ctx.fillStyle = isDarkMode ? '#0f172a' : '#f8fafc'; // Slate-900 or Slate-50
            ctx.fillRect(0, 0, w, h);

            // Draw Orbs with blur
            orbs.forEach(orb => {
                const moveX = Math.sin(t * orb.speed + orb.offset) * 100;
                const moveY = Math.cos(t * orb.speed + orb.offset) * 100;

                const x = orb.x * w + moveX;
                const y = orb.y * h + moveY;
                const radius = orb.r * Math.min(w, h);

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                const [r, g, b] = orb.color;

                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.5)`); // Core
                gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.2)`); // Mid
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`); // Fade out

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // Overlay noise texture (optional, simulates "grain")
            // For performance, we skip generating distinct noise every frame, just blend colors.

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDarkMode]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 top-0 left-0 w-full h-full -z-20 pointer-events-none transition-opacity duration-1000"
            style={{ filter: 'blur(60px)' }} // Apply heavy blur for the "Aurora" mesh effect
        />
    );
};

export default AuraBackground;
