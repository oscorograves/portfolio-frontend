/**
 * Design System Theme Tokens
 * Central source of truth for all design values
 * Based on UI_DESIGN_SYSTEM.md
 */

export const colors = {
    primary: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
        950: '#431407',
    },
    secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
    },
    accent: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
        950: '#450a0a',
    }
};

export const spacing = {
    section: {
        paddingX: 'px-4 md:px-8',
        paddingY: 'py-12',
        maxWidth: 'max-w-6xl',
        maxWidthWide: 'max-w-7xl',
    },
    card: {
        padding: 'p-6 md:p-8',
        gap: 'gap-6',
    },
    grid: {
        gap: 'gap-6',
        gapWide: 'gap-8',
    }
};

export const typography = {
    heading: {
        hero: 'text-4xl md:text-5xl font-bold',
        h1: 'text-4xl md:text-6xl font-bold',
        h2Section: 'text-3xl md:text-5xl font-bold',
        h2: 'text-2xl font-bold',
        h3: 'text-3xl font-bold',
        h4: 'text-xl md:text-2xl font-semibold',
    },
    body: {
        large: 'text-lg leading-relaxed',
        base: 'text-base leading-relaxed',
        small: 'text-sm leading-relaxed',
    },
    label: {
        base: 'text-sm font-medium',
        caption: 'text-xs',
    }
};

export const effects = {
    glass: 'backdrop-blur-md',
    outline: 'outline outline-2 outline-offset-4 outline-gray-900',
    shadow: {
        neo: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
        neoHover: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    },
    transition: {
        all: 'transition-all',
        colors: 'transition-colors duration-300',
    },
    rounded: {
        button: 'rounded',
        card: 'rounded-xl',
        icon: 'rounded-lg',
        large: 'rounded-2xl',
    }
};

export const borders = {
    standard: 'border border-gray-300 dark:border-gray-800',
    section: 'border-b border-gray-300 dark:border-gray-800',
    accent: 'border-2 border-amber-600 dark:border-yellow-400',
};

export const backgrounds = {
    page: 'bg-gray-50 dark:bg-gray-950',
    card: 'bg-white/40 dark:bg-gray-900/40',
    section: 'bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/60 dark:to-gray-900/60',
    icon: 'bg-amber-600 dark:bg-yellow-400',
};

export const textColors = {
    heading: 'text-gray-900 dark:text-white',
    body: 'text-gray-600 dark:text-gray-300',
    bodyAlt: 'text-gray-600 dark:text-gray-400',
    secondary: 'text-gray-500 dark:text-gray-500',
    accent: 'text-amber-600 dark:text-yellow-400',
    iconInverse: 'text-white dark:text-gray-900',
};

export const animations = {
    variants: {
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
            }
        },
        item: {
            hidden: { opacity: 0, y: 20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
            }
        },
        spring: {
            hidden: { opacity: 0, y: 30 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 100 }
            }
        }
    },
    hover: {
        lift: { y: -5 },
        scale: { scale: 1.05 },
        tap: { scale: 0.95 },
    }
};

export const iconSizes = {
    large: 32,
    medium: 24,
    small: 20,
    tiny: 16,
};

// Helper function to combine classes
export const cx = (...classes) => classes.filter(Boolean).join(' ');
