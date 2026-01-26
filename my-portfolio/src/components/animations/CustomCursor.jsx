import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = ({ isDarkMode }) => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [cursorVariant, setCursorVariant] = useState("default");
    const [cursorText, setCursorText] = useState("");

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const target = e.target;

            // Default reset
            let newVariant = "default";
            let newText = "";

            // Check for interactive elements
            const tagName = target.tagName.toLowerCase();
            const parentTagName = target.parentElement?.tagName.toLowerCase();

            // Buttons and Links
            if (tagName === 'button' || tagName === 'a' ||
                parentTagName === 'button' || parentTagName === 'a' ||
                target.closest('button') || target.closest('a') ||
                target.getAttribute('role') === 'button') {
                newVariant = "pointer";
            }
            // Inputs
            else if (tagName === 'input' || tagName === 'textarea') {
                newVariant = "text";
            }
            // Text selection - rough heuristic
            else if (['p', 'h1', 'h2', 'h3', 'h4', 'span', 'li'].includes(tagName)) {
                // Only if it's not a container-like span
                if (window.getSelection().toString().length > 0) {
                    newVariant = "text";
                } else if (target.style.cursor === 'text') {
                    newVariant = "text";
                }
            }

            // Custom data attributes for specific behaviors
            // data-cursor="icon" -> icon variant
            // data-cursor-text="View" -> text cursor with "View"
            if (target.dataset.cursor) {
                newVariant = target.dataset.cursor;
            }
            if (target.dataset.cursorText) {
                newVariant = "textWithContent";
                newText = target.dataset.cursorText;
            }
            // Also check closest parent for data attributes
            const closestData = target.closest('[data-cursor]');
            if (closestData && !target.dataset.cursor) {
                newVariant = closestData.dataset.cursor;
            }
            const closestText = target.closest('[data-cursor-text]');
            if (closestText && !target.dataset.cursorText) {
                newVariant = "textWithContent";
                newText = closestText.dataset.cursorText;
            }

            setCursorVariant(newVariant);
            setCursorText(newText);
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver); // Use capture?

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "transparent",
            borderWidth: "2px",
            borderColor: isDarkMode ? "#facc15" : "#d97706", // yellow-400 : amber-600
            mixBlendMode: "normal"
        },
        pointer: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            height: 48,
            width: 48,
            backgroundColor: isDarkMode ? "rgba(250, 204, 21, 0.2)" : "rgba(217, 119, 6, 0.2)",
            borderWidth: "1px",
            borderColor: isDarkMode ? "#facc15" : "#d97706",
            mixBlendMode: "normal"
        },
        text: {
            x: mousePosition.x - 2,
            y: mousePosition.y - 12,
            height: 24,
            width: 4,
            borderRadius: 0,
            backgroundColor: isDarkMode ? "#facc15" : "#d97706",
            borderWidth: "0px",
            mixBlendMode: "difference"
        },
        textWithContent: {
            x: mousePosition.x - 40, // offset
            y: mousePosition.y - 40,
            height: 80,
            width: 80,
            backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
            borderWidth: "0px",
            mixBlendMode: "normal",
        },
        icon: {
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            height: 40,
            width: 40,
            backgroundColor: isDarkMode ? "#facc15" : "#d97706",
            borderWidth: "0px",
            mixBlendMode: "difference" // Inverts color over icon
        }
    };

    const dotVariants = {
        default: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: 1,
            backgroundColor: isDarkMode ? "#facc15" : "#d97706",
        },
        pointer: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: 0 // Hide dot on pointer
        },
        text: {
            opacity: 0
        },
        textWithContent: {
            opacity: 0
        },
        icon: {
            opacity: 0
        }
    }

    return (
        <>
            {/* Main Ring/Shape */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] hidden md:flex items-center justify-center text-center overflow-hidden"
                variants={variants}
                animate={cursorVariant}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            >
                {cursorVariant === 'textWithContent' && (
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-black' : 'text-white'}`}>
                        {cursorText}
                    </span>
                )}
            </motion.div>

            {/* Center Dot (Independent) */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] hidden md:block" // Dot is above
                variants={dotVariants}
                animate={cursorVariant}
                transition={{ duration: 0.15 }} // Faster transition for dot
            />
        </>
    );
};

export default CustomCursor;
