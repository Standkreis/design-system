# Design-system validation

12 September 2026. Local verification used Node 24.15.0 and installed Google Chrome. CI uses the Node 22 line and Playwright's installed Chromium.

- `npm run check` passed: formatting, strict TypeScript, library build, production reference-app build, four foundation tests and the isolated package-consumer check.
- `npm run test:browser` passed all ten tests across desktop and emulated mobile viewports. Scenarios cover the canonical centred-dot mark and sole SVG download, EN/DE labels, identification-dialog focus and save feedback, sheet keyboard behaviour, reduced motion, system/manual theme handling, preference persistence, form controls and application tabs.
- Automated axe checks found no WCAG A/AA-tagged violations in the tested reference page states in light and dark mode. This is scoped automated evidence, not a claim of complete accessibility conformance.
- A mobile navigation sizing issue and insufficient inactive-tab contrast were corrected before the passing run. A screenshot check also confirmed the German reference page remains within a 390 px viewport.
- The package archive installed into an independent temporary project, outside the workspace. ESM root/subpath imports, server-rendered Brand, Vite bundling, standalone CSS and all four font files resolved successfully.
- Logo invariants cover equal arcs/gaps, the right-facing opening, mandatory centred dot and matching downloadable SVG. Twenty semantic reading/action colour pairs meet a 4.5:1 threshold.
- `shadcn add accordion --dry-run --cwd packages/ui` resolved the target to `src/components/accordion.tsx`; it made no changes. This confirms future CLI additions target source rather than build output.

No physical phone, Safari/Firefox, production Atlas/Species integration, scientific data service, npm registry publication or hosted deployment was part of this initial release.

The first GitHub CI run exposed a clean-checkout ordering defect: the reference app's typecheck needs the library's emitted declarations. `typecheck` now emits those declarations before checking the app. The full check was repeated after deleting both build-output directories to verify the correction without relying on local artifacts.

The canonical-mark and teal-400 change passed the same local checks. The packed library includes one mark asset and no alternative logo API. Primary labels and `primary-ink` text were checked against their theme surfaces. The palette remains a visual study for feedback.
