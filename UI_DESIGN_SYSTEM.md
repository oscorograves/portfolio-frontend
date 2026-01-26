# Portfolio UI Design System & Rulebook

> **Version:** 1.0  
> **Last Updated:** January 26, 2026  
> **Theme:** Industrial/Heat Aesthetic with Retro-Modern Elements

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components & Effects](#components--effects)
6. [Icons](#icons)
7. [Animations & Motion](#animations--motion)
8. [Interactive States](#interactive-states)
9. [Dark Mode Strategy](#dark-mode-strategy)
10. [Custom Cursor](#custom-cursor)

---

## Design Philosophy

### Core Principles
1. **Industrial Warmth**: Bold oranges and reds contrast with cool grays for a mature, professional look
2. **Retro-Modern Fusion**: Pixelated SVG rendering + modern glassmorphism
3. **Functional Aesthetics**: Every visual element serves a purpose
4. **Accessibility First**: High contrast ratios, clear hierarchy, readable fonts
5. **Performance**: Lightweight animations, optimized effects

### Visual Language
- **Clean & Bold**: Strong outlines, clear boundaries
- **Layered Depth**: Backdrop blur, outline offsets, subtle shadows
- **Warm Accents**: Amber/Orange primary with red accents
- **Monospace Typography**: Technical, honest, direct communication

---

## Color Palette

### Primary Colors (Orange/Amber Spectrum)
**Use:** Primary CTAs, highlights, brand identity

| Shade | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| 50  | `#fff7ed` | - | Background tints |
| 100 | `#ffedd5` | - | Subtle backgrounds |
| 200 | `#fed7aa` | - | Hover backgrounds |
| 400 | `#fb923c` | `#fb923c` | Secondary highlights |
| 500 | `#f97316` | `#f97316` | Primary brand (dark mode primary) |
| **600** | `#ea580c` | - | **Primary brand (light mode)** |
| 700 | `#c2410c` | - | Pressed states |
| 800 | `#9a3412` | - | Deep accents |

### Secondary Colors (Slate/Steel Spectrum)
**Use:** Neutral surfaces, backgrounds, borders

| Shade | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| 50  | `#f8fafc` | - | Light backgrounds |
| 100 | `#f1f5f9` | - | Card backgrounds |
| 200 | `#e2e8f0` | - | Borders (light) |
| 300 | `#cbd5e1` | - | Dividers |
| 600 | `#475569` | - | Secondary text |
| 700 | `#334155` | `#334155` | Body text (both) |
| 800 | `#1e293b` | `#1e293b` | Dark surfaces |
| 900 | `#0f172a` | `#0f172a` | Dark backgrounds |

### Accent Colors (Red Spectrum)
**Use:** Warnings, errors, critical highlights

| Shade | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| 400 | `#f87171` | - | Soft warnings |
| 500 | `#ef4444` | - | Alerts |
| **600** | `#dc2626` | `#dc2626` | **Accent brand** |
| 700 | `#b91c1c` | - | Error states |

### Grayscale (Base Palette)
**Use:** Text, borders, backgrounds

| Shade | Hex | Light Mode Use | Dark Mode Use |
|-------|-----|----------------|---------------|
| 50  | `#f9fafb` | Page backgrounds | - |
| 100 | `#f3f4f6` | Section backgrounds | - |
| 200 | `#e5e7eb` | Borders | - |
| 300 | `#d1d5db` | Dividers, borders | - |
| 400 | `#9ca3af` | Disabled text | - |
| 600 | `#4b5563` | Secondary text | Secondary text |
| 700 | `#374151` | - | - |
| 800 | `#1f2937` | - | Card backgrounds |
| 900 | `#111827` | Headings, body | Surface backgrounds |
| 950 | `#030712` | - | Deep backgrounds |

### Special Colors

#### Yellow Highlights (Dark Mode Only)
- **yellow-400**: `#facc15` - Primary highlights, cursor dot, section borders (dark mode)

### Color Usage Rules

#### Text Colors
```css
/* Light Mode */
- Headings: text-gray-900
- Body: text-gray-600 / text-gray-700
- Secondary: text-gray-500
- Disabled: text-gray-400

/* Dark Mode */
- Headings: dark:text-white / dark:text-gray-100
- Body: dark:text-gray-300 / dark:text-gray-400
- Secondary: dark:text-gray-500
- Disabled: dark:text-gray-600
```

#### Background Colors
```css
/* Light Mode */
- Page: bg-gray-50
- Cards: bg-white/40 (with backdrop-blur)
- Sections: bg-gray-100/50

/* Dark Mode */
- Page: dark:bg-gray-950 / dark:bg-gray-900
- Cards: dark:bg-gray-900/40 (with backdrop-blur)
- Sections: dark:bg-gray-800/60
```

#### Border Colors
```css
/* Light Mode */
- Standard: border-gray-300
- Subtle: border-gray-200
- Section dividers: border-gray-300
- Accent borders: border-amber-600

/* Dark Mode */
- Standard: dark:border-gray-800
- Subtle: dark:border-gray-700
- Section dividers: dark:border-gray-800
- Accent borders: dark:border-yellow-400
```

---

## Typography

### Font Families

#### Primary: VT323 (Display/Headings)
```css
font-family: 'VT323', monospace;
```
- **Use**: Large headings, hero text, display text
- **Weight**: 400 (only weight available)
- **Character**: Retro, pixelated, technical
- **Import**: `@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');`

#### Secondary: Space Mono (Body/Interface)
```css
font-family: 'Space Mono', monospace;
```
- **Use**: Body text, buttons, labels, code
- **Weights**: 400 (regular), 700 (bold)
- **Styles**: Normal, Italic
- **Character**: Technical, readable, modern monospace
- **Import**: `@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');`

### Type Scale

| Element | Size (rem/px) | Tailwind Class | Weight | Line Height |
|---------|---------------|----------------|--------|-------------|
| Hero H1 | 3rem / 48px → 3.75rem / 60px | `text-4xl md:text-5xl` | `font-bold` | Default |
| H1 | 2.25rem / 36px → 3.75rem / 60px | `text-4xl md:text-6xl` | `font-bold` | Default |
| H2 Section | 1.875rem / 30px → 3rem / 48px | `text-3xl md:text-5xl` | `font-bold` | Default |
| H2 Standard | 1.5rem / 24px | `text-2xl` | `font-bold` | Default |
| H3 | 1.875rem / 30px | `text-3xl` | `font-bold` | Default |
| H4 | 1.25rem / 20px → 1.5rem / 24px | `text-xl md:text-2xl` | `font-semibold` | Default |
| Subtitle | 1.25rem / 20px → 1.5rem / 24px | `text-xl md:text-2xl` | `font-light` | `leading-relaxed` |
| Card Title | 1.125rem / 18px | `text-lg` | `font-bold` | Default |
| Body Large | 1.125rem / 18px | `text-lg` | `font-normal` | `leading-relaxed` |
| Body | 1rem / 16px | `text-base` | `font-normal` | `leading-relaxed` |
| Body Small | 0.875rem / 14px | `text-sm` | `font-normal` | `leading-relaxed` |
| Label/Button | 0.875rem / 14px | `text-sm` | `font-medium` | Default |
| Caption | 0.75rem / 12px | `text-xs` | `font-normal` | Default |

### Font Weight Usage
- `font-light` (300): Subtitles, hero text
- `font-normal` (400): Body text, descriptions
- `font-medium` (500): Buttons, labels, secondary headings
- `font-semibold` (600): Subheadings (h4)
- `font-bold` (700): Headings (h1-h3), card titles

### Special Typography Utilities

```css
/* Applied globally to body */
@apply antialiased; /* Smooth font rendering */

/* SVG pixelation effect */
svg {
    shape-rendering: crispEdges; /* Pixelated/retro look */
    stroke-width: 1.5px;
}
```

---

## Spacing & Layout

### Container Widths
```css
max-w-6xl   /* 1152px - Standard content width */
max-w-7xl   /* 1280px - Wide sections */
```

### Padding Convention
```css
/* Section padding */
px-4 md:px-8      /* Horizontal: 16px → 32px */
py-12             /* Vertical: 48px */

/* Card padding */
p-6               /* 24px */
p-8               /* 32px */

/* Compact spacing */
px-5 py-2.5       /* Buttons: 20px / 10px */
```

### Grid Systems
```css
/* 3-column layout (Services, Philosophy cards) */
grid grid-cols-1 md:grid-cols-3 gap-6

/* 2-column with sidebar (Hero) */
grid lg:grid-cols-3 gap-8
/* Sidebar: lg:col-span-2 + sidebar column */

/* 4-column metrics (Featured work) */
grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8
```

### Spacing Scale (Common Patterns)
- `gap-3`: 12px (button groups)
- `gap-4`: 16px (compact grids)
- `gap-6`: 24px (standard card grids)
- `gap-8`: 32px (section spacing, wide layouts)
- `mb-2`: 8px (tight bottom margin)
- `mb-3`: 12px (standard bottom margin)
- `mb-4`: 16px (medium spacing)
- `mb-6`: 24px (section element spacing)
- `mb-8`: 32px (large element spacing)
- `mb-16`: 64px (section bottom spacing)
- `mb-32`: 128px (hero section spacing)

---

## Components & Effects

### Card Pattern (Standard)
```jsx
className="
  bg-white/40 dark:bg-gray-900/40          /* Glassmorphism bg */
  backdrop-blur-md                          /* Glass effect */
  border border-gray-300 dark:border-gray-800  /* Border */
  rounded-xl                                /* Rounded corners */
  p-6 md:p-8                               /* Padding */
  hover:border-amber-600 dark:hover:border-yellow-400  /* Hover state */
  transition-all                            /* Smooth transitions */
  outline outline-2 outline-offset-4 outline-gray-900  /* Outer outline */
"
whileHover={{ y: -5 }}                      /* Lift on hover */
```

### Icon Container Pattern
```jsx
className="
  w-14 h-14                                /* Fixed size */
  bg-amber-600 dark:bg-yellow-400          /* Brand background */
  rounded-lg                               /* Rounded */
  flex items-center justify-center          /* Center icon */
  text-white dark:text-gray-900            /* Icon color */
  mb-4 md:mb-6                            /* Bottom margin */
"
```

### Button Pattern (Primary)
```jsx
className="
  px-5 py-2.5                              /* Padding */
  bg-primary-600 dark:bg-primary-500       /* Background */
  text-white dark:text-gray-900            /* Text color */
  text-sm font-medium                      /* Typography */
  rounded                                  /* Corners */
  hover:bg-primary-700 dark:hover:bg-primary-400  /* Hover */
  transition-all                           /* Smooth */
  cursor-pointer                           /* Cursor */
  font-mono                                /* Font family */
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]  /* Neobrutalist shadow */
"
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Button Pattern (Secondary/Outline)
```jsx
className="
  px-5 py-2.5
  border-2 border-primary-600 dark:border-primary-500
  text-primary-600 dark:text-primary-500
  text-sm font-medium
  rounded
  hover:bg-primary-50 dark:hover:bg-gray-900
  transition-all
  cursor-pointer
  font-mono
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
"
```

### Section Divider Pattern
```jsx
className="
  border-b border-gray-300 dark:border-gray-800
  transition-colors duration-300
"
```

### Section Header Pattern
```jsx
<h2 className="
  text-2xl font-bold
  text-gray-900 dark:text-white
  mb-6 pb-3
  border-b-2 border-amber-600 dark:border-yellow-400
">
  {title}
</h2>
```

### Effects Library

#### Glassmorphism
```css
bg-white/40 dark:bg-gray-900/40
backdrop-blur-md
border border-gray-300 dark:border-gray-800
```

#### Neobrutalist Shadow
```css
shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
```

#### Outline System (Cards)
```css
outline outline-2 outline-offset-4 outline-gray-900
```
- Creates clear boundaries
- Adds depth without traditional shadows
- Maintains clean industrial aesthetic

#### Border Radius Scale
- `rounded`: 4px (buttons)
- `rounded-lg`: 8px (icon containers, smaller elements)
- `rounded-xl`: 12px (cards)
- `rounded-2xl`: 16px (large cards - alternate pattern)
- `rounded-full`: 9999px (avatars, badges, cursor)

---

## Icons

### Icon Library: Phosphor React
**Version:** `phosphor-react`  
**Documentation:** https://phosphoricons.com/

### Icon Weights
- **`duotone`**: Primary weight used throughout (recommended)
- `regular`: Fallback for simple icons
- `bold`: Emphasis (rare)
- `light`: Not used
- `thin`: Not used

### Icon Sizes

| Context | Size Class | Pixels | Phosphor Size Prop |
|---------|-----------|--------|-------------------|
| Large icons (hero, cards) | `w-8 h-8` | 32×32 | `size={32}` |
| Standard icons | `w-6 h-6` | 24×24 | `size={24}` |
| Small icons (inline) | `w-5 h-5` | 20×20 | `size={20}` |
| Tiny icons | `w-4 h-4` | 16×16 | `size={16}` |

### Icon Color Pattern
```jsx
// In standalone context
className="text-amber-600 dark:text-yellow-400"

// In colored containers
className="text-white dark:text-gray-900"

// Interactive states
className="text-gray-400 group-hover:text-amber-600 dark:group-hover:text-yellow-400"
```

### Common Icons Used
- **Navigation**: `List`, `X`, `CaretRight`, `CaretDown`
- **Actions**: `DownloadSimple`, `Play`, `ArrowSquareOut`
- **Social**: `LinkedinLogo`, `InstagramLogo`, `GithubLogo`, `Envelope`, `Phone`
- **Business**: `Target`, `TrendUp`, `ChartLineUp`, `Briefcase`, `MapPin`
- **Content**: `Brain`, `PaintBrush`, `Funnel`, `Student`, `Rocket`
- **UI**: `Sun`, `Moon`, `Globe`, `Calendar`, `Medal`

### SVG Rendering Override
```css
/* Global CSS - Creates retro/pixelated look */
svg {
    shape-rendering: crispEdges;
    stroke-width: 1.5px;
}
```

---

## Animations & Motion

### Animation Library: Framer Motion
**Package:** `framer-motion`

### Standard Variants

#### Container Stagger
```jsx
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1  // Delay between children
        }
    }
};
```

#### Item Fade-Up
```jsx
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};
```

#### Spring Variants
```jsx
const springVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { 
            type: 'spring',
            stiffness: 100  // Bounciness
        }
    }
};
```

### Hover Animations

#### Lift Effect
```jsx
whileHover={{ y: -5 }}
```

#### Scale Effect
```jsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

