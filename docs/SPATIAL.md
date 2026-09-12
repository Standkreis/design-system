# 3D and spatial design

3D is a first-class part of Standkreis's visual language. Use it when spatial structure helps people understand a place, a plant or relationships between layers. `/brand#spatial` contains an original, interactive low-poly area study and the associated guidance.

## Area illustrations

Use faceted organic forms, matte materials, a restrained natural palette and a clear silhouette. Visible soil layers help explain a place as a volume. Use an elevated overview, soft directional lighting and restrained shadows. Keep enough space around the subject to read it at a glance. Teal remains available for selections and controls rather than coating the entire scene.

The surrounding canvas follows the application's light/dark tokens. Materials should retain their meaning across themes; do not recolour vegetation merely to match a button. Avoid metallic, glassy or glossy treatments unless they explain the subject.

## Detail follows purpose

Low-poly is the direction for illustrative area overviews and imagined possibilities. It is not a requirement to simplify biological or geographic evidence:

- Area and community views: readable layers, paths and spatial relationships.
- Species and individual plants: as much geometric or texture detail as identification and explanation need.
- Globe and biodiversity views: geographic clarity, legible overlays and scale-aware information.

Clearly distinguish illustration, measured geometry, observation and scenario. Only claim model accuracy or species identity when the underlying data supports it. Do not imply a scientific simulation from an attractive scene.

## Shared interaction

Provide useful viewpoints, a clear reset and labelled layers. Support keyboard controls alongside any drag gestures. Leave ordinary page scrolling intact and make essential content available outside the renderer. Do not autoplay or orbit a scene automatically. Camera movement follows a deliberate action, uses the shared motion timing and respects reduced motion.

Use shared shadcn-based controls around the viewer. Scene geometry, scientific behaviour and specialised rendering remain application responsibilities. Extend shared controls or patterns when there is credible reuse across applications.

## Reference implementation

The study creates original generic 3D geometry and projects it orthographically into SVG. It needs no WebGL context, remote assets or third-party renderer. Rotation, top view, a canopy layer and reset demonstrate interaction principles; the scene carries a descriptive text alternative. It renders camera transitions only after changes and cancels scheduled frames on cleanup. It is illustrative geometry, not a production terrain engine, surveyed location or species model.

This lightweight study does not prescribe SVG for consuming applications. WebGL, WebGPU, map engines or specialist viewers can follow the same identity and interaction rules. Render on demand where possible, stop work while offscreen, release resources on unmount and provide a useful fallback when a renderer cannot run.
