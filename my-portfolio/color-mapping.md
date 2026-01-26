# Icon Color Mapping Plan

## Goal
Apply vibrant, consistent colors to all icons across the application, matching the style of the "My Story" page.

## Color Palette (Tailwind)
- **Primary**: `text-amber-600` / `dark:text-yellow-400` (Brand)
- **Secondary/Action**: `text-blue-500` / `text-blue-400`
- **Success/Growth**: `text-emerald-500` / `text-emerald-400`
- **Highlight/Creative**: `text-rose-500` / `text-rose-400`
- **Tech/Code**: `text-violet-500` / `text-violet-400`

## Page-by-Page Mapping

### 1. Experience Page (`src/pages/Experience.jsx`)
- **Roles**:
    - `Briefcase` (Company): `text-blue-500`
    - `MapPin` (Location): `text-rose-500`
    - `CalendarBlank` (Date): `text-amber-500`
- **Projects**:
    - `Robot` (AI): `text-violet-500`
    - `ChatCircle` (Chatbot): `text-emerald-500`
- **Education**:
    - `GraduationCap`: `text-amber-600`
- **Certifications**:
    - `Medal`: `text-yellow-500`

### 2. Metrics Page (`src/pages/MetricsPage.jsx`)
- **Summary Cards**: Add icons? (Currently text only, maybe add icons to enhance?) -> *Decision: Keep as text for now to avoid clutter, focus on existing icons.*
- **Insights**:
    - *No icons currently, just text. Will leave as is unless user asks.*
- *Note*: `Resources.jsx` is used here, need to check that.

### 3. Case Studies (`src/pages/CaseStudies.jsx`)
- `ArrowSquareOut` (External Link): `text-blue-400` (already colored by parent generic styles, but will enforce)
- `Barricade` (Coming Soon): `text-orange-400`

### 4. Creative Lab (`src/pages/CreativeLab.jsx`)
- `Play` (Play Button): `text-white` (on colored bg) -> *Already colored in amber*.
- `X` (Close): `text-gray-500` -> `text-rose-500` hover.

### 5. Components
- **Resources.jsx**: Check for icons.
- **NavBar.jsx**: Icons `List`, `Globe`, `Sun`, `Moon`.
    - `Globe`: `text-blue-500`
    - `Sun/Moon`: `text-amber-500`