#### Rotate Effect
```jsx
whileHover={{ scale: 1.1, rotate: 10 }}
transition={{ type: "spring", stiffness: 300 }}
```

#### Translation
```jsx
// Icon slide (arrows)
className="group-hover:translate-x-1 transition-all"
```

### Scroll Animations
```jsx
<motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
>
```

### Continuous Animations

#### Floating Effect
```jsx
animate={{ y: [0, 10, 0] }}
transition={{ repeat: Infinity, duration: 2 }}
```

#### Pulse Background Gradients
```jsx
<div 
  className="animate-pulse" 
  style={{ animationDuration: '8s' }}
/>
```

### Transition Timings
- **Duration**: 0.3s - 0.8s (most common: 0.5s)
- **Spring stiffness**: 100 - 500
- **Spring damping**: 28 (cursor animations)
- **Stagger delay**: 0.1s - 0.3s

### CSS Transitions
```css
transition-colors duration-300  /* Theme switches */
transition-all                  /* General purpose */
```

---

## Interactive States

### Hover States

#### Cards
```css
hover:border-amber-600 dark:hover:border-yellow-400
hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]  /* Enhanced shadow */
```

#### Buttons
```css
hover:bg-primary-700 dark:hover:bg-primary-400
hover:scale-1.05  /* Via Framer Motion */
```

