# Color Mapping Strategy

## Light Mode Color Replacements (Blue → Orange/Red)

### Primary Colors
- `bg-blue-600` → `bg-orange-600` (Main backgrounds, buttons)
- `bg-blue-700` → `bg-orange-700` (Hover states)
- `bg-blue-500` → `bg-orange-500` (Medium accent)
- `bg-blue-400` → `bg-orange-400` (Light accent, particles)
- `bg-blue-200` → `bg-orange-200` (Very light backgrounds)
- `bg-blue-100` → `bg-orange-100` (Subtle backgrounds)
- `bg-blue-50` → `bg-orange-50` (Lightest backgrounds)

### Text Colors
- `text-blue-600` → `text-orange-600`
- `text-blue-100` → `text-orange-100`

### Border Colors
- `border-blue-600` → `border-orange-600`
- `border-blue-500` → `border-orange-500`
- `border-blue-200` → `border-orange-200`

### Shadows & Effects
- `shadow-blue-600/50` → `shadow-orange-600/50`
- `ring-blue-600` → `ring-orange-600`
- `ring-blue-500` → `ring-orange-500`

### Hover States
- `hover:bg-blue-700` → `hover:bg-orange-700`
- `hover:bg-blue-50` → `hover:bg-orange-50`
- `hover:text-blue-600` → `hover:text-orange-600`
- `hover:border-blue-600` → `hover:border-orange-600`
- `group-hover:bg-blue-600` → `group-hover:bg-orange-600`
- `group-hover:text-blue-600` → `group-hover:text-orange-600`
- `group-hover:border-blue-600` → `group-hover:border-orange-600`

### Focus States
- `focus-visible:ring-blue-600` → `focus-visible:ring-orange-600`
- `focus:ring-blue-500` → `focus:ring-orange-500`

### Dynamic Colors (whileHover borderColor)
- `'#2563eb'` → `'#ea580c'` (orange-600 hex)

## Dark Mode (Unchanged)
All dark mode colors remain with yellow-400 variants

## Outline Border Additions
Add `outline outline-2 outline-offset-2 outline-gray-300` to:
- Service cards
- Experience cards
- Case study cards
- Metrics cards
- Creative lab items
