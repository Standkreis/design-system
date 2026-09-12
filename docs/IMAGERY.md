# Imagery and the marketing landing study

The user supplied an agricultural landing-page reference on 12 September 2026. Its strongest transferable ideas are photography as the main source of colour, white type over an atmospheric hero, restrained neutral surfaces, generous spacing, and alternating landscape/detail/human scales. The reference image itself is not redistributed in this repository.

The reference app now opens with an image-led marketing study, followed by the existing interactive library documentation. The hero uses a river landscape; a portrait of planting connects the larger place to individual care. An imagery section shows the three photographic scales and explains their use in EN/DE. This is a design exploration, not a deployed marketing site.

## Adopt and adapt

- Give the landscape room. Preserve natural photographic colours rather than applying a teal tint. Use a dark local gradient behind white hero copy, with a solid fallback background if the image cannot load.
- Use neutral light/dark surfaces around imagery. Reserve teal for small accents and deliberate actions.
- Alternate wide landscapes, detailed observation and people caring for living things. Future commissions should include community activity, regional food and natural water systems, with appropriate participant permission.
- Use confident type and generous space. Keep Titillium and the selected Gathered circle mark consistent. The rounded white hero CTA uses the shared shadcn-based Button with `variant="inverse"` and `shape="pill"`.
- Keep controls and information legible. Product interfaces still use familiar shared controls; photographic marketing treatments do not replace form or map surfaces.
- Avoid invented testimonials, impact figures, scientific overlays or implied community endorsements. The stock references are not evidence of Standkreis projects. There is no autoplay, parallax or attention-seeking loop.

## Photographs and provenance

Retrieved 12 September 2026. Each source page identifies the photo as free under the [Unsplash License](https://unsplash.com/license), which permits downloading, modifying and using photos, including commercially. These photos retain that licence; the repository's MIT licence does not relicense them. They are self-hosted in the reference app, not included in `@standkreis/ui`. No image service is contacted at runtime.

| Local file in apps/docs/public/images | Photographer       | Source                                                                |
| ------------------------------------- | ------------------ | --------------------------------------------------------------------- |
| river-landscape.webp                  | Aleksandr Isaychev | [River and meadow landscape](https://unsplash.com/photos/VQJD4kBfq0s) |
| ferns.webp                            | Teemu Paananen     | [Infinite Ferns](https://unsplash.com/photos/OOE4xAnBhKo)             |
| planting.webp                         | Jonathan Kemper    | [Gloved hands planting](https://unsplash.com/photos/CbZh3kaPxrE)      |

Images were downloaded from the source photo CDN as WebP at 1920 px width for the hero and 1200 px for the portraits, quality 82. The matching `-small.webp` derivatives use 960 px for the landscape, 480 px for ferns and 600 px for planting, at quality 75; responsive srcsets let the browser choose an appropriate source. Layouts crop via object-fit; the images have no composited branding or fabricated content. Responsive widths, explicit dimensions, a high-priority hero and lazy loading for lower-page photographs limit loading cost. Visible photographer/source links are in the imagery section. Decorative repeated thumbnail imagery uses empty alt; the principal photographs have EN/DE descriptions.

## Teal and white

The current brand accent is **#14B8A6**, inspired by Tailwind teal 500. Its contrast with white is **2.49:1**, so it is unsuitable for small white button labels. The shared action colour is a deeper **#0B8479** with **#FFFFFF** labels (**4.57:1**); hover uses **#0F766E** (**5.47:1**). Both themes use the same white-labelled actions. `primary-ink` remains a separate theme-aware colour for text. The palette remains open for feedback.
