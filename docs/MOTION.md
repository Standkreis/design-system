# Motion

Motion explains an action and its result. It must preserve a person's place, focus and freedom to stop. The brand guide's `/brand#motion` chapter contains live acknowledgement and panel examples using the shared components.

- `--motion-fast` (160 ms): small control responses, hover and focus.
- `--motion-base` (240 ms): state changes, overlays and acknowledgement.
- `--motion-panel` (360 ms): panels and deliberate changes of viewpoint.
- `--ease-standkreis`: `cubic-bezier(0.22, 1, 0.36, 1)`. Respond quickly and settle gently, without bounce.

Page anchors use native smooth scrolling. Its duration is browser-controlled; reduced motion returns to immediate scrolling. The active Brand sidebar item follows the visible chapter. Keep the destination clear of the sticky header.

Respect `prefers-reduced-motion` for both CSS and programmatic animation. The shared stylesheet removes transitions and animations under that preference; the illustrative 3D camera also moves directly to its destination. Restore focus after overlays and place it on the destination heading after page navigation.

A scene stays still until someone acts. No automatic orbiting, ambient loops, scroll-jacking, animated logos, streaks, countdown pressure or attention reminders. Acknowledgement follows a completed action; it is not a reward for returning to the application.
