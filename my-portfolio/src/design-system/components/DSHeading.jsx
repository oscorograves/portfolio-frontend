import React from 'react';
import { typography, textColors, cx } from '../theme';

/**
 * Design System Heading Component
 * Enforces consistent heading typography
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Heading text
 * @param {'hero'|'h1'|'h2Section'|'h2'|'h3'|'h4'} props.level - Heading level
 * @param {boolean} props.accent - Show accent border (h2 only)
 * @param {string} props.className - Additional classes
 * @param {string} props.as - HTML element to render (default: auto based on level)
 */
const DSHeading = ({
    children,
    level = 'h2',
    accent = false,
    className = '',
    as,
    ...props
}) => {
    const elementMap = {
        hero: 'h1',
        h1: 'h1',
        h2Section: 'h2',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
    };

    const Element = as || elementMap[level] || 'h2';

    const baseClasses = cx(
        typography.heading[level],
        textColors.heading
    );

    const accentClasses = accent && level === 'h2'
        ? 'mb-6 pb-3 border-b-2 border-amber-600 dark:border-yellow-400'
        : '';

    return (
        <Element
            className={cx(baseClasses, accentClasses, className)}
            {...props}
        >
            {children}
        </Element>
    );
};

export default DSHeading;
