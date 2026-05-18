# Design System Specification: The Culinary Architect

## 1. Overview & Creative North Star
**Creative North Star: "The Orchestrated Gallery"**
This design system moves away from the cluttered, utilitarian nature of legacy restaurant software. Instead, it adopts the ethos of a high-end editorial gallery. We treat every order, table, and metric as a curated piece of data. By leveraging intentional asymmetry, expansive breathing room, and a "No-Line" philosophy, we create a workspace that feels less like a spreadsheet and more like a premium command center.

The aesthetic is "Elevated Utility"—inspired by the precision of Stripe and the approachable minimalism of Shopify. We prioritize the chef's focus by reducing visual noise, using vibrant accents only where action is required, and employing sophisticated tonal layering to guide the eye.

## 2. Colors & Surface Philosophy
The palette is rooted in a crisp, high-contrast base, punctuated by high-energy functional accents.

### The Color Tokens
*   **Primary (Emerald Focus):** `#006c49` (Action) | `#10b981` (Container). Used for "Go" states, active orders, and primary success actions.
*   **Secondary (Vibrant Energy):** `#855300` (Action) | `#fea619` (Container). Used for "Attention" states, new incoming orders, and urgent alerts.
*   **The Neutrals:** We use a refined scale of cool-greys (`#f8f9fa` to `#d9dadb`) to define space without using harsh lines.

### The "No-Line" Rule
**Borders are strictly prohibited for sectioning.** To separate a sidebar from a main content area, or a list from a header, use background color shifts.
*   *Main Canvas:* `surface` (`#f8f9fa`)
*   *Side Navigation:* `surface-container-low` (`#f3f4f5`)
*   *Active Workspace:* `surface-container-lowest` (`#ffffff`)
Boundaries are felt, not seen.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical layers of fine paper.
*   **Level 0 (The Table):** `surface` background.
*   **Level 1 (The Tray):** `surface-container` for large content blocks.
*   **Level 2 (The Plate):** `surface-container-lowest` for cards or interactive elements.
This nesting creates a natural "lift" that guides the user’s focus toward the interactive data points.

### The "Glass & Gradient" Rule
To elevate the "Startup" feel, floating elements (like toast notifications or quick-action modals) must use **Glassmorphism**:
*   **Background:** `surface` at 80% opacity.
*   **Effect:** `backdrop-filter: blur(12px)`.
*   **Signature CTA:** Apply a subtle linear gradient from `primary` to `primary_container` (150-degree angle) to buttons to give them a tactile, premium depth.

## 3. Typography: Editorial Authority
We utilize a dual-font strategy to balance character with readability.

*   **Display & Headlines (Manrope):** Chosen for its geometric, modern personality. Used for "Big Numbers" (Total Sales, Order Counts) and section headers. It conveys authority and brand "soul."
*   **Interface & Body (Inter):** The workhorse. Used for all data-dense areas, labels, and paragraph text. Its high x-height ensures legibility in fast-paced kitchen/admin environments.

**Key Scales:**
*   **Display-LG (3.5rem):** For hero metrics. Tracking: -0.02em.
*   **Title-MD (1.125rem):** For card titles. Semibold weight.
*   **Label-SM (0.6875rem):** For metadata (e.g., "Order Time"). Uppercase with +0.05em tracking for a "pro" architectural look.

## 4. Elevation & Depth
In this system, depth is a functional tool, not a decorative one.

*   **Tonal Layering:** 90% of your hierarchy should be achieved by placing a `surface-container-lowest` card on a `surface-container-low` background. 
*   **Ambient Shadows:** For floating menus or high-priority modals, use "The Invisible Lift." 
    *   `box-shadow: 0px 10px 40px rgba(25, 28, 29, 0.05);`
    *   The shadow must be tinted with the `on-surface` color to avoid looking "muddy."
*   **The "Ghost Border" Fallback:** If high-contrast accessibility is required, use the `outline-variant` token at **15% opacity**. This creates a "breathable" container that doesn't cage the data.

## 5. Components

### Buttons (The Interaction Points)
*   **Primary:** Gradient fill (`primary` to `primary_container`), white text, `xl` (1.5rem) corner radius.
*   **Secondary:** `secondary_container` background with `on_secondary_container` text. No border.
*   **Tertiary:** Ghost style. No background, `primary` text. Becomes `surface_container_low` on hover.

### Cards & Lists (The Data Nodes)
*   **Rules:** Forbid 1px dividers.
*   **Implementation:** Separate list items using 12px of vertical whitespace. If items must be grouped, use a subtle `surface_container_low` hover state background.
*   **Corner Radius:** Standardize on `md` (0.75rem) for cards to maintain a friendly yet professional edge.

### Inputs (The Order Entry)
*   **Style:** Minimalist. No bottom border or full box. Use a `surface_container_highest` background with a `sm` (0.25rem) radius.
*   **Focus State:** A 2px "Ghost Border" of `primary` at 40% opacity.

### Additional Specialty Components: "The Live Pulse"
*   **Order Status Chips:** Use `secondary_fixed` for "New Orders" to create a vibrant, unmissable call to action. Use `primary_fixed` for "Completed" to provide a calming, resolved state.
*   **Status Indicators:** Use a pulse animation on a 6px circle using `primary` for "Live/Online" states to give the dashboard a "living" feel.

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical padding. Give the left side of a container more "air" than the right to create an editorial flow.
*   **Do** use `on_surface_variant` for labels to create a sophisticated hierarchy between labels and values.
*   **Do** embrace white space. If a layout feels "empty," it’s likely working.

### Don't:
*   **Don't** use pure black (#000) for text. Always use `on_background` (#191c1d) to maintain the premium, soft feel.
*   **Don't** use 1px solid grey lines to separate content. Use a background color shift or a 24px gap.
*   **Don't** use tight corner radiuses (like 2px or 4px). Stick to the `md` and `xl` scales to keep the "Modern SaaS" aesthetic.
*   **Don't** use standard drop shadows. If it doesn't look like a soft glow of light, the blur is too low or the opacity is too high.