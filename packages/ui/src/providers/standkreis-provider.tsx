"use client";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import { ThemeProvider, type Theme } from "./theme-provider.js";

export type Locale = "en" | "de";
export const messages = {
  en: {
    close: "Close",
    identify: "Identify a species",
    uncertain: "Identification still open",
    uncertaintyDescription:
      "The visible features are not enough for a reliable suggestion. You can save this encounter without naming a species.",
    saved: "Encounter saved. You can return to it whenever you like.",
  },
  de: {
    close: "Schließen",
    identify: "Eine Art bestimmen",
    uncertain: "Bestimmung noch offen",
    uncertaintyDescription:
      "Die sichtbaren Merkmale reichen für einen verlässlichen Vorschlag nicht aus. Du kannst die Begegnung auch ohne Artnamen festhalten.",
    saved: "Begegnung gespeichert. Du kannst jederzeit darauf zurückkommen.",
  },
} as const;
const LocaleContext = createContext<Locale>("en");

export function StandkreisProvider({
  locale = "en",
  defaultTheme = "system",
  children,
}: {
  locale?: Locale;
  defaultTheme?: Theme;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return (
    <LocaleContext.Provider value={locale}>
      <ThemeProvider defaultTheme={defaultTheme}>{children}</ThemeProvider>
    </LocaleContext.Provider>
  );
}
export function useLocale() {
  const locale = useContext(LocaleContext);
  return { locale, messages: messages[locale] };
}
