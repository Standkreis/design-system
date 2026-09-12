import { LandingStudy, ImageryStudy } from "./LandingStudy";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  Flower2,
  Globe2,
  Info,
  Leaf,
  MapPin,
  ScanLine,
  Sprout,
  Users,
  Droplets,
  Github,
  Sun,
  Moon,
} from "lucide-react";
import {
  Badge,
  Brand,
  BrandMark,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DiscoveryFeedback,
  IdentificationAction,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  StandkreisProvider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  UncertaintyNotice,
  useTheme,
  type Locale,
  type Theme,
} from "@standkreis/ui";

const repository = "https://github.com/Standkreis/design-system";
import standkreisMark from "@standkreis/ui/assets/marks/standkreis-mark.svg?url";

function Section({
  id,
  number,
  title,
  description,
  children,
}: {
  id: string;
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="doc-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-heading">
        <div>
          <span className="eyebrow">{number} / STANDKREIS</span>
          <h2 className="editorial-heading" id={`${id}-title`}>
            {title}
          </h2>
        </div>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

function Reference({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}) {
  const t = (en: string, de: string) => (locale === "de" ? de : en);
  const { theme, setTheme } = useTheme();
  const [saved, setSaved] = useState(false);
  const [checked, setChecked] = useState(false);
  const [includePlace, setIncludePlace] = useState(true);
  const [room, setRoom] = useState("atlas");
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const sections = [
    ["overview", t("Overview", "Überblick")],
    ["applications", t("Applications", "Anwendungen")],
    ["identity", t("Identity", "Identität")],
    ["colour", t("Colour & type", "Farbe & Schrift")],
    ["imagery", t("Imagery", "Bildsprache")],
    ["components", t("Components", "Komponenten")],
    ["patterns", t("Patterns & motion", "Muster & Bewegung")],
    ["guidance", t("Principles", "Prinzipien")],
    ["use", t("Use the library", "Bibliothek nutzen")],
  ];
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.append(link);
    }
    link.href = standkreisMark;
  }, []);
  const save = () => setSaved(true);
  return (
    <TooltipProvider>
      <a href="#overview" className="skip-link">
        {t("Skip to content", "Zum Inhalt")}
      </a>
      <header className="site-header">
        <a
          href="#overview"
          className="home-link"
          aria-label={t(
            "Standkreis design system home",
            "Standkreis Designsystem Start",
          )}
        >
          <Brand />
        </a>
        <span className="header-caption">
          {t("Design system", "Designsystem")}{" "}
          <Badge variant="secondary">0.1</Badge>
        </span>
        <div className="header-controls">
          <Button
            variant="ghost"
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
              className="theme-select"
            >
              {theme === "dark" ? (
                <Moon aria-hidden="true" />
              ) : (
                <Sun aria-hidden="true" />
              )}
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">{t("System", "System")}</SelectItem>
              <SelectItem value="light">{t("Light", "Hell")}</SelectItem>
              <SelectItem value="dark">{t("Dark", "Dunkel")}</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild variant="ghost" size="icon">
            <a href={repository} aria-label="GitHub">
              <Github aria-hidden="true" />
            </a>
          </Button>
        </div>
      </header>
      <main>
        <LandingStudy locale={locale} />
        <div className="docs-layout">
          <aside className="sidebar">
            <span className="eyebrow">
              {t("A shared foundation", "Eine gemeinsame Grundlage")}
            </span>
            <nav aria-label={t("Documentation", "Dokumentation")}>
              {sections.map(([id, title]) => (
                <a key={id} href={`#${id}`}>
                  {title}
                  <ArrowRight aria-hidden="true" size={14} />
                </a>
              ))}
            </nav>
            <div className="sidebar-note">
              <BrandMark width={48} height={48} />
              <p>
                {t(
                  "Different rooms.\nThe same place.",
                  "Verschiedene Räume.\nEin gemeinsamer Ort.",
                )}
              </p>
              <small>React · shadcn/ui</small>
            </div>
          </aside>
          <div className="main-content">
            <section
              className="overview"
              id="applications"
              aria-label={t("Application examples", "Anwendungsbeispiele")}
            >
              <div className="section-heading">
                <div>
                  <span className="eyebrow">
                    {t("A shared foundation", "Eine gemeinsame Grundlage")}
                  </span>
                  <h2 className="editorial-heading">
                    {t(
                      "Different rooms. The same place.",
                      "Verschiedene Räume. Derselbe Ort.",
                    )}
                  </h2>
                </div>
                <p>
                  {t(
                    "The imagery sets the scene. Familiar controls make it easy to explore, learn and contribute across every application.",
                    "Die Bilder schaffen den Rahmen. Vertraute Bedienelemente machen es leicht, in jeder Anwendung zu entdecken, zu lernen und mitzumachen.",
                  )}
                </p>
              </div>
              <Card variant="default" className="application-example">
                <div className="application-top">
                  <Brand
                    product={
                      room === "atlas"
                        ? "Atlas"
                        : room === "species"
                          ? "Species"
                          : "Community"
                    }
                  />
                  <Badge variant="outline">
                    {t("Component example", "Komponentenbeispiel")}
                  </Badge>
                </div>
                <Tabs value={room} onValueChange={setRoom}>
                  <div className="room-tabs">
                    <TabsList
                      aria-label={t("Example application", "Beispielanwendung")}
                    >
                      <TabsTrigger value="atlas">Atlas</TabsTrigger>
                      <TabsTrigger value="species">Species</TabsTrigger>
                      <TabsTrigger value="community">Community</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="atlas">
                    <div className="room-example">
                      <div>
                        <span className="eyebrow">
                          <Compass size={16} aria-hidden="true" />
                          {t("Follow your curiosity", "Folge deiner Neugier")}
                        </span>
                        <h2 className="editorial-heading">
                          {t(
                            "There is life\nall around you.",
                            "Um dich herum\nsteckt Leben.",
                          )}
                        </h2>
                        <p>
                          {t(
                            "A photo, a question, a moment of attention. Every encounter is a beginning.",
                            "Ein Foto, eine Frage, ein aufmerksamer Moment. Jede Begegnung ist ein Anfang.",
                          )}
                        </p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <IdentificationAction data-testid="identify" />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                {t(
                                  "Keep the encounter.",
                                  "Halte die Begegnung fest.",
                                )}
                              </DialogTitle>
                              <DialogDescription>
                                {t(
                                  "An interaction example of an uncertain identification. No camera or identification service is connected.",
                                  "Ein Interaktionsbeispiel für eine unsichere Bestimmung. Es ist keine Kamera und kein Bestimmungsdienst angebunden.",
                                )}
                              </DialogDescription>
                            </DialogHeader>
                            <UncertaintyNotice />
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button onClick={save}>
                                  {t(
                                    "Save without identification",
                                    "Ohne Bestimmung speichern",
                                  )}
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <Card variant="soft" className="field-card">
                        <span className="eyebrow">
                          {t("A quiet beginning", "Ein ruhiger Anfang")}
                        </span>
                        <div className="field-symbol">
                          <BrandMark width={150} height={150} />
                        </div>
                        <div>
                          <span className="field-caption">
                            {t(
                              "Your attention belongs to you.",
                              "Deine Aufmerksamkeit gehört dir.",
                            )}
                          </span>
                          <p>
                            {t(
                              "Going outside without opening an app counts, too.",
                              "Auch ohne geöffnete App zählt dein Draußensein.",
                            )}
                          </p>
                        </div>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="species">
                    <div className="room-example">
                      <div>
                        <span className="eyebrow">
                          <Flower2 size={16} aria-hidden="true" />
                          {t("Look a little closer", "Schau etwas genauer hin")}
                        </span>
                        <h2 className="editorial-heading">
                          {t(
                            "A small world.\nWorth exploring.",
                            "Eine kleine Welt.\nViel zu entdecken.",
                          )}
                        </h2>
                        <p>
                          {t(
                            "The same controls and typography, with space for a specialised viewer.",
                            "Dieselben Bedienelemente und dieselbe Schrift, mit Raum für einen spezialisierten Viewer.",
                          )}
                        </p>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button>
                              {t("Inspect a detail", "Ein Detail betrachten")}
                              <ArrowRight aria-hidden="true" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>
                                {t(
                                  "Room for understanding",
                                  "Raum zum Verstehen",
                                )}
                              </SheetTitle>
                              <SheetDescription>
                                {t(
                                  "An illustrative interface example, not a scientific model. Applications provide the evidence and specialised viewer.",
                                  "Ein illustratives Oberflächenbeispiel, kein wissenschaftliches Modell. Anwendungen liefern Belege und den spezialisierten Viewer.",
                                )}
                              </SheetDescription>
                            </SheetHeader>
                            <div className="sheet-body">
                              <Flower2
                                size={90}
                                strokeWidth={1}
                                aria-hidden="true"
                              />
                              <p>
                                <i>Malus domestica</i>
                              </p>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                      <Card variant="soft" className="field-card">
                        <Flower2
                          size={140}
                          strokeWidth={0.9}
                          aria-hidden="true"
                        />
                        <p>
                          {t(
                            "Viewer placeholder · no 3D model",
                            "Viewer-Platzhalter · kein 3D-Modell",
                          )}
                        </p>
                        <i>Malus domestica</i>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="community">
                    <div className="room-example">
                      <div>
                        <span className="eyebrow">
                          <Users size={16} aria-hidden="true" />
                          {t("A shared commitment", "Ein gemeinsames Anliegen")}
                        </span>
                        <h2 className="editorial-heading">
                          {t(
                            "What could\nthis place become?",
                            "Was könnte aus\ndiesem Ort werden?",
                          )}
                        </h2>
                        <p>
                          {t(
                            "Understand a place, imagine possibilities and take a first step together.",
                            "Einen Ort verstehen, Möglichkeiten entdecken und gemeinsam einen ersten Schritt gehen.",
                          )}
                        </p>
                        <Button asChild>
                          <a href="#patterns">
                            {t(
                              "Explore shared patterns",
                              "Gemeinsame Muster erkunden",
                            )}
                            <ArrowRight aria-hidden="true" />
                          </a>
                        </Button>
                      </div>
                      <Card variant="soft" className="field-card">
                        <Users size={110} strokeWidth={1} aria-hidden="true" />
                        <p>
                          {t(
                            "Local names and imagery.\nA familiar interface.",
                            "Lokale Namen und Bilder.\nEine vertraute Oberfläche.",
                          )}
                        </p>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="application-bottom">
                  <DiscoveryFeedback visible={saved} />
                  <span>
                    {t(
                      "Illustrative content · session-only state",
                      "Beispielinhalt · Zustand nur in dieser Sitzung",
                    )}
                  </span>
                </div>
              </Card>
            </section>

            <Section
              id="identity"
              number="01"
              title={t("Gathered around a place.", "Gemeinsam um einen Ort.")}
              description={t(
                "The Standkreis mark: three equal arcs, three equal gaps and one shared centre. One opening faces right.",
                "Das Standkreis-Zeichen: drei gleiche Bögen, drei gleiche Abstände und eine gemeinsame Mitte. Eine Öffnung zeigt nach rechts.",
              )}
            >
              <div className="logo-specimens">
                <Card variant="primary" className="logo-primary">
                  <span>{t("Gathered circle", "Gemeinsamer Kreis")}</span>
                  <BrandMark width={118} height={118} />
                  <small>
                    {t("One shared centre", "Eine gemeinsame Mitte")}
                  </small>
                </Card>
                <Card variant="inverse" className="logo-inverse">
                  <Brand product="Atlas" />
                  <div className="small-marks">
                    {[16, 24, 36, 48].map((size) => (
                      <BrandMark key={size} width={size} height={size} />
                    ))}
                  </div>
                  <a href={standkreisMark} download>
                    {t("Download SVG", "SVG herunterladen")}{" "}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </Card>
              </div>
            </Section>

            <Section
              id="colour"
              number="02"
              title={t(
                "Quiet surfaces. Human character.",
                "Ruhige Flächen. Menschlicher Charakter.",
              )}
              description={t(
                "Teal 500 gives the brand a fresh accent. A deeper action shade supports white labels. Neutral surfaces let photography carry the colour, with Titillium Web throughout.",
                "Teal 500 gibt der Marke einen frischen Akzent. Ein tieferer Aktionston trägt weiße Beschriftungen. Neutrale Flächen lassen den Fotografien ihre Farben, mit Titillium Web als gemeinsamer Schrift.",
              )}
            >
              <div className="swatch-grid">
                {[
                  ["background", t("Canvas", "Hintergrund")],
                  ["card", t("Surface", "Oberfläche")],
                  ["foreground", t("Ink", "Text")],
                  ["primary", t("Action", "Aktion")],
                  [
                    "brand-turquoise",
                    t("Brand / teal 500", "Marke / Teal 500"),
                  ],
                  ["warning", t("Uncertainty", "Unsicherheit")],
                ].map(([token, title]) => (
                  <div className="swatch" key={token}>
                    <div style={{ background: `var(--${token})` }} />
                    <strong>{title}</strong>
                    <code>--{token}</code>
                  </div>
                ))}
              </div>
              <Card variant="default" className="type-specimen">
                <div>
                  <span className="eyebrow">TITILLIUM WEB / 600</span>
                  <h3 className="editorial-heading">
                    {t("Stay curious.", "Bleib neugierig.")}
                    <br />
                    <span>{t("Go at your pace.", "In deinem Tempo.")}</span>
                  </h3>
                  <p className="alphabet">
                    Aa Bb Cc Dd Ee · Ä Ö Ü ß<br />
                    0123456789
                  </p>
                </div>
                <div>
                  <span className="eyebrow">400 / 600 / 700 / ITALIC</span>
                  <h4 className="editorial-heading">
                    {t(
                      "Every encounter is a beginning.",
                      "Jede Begegnung ist ein Anfang.",
                    )}
                  </h4>
                  <p>
                    {t(
                      "A shared typeface for headlines, reading and controls. Scientific names use real italics. Fonts are bundled locally.",
                      "Eine gemeinsame Schrift für Überschriften, Lesetext und Bedienelemente. Wissenschaftliche Namen nutzen echte Kursive. Schriften werden lokal eingebunden.",
                    )}
                  </p>
                  <i>Malus domestica · Quercus robur</i>
                </div>
              </Card>
              <div className="icon-row">
                {[
                  [ScanLine, t("Identify", "Bestimmen")],
                  [Compass, t("Explore", "Entdecken")],
                  [BookOpen, t("Learn", "Lernen")],
                  [MapPin, t("Place", "Ort")],
                  [Users, t("Together", "Gemeinsam")],
                  [Droplets, t("Water", "Wasser")],
                  [Sprout, t("Grow", "Wachsen")],
                  [Globe2, t("Globe", "Globus")],
                ].map(([Icon, label]) => {
                  const Symbol = Icon as typeof Leaf;
                  return (
                    <div key={String(label)}>
                      <Symbol aria-hidden="true" size={24} strokeWidth={1.65} />
                      <span>{String(label)}</span>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section
              id="imagery"
              number="03"
              title={t(
                "Life brings the colour.",
                "Das Leben bringt die Farbe.",
              )}
              description={t(
                "A landscape, a small detail, a moment of care. Photography gives the shared identity warmth and a sense of place.",
                "Eine Landschaft, ein kleines Detail, ein Moment der Fürsorge. Fotografie gibt der gemeinsamen Identität Wärme und ein Gefühl für den Ort.",
              )}
            >
              <ImageryStudy locale={locale} />
            </Section>

            <Section
              id="components"
              number="04"
              title={t(
                "Familiar from the first touch.",
                "Vertraut ab der ersten Berührung.",
              )}
              description={t(
                "shadcn/ui primitives adapted centrally. The same component serves every application, with visible labels and a clear focus state.",
                "Zentral angepasste shadcn/ui-Grundelemente. Dieselbe Komponente dient allen Anwendungen, mit sichtbaren Beschriftungen und klarem Fokus.",
              )}
            >
              <div className="component-grid">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("Actions", "Aktionen")}</CardTitle>
                    <CardDescription>
                      {t(
                        "One primary action; quiet supporting choices.",
                        "Eine Hauptaktion; ruhige ergänzende Möglichkeiten.",
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="specimen-content">
                    <div className="button-row">
                      <Button onClick={save}>
                        <Check aria-hidden="true" />
                        {t("Save encounter", "Begegnung speichern")}
                      </Button>
                      <Button variant="outline" onClick={() => setSaved(false)}>
                        {t("Reset example", "Beispiel zurücksetzen")}
                      </Button>
                      <Button variant="secondary" asChild>
                        <a href="#guidance">
                          {t("Learn more", "Mehr erfahren")}
                        </a>
                      </Button>
                      <Button disabled>
                        {t("Unavailable", "Nicht verfügbar")}
                      </Button>
                    </div>
                    <Separator />
                    <div className="button-row">
                      <Badge>
                        {t("Your observation", "Deine Beobachtung")}
                      </Badge>
                      <Badge variant="secondary">
                        {t("Example", "Beispiel")}
                      </Badge>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={t(
                              "About this example",
                              "Über dieses Beispiel",
                            )}
                          >
                            <Info aria-hidden="true" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {t(
                            "This state stays in your current session.",
                            "Dieser Zustand bleibt in deiner aktuellen Sitzung.",
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <DiscoveryFeedback visible={saved} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {t("A little context", "Ein bisschen Kontext")}
                    </CardTitle>
                    <CardDescription>
                      {t(
                        "Optional notes, at your own pace.",
                        "Optionale Notizen, in deinem Tempo.",
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="specimen-content">
                    <div className="field">
                      <Label htmlFor="encounter-name">
                        {t("Encounter name", "Name der Begegnung")}
                      </Label>
                      <Input
                        id="encounter-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t(
                          "A moment in the garden",
                          "Ein Moment im Garten",
                        )}
                      />
                    </div>
                    <div className="field">
                      <Label htmlFor="encounter-note">
                        {t("What did you notice?", "Was ist dir aufgefallen?")}
                      </Label>
                      <Textarea
                        id="encounter-note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={t(
                          "A detail, a question, a story…",
                          "Ein Detail, eine Frage, eine Geschichte…",
                        )}
                      />
                    </div>
                    <Label className="control-label" htmlFor="keep-private">
                      <Checkbox
                        id="keep-private"
                        checked={checked}
                        onCheckedChange={(value) => setChecked(value === true)}
                      />
                      {t(
                        "Keep this example private",
                        "Dieses Beispiel privat halten",
                      )}
                    </Label>
                    <Label className="control-label" htmlFor="include-place">
                      <Switch
                        id="include-place"
                        checked={includePlace}
                        onCheckedChange={setIncludePlace}
                      />
                      {t(
                        "Include a place in this example",
                        "Einen Ort im Beispiel einschließen",
                      )}
                    </Label>
                    <p className="small-note">
                      {t(
                        "Local form example. No data is sent or stored.",
                        "Lokales Formularbeispiel. Es werden keine Daten gesendet oder gespeichert.",
                      )}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </Section>

            <Section
              id="patterns"
              number="05"
              title={t(
                "Helpful through uncertainty.",
                "Hilfreich bei Unsicherheit.",
              )}
              description={t(
                "Explain what is known. Offer a next step without pressure. Motion follows a deliberate action and respects reduced-motion preferences.",
                "Erkläre, was bekannt ist. Biete ohne Druck einen nächsten Schritt an. Bewegung folgt einer bewussten Aktion und respektiert reduzierte Bewegung.",
              )}
            >
              <div className="pattern-grid">
                <div>
                  <UncertaintyNotice />
                  <p className="pattern-note">
                    {t(
                      "Static uncertainty is a calm explanation, not an urgent alert. Suggestions require evidence.",
                      "Statische Unsicherheit ist eine ruhige Erklärung, kein dringender Alarm. Vorschläge brauchen Belege.",
                    )}
                  </p>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {t(
                        "A gentle change of focus",
                        "Ein sanfter Fokuswechsel",
                      )}
                    </CardTitle>
                    <CardDescription>
                      {t(
                        "Open a panel. Close it. Your place is preserved.",
                        "Öffne ein Fenster. Schließe es. Deine Position bleibt erhalten.",
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" data-testid="open-sheet">
                          {t("Open detail panel", "Detailfenster öffnen")}
                          <ArrowRight aria-hidden="true" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right">
                        <SheetHeader>
                          <SheetTitle>
                            {t(
                              "There is more to notice.",
                              "Es gibt mehr zu entdecken.",
                            )}
                          </SheetTitle>
                          <SheetDescription>
                            {t(
                              "You decide when to look closer. This detail can wait.",
                              "Du entscheidest, wann du genauer hinschaust. Dieses Detail kann warten.",
                            )}
                          </SheetDescription>
                        </SheetHeader>
                        <div className="sheet-body">
                          <BrandMark width={92} height={92} />
                          <p>
                            {t(
                              "Focus returns to the opening control when you close this panel.",
                              "Beim Schließen kehrt der Fokus zum auslösenden Element zurück.",
                            )}
                          </p>
                        </div>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button variant="outline">
                              {t("Back to exploring", "Zurück zum Entdecken")}
                            </Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </CardContent>
                </Card>
              </div>
            </Section>

            <Section
              id="guidance"
              number="06"
              title={t("Built around care.", "Für ein achtsames Miteinander.")}
              description={t(
                "The system carries more than colours. These principles guide what we build and how it behaves.",
                "Das System vermittelt mehr als Farben. Diese Prinzipien leiten, was wir bauen und wie es sich verhält.",
              )}
            >
              <div className="principle-grid">
                {[
                  [
                    Leaf,
                    t(
                      "Attention belongs to people",
                      "Aufmerksamkeit gehört den Menschen",
                    ),
                    t(
                      "A walk without opening an app is a success. No streak pressure, reminders or competitive discovery.",
                      "Ein Spaziergang ohne App ist ein Erfolg. Kein Streak-Druck, keine Erinnerungen und kein Entdeckungswettbewerb.",
                    ),
                  ],
                  [
                    Users,
                    t("Share by default", "Gemeinsam als Standard"),
                    t(
                      "Extend shared components when reuse is credible. Document intentional differences.",
                      "Erweitere gemeinsame Komponenten, wenn Wiederverwendung sinnvoll ist. Begründe bewusste Unterschiede.",
                    ),
                  ],
                  [
                    MapPin,
                    t(
                      "Show real places and people",
                      "Zeige echte Orte und Menschen",
                    ),
                    t(
                      "Imagery connects the abstract identity to local life, food and water. Label illustrative models honestly.",
                      "Bilder verbinden die abstrakte Identität mit lokalem Leben, Nahrung und Wasser. Kennzeichne illustrative Modelle ehrlich.",
                    ),
                  ],
                ].map(([Icon, title, body]) => {
                  const Symbol = Icon as typeof Leaf;
                  return (
                    <Card key={String(title)} variant="outline" asChild>
                      <article>
                        <CardHeader>
                          <Symbol
                            size={25}
                            strokeWidth={1.65}
                            aria-hidden="true"
                          />
                          <CardTitle asChild className="principle-title">
                            <h3>{String(title)}</h3>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription asChild>
                            <p>{String(body)}</p>
                          </CardDescription>
                        </CardContent>
                      </article>
                    </Card>
                  );
                })}
              </div>
              <p className="small-note">
                {t(
                  "Imagery guidance is included; no proprietary stock photographs or model assets are distributed with the library.",
                  "Bildrichtlinien sind enthalten; die Bibliothek enthält keine proprietären Stockfotos oder Modell-Assets.",
                )}
              </p>
            </Section>

            <Section
              id="use"
              number="07"
              title={t(
                "Bring the same place to your app.",
                "Bring denselben Ort in deine App.",
              )}
              description={t(
                "An ESM React package with TypeScript declarations, compiled CSS, optional local fonts and SVG assets. No Tailwind setup is required for the prebuilt styles.",
                "Ein ESM-React-Paket mit TypeScript-Deklarationen, kompiliertem CSS, optionalen lokalen Schriften und SVG-Assets. Die fertigen Styles benötigen kein Tailwind-Setup.",
              )}
            >
              <div className="install-grid">
                <div>
                  <Badge variant="outline">@standkreis/ui · 0.1.0</Badge>
                  <h3 className="editorial-heading">
                    {t(
                      "Install from a local package",
                      "Aus einem lokalen Paket installieren",
                    )}
                  </h3>
                  <p>
                    {t(
                      "The repository is the source of truth. This initial version is not published to npm. Build and pack it from the repository, then install the archive in an application.",
                      "Das Repository ist die zentrale Quelle. Diese erste Version ist nicht auf npm veröffentlicht. Baue und packe sie im Repository und installiere das Archiv in einer Anwendung.",
                    )}
                  </p>
                  <Button asChild variant="outline">
                    <a href={`${repository}#readme`}>
                      {t(
                        "Read the integration guide",
                        "Integrationsanleitung lesen",
                      )}
                      <ArrowRight aria-hidden="true" />
                    </a>
                  </Button>
                </div>
                <pre>
                  <code>{`import '@standkreis/ui/fonts.css';\nimport '@standkreis/ui/styles.css';\nimport {\n  StandkreisProvider,\n  IdentificationAction,\n} from '@standkreis/ui';\n\n<StandkreisProvider locale="${locale}">\n  <IdentificationAction\n    onClick={openCamera}\n  />\n</StandkreisProvider>`}</code>
                </pre>
              </div>
            </Section>
            <footer className="site-footer">
              <Brand />
              <p>
                {t(
                  "Explore nature. Shape thriving ecosystems together.",
                  "Natur erkunden. Gemeinsam lebendige Ökosysteme gestalten.",
                )}
              </p>
              <a href={`${repository}/blob/main/docs/BRAND.md`}>
                {t("Brand principles", "Markenprinzipien")}{" "}
                <ArrowRight size={14} aria-hidden="true" />
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
