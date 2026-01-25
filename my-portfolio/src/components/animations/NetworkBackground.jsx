import React, { useEffect, useRef } from 'react';

const NetworkBackground = ({ isDarkMode }) => {
    const canvasRef = useRef(null);
    const nodesRef = useRef([]);
    const mouseRef = useRef({ x: null, y: null });
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Set canvas size
        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        resizeCanvas();

        // Initialize nodes
        const initNodes = () => {
            const nodeCount = Math.min(Math.floor((width * height) / 15000), 80);
            nodesRef.current = Array.from({ length: nodeCount }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3, // Slow drift
                vy: (Math.random() - 0.5) * 0.3,
            }));
        };
        initNodes();

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            const nodes = nodesRef.current;
            const mouse = mouseRef.current;

            // Update node positions (ambient drift)
            nodes.forEach((node) => {
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Keep within bounds
                node.x = Math.max(0, Math.min(width, node.x));
                node.y = Math.max(0, Math.min(height, node.y));
            });

            // Draw connections (edges)
            const connectionDistance = 150;
            const mouseProximity = 200;

            nodes.forEach((nodeA, i) => {
                nodes.slice(i + 1).forEach((nodeB) => {
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        // Check if near mouse
                        let opacity = 0.1;
                        let lineWidth = 0.5;

                        if (mouse.x !== null && mouse.y !== null) {
                            const distToMouseA = Math.sqrt(
                                Math.pow(nodeA.x - mouse.x, 2) + Math.pow(nodeA.y - mouse.y, 2)
                            );
                            const distToMouseB = Math.sqrt(
                                Math.pow(nodeB.x - mouse.x, 2) + Math.pow(nodeB.y - mouse.y, 2)
                            );

                            if (distToMouseA < mouseProximity || distToMouseB < mouseProximity) {
                                opacity = 0.25;
                                lineWidth = 1;
                            }
                        }

                        // Fade based on distance
                        opacity *= 1 - distance / connectionDistance;

                        ctx.beginPath();
                        ctx.strokeStyle = isDarkMode
                            ? `rgba(148, 163, 184, ${opacity})` // slate-400
                            : `rgba(239, 68, 68, ${opacity})`; // red-500
                        ctx.lineWidth = lineWidth;
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        ctx.stroke();
                    }
                });
            });

            // Draw nodes
            nodes.forEach((node) => {
                let nodeOpacity = 0.15;
                let nodeRadius = 2;

                // Highlight nodes near mouse
                if (mouse.x !== null && mouse.y !== null) {
                    const distToMouse = Math.sqrt(
                        Math.pow(node.x - mouse.x, 2) + Math.pow(node.y - mouse.y, 2)
                    );
                    if (distToMouse < mouseProximity) {
                        nodeOpacity = 0.4;
                        nodeRadius = 3;
                    }
                }

                ctx.beginPath();
                ctx.fillStyle = isDarkMode
                    ? `rgba(148, 163, 184, ${nodeOpacity})` // slate-400
                    : `rgba(239, 68, 68, ${nodeOpacity})`; // red-500
                ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        // Event listeners
        window.addEventListener('resize', () => {
            resizeCanvas();
            initNodes();
        });
        window.addEventListener('mousemove', handleMouseMove);

        // Start animation
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isDarkMode]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
};

export default NetworkBackground;
