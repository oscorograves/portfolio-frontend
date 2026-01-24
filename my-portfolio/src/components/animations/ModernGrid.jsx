import React, { useEffect, useRef } from 'react';

const ModernGrid = ({ isDarkMode }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        // Grid parameters
        const spacing = 40;
        const rows = Math.ceil(height / spacing);
        const cols = Math.ceil(width / spacing);

        let mouseX = -1000;
        let mouseY = -1000;

        const dots = [];
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                dots.push({
                    x: i * spacing,
                    y: j * spacing,
                    baseX: i * spacing,
                    baseY: j * spacing,
                    size: 1.5,
                });
            }
        }

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Color based on theme
            ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';

            dots.forEach(dot => {
                // Calculate distance from mouse
                const dx = mouseX - dot.baseX;
                const dy = mouseY - dot.baseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 200;

                // Ripple effect
                let offsetX = 0;
                let offsetY = 0;
                let scale = 1;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);

                    // Push points away slightly
                    const moveDistance = force * 20;
                    offsetX = Math.cos(angle) * moveDistance;
                    offsetY = Math.sin(angle) * moveDistance;

                    // Scale up slightly
                    scale = 1 + force;
                }

                // Draw dot
                ctx.beginPath();
                ctx.arc(dot.baseX - offsetX, dot.baseY - offsetY, dot.size * scale, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('mousemove', handleMouseMove);
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);

        // Start loop
        draw();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDarkMode]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    );
};

export default ModernGrid;
