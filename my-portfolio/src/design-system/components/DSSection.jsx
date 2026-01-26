import React from 'react';
import { motion } from 'framer-motion';
import { spacing, borders, animations, cx } from '../theme';

/**
 * Design System Section Component
 * Enforces consistent section layout and spacing
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Section content
 * @param {boolean} props.divider - Show top border divider (default: true)
 * @param {boolean} props.wide - Use wider max-width (default: false)
 * @param {string} props.className - Additional classes
 * @param {object} props.variants - Motion variants
 */
const DSSection = ({
    children,
    divider = true,
    wide = false,
    className = '',
    variants = animations.variants.container,
    ...props
}) => {
    const classes = cx(
        divider && borders.section,
        'transition-colors duration-300',
        className
    );

    const containerClasses = cx(
        wide ? spacing.section.maxWidthWide : spacing.section.maxWidth,
        'mx-auto',
        spacing.section.paddingX,
        spacing.section.paddingY
    );

    return (
        <section className={classes}>
            <motion.div
                className={containerClasses}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
                {...props}
            >
                {children}
            </motion.div>
        </section>
    );
};

export default DSSection;
