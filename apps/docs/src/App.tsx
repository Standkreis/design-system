import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, Sun, Moon, Menu, Monitor } from "lucide-react";
import {
  Brand,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  StandkreisProvider,
  TooltipProvider,
  useTheme,
  type Locale,
  type Theme,
} from "@standkreis/ui";
import standkreisMark from "@standkreis/ui/assets/marks/standkreis-mark.svg?url";
import { brandChapters } from "./brand-chapters";
import { LandingStudy } from "./LandingStudy";
import { BrandGuide } from "./BrandGuide";
import { ComponentDocs, componentCatalog } from "./ComponentDocs";
import { DocLink, usePathname } from "./navigation";

const repository = "https://github.com/Standkreis/design-system";

function Reference({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}) {
  const t = (en: string, de: string) => (locale === "de" ? de : en);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const components =
    pathname === "/components" || pathname.startsWith("/components/");
  const validArea = components || pathname === "/" || pathname === "/brand";
  const slug = pathname.slice("/components/".length);
  const current = componentCatalog.find((item) => item.slug === slug);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOrigin = useRef(pathname);
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.append(link);
    }
    link.href = standkreisMark;
  }, []);
  useEffect(() => {
    document.title = `${components ? (current?.name ?? t("Components", "Komponenten")) : t("Brand guide", "Markenrichtlinien")} · Standkreis`;
  }, [components, current, locale]);
  const [activeBrandSection, setActiveBrandSection] = useState("overview");
  const sections = brandChapters.map((chapter) => [
    chapter.id,
    chapter[locale],
  ]);
  useEffect(() => {
    if (components) return;
    let frame = 0;
    const update = () => {
      const edge =
        (document.querySelector(".site-header")?.getBoundingClientRect()
          .bottom ?? 0) + 64;
      const ids = brandChapters.map((chapter) => chapter.id);
      const current = ids
        .filter((id) => {
          const section = document.getElementById(id);
          return section && section.getBoundingClientRect().top <= edge;
        })
        .at(-1);
      setActiveBrandSection(current ?? "overview");
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [components]);
  const appearanceLabel =
    theme === "dark"
      ? t("Dark", "Dunkel")
      : theme === "light"
        ? t("Light", "Hell")
        : t("System", "System");
  const AppearanceIcon =
    theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const componentNav = (mobile = false) => (
    <nav
      aria-label={t("Component documentation", "Komponentendokumentation")}
      className="component-navigation dashboard-navigation"
    >
      <DocLink
        href="/components"
        aria-current={pathname === "/components" ? "page" : undefined}
        onClick={() => {
          if (mobile) setMenuOpen(false);
        }}
      >
        {t("Getting started", "Erste Schritte")}
      </DocLink>
      {(["primitive", "pattern"] as const).map((group) => (
        <div key={group} className="nav-group">
          <span className="nav-group-label">
            {group === "primitive"
              ? t("Components", "Komponenten")
              : t("Standkreis patterns", "Standkreis-Muster")}
          </span>
          {componentCatalog
            .filter((item) => item.group === group)
            .map((item) => (
              <DocLink
                key={item.slug}
                href={`/components/${item.slug}`}
                aria-current={current?.slug === item.slug ? "page" : undefined}
                onClick={() => {
                  if (mobile) setMenuOpen(false);
                }}
              >
                {item.name}
              </DocLink>
            ))}
        </div>
      ))}
    </nav>
  );
  return (
    <TooltipProvider>
      <a href="#main-content" className="skip-link">
        {t("Skip to content", "Zum Inhalt")}
      </a>
      <header className="site-header">
        <DocLink
          href="/brand"
          className="home-link"
          aria-label={t(
            "Standkreis design system home",
            "Standkreis Designsystem Start",
          )}
        >
          <Brand />
        </DocLink>
        <nav
          className="area-navigation"
          aria-label={t("Design system areas", "Designsystem-Bereiche")}
        >
          <Button asChild variant={components ? "ghost" : "secondary"}>
            <DocLink
              href="/brand"
              aria-current={!components && validArea ? "page" : undefined}
            >
              {t("Brand", "Marke")}
            </DocLink>
          </Button>
          <Button asChild variant={components ? "secondary" : "ghost"}>
            <DocLink
              href="/components"
              aria-current={components ? "page" : undefined}
            >
              {t("Components", "Komponenten")}
            </DocLink>
          </Button>
        </nav>
        <div className="header-controls">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocale(locale === "en" ? "de" : "en")}
            aria-label={t("Switch to German", "Zu Englisch wechseln")}
          >
            {locale === "en" ? "DE" : "EN"}
          </Button>
          <Select
            value={theme}
            onValueChange={(value) => setTheme(value as Theme)}
          >
            <SelectTrigger
              aria-label={t("Appearance", "Darstellung")}
              aria-describedby="appearance-value"
              size="icon"
            >
              <SelectValue>
                <AppearanceIcon aria-hidden="true" />
                <span className="sr-only" id="appearance-value">
                  {appearanceLabel}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent position="popper" align="end">
              <SelectItem value="system">
                <Monitor aria-hidden="true" />
                {t("System", "System")}
              </SelectItem>
              <SelectItem value="light">
                <Sun aria-hidden="true" />
                {t("Light", "Hell")}
              </SelectItem>
              <SelectItem value="dark">
                <Moon aria-hidden="true" />
                {t("Dark", "Dunkel")}
              </SelectItem>
            </SelectContent>
          </Select>
          <Button asChild variant="ghost" size="icon">
            <a href={repository} aria-label="GitHub">
              <Github aria-hidden="true" />
            </a>
          </Button>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        {!components && validArea && <LandingStudy locale={locale} />}
        <div
          className={`docs-layout ${components ? "components-layout" : "brand-layout"}`}
        >
          <aside className="sidebar">
            <span className="sidebar-title">
              {components
                ? t("Component library", "Komponentenbibliothek")
                : t("Brand guide", "Markenrichtlinien")}
            </span>
            {components ? (
              <>
                <div className="desktop-component-nav">{componentNav()}</div>
                <div className="mobile-component-nav">
                  <Sheet
                    open={menuOpen}
                    onOpenChange={(open) => {
                      if (open) menuOrigin.current = pathname;
                      setMenuOpen(open);
                    }}
                  >
                    <SheetTrigger asChild>
                      <Button variant="outline">
                        <Menu aria-hidden="true" />
                        {t("Browse components", "Komponenten durchsuchen")}
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="component-nav-sheet"
                      onCloseAutoFocus={(event) => {
                        if (menuOrigin.current !== pathname) {
                          event.preventDefault();
                          document
                            .querySelector<HTMLElement>("main h1")
                            ?.focus({ preventScroll: true });
                        }
                      }}
                    >
                      <SheetHeader>
                        <SheetTitle>
                          {t("Component library", "Komponentenbibliothek")}
                        </SheetTitle>
                        <SheetDescription>
                          {t(
                            "Choose a component or pattern.",
                            "Wähle eine Komponente oder ein Muster.",
                          )}
                        </SheetDescription>
                      </SheetHeader>
                      {componentNav(true)}
                    </SheetContent>
                  </Sheet>
                </div>
              </>
            ) : (
              <nav
                className="dashboard-navigation brand-navigation"
                aria-label={t("Brand documentation", "Markendokumentation")}
              >
                {[
                  {
                    title: t("Explore", "Entdecken"),
                    items: sections.slice(0, 2),
                  },
                  {
                    title: t("Identity", "Identität"),
                    items: sections.slice(2, 8),
                  },
                  {
                    title: t("Behaviour", "Verhalten"),
                    items: sections.slice(8),
                  },
                ].map((group) => (
                  <div className="nav-group" key={group.title}>
                    <span className="nav-group-label">{group.title}</span>
                    {group.items.map(([id, title]) => (
                      <DocLink
                        key={id}
                        href={`/brand#${id}`}
                        aria-current={
                          activeBrandSection === id ? "location" : undefined
                        }
                      >
                        {title}
                      </DocLink>
                    ))}
                  </div>
                ))}
              </nav>
            )}
          </aside>
          <div className="main-content">
            {components ? (
              <ComponentDocs
                locale={locale}
                slug={pathname === "/components" ? undefined : slug}
                key={pathname}
              />
            ) : validArea ? (
              <BrandGuide locale={locale} />
            ) : (
              <div className="component-intro">
                <h1 tabIndex={-1}>
                  {t("Page not found", "Seite nicht gefunden")}
                </h1>
                <DocLink href="/brand">
                  {t(
                    "Return to the brand guide",
                    "Zurück zu den Markenrichtlinien",
                  )}
                </DocLink>
              </div>
            )}
            <footer className="site-footer">
              <Brand />
              <p>
                {t(
                  "Explore nature. Shape thriving ecosystems together.",
                  "Natur erkunden. Gemeinsam lebendige Ökosysteme gestalten.",
                )}
              </p>
              <a href={repository}>
                GitHub <ArrowRight size={14} aria-hidden="true" />
              </a>
            </footer>
          </div>
        </div>
      </main>
    </TooltipProvider>
  );
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      return localStorage.getItem("standkreis-docs-locale") === "de"
        ? "de"
        : "en";
    } catch {
      return "en";
    }
  });
  const changeLocale = (value: Locale) => {
    setLocale(value);
    try {
      localStorage.setItem("standkreis-docs-locale", value);
    } catch {
      /* Session preference still works. */
    }
  };
  return (
    <StandkreisProvider locale={locale}>
      <Reference locale={locale} setLocale={changeLocale} />
    </StandkreisProvider>
  );
}
