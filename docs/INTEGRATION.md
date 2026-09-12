# Application integration

## Default consumption

Use the built `@standkreis/ui` package rather than copying components into each application. It emits ESM JavaScript, declaration files, standalone CSS and distributable fonts/SVGs. React 19 is required. Components retain `use client` boundaries for React Server Component consumers; brand-only rendering does not need the browser.

Import `fonts.css` and `styles.css` once in your root layout or entry point. `styles.css` includes a base reset and generated component utilities. It does not scan a consumer's arbitrary Tailwind classes. Use the app's own CSS or Tailwind pipeline for application layout.

Applications already using Tailwind 4 can instead import the package source stylesheet through a resolved filesystem path or configure Tailwind to scan `node_modules/@standkreis/ui/src`, import the package `tokens.css`, and reproduce the semantic colour/radius mappings in `packages/ui/src/styles/index.css`. Keep one preflight reset. Prefer the precompiled route for the first integration and verify reset interactions before release; a dedicated Tailwind adapter can be extracted when an application needs it.

## Theme and locale

Use one `StandkreisProvider` at the application root. Its `locale` is controlled by the application and is either `en` or `de`; it sets the root document language. Product copy and routing remain application concerns. Default internal labels and Standkreis pattern copy use that locale; DialogContent/SheetContent also accept `closeLabel` overrides.

The provider defaults to system appearance. `useTheme()` exposes `theme` and `setTheme`. Selection persists under `standkreis-theme`, follows device changes while in system mode and synchronises with other tabs. Blocked storage is handled in memory. The dark selector is `.dark` on the document root; portals inherit the same theme.

In a server-rendered application, run the small pre-paint theme script from `apps/docs/index.html` in the document head to avoid a theme flash. Integrate it with the framework's own script/CSP handling. For Next.js, set `suppressHydrationWarning` on the root HTML element whose class is set by that script. The provider starts with a stable initial React render, then reads storage after mount. Test the actual application's hydration and offline behaviour during its migration.

Specialised content canvases may retain their own background when needed for visibility. UI text and controls continue to use shared semantic tokens.

## Interaction contracts

- Supply explicit labels for Inputs, Textareas, Select triggers, icon-only actions, Checkbox and Switch. Small binary controls should sit inside a labelled, touch-friendly row like the reference app's 44 px label rows.
- Default and large Buttons are at least 44 px high. Compact sizes are available only for intentional dense contexts with suitable touch targets.
- Dialog and Sheet require a meaningful title and description. Keep Radix focus management, Escape behaviour and background inertness intact. Do not intercept focus without a demonstrated need.
- IdentificationAction does not access a camera. Wire it to application capture behaviour and keep it easy to find.
- UncertaintyNotice presents an explanation without an urgent alert role. Applications are responsible for the truthfulness of suggestions and sources.
- Keep DiscoveryFeedback mounted and toggle `visible` after an explicit successful action so its polite live region can announce the change. It does not auto-dismiss or initiate a reminder.
- No ambient logo spinning, reward chasing, streak penalties or competitive sightings. Motion tokens govern finite transitions; reduced motion removes animations and transitions.

## Rollout

No existing application was migrated during repository creation. First integrate a small Atlas flow and a Species control panel in separate application changes, verify the same package in both, and use that evidence to extend the shared library. Keep provisional product names configurable; only Atlas is settled.

## Canonical identity and colour roles

Use `<Brand />` or `<BrandMark />`; the centre dot is always included. The former `variant` prop and candidate SVG paths were removed before npm publication. Replace either candidate asset with `@standkreis/ui/assets/marks/standkreis-mark.svg`.

The current teal study uses white labels on a deeper action shade and distinguishes filled actions (`bg-primary text-primary-foreground`) from readable coloured text (`text-primary-ink`). Do not use `text-primary` for light-mode body text. Both roles are available in the shared tokens and Tailwind theme.

`primary-hover` preserves white-label contrast on hover. Use the opaque hover colour instead of reducing primary opacity. Marketing photographs belong to the reference app and are not bundled into the UI package.
