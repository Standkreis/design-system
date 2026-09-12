# Standkreis — agreed direction

Captured from the branding conversation on 12 September 2026. The user subsequently authorised this shared design-system repository, based on shadcn/ui. The Gathered circle with its central dot is the selected mark.

## Purpose and origin

Working promise: **Standkreis helps people explore nature and shape thriving ecosystems together.**

The name originated around 2014 among students at the environmental campus in Birkenfeld. Individual “Standpunkte” become shared “Standkreise”: people standing up together for the piece of land they call home. The name combines physical place, community and shared commitment. The founding ambition concerned healthy ecosystems and food production.

Desired outcomes include more trees, biomass and species diversity; more natural water systems; more people learning and participating outdoors; and more accessible regional food. The software supports people working towards these outcomes; it does not guarantee them.

## Identity

- One place with different rooms: a coherent family of applications, not separate product brands.
- Species's light canvas and turquoise are the visual starting point. Clean, minimal, futuristic, with careful motion.
- Titillium Web remains the lead typeface for its perceived organic/human character and versatility. Alternatives remain possible but are not required for the first study.
- Logo may be abstract. Circle-led exploration should draw from place, shared commitment and participation. Invitation is preferred without forcing the mark to explain every part of the story.
- Existing GitHub identity combines a tree and compass needle with overlapping circles. Existing Atlas identity uses an open circle and central dot. Both informed the exploration; the selected mark is the Gathered circle with its central dot.
- Community names, imagery and optional emblems can express local identity. Fonts and interface colours remain consistent for now.

## People

Working personas, not validated research:

- Lena, 32: curious newcomer; wants to notice and understand nearby life. Guides the first encounter.
- Malik, 45: community organiser; needs investigation to become shared, manageable action. Guides collaboration.
- Eva, 58: experienced local observer; wants credible evidence, visible uncertainty and ways to share knowledge. Guides depth.

## Behaviour

- Delightfully support a discovery journey; never proactively compete for attention.
- Progress can be visible from the start. No guilt, streak pressure, engagement reminders, leaderboards or competitive challenges in the current scope.
- Time outside without the application counts as success. Photos, stories and unrecorded enjoyment are all valuable.
- Avoid incentives that could encourage wildlife disturbance, including races for rare species.
- In Atlas, species identification must remain easy to reach. A core action should be obvious and quietly available.
- Uncertainty is explicit, helpful and encouraging. Alternatives must be supported by evidence. Additional photos and community identification are future capabilities, not present promises.
- Motion responds to deliberate actions; no ambient attention-seeking loops. Include reduced-motion behaviour.
- German and English from the start. Clear, encouraging voice; informal German “du” proposed as the working voice.
- Light-first, complete dark mode, system preference by default, persistent manual override. Specialised canvases may retain the background needed for their content.
- Accessibility implementation baseline proposed for the studies: labels, keyboard access, visible focus, touch-friendly controls, colour-independent meaning and reduced motion.

## Product map

Atlas is the settled name. Other names are provisional.

| Working name      | Role                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| Atlas             | Discover local species and record encounters                                                              |
| Species           | Inspect organisms and their features in 3D                                                                |
| Globe             | Explore biodiversity and areas globally                                                                   |
| Community         | Investigate, imagine, plan and build an ecosystem together                                                |
| Grow              | Register and support individual plants, including houseplants; distinct from ecosystem/community planning |
| Taxonomy          | Explore biological classification                                                                         |
| Marketing website | Explain Standkreis and introduce its applications                                                         |

“Standkreis + product” remains the proposed family naming convention. Product names must remain easy to change.

## Library direction, after exploration

Share by default; extend for credible reuse; diverge deliberately for a documented reason. Applications should use existing shared components. Specialised components may stay local. Prefer extending the core when another application could benefit.

Open source is welcome; optimise for Standkreis first. Code licence and name/logo usage rules remain undecided. No publication or blanket asset licence is implied by this brief.

Success criteria: **coherence, consistency, smooth motion, delightful experiences**.

## Selected mark

The user selected the middle direction, Gathered circle, with the circle in the centre and requested removal of the alternatives. This is now the only mark in the library and reference app.

Repeat the identical 90° arc at rotations 30°, 150° and 270° about (50, 50). Radius 36, stroke width 10, identical round caps and equal 30° centreline gaps. One gap is centred at 3 o’clock. The central dot has radius 5. Keep this geometry identical in React and the exported SVG. Do not animate the mark as a loading indicator.

## Current colour and imagery exploration

The user prefers the supplied agricultural landing-page reference for its image-led colour and mood, and suggested teal 500 with white contrast. The current accent is **#14B8A6**. Shared actions use **#0B8479** with white labels to preserve readable contrast; hover is **#0F766E**. Use `primary-ink` for coloured text, and neutral supporting surfaces to let photography lead. Titillium and the selected mark remain consistent.

The reference landing page adopts a panoramic photographic hero, white hero typography, generous editorial spacing and landscape/detail/human imagery. It keeps illustrative application compositions in the brand guide. Individual component documentation lives in a separate `/components` area with its own navigation. [Imagery decisions, photo provenance and colour measurements](IMAGERY.md) record what was adopted and how it was adapted.

The dark interface now uses cool charcoal surfaces (`#111315` canvas, `#1B1F22` cards), with teal accents. Logo, typography, icons, 3D and motion have dedicated chapters in the brand guide. Low-poly area illustration is a shared visual direction; detailed species and geographic viewers retain the precision their purpose needs. See [spatial guidance](SPATIAL.md) and [motion guidance](MOTION.md).

Still open: palette feedback, broader imagery including community activity and regional food, application integrations and rollout.

## Implementation authorization

The user requested a new repository in the Standkreis organisation and authorised starting the design system based on shadcn/ui. The initial library and reference app implement the shared foundations; application migrations remain separate work.
