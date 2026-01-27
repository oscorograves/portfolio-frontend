import React from 'react';
import { motion } from 'framer-motion';
import { backgrounds, borders, effects, animations, cx } from '../theme';

/**
 * Design System Card Component
 * Enforces consistent card styling across all pages
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional custom classes
 * @param {boolean} props.hover - Enable hover lift effect (default: true)
 * @param {boolean} props.clickable - Make card interactive (default: false)
 * @param {function} props.onClick - Click handler
 * @param {object} props.variants - Custom motion variants
 */
const DSCard = ({
    children,
    className = '',
    hover = true,
    clickable = false,
    onClick,
    variants = animations.variants.item,
    ...props
}) => {
    const baseClasses = cx(
        backgrounds.card,
        effects.glass,
        borders.standard,
        effects.rounded.card,
        'p-6 md:p-8',
        'hover:border-amber-600 dark:hover:border-yellow-400',
        effects.transition.all,
        effects.outline,
        clickable && 'cursor-pointer',
        className
    );

    const hoverAnimation = hover ? animations.hover.lift : {};

    return (
        <motion.div
            className={baseClasses}
            variants={variants}
            whileHover={hoverAnimation}
            onClick={onClick}
            data-cursor={clickable ? "pointer" : undefined}
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            onKeyDown={clickable ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.(e);
                }
            } : undefined}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default DSCard;
