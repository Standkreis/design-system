# Standkreis design system

A shared foundation for Standkreis applications: **Titillium Web, Gathered circle identity, light/dark semantic tokens and React components based on shadcn/ui.** Different rooms in the same place.

The first release contains an installable ESM library, `@standkreis/ui`, and a reference app that imports the built package. It is an initial foundation, not a migration of Atlas or Species. The npm package has not been published and the reference app has not been deployed.

## Work locally

Use Node 22.12 or newer (the repository pins the Node 22 line) and npm.

```sh
npm ci
npm run dev
```

Open <http://localhost:4382>. The development command builds the library, then watches its TypeScript and styles alongside Vite. The reference app supports EN/DE and light/dark/system appearance. A manual appearance choice persists in local storage. It demonstrates real component interactions with explicitly labelled sample content; there is no camera service, data upload or persistent encounter storage.

## Structure

```text
packages/ui/        @standkreis/ui — components, providers, tokens, fonts, SVGs
apps/docs/          reference app consuming the compiled package
docs/              brand decisions, shadcn provenance and integration guidance
tests/             brand/contrast invariants and browser behaviour
scripts/           library build, shadcn additions and packed-consumer verification
```

Components: Button (including inverse/pill marketing actions), Card (shared surface variants), Input, Textarea, Label, Badge, Separator, Tabs, Checkbox, Switch, Select, Dialog, Sheet and Tooltip. Standkreis patterns: Brand/BrandMark, IdentificationAction, UncertaintyNotice and DiscoveryFeedback. Providers support German/English labels and persistent system/light/dark preferences.

## Install the package in another application

Build and create an archive from this checkout:

```sh
npm run build
npm pack --workspace @standkreis/ui --pack-destination .
```

Then, in the consuming application:

```sh
npm install /absolute/path/to/design-system/standkreis-ui-0.1.0.tgz
```

React 19 and React DOM 19 are peer dependencies. Import styles once in the application root:

```tsx
import "@standkreis/ui/fonts.css";
import "@standkreis/ui/styles.css";
import {
  StandkreisProvider,
  Brand,
  IdentificationAction,
} from "@standkreis/ui";

export function App() {
  return (
    <StandkreisProvider locale="de">
      <Brand product="Atlas" />
      <IdentificationAction onClick={() => openCamera()} />
    </StandkreisProvider>
  );
}
```

`openCamera` belongs to the consuming application. The library supplies the control and label, not identification or data services. The package is currently installed from the archive; do not assume `npm install @standkreis/ui` resolves this initial release from the public registry.

The compiled CSS includes Tailwind's base reset and the component utilities, so consuming it requires no Tailwind build configuration. Font loading is a separate opt-in import. Applications with an existing Tailwind setup should review [integration guidance](docs/INTEGRATION.md) before importing two resets. Tokens can be imported independently through `@standkreis/ui/tokens.css`.

Individual exports are available, for example `@standkreis/ui/components/button`. The package ships declarations, source maps and upstream component sources. The canonical SVG is available through `@standkreis/ui/assets/marks/standkreis-mark.svg`. Brand and BrandMark always include the central dot; they have no logo variant prop.

## Extend the library

Use the repository's pinned shadcn CLI wrapper:

```sh
npm run ui:add -- accordion
```

It targets package source and normalises imports for emitted package code. Review new components for tokens, translated labels, motion and touch targets. Add public exports to `packages/ui/src/index.ts`, add a reference example and run the checks. Do not run `shadcn init` over the established theme. See [shadcn provenance and maintenance](docs/SHADCN.md).

Share by default. Extend the core when reuse is credible. Keep specialised application behaviour local, and document deliberate differences. The design system is open source but optimised for Standkreis first.

## Verify

```sh
npm run check
npx playwright install chromium
npm run test:browser
```

`check` formats-checks, typechecks, builds the library/reference app, checks logo/contrast invariants and packs/installs the archive in an isolated consumer. The consumer bundles its JS, CSS and fonts using Vite. Browser tests run against the production reference build and cover mobile/desktop layouts, keyboard operation, theme preferences, translated dialog controls, reduced motion and automated accessibility checks. Set `PLAYWRIGHT_CHROME_PATH` to use an existing Chrome binary locally.

CI runs both commands on pushes and pull requests. `npm run format` applies formatting. Source changes require a new build before checking the packaged artifact.

## Decisions and licences

- [Brand principles and conversation decisions](docs/BRAND.md)
- [Imagery direction and photo provenance](docs/IMAGERY.md)
- [Integration, theme setup and migration boundaries](docs/INTEGRATION.md)
- [shadcn/ui provenance and adaptations](docs/SHADCN.md)
- [MIT implementation licence](LICENSE), [brand usage](BRAND-USAGE.md), [upstream notice](packages/ui/THIRD_PARTY_NOTICES.md), [font licence](packages/ui/assets/fonts/OFL.txt)

The Gathered circle with its central dot is selected. The current study pairs teal 500 accents and deeper white-labelled actions with an image-led landing page. Application migrations and registry publication remain separate work.
