"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "system" | "light" | "dark";
export const themeStorageKey = "standkreis-theme";
const validTheme = (value: unknown): value is Theme =>
  value === "system" || value === "light" || value === "dark";
const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

/** One provider at the application root. Listens to device and other-tab changes. */
export function ThemeProvider({
  children,
  defaultTheme = "system",
}: {
  children: ReactNode;
  defaultTheme?: Theme;
}) {
  // Stable server/first-client render; browser storage is read after mounting.
  const [theme, updateTheme] = useState<Theme>(defaultTheme);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(themeStorageKey);
      if (validTheme(saved)) updateTheme(saved);
    } catch {
      /* Storage can be unavailable. */
    }
    setReady(true);
    const onStorage = (event: StorageEvent) => {
      if (event.key === themeStorageKey || event.key === null)
        updateTheme(validTheme(event.newValue) ? event.newValue : defaultTheme);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [defaultTheme]);
  useEffect(() => {
    if (!ready) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = theme === "dark" || (theme === "system" && media.matches);
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.style.colorScheme = dark ? "dark" : "light";
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme, ready]);
  const setTheme = (value: Theme) => {
    updateTheme(value);
    try {
      localStorage.setItem(themeStorageKey, value);
    } catch {
      /* Keep an in-memory preference. */
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
