# Branding auto-apply

Apply a custom brand (logo + primary color) globally across the starter kit. This is **optional** — skip it if the user wants the default Salesforce look.

## What the user must provide

1. **`logo.svg`** — a single SVG file. Square-ish artwork works best (the header slot is ~24px tall).
2. **`brandHex`** — one hex color (e.g. `#0070d2`). The agent derives lighter/darker shades automatically.

If either is missing, **ask the user** before touching files. Do not invent a color or use a placeholder logo.

## Files to change

The starter kit has exactly **three** branding touchpoints. Touch all three (or none).

### 1. Replace the logo asset

Save the user's SVG to:

```
public/images/logo.svg
```

Keep the original `public/images/salesforce.svg` in place (don't delete it — other docs may reference it).

### 2. Update the favicon link in `index.html`

In [`index.html`](../../../../index.html), replace the favicon line. Find:

```html
<link rel="icon" href="./images/salesforce.svg" type="image/svg+xml">
```

Replace with:

```html
<link rel="icon" href="./images/logo.svg" type="image/svg+xml">
```

### 3. Swap the header logo

In [`src/modules/ui/globalHeader/globalHeader.html`](../../../../src/modules/ui/globalHeader/globalHeader.html), the first `lightning-layout-item` currently renders `<lightning-icon icon-name="utility:salesforce1" ...>`. Replace that block with a plain `<img>`:

```html
<lightning-layout-item class="slds-global-header__item">
    <img src="/images/logo.svg" alt="Brand logo" class="c-brand-logo">
    <span class="slds-assistive-text">Brand logo</span>
</lightning-layout-item>
```

Then add a small sizing rule in [`src/modules/ui/globalHeader/globalHeader.css`](../../../../src/modules/ui/globalHeader/globalHeader.css) (create the file if it doesn't exist; the component will pick it up automatically):

```css
.c-brand-logo {
    block-size: 1.5rem;       /* 24px — matches the previous lightning-icon size="large" footprint */
    inline-size: auto;
    display: block;
}
```

### 4. Add a global brand-color block in `src/styles/global.css`

This file already has the `.c-portal_<brand>` pattern (Ford / Toyota / VW). Add a new `:root` block at the **top** of [`src/styles/global.css`](../../../../src/styles/global.css) that remaps the SLDS accent hooks application-wide:

```css
/* ------------------------------------------------------------------ *
 * Custom brand — applied globally so Lightning Base Components
 * (brand buttons, focus rings, links) and SLDS hooks pick it up.
 * The four accent variants give SLDS enough range without asking
 * the user for a full palette.
 * ------------------------------------------------------------------ */

:root {
    --slds-g-color-accent-1: <BRAND_HEX>;
    --slds-g-color-accent-2: <BRAND_HEX_DARK>;
    --slds-g-color-accent-3: <BRAND_HEX_DARKER>;
    --slds-g-color-accent-container-1: <BRAND_HEX>;
    --slds-g-color-accent-container-2: <BRAND_HEX_DARK>;
    --slds-g-color-accent-container-3: <BRAND_HEX_DARKER>;
}
```

Replace placeholders with the derived shades:

- `<BRAND_HEX>` — exactly the value the user provided.
- `<BRAND_HEX_DARK>` — same hue, ~15% darker (HSL: lightness − 10).
- `<BRAND_HEX_DARKER>` — same hue, ~30% darker (HSL: lightness − 20).

If the user-provided hex is already dark (lightness < 25%), invert: use a slightly lighter shade for `-1` and the original for `-2`/`-3`.

## Verification

After saving all three files:

1. Run `npm run dev` (if it isn't already running — it hot-reloads).
2. Open <http://localhost:3000>.
3. Confirm:
   - Browser tab favicon = new logo.
   - Top-left header logo = new logo.
   - Any `<lightning-button variant="brand">` (e.g. on `/cases/1`, on the "Voltar para Casos" button) now shows the brand color.

If any of the three doesn't change, tell the user which one failed and check the corresponding file.

## Rollback

To revert: restore `salesforce.svg` references in `index.html` and `globalHeader.html`, restore the `<lightning-icon>` in the header, and delete the `:root` block from `global.css`.
