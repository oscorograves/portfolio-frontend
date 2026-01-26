# Design System Application

This design system automatically enforces the UI rulebook defined in `UI_DESIGN_SYSTEM.md`. All new pages and components should use these pre-built components to maintain consistency.

## Quick Start

### Creating a New Page

1. **Copy the template:**
   ```bash
   cp src/design-system/templates/PageTemplate.jsx src/pages/YourNewPage.jsx
   ```

2. **Import design system components:**
   ```jsx
   import { 
     DSSection, 
     DSHeading, 
     DSCard, 
     DSText, 
     DSButton,
     DSIconContainer 
   } from '../design-system/components';
   ```

3. **Use the components:**
   - The template already follows all design system rules
   - Replace example content with your content
   - Keep the structure and component usage patterns

## Available Components

### Core Components

#### `<DSSection>`
Standard page section with proper spacing and container width.

```jsx
<DSSection divider={true} wide={false}>
  {/* content */}
</DSSection>
```

**Props:**
- `divider` (boolean): Show bottom border (default: true)
- `wide` (boolean): Use wider max-width (default: false)
- `className` (string): Additional classes
- `variants` (object): Custom motion variants

---

#### `<DSHeading>`
Enforces typography scale and heading styles.

```jsx
<DSHeading level="h2" accent>
  Section Title
</DSHeading>
```

**Props:**
- `level`: 'hero' | 'h1' | 'h2Section' | 'h2' | 'h3' | 'h4'
- `accent` (boolean): Show amber border (h2 only)
- `className` (string): Additional classes
- `as` (string): Override HTML element

**Levels:**
- `hero`: 48-60px, for hero sections
- `h1`: 36-60px, page titles
- `h2Section`: 30-48px, major sections
- `h2`: 24px, standard section headers
- `h3`: 30px, subsections
- `h4`: 20-24px, card titles

---

#### `<DSCard>`
Standard card with glassmorphism and hover effects.

```jsx
<DSCard hover={true} clickable={false} onClick={handleClick}>
  {/* content */}
</DSCard>
```

**Props:**
- `hover` (boolean): Enable lift animation (default: true)
- `clickable` (boolean): Show cursor pointer (default: false)
- `onClick` (function): Click handler
- `className` (string): Additional classes
- `variants` (object): Custom motion variants

**Automatically includes:**
- Glassmorphism background
- Border with hover color change
- Outline offset effect
- Backdrop blur
- Padding (responsive)

---

#### `<DSButton>`
Buttons with primary and secondary variants.

```jsx
<DSButton variant="primary" onClick={handleClick}>
  Click Me
</DSButton>
```

**Props:**
- `variant`: 'primary' | 'secondary'
- `onClick` (function): Click handler
- `className` (string): Additional classes

**Variants:**
- `primary`: Filled amber button
- `secondary`: Outlined button

**Automatically includes:**
- Neobrutalist shadow
- Hover/tap animations
- Focus ring
- Monospace font

---

#### `<DSText>`
Body text with size and color variants.

```jsx
<DSText size="base" color="body">
  Your text content
</DSText>
```

**Props:**
- `size`: 'large' | 'base' | 'small'
- `color`: 'body' | 'bodyAlt' | 'secondary'
- `className` (string): Additional classes
- `as` (string): HTML element (default: 'p')

**Sizes:**
- `large`: 18px
- `base`: 16px
- `small`: 14px

---

#### `<DSIconContainer>`
Standard icon container with brand background.

```jsx
import { Target } from 'phosphor-react';

<DSIconContainer>
  <Target size={32} weight="duotone" />
</DSIconContainer>
```

**Props:**
- `className` (string): Additional classes

**Automatically includes:**
- 56×56px container
- Amber/yellow background (theme aware)
- Rounded corners
- Centered icon
- White/dark text color

---

## Theme Tokens

Import theme tokens for custom styling when needed:

```jsx
import { 
  colors, 
  spacing, 
  typography, 
  effects, 
  backgrounds,
  textColors,
  animations,
  cx  // class combiner utility
} from '../design-system/theme';
```

### Example Usage:

```jsx
// Using theme tokens
<div className={cx(
  backgrounds.card,
  effects.glass,
  borders.standard,
  'p-8'
)}>
  Content
</div>

// Using animation variants
<motion.div
  variants={animations.variants.item}
  whileHover={animations.hover.lift}
>
  Content
</motion.div>
```

## Icons

**Library:** `phosphor-react`

**Rules:**
1. Always use `weight="duotone"`
2. Standard sizes: 32px (cards), 24px (UI), 20px (inline)
3. Always wrap in `<DSIconContainer>` for cards

