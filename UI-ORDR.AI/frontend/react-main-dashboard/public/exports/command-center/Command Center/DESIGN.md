# Saffron Harvest Design System

### 1. Overview & Creative North Star
**Creative North Star: The Culinary Concierge**
Saffron Harvest is a high-end editorial system designed for high-velocity hospitality environments. It rejects the clinical, "boxed-in" aesthetic of traditional SaaS dashboards in favor of a warm, artisanal atmosphere. The system utilizes intentional asymmetry, generous white space (Saffron Canvas), and a vibrant signature "Solar Orange" to guide the user's eye. By layering organic tones against sharp, high-contrast typography, we create a tool that feels less like a database and more like a curated command center.

### 2. Colors
The palette is rooted in earth tones and kitchen-inspired pigments.
- **Solar Orange (Primary):** Used for critical action and identity.
- **Herb Green (Secondary):** Reserved exclusively for positive status shifts and "Ready" states.
- **The "No-Line" Rule:** Sectioning is achieved through shifts between `surface` (#f8f6f5) and `surface_container_low` (#f3f1f0). Borders are strictly prohibited for layout containment; only 1px subtle stone-colored lines are permitted for vertical persistent navigation boundaries.
- **Surface Hierarchy:** Use `surface_container_lowest` (Pure White) for active cards to make them "pop" against the warm gray background.
- **Signature Textures:** Apply a 10% opacity Solar Orange tint (`primary_container/10`) to secondary badges and tally counters to create a cohesive brand glow.

### 3. Typography
Saffron Harvest uses **Plus Jakarta Sans** across all roles to ensure a modern, geometric, yet friendly personality.
- **Display & Headline:** Bold and extra-bold weights (700-800) with tight tracking (-0.02em) for a high-impact editorial feel.
- **The Scale:**
    - **XL Display:** 1.25rem (20px) - Page titles and inventory headers.
    - **Large Headline:** 1.125rem (18px) - Column headers and section titles.
    - **Standard Body:** 0.875rem (14px) - Order IDs and primary item names.
    - **Micro Labels:** 10px / 11px - Used for timestamps, uppercase tracking-widest metadata, and count badges.
- **Rhythm:** The system relies on a stark contrast between `black` (900) weights for numbers/IDs and `medium` weights for descriptive text.

### 4. Elevation & Depth
Depth is created through "Tonal Layering" rather than heavy drop shadows.
- **The Layering Principle:** 
    1. Base Canvas: `surface` (#f8f6f5).
    2. Column Wells: `surface_container_low`.
    3. Active Elements: `surface_container_lowest` (White).
- **Ambient Shadows:** Only use the `shadow-sm` preset—a very soft, diffused shadow (0 1px 2px 0 rgba(0, 0, 0, 0.05))—to lift active cards from the surface.
- **Glassmorphism:** The Top Navigation utilizes a `backdrop-blur-xl` with an 80% opacity white fill, allowing the kitchen's activity to "ghost" through the header as the user scrolls.

### 5. Components
- **The Pulse Button:** Main CTAs (e.g., "Mark Shipped") use a linear gradient from `primary` to `primary_container`.
- **High-Viz Badges:** Status indicators use 10px uppercase "Black" weights with 15% opacity backgrounds of the status color.
- **Pill Toggles:** Roundedness is set to `max` (3/full) for all interaction triggers, creating a soft, tactile feel.
- **Status Progress:** Use a high-contrast 6px bar. For delayed orders, use a solid `primary` fill; for pending, use a muted stone track.

### 6. Do's and Don'ts
**Do:**
- Use uppercase, wide-tracked 10px text for "administrative" data (Terminal IDs, timestamps).
- Use `rounded-2xl` and `rounded-full` liberally to maintain the "soft organic" aesthetic.
- Use `grayscale` filters on completed or inactive items to recede them into the background.

**Don't:**
- Never use pure black (#000) for text; use `stone-900` or `tertiary` to maintain the warmth.
- Avoid 1px solid borders around cards; let the shadow and white background define the boundary.
- Do not use the secondary "Herb Green" for anything other than success or availability states.