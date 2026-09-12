# Standkreis design system

Shared React components based on shadcn/ui, brand assets and a living reference app. Read README.md and docs/BRAND.md before changing the identity or component conventions.

- Optimise for Standkreis. Use shared components by default; extend the library when reuse is credible. Document intentional exceptions.
- Preserve Titillium, semantic colour meaning, German/English support, keyboard access, visible focus and reduced motion. Motion responds to user actions. No engagement reminders, streak pressure, leaderboards or incentives to disturb wildlife.
- The canonical logo uses three identical arcs with equal gaps, one opening centred directly right and a mandatory central dot. Do not reintroduce alternative marks or a variant selector. Geometry and exported SVGs must agree.
- Application integrations are separate work. Do not change sibling repositories without task authorization.
- Scope editorial typography to explicit classes; never style all headings/paragraphs in the reference in a way that overrides shared components. Use Card surface variants and Button variants before introducing local surface/control styling.
- Components under packages/ui/src/components derive from shadcn/ui. Keep the CLI configuration usable and record source changes in docs/SHADCN.md. Preserve upstream notices.
- Run npm run check and npm run test:browser for component, style or provider changes. Browser tests use the built reference app. Verify the packed package, not only source imports.
- Keep secrets, proprietary images and unlicensed assets out of the public repository. Fonts retain their OFL notice. Do not publish to npm or deploy websites unless requested.
- Preserve unrelated work. Scope commits to named paths. New development after initial repository creation should use a branch and PR. Analysis-only work requires no tracker artifacts.