```jsx
import { Target, Brain, Rocket } from 'phosphor-react';

<DSIconContainer>
  <Target size={32} weight="duotone" />
</DSIconContainer>
```

## Grid Layouts

Use standard Tailwind grid classes:

```jsx
// 3-column grid (responsive)
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <DSCard>...</DSCard>
  <DSCard>...</DSCard>
  <DSCard>...</DSCard>
</div>

// 4-column grid (responsive)
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
  {/* cards */}
</div>
```

## Animations

### Standard Pattern:

```jsx
import { motion } from 'framer-motion';
import { animations } from '../design-system/theme';

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={animations.variants.container}
>
  <motion.div variants={animations.variants.item}>
    {/* item 1 */}
  </motion.div>
  <motion.div variants={animations.variants.item}>
    {/* item 2 - staggered */}
  </motion.div>
</motion.div>
```

### Available Variants:
- `animations.variants.container` - Stagger children
- `animations.variants.item` - Fade up
- `animations.variants.spring` - Bouncy fade up

### Hover Effects:
- `animations.hover.lift` - Lift by 5px
- `animations.hover.scale` - Scale to 1.05
- `animations.hover.tap` - Scale to 0.95

## Best Practices

### ✅ DO:
- Use design system components for all new pages
- Import icons from `phosphor-react` with `weight="duotone"`
- Use theme tokens for consistent spacing/colors
- Wrap icon-card content with `DSIconContainer`
- Use `DSSection` for page sections
- Apply responsive classes (`md:`, `lg:`)

### ❌ DON'T:
- Create custom cards without using `DSCard`
- Use arbitrary colors (use theme tokens)
- Hardcode spacing values
- Use icon weights other than `duotone`
- Skip the `DSSection` wrapper
- Mix custom buttons with `DSButton`

## File Structure

```
design-system/
├── theme.js                    # Theme tokens (colors, spacing, etc.)
├── components/
│   ├── DSCard.jsx             # Card component
│   ├── DSButton.jsx           # Button component
│   ├── DSSection.jsx          # Section wrapper
│   ├── DSHeading.jsx          # Heading component
│   ├── DSIconContainer.jsx    # Icon container
│   ├── DSText.jsx             # Text component
│   └── index.js               # Barrel exports
├── templates/
│   └── PageTemplate.jsx       # New page template
└── README.md                   # This file
```

## Example: Complete Page

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Brain, Rocket } from 'phosphor-react';
import { 
  DSSection, 
  DSHeading, 
  DSCard, 
  DSText,
  DSIconContainer,
  DSButton 
} from '../design-system/components';
import { animations } from '../design-system/theme';

const NewPage = ({ t }) => {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero */}
      <motion.div
        className="text-center mb-32 relative pt-8 md:pt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <DSHeading level="h1" className="mb-6">
          My New Page
        </DSHeading>
        <DSText size="large" className="max-w-3xl mx-auto">
          This page follows the design system automatically
        </DSText>
      </motion.div>

      {/* Content Section */}
      <DSSection>
        <DSHeading level="h2" accent>
          Features
        </DSHeading>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.variants.container}
        >
          <DSCard>
            <DSIconContainer>
              <Target size={32} weight="duotone" />
            </DSIconContainer>
            <DSHeading level="h4" className="mb-2">
              Feature One
            </DSHeading>
            <DSText size="small">
              Description of the feature
            </DSText>
          </DSCard>

          <DSCard>
            <DSIconContainer>
              <Brain size={32} weight="duotone" />
            </DSIconContainer>
            <DSHeading level="h4" className="mb-2">
              Feature Two
            </DSHeading>
            <DSText size="small">
              Description of the feature
            </DSText>
          </DSCard>

          <DSCard>
            <DSIconContainer>
              <Rocket size={32} weight="duotone" />
            </DSIconContainer>
            <DSHeading level="h4" className="mb-2">
              Feature Three
            </DSHeading>
            <DSText size="small">
              Description of the feature
            </DSText>
          </DSCard>
        </motion.div>

        <div className="mt-8 flex justify-center gap-3">
          <DSButton variant="primary" onClick={() => console.log('Clicked!')}>
            Get Started
          </DSButton>
          <DSButton variant="secondary">
            Learn More
          </DSButton>
        </div>
      </DSSection>

    </div>
  );
};

export default NewPage;
```

## Updating the Design System

If design rules change:

1. Update `UI_DESIGN_SYSTEM.md` (source of truth)
2. Update `theme.js` with new tokens
3. Update component defaults if needed
4. All existing pages using DS components auto-update!

---

**Questions?** Refer to `UI_DESIGN_SYSTEM.md` for complete design specifications.