#### Links
```css
hover:text-black dark:hover:text-white
```

#### Icons
```css
group-hover:text-amber-600 dark:group-hover:text-yellow-400
```

### Active/Pressed States
```jsx
whileTap={{ scale: 0.95 }}
```

### Focus States
```css
focus:outline-none
focus-visible:ring-2 focus-visible:ring-primary-600
focus-visible:ring-offset-2
```

### Disabled States
```css
opacity-50 cursor-not-allowed
```

---

## Dark Mode Strategy

### Implementation
```js
// Tailwind config
darkMode: 'class'

// Toggle via HTML class
document.documentElement.classList.add('dark');
document.documentElement.classList.remove('dark');
```

### Default Theme
**Dark Mode** - Set via `useState(true)` in App.jsx

### Color Switching Patterns

#### Text
```css
text-gray-900 dark:text-white
text-gray-600 dark:text-gray-300
```

#### Backgrounds
```css
bg-gray-50 dark:bg-gray-950
bg-white/40 dark:bg-gray-900/40
```

#### Borders
```css
border-gray-300 dark:border-gray-800
border-amber-600 dark:border-yellow-400
```

#### Brand Colors
```css
/* Primary switches between orange shades */
bg-primary-600 dark:bg-primary-500
text-primary-600 dark:text-primary-500

/* Amber → Yellow in dark mode */
bg-amber-600 dark:bg-yellow-400
border-amber-600 dark:border-yellow-400
text-amber-600 dark:text-yellow-400
```

