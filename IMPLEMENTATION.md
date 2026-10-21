# UOOJIN homepage

Hero/About layout, project graphics/data, footer content/colors, and detail routing are preserved.

## Logo and HERO interaction

- `src/assets/headerLogo.svg`: standalone transparent header logo reconstructed from the supplied horizontal reference. Header and workspace sidebar share this asset. `HeaderLogo.jsx` inlines the trusted local SVG so the two pupil nodes can be addressed separately.
- `useSvgPupils.js`: pointer tracking in SVG coordinates; limits the pupil center by eye radius minus stroke and pupil radius. Header eyes reset on document pointer leave / window blur; HERO eyes reset on leaving HERO.
- `Brand.jsx`: original HERO paths and circle coordinates are unchanged. U/J/I/N each have an independent translation with Pointer Events and pointer capture. The translation persists until reload. Arrow keys also move focused letters. Browser image dragging and text selection are prevented on the draggable artwork.
- Header stays fixed above the workspace. Detail pages retain their existing route behavior and hide the portfolio wrapper; their layer is above the header layer.

## WORKSPACE

The existing sticky + requestAnimationFrame mechanism now uses `src/lib/workspaceMotion.js`:

1. 0–24%: small 4:3 window expands to the viewport.
2. 24–66%: full viewport exploration, approximately 1.8 viewport heights of scroll.
3. 66–94%: shrinks back to the same small window.
4. 94–100%: fades out, followed directly by the existing footer.

All phases derive from absolute native scroll progress, including reverse scrolling. Reduced motion presents a full workspace without the animation. The ending illustration component, its import, and its exclusive styles are removed.

The sidebar project index is generated from the existing project data. Hover/focus highlights both the index and corresponding graphic. Clicking an index item selects it and keeps its preview available; it does not navigate. Icon/preview links retain detail navigation. Escape and the preview close button clear selection. Preview placement is clamped to the viewport as the window expands/shrinks.

There is one native page scroller, without a nested workspace scroller. Scrollbar chrome is hidden without disabling native scroll. Project graphics fit the changing window height while keeping their aspect ratios.

## Content replacement

`src/data/projects.js` remains the source for project metadata/media. MONO-LOG and NOTOMATO use the existing image assets. Empty thumbnails use the existing placeholder graphics. `src/components/Footer.jsx` retains the existing contact data and preparation labels for missing social URLs.

## Validation

- `npm run build` and `npm run lint` pass.
- Pure timeline checks cover boundaries, the entire exploration plateau, monotonic growth/shrink, continuous increments, endpoint fade and reduced motion.
- Browser checked at the available 489 × 956 viewport: fixed header through the page, independent U/J/I/N dragging, unchanged outer eye geometry, pupil distance within allowed radius, HERO pupil reset, index/icon bidirectional highlight, index click/preview, full workspace without internal overflow, expansion/hold/shrink/fade, reverse scrolling back to full and smaller states, detail navigation and return, direct footer connection, no ending elements.
- Browser console: no warnings/errors. Build error overlay absent.
- Tablet/desktop CSS remains responsive; an exhaustive physical-device sweep has not been run.
