# @standkreis/ui

Standkreis's React design system, based on shadcn/ui. Includes accessible primitives, shared brand components, EN/DE labels, system/light/dark appearance, Titillium fonts and the canonical Gathered circle mark with its central dot.

```tsx
import "@standkreis/ui/fonts.css";
import "@standkreis/ui/styles.css";
import { StandkreisProvider, Brand, Button } from "@standkreis/ui";

<StandkreisProvider locale="de">
  <Brand product="Atlas" />
  <Button onClick={beginExploring}>Entdecken</Button>
</StandkreisProvider>;
```

React 19 and React DOM 19 are peer dependencies. Styles are precompiled; no Tailwind setup is required. They include a base reset. Import `tokens.css` alone if only semantic variables are needed. Fonts are optional and separately imported. Components are also available as subpath exports, such as `@standkreis/ui/components/button`.

The initial version is installed from a packed archive, not yet from the npm registry. See the [repository](https://github.com/Standkreis/design-system) for setup, integration, contribution and verification commands.

The code is MIT licensed with upstream notices preserved. Fonts use SIL OFL. See BRAND-USAGE.md before using Standkreis's name or logo. No proprietary photographs or 3D models are included.

Card offers default, soft, outline, primary and inverse surfaces, plus info, success, error and warning variants. Semantic status tokens pair `--info`, `--success`, `--error` and `--warning` text/icon colours with their corresponding `-surface` backgrounds in both themes. DiscoveryFeedback uses success; UncertaintyNotice uses warning. Card, CardTitle and CardDescription support `asChild` for semantic composition. Use `<Button variant="inverse" shape="pill">` for a light action on a dark photographic surface. The default Button remains rounded; all Card variants follow the shared radius scale.
