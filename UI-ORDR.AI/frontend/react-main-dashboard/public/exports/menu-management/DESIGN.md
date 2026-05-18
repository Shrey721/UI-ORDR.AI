# Design System Philosophy: Velocity & Precision

## 1. Overview & Creative North Star
The restaurant environment is one of controlled chaos—high speed, high stakes, and high precision. To reflect this, the design system adopts a **"High-Velocity Editorial"** North Star. 

This is not a generic dashboard. It is a digital cockpit that balances the raw energy of a professional kitchen with the sophisticated polish of a luxury brand. We move beyond the "template" look by using intentional white space, breathing room, and a bold typography scale. The interface should feel like a high-end physical object—fluid, responsive, and tactile—using overlapping layers and glassmorphism to create a sense of depth and speed.

## 2. Color & Tonal Architecture
The palette is anchored by a high-intensity "Flash Orange" and a deep "Kitchen Green," balanced by a sophisticated range of neutral surfaces.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example:
- A `surface-container-low` section sitting directly on a `surface` background.
- A `surface-container-highest` navigation bar over a `surface-dim` workspace.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials. We use the Material surface tokens to define importance through "Z-axis" depth:
1.  **Base Layer:** `surface` (#f9f9ff) - The canvas.
2.  **Sectioning:** `surface-container-low` (#f0f3ff) - Used for grouping large content blocks.
3.  **Active Workspace:** `surface-container-highest` (#dce2f3) - For interactive elements that need to "pop."

### The "Glass & Gradient" Rule
To add visual "soul," avoid flat orange blocks. Main CTAs and hero elements should utilize subtle linear gradients:
- **Primary Gradient:** `primary` (#b12500) to `primary_container` (#dd3100) at a 135-degree angle.
- **Glassmorphism:** Use semi-transparent surface colors with a `20px` backdrop-blur for floating panels (e.g., Modals or Toast notifications).

## 3. Typography: The Editorial Edge
We utilize **Plus Jakarta Sans** for its geometric clarity and modern "tech-forward" personality. 

- **Display & Headlines:** Use `display-lg` and `headline-lg` with tight letter-spacing (-0.02em) to create an authoritative, editorial feel. These are your "billboard" moments.
- **Hierarchical Contrast:** Pair large, bold headlines with significantly smaller `label-md` uppercase text for a premium, structured look.
- **Functional Body:** `body-lg` is the workhorse. It should never feel cramped; ensure a line height of at least 1.6 for maximum readability during high-velocity operations.

## 4. Elevation & Depth
Hierarchy is achieved through **Tonal Layering** rather than structural lines.

### The Layering Principle
Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a "soft lift" that feels natural and premium. 

### Ambient Shadows
When a floating effect is mandatory (e.g., a dropdown or a floating action button):
- **Blur:** Minimum 32px.
- **Opacity:** 4% to 8%.
- **Color:** Tint the shadow with the `on-surface` color (#151c27) to avoid the "dirty grey" look of standard shadows.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., input fields), use the **Ghost Border**: the `outline-variant` token (#e8bdb3) at **15% opacity**. Never use 100% opaque, high-contrast borders.

## 5. Signature Components

### Buttons: High-Velocity Action
- **Primary:** Uses the Primary Gradient with `full` (9999px) roundedness. 
- **States:** On hover, increase the gradient intensity. On press, scale the component to 98% to provide tactile feedback.
- **Typography:** `title-sm` with medium weight.

### Cards & Lists: The No-Divider Rule
- **Cards:** Forbid the use of divider lines between card header and body. Use a `surface-container` shift or an additional `1.5rem` (xl) of vertical padding to define sections.
- **Lists:** Separate items using a vertical `0.5rem` gap of the background color rather than a 1px line. This makes the list feel like a series of distinct "orders" or "tickets."

### Chips: The Status Signal
- Use `secondary_container` (#7cf994) for "Success" or "Live" states.
- Use `primary_fixed` (#ffdad2) for "Urgent" or "Pending" states.
- Shape: Always `full` (9999px) to contrast with the `md` (0.75rem) roundedness of containers.

### Input Fields: Clean Precision
- No background color. Only a bottom Ghost Border.
- On focus, the bottom border transitions to a 2px `primary` orange line, and the label floats with a `label-sm` scale.

### Dashboard Modules
Incorporate "Quick-Action" widgets using **Glassmorphism**. Floating a statistics widget over a map or a live feed creates a high-tech, premium SaaS aesthetic.

## 6. Do’s and Don’ts

### Do
- **Do** use `xl` (1.5rem) corner radius for main dashboard containers to feel approachable.
- **Do** allow content to bleed off-edge in carousels to suggest "more to come."
- **Do** use `on_secondary_container` (#007230) for high-contrast text on green success badges.

### Don’t
- **Don't** use pure black (#000000) for text. Always use `on_surface` (#151c27) to maintain visual softness.
- **Don't** use standard 8px grids exclusively. Break the grid with asymmetrical headline placements to create a custom, high-end feel.
- **Don't** use icons without purpose. Every icon must be accompanied by text or be a globally recognized action.

---
*Document Version 1.0 | Senior UI/UX Editorial Guidelines*