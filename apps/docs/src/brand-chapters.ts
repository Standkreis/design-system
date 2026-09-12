import type { Locale } from "@standkreis/ui";

export const brandChapters = [
  { id: "overview", en: "Overview", de: "Überblick" },
  { id: "applications", en: "Applications", de: "Anwendungen" },
  { id: "logo", en: "Logo", de: "Logo" },
  { id: "colour", en: "Colours", de: "Farben" },
  { id: "typography", en: "Typography", de: "Typografie" },
  { id: "icons", en: "Icons", de: "Icons" },
  { id: "imagery", en: "Imagery", de: "Bildsprache" },
  { id: "spatial", en: "3D & space", de: "3D & Raum" },
  { id: "patterns", en: "Voice", de: "Sprache" },
  { id: "motion", en: "Motion", de: "Bewegung" },
  { id: "guidance", en: "Principles", de: "Prinzipien" },
] as const;
export type BrandChapterId = (typeof brandChapters)[number]["id"];
export function brandChapterTitle(id: BrandChapterId, locale: Locale) {
  return brandChapters.find((chapter) => chapter.id === id)![locale];
}
