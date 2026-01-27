import React from 'react';
import { motion } from 'framer-motion';
import { effects, animations, cx } from '../theme';

/**
 * Design System Button Component
 * Enforces consistent button styling
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {'primary'|'secondary'} props.variant - Button style variant
 * @param {string} props.className - Additional classes
 * @param {function} props.onClick - Click handler
 */
const DSButton = ({
    children,
    variant = 'primary',
    className = '',
    onClick,
    ...props
}) => {
    const baseClasses = cx(
        'px-5 py-2.5',
        'text-sm font-medium font-mono',
        effects.rounded.button,
        effects.transition.all,
        'cursor-pointer',
        effects.shadow.neo,
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2'
    );

    const variantClasses = {
        primary: cx(
            'bg-primary-600 dark:bg-primary-500',
            'text-white dark:text-gray-900',
            'hover:bg-primary-700 dark:hover:bg-primary-400'
        ),
        secondary: cx(
            'border-2 border-primary-600 dark:border-primary-500',
            'text-primary-600 dark:text-primary-500',
            'hover:bg-primary-50 dark:hover:bg-gray-900'
        )
    };

    const Component = props.href ? motion.a : motion.button;

    return (
        <Component
            className={cx(baseClasses, variantClasses[variant], className)}
            onClick={onClick}
            whileHover={animations.hover.scale}
            whileTap={animations.hover.tap}
            {...props}
        >
            {children}
        </Component>
    );
};

export default DSButton;
