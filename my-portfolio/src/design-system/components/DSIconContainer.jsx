import React from 'react';
import { backgrounds, textColors, effects, cx } from '../theme';

/**
 * Design System Icon Container Component
 * Enforces consistent icon container styling
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Icon component (Phosphor icon)
 * @param {string} props.className - Additional classes
 */
const DSIconContainer = ({
    children,
    className = '',
    ...props
}) => {
    const classes = cx(
        'w-14 h-14',
        backgrounds.icon,
        effects.rounded.icon,
        'flex items-center justify-center',
        textColors.iconInverse,
        'mb-4 md:mb-6',
        className
    );

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};

export default DSIconContainer;
