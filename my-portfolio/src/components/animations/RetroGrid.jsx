import React, { useEffect, useRef } from 'react';

const RetroGrid = ({ isDarkMode }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        // Grid parameters
        let offset = 0;
        const speed = 1;
        const gridSize = 40; // Base grid size

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Set colors
            // Light Mode: Subtle Blue-Gray | Dark Mode: Retro Amber
            const color = isDarkMode ? 'rgba(245, 158, 11, 0.4)' : 'rgba(100, 116, 139, 0.3)'; // Amber-500 or Slate-500
            const glowColor = isDarkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(100, 116, 139, 0.05)';

            ctx.strokeStyle = color;
            ctx.lineWidth = 1;

            // Horizon line (roughly 1/3 down or center)
            const horizonY = height * 0.4;
            const maxDist = height - horizonY;

            // Draw vertical perspective lines
            const centerX = width / 2;
            const fov = 300; // Field of view

            // Number of vertical lines
            const vLines = 40;

            for (let i = -vLines; i <= vLines; i++) {
                // Calculate x position at bottom
                const xBase = centerX + (i * gridSize * 10);

                ctx.beginPath();
                ctx.moveTo(centerX + i * 20, horizonY); // Converge at horizon
                ctx.lineTo(xBase, height);
                ctx.stroke();
            }

            // Draw horizontal moving lines
            offset = (offset + speed) % gridSize;

            // We draw lines from horizon to bottom
            // The spacing needs to increase exponentially to simulate perspective
            for (let i = 0; i < 20; i++) {
                // Perspective Z calculation
                const z = i * gridSize - offset + 10;
                if (z <= 0) continue;

                // Project Z to Y
                // Simple projection: y = horizonY + (scale / z)
                // Actually, linear stepping in 3D creates exponential stepping in 2D
                // Let's just use a power function for visual approximation or true 3D projection

                // True 3D loop
                // Camera height
                const camH = 100;
                // Distance to line on floor
                const dist = (gridSize * i) - offset + 10;
                if (dist < 1) continue;

                const projectedY = horizonY + (camH / dist) * 500; // 500 = focal length approx

                if (projectedY > height) break;
                if (projectedY < horizonY) continue;

                const alpha = 1 - (i / 15); // Fade out near horizon
                if (alpha <= 0) continue;

                ctx.strokeStyle = isDarkMode
                    ? `rgba(245, 158, 11, ${alpha})`
                    : `rgba(100, 116, 139, ${alpha})`;

                ctx.beginPath();
                ctx.moveTo(0, projectedY);
                ctx.lineTo(width, projectedY);
                ctx.stroke();
            }

            // Add a "Retro Sun" or Glow at horizon
            const grad = ctx.createLinearGradient(0, horizonY - 100, 0, horizonY + 100);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(0.5, glowColor);
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, horizonY - 100, width, 200);

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
            className="fixed inset-0 top-0 left-0 w-full h-full -z-20 pointer-events-none"
        />
    );
};

export default RetroGrid;
