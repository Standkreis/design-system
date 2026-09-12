# shadcn/ui foundation

The initial 14 primitives were installed using the actual shadcn CLI **4.21.0** with the `new-york` style, neutral base, Radix primitives and Lucide icons. Installation date: 12 September 2026.

Official references: [monorepo structure](https://ui.shadcn.com/docs/monorepo), [Vite setup](https://ui.shadcn.com/docs/installation/vite), [semantic theming](https://ui.shadcn.com/docs/theming), [Vite dark mode](https://ui.shadcn.com/docs/dark-mode/vite).

```sh
npx shadcn add button card input label textarea badge separator tabs switch checkbox dialog sheet select tooltip --yes --cwd packages/ui
```

The first CLI invocation routed files through compiled package exports into `dist/components`; they were moved into `src/components`. The package CLI aliases now target source, and `npm run ui:add` preserves compatible emitted imports. This is a compiled distribution package, so it intentionally differs from shadcn's source-only workspace example.

## Deliberate adaptations

- Replace upstream `cn` module imports with the shared `clsx`/`tailwind-merge` helper at `@standkreis/ui/lib/utils`.
- Keep explicit client directives in component source so the emitted modules preserve React Server Component boundaries.
- Replace the neutral stock theme with Standkreis's semantic light/dark tokens and local Titillium family. Bundle precompiled Tailwind 4 CSS; consumers need not run Tailwind.
- Default/large button and input targets are at least 44 px high. Use semibold controls and targeted colour/shadow transitions.
- Give destructive controls an explicit foreground token that remains legible in both themes.
- Translate Dialog and Sheet close controls through the locale provider and allow label overrides; enlarge their close targets.
- Centralise finite motion duration/easing and reduce all motion when requested. Keep Radix focus, keyboard and portal behaviour.
- Add Brand, IdentificationAction, UncertaintyNotice and DiscoveryFeedback as Standkreis compositions. They do not contain application capture, model inference or persistence logic.

The upstream MIT notice is included in `packages/ui/THIRD_PARTY_NOTICES.md`. Preserve it when distributing source. Future CLI additions or overwrites require review: upstream defaults do not automatically satisfy Standkreis's translation, target-size and attention requirements.

The pinned CLI is a development dependency. Runtime packages include Radix UI, Lucide, class-variance-authority, clsx and tailwind-merge. The shared package owns style decisions; applications extend deliberately rather than maintaining unrelated copies.

The teal-400 study adds `primary-ink` for Button/Badge links and discovery feedback. Filled primary controls retain `primary-foreground`; checked switches use it for their thumb in both themes, and checked checkboxes retain a visible `primary-ink` border.

The imagery-led study changes primary labels to white and adds an opaque `primary-hover` token for Button and Badge. This prevents hover transparency from reducing label contrast on light backgrounds. The white rounded hero CTA is an intentional local marketing treatment using the shared Button.
