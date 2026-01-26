import React from 'react';
import { typography, textColors, cx } from '../theme';

/**
 * Design System Text Component
 * Enforces consistent body text styling
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Text content
 * @param {'large'|'base'|'small'} props.size - Text size variant
 * @param {'body'|'bodyAlt'|'secondary'} props.color - Text color variant
 * @param {string} props.className - Additional classes
 * @param {string} props.as - HTML element (default: 'p')
 */
const DSText = ({
    children,
    size = 'base',
    color = 'body',
    className = '',
    as = 'p',
    ...props
}) => {
    const Element = as;

    const classes = cx(
        typography.body[size],
        textColors[color],
        className
    );

    return (
        <Element className={classes} {...props}>
            {children}
        </Element>
    );
};

export default DSText;