### Special Dark Mode Handling

#### Gradient Text (Hero Name)
```css
/* Light: Solid color */
text-gray-900

/* Dark: Gradient */
dark:bg-clip-text dark:text-transparent
dark:bg-gradient-to-r dark:from-white dark:via-primary-400 dark:to-gray-200
```

---

## Custom Cursor

### Implementation
Custom cursor component using Framer Motion (Desktop only: `hidden xl:flex`)

### Cursor Variants

#### Default
- **Ring**: 32×32px, transparent, primary border (2px)
- **Dot**: 8×8px, yellow/amber filled
- **Spring**: stiffness 500, damping 28

#### Pointer (Buttons/Links)
- **Ring**: 48×48px, primary background (20% opacity), 1px border
- **Dot**: Hidden
- **Trigger**: Hover over `<a>`, `<button>`, `role="button"`

#### Text (Input Fields)
- **Bar**: 4×24px, primary color, vertical bar
- **Dot**: Hidden
- **Blend Mode**: `difference`
- **Trigger**: Hover over `<input>`, `<textarea>`

#### Grab (Featured Work)
- **Cursor**: `cursor-grab`, `active:cursor-grabbing`
- **Use**: Draggable/clickable cards

### Custom Data Attributes
```jsx
// Custom cursor style
data-cursor="icon"

// Custom cursor with text
data-cursor-text="View"
```

