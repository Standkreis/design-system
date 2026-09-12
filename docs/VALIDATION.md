# Design-system validation

12 September 2026. Local verification used Node 24.15.0 and installed Google Chrome. CI uses the Node 22 line and Playwright's installed Chromium.

- `npm run check` passed: formatting, strict TypeScript, library build, production reference-app build, four foundation tests and the isolated package-consumer check.
- `npm run test:browser` passed all sixty-four tests across desktop and emulated mobile viewports. Scenarios cover the canonical centred-dot mark and sole SVG download, EN/DE labels, identification-dialog focus and save feedback, sheet keyboard behaviour, reduced motion, system/manual theme handling, preference persistence, form controls and application tabs.
- Automated axe checks found no WCAG A/AA-tagged violations in the tested reference page states in light and dark mode. This is scoped automated evidence, not a claim of complete accessibility conformance.
- A mobile navigation sizing issue and insufficient inactive-tab contrast were corrected before the passing run. A screenshot check also confirmed the German reference page remains within a 390 px viewport.
- The package archive installed into an independent temporary project, outside the workspace. ESM root/subpath imports, server-rendered Brand, Vite bundling, standalone CSS and all four font files resolved successfully.
- Logo invariants cover equal arcs/gaps, the right-facing opening, mandatory centred dot and matching downloadable SVG. Fifty semantic reading/action colour pairs meet a 4.5:1 threshold.
- `shadcn add accordion --dry-run --cwd packages/ui` resolved the target to `src/components/accordion.tsx`; it made no changes. This confirms future CLI additions target source rather than build output.

No physical phone, Safari/Firefox, production Atlas/Species integration, scientific data service, npm registry publication or hosted deployment was part of this initial release.

The first GitHub CI run exposed a clean-checkout ordering defect: the reference app's typecheck needs the library's emitted declarations. `typecheck` now emits those declarations before checking the app. The full check was repeated after deleting both build-output directories to verify the correction without relying on local artifacts.

The canonical-mark and teal-400 change passed the same local checks. The packed library includes one mark asset and no alternative logo API. Primary labels and `primary-ink` text were checked against their theme surfaces. The palette remains a visual study for feedback.

The image-led landing study passed the full check and all twelve browser tests, including local photo loading, hero navigation and German mobile layout. Desktop and 390 px German captures were visually inspected in both appearances. Contrast invariants now include the opaque primary hover colour with white labels. Photo provenance is recorded in IMAGERY.md; assets stay outside the packed UI library.

The shared-defaults consolidation adds regressions comparing dialog and uncertainty typography against the package stylesheet in an independent iframe in light and dark mode. A second regression changes the radius token and checks all migrated surfaces, then verifies the inverse button's keyboard focus outline. The package-consumer check exercises Card semantic composition and the inverse/pill Button without reference-app CSS. Desktop and German mobile captures of the landing, application panel, dialog and principles were inspected. Tests wait for theme transitions to settle before comparing computed colours.

The preview now separates `/brand` from `/components` and `/components/:slug`. The component area documents all nineteen public primitives and patterns; browser coverage is derived from the library component files to expose missing pages. Every component page is checked for a live preview, usage code, API documentation, mobile overflow and axe violations in light and dark mode. Additional scenarios cover the two navigation areas, mobile Sheet menu, direct URLs, browser history, retained locale/theme, Select/Tabs keyboard interaction and local dialog/feedback state. Existing brand, package-typography and radius checks remain in place. Scrollable code examples are keyboard focusable. The expanded coverage found and corrected destructive Badge contrast in dark mode.

The navigation refinement covers equal header padding and aligned controls, the compact appearance selector's accessible current value, the single header boundary, smooth Brand anchors and reduced-motion scrolling. New browser cases exercise Logo and Icons navigation, the Motion chapter's panel/focus behaviour, and the 3D study's keyboard rotation, top view, canopy toggle and reset. The cool charcoal palette is checked by the existing contrast invariants and light/dark axe coverage. The 3D study is original generic geometry; no private source material or location data is distributed.

Semantic status coverage checks info, success, error and warning against their tinted surfaces and the normal page/card backgrounds in both themes. Browser tests verify that the shared Card variants resolve to those tokens and that Brand headings match sidebar labels in EN/DE, with no introductory section descriptions. Card documentation includes all status variants; the packed consumer renders a success Card and checks that all four status surface utilities are shipped.