### Colors by Mode
```js
isDarkMode
  ? "#f97316" // primary-500
  : "#ea580c" // primary-600
```

---

## Responsive Breakpoints

| Breakpoint | Min Width | Tailwind Prefix | Usage |
|------------|-----------|-----------------|-------|
| Mobile | < 640px | (default) | Single column, compact |
| sm | 640px | `sm:` | Small tablets |
| md | 768px | `md:` | Tablets, 2-column grids |
| lg | 1024px | `lg:` | Desktop, 3-column layouts |
| xl | 1280px | `xl:` | Large desktop, custom cursor visible |
| 2xl | 1536px | `2xl:` | Extra large displays |

### Common Responsive Patterns
```css
/* Typography scaling */
text-4xl md:text-6xl

/* Padding scaling */
px-4 md:px-8

/* Grid columns */
grid-cols-1 md:grid-cols-3

/* Hide on mobile, show on desktop */
hidden xl:flex
```

---

## Component Checklist

When creating a new component, ensure:

- [ ] Uses correct color palette (primary, secondary, accent)
- [ ] Includes dark mode variants (`dark:`)
- [ ] Applies proper typography scale
- [ ] Has hover states defined
- [ ] Uses motion variants where appropriate
- [ ] Icons use `weight="duotone"` and correct size
- [ ] Borders use standard gray scale
- [ ] Outlines use `outline-gray-900` pattern
- [ ] Transitions are smooth (`transition-all` or framer motion)
- [ ] Responsive breakpoints applied (`md:`, `lg:`)
- [ ] Accessibility: focus states, semantic HTML
- [ ] Follows spacing convention (px-4/px-8, py-12, gap-6/gap-8)

---

## File Structure Reference

```
src/
├── components/
│   ├── animations/      # CustomCursor, FireflyBackground, etc.
│   ├── hero/           # HeroAvatar
│   ├── layout/         # NavBar, Footer
│   ├── sections/       # Hero, Services, FeaturedAchievement, etc.
│   ├── theme/          # ThemeToggle
│   └── ui/             # TypewriterText, PageWrapper, etc.
├── pages/              # Home, MyStory, Experience, etc.
├── index.css           # Global styles, font imports
└── App.jsx            # Main app, theme state
```

---

## Quick Reference: Common Class Combos

### Card
```css
bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-300 dark:border-gray-800 rounded-xl p-8 hover:border-amber-600 dark:hover:border-yellow-400 transition-all outline outline-2 outline-offset-4 outline-gray-900
```

### Section
```css
border-b border-gray-300 dark:border-gray-800 transition-colors duration-300
```

### Container
```css
max-w-6xl mx-auto px-8 py-12
```

### Heading
```css
text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-amber-600 dark:border-yellow-400
```

### Body Text
```css
text-base text-gray-600 dark:text-gray-400 leading-relaxed
```

---

**End of Design System Document**
