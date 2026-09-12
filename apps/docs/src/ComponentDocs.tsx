import { useState, type ReactNode } from "react";
import { ArrowRight, Check, Info, Plus } from "lucide-react";
import {
  Badge,
  Brand,
  BrandMark,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  UncertaintyNotice,
  type Locale,
} from "@standkreis/ui";
import { DocLink } from "./navigation";
import { componentDetails } from "./component-details";

type Translate = (en: string, de: string) => string;
export const componentCatalog = [
  { slug: "badge", name: "Badge", group: "primitive" },
  { slug: "button", name: "Button", group: "primitive" },
  { slug: "card", name: "Card", group: "primitive" },
  { slug: "checkbox", name: "Checkbox", group: "primitive" },
  { slug: "dialog", name: "Dialog", group: "primitive" },
  { slug: "input", name: "Input", group: "primitive" },
  { slug: "label", name: "Label", group: "primitive" },
  { slug: "select", name: "Select", group: "primitive" },
  { slug: "separator", name: "Separator", group: "primitive" },
  { slug: "sheet", name: "Sheet", group: "primitive" },
  { slug: "switch", name: "Switch", group: "primitive" },
  { slug: "tabs", name: "Tabs", group: "primitive" },
  { slug: "textarea", name: "Textarea", group: "primitive" },
  { slug: "tooltip", name: "Tooltip", group: "primitive" },
  { slug: "brand", name: "Brand", group: "pattern" },
  { slug: "brand-mark", name: "BrandMark", group: "pattern" },
  { slug: "discovery-feedback", name: "DiscoveryFeedback", group: "pattern" },
  {
    slug: "identification-action",
    name: "IdentificationAction",
    group: "pattern",
  },
  { slug: "uncertainty-notice", name: "UncertaintyNotice", group: "pattern" },
] as const;

function Example({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="example-group">
      <h3 className="example-label">{title}</h3>
      {children}
    </div>
  );
}

function Demo({ slug, t }: { slug: string; t: Translate }) {
  const [saved, setSaved] = useState(false);
  const [checked, setChecked] = useState(false);
  const [includePlace, setIncludePlace] = useState(true);
  const [text, setText] = useState("");
  const [selection, setSelection] = useState("garden");
  switch (slug) {
    case "button":
      return (
        <>
          <Example title={t("Actions & variants", "Aktionen & Varianten")}>
            <div className="button-row">
              <Button onClick={() => setSaved(true)}>
                <Check aria-hidden="true" />
                {t("Save encounter", "Begegnung speichern")}
              </Button>
              <Button variant="secondary" onClick={() => setSaved(false)}>
                {t("Reset example", "Beispiel zurücksetzen")}
              </Button>
              <Button variant="outline" onClick={() => setSaved(false)}>
                {t("Cancel", "Abbrechen")}
              </Button>
              <Button variant="ghost" asChild>
                <DocLink href="/brand#guidance">
                  {t("Principles", "Prinzipien")}
                </DocLink>
              </Button>
              <Button variant="link" asChild>
                <DocLink href="/components/card">Card</DocLink>
              </Button>
              <Button variant="destructive" onClick={() => setSaved(false)}>
                {t("Clear example", "Beispiel leeren")}
              </Button>
              <Button disabled>{t("Unavailable", "Nicht verfügbar")}</Button>
            </div>
            <DiscoveryFeedback visible={saved} />
          </Example>
          <Example title={t("Sizes & shape", "Größen & Form")}>
            <div className="button-row">
              <Button size="sm" variant="outline">
                Small
              </Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button shape="pill">Pill</Button>
              <Button
                size="icon"
                variant="outline"
                aria-label={t("Add a note", "Notiz hinzufügen")}
                onClick={() => setSaved(true)}
              >
                <Plus aria-hidden="true" />
              </Button>
            </div>
          </Example>
          <Example
            title={t("On an inverse surface", "Auf einer inversen Fläche")}
          >
            <Card variant="inverse">
              <CardContent>
                <Button variant="inverse" shape="pill" asChild>
                  <DocLink href="/brand">
                    {t("Explore Standkreis", "Standkreis entdecken")}
                    <ArrowRight aria-hidden="true" />
                  </DocLink>
                </Button>
              </CardContent>
            </Card>
          </Example>
        </>
      );
    case "badge":
      return (
        <Example title={t("Variants", "Varianten")}>
          <div className="button-row">
            {(
              [
                "default",
                "secondary",
                "outline",
                "destructive",
                "ghost",
                "link",
              ] as const
            ).map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
          </div>
        </Example>
      );
    case "card":
      return (
        <div className="card-demo-grid">
          {(["default", "soft", "outline", "primary", "inverse"] as const).map(
            (variant) => (
              <Card key={variant} variant={variant} asChild>
                <article>
                  <CardHeader>
                    <CardTitle asChild>
                      <h3>{variant}</h3>
                    </CardTitle>
                    <CardDescription>
                      {t(
                        "A shared surface, in every application.",
                        "Eine gemeinsame Fläche, in jeder Anwendung.",
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      {t(
                        "Space for a thought, an observation or a next step.",
                        "Raum für einen Gedanken, eine Beobachtung oder einen nächsten Schritt.",
                      )}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <span>
                      {t("Standkreis · Example", "Standkreis · Beispiel")}
                    </span>
                  </CardFooter>
                </article>
              </Card>
            ),
          )}
        </div>
      );
    case "input":
      return (
        <div className="demo-fields">
          <div className="field">
            <Label htmlFor="encounter-name">
              {t("Encounter name", "Name der Begegnung")}
            </Label>
            <Input
              id="encounter-name"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={t("A moment in the garden", "Ein Moment im Garten")}
            />
          </div>
          <div className="field">
            <Label htmlFor="invalid-name">
              {t("Required name", "Erforderlicher Name")}
            </Label>
            <Input
              id="invalid-name"
              aria-invalid="true"
              aria-describedby="name-error"
            />
            <p className="demo-error" id="name-error">
              {t(
                "Add a name to continue.",
                "Gib einen Namen ein, um fortzufahren.",
              )}
            </p>
          </div>
          <div className="field">
            <Label htmlFor="disabled-name">
              {t("Unavailable field", "Nicht verfügbares Feld")}
            </Label>
            <Input
              id="disabled-name"
              disabled
              value={t("Example", "Beispiel")}
            />
          </div>
        </div>
      );
    case "textarea":
      return (
        <div className="demo-fields">
          <div className="field">
            <Label htmlFor="encounter-note">
              {t("What did you notice?", "Was ist dir aufgefallen?")}
            </Label>
            <Textarea
              id="encounter-note"
              value={text}
              onChange={(event) => setText(event.target.value)}
              aria-describedby="note-hint"
              placeholder={t(
                "A detail, a question, a story…",
                "Ein Detail, eine Frage, eine Geschichte…",
              )}
            />
            <p id="note-hint" className="small-note">
              {t(
                "Optional. A few words are enough.",
                "Optional. Ein paar Worte reichen.",
              )}
            </p>
          </div>
          <div className="field">
            <Label htmlFor="disabled-note">
              {t("Unavailable note", "Nicht verfügbare Notiz")}
            </Label>
            <Textarea id="disabled-note" disabled />
          </div>
        </div>
      );
    case "label":
      return (
        <div className="demo-fields">
          <div className="field">
            <Label htmlFor="label-example">{t("Place name", "Ortsname")}</Label>
            <Input
              id="label-example"
              placeholder={t("Your garden", "Dein Garten")}
            />
          </div>
          <p className="small-note">
            {t(
              "Click the label to focus its field.",
              "Klicke auf die Beschriftung, um das Feld zu fokussieren.",
            )}
          </p>
        </div>
      );
    case "checkbox":
      return (
        <div className="demo-fields">
          <Label className="control-label" htmlFor="keep-private">
            <Checkbox
              id="keep-private"
              checked={checked}
              onCheckedChange={(value) => setChecked(value === true)}
            />
            {t("Keep this example private", "Dieses Beispiel privat halten")}
          </Label>
          <Label className="control-label" htmlFor="checkbox-disabled">
            <Checkbox id="checkbox-disabled" disabled defaultChecked />
            {t("Unavailable option", "Nicht verfügbare Option")}
          </Label>
        </div>
      );
    case "switch":
      return (
        <div className="demo-fields">
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
          <Label className="control-label" htmlFor="switch-disabled">
            <Switch id="switch-disabled" disabled />
            {t("Unavailable setting", "Nicht verfügbare Einstellung")}
          </Label>
        </div>
      );
    case "select":
      return (
        <div className="demo-fields">
          <div className="field">
            <Label htmlFor="place-select">
              {t("Example place", "Beispielort")}
            </Label>
            <Select value={selection} onValueChange={setSelection}>
              <SelectTrigger id="place-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="garden">{t("Garden", "Garten")}</SelectItem>
                <SelectItem value="woodland">
                  {t("Woodland", "Wald")}
                </SelectItem>
                <SelectItem value="river">{t("River", "Fluss")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    case "separator":
      return (
        <div className="demo-fields">
          <p>{t("An observation", "Eine Beobachtung")}</p>
          <Separator />
          <p>{t("Its supporting context", "Der zugehörige Kontext")}</p>
          <div className="separator-demo">
            <span>Atlas</span>
            <Separator orientation="vertical" />
            <span>Standkreis</span>
          </div>
        </div>
      );
    case "tabs":
      return (
        <>
          {(["default", "line"] as const).map((variant) => (
            <Example key={variant} title={variant}>
              <Tabs defaultValue="encounter">
                <TabsList
                  variant={variant}
                  aria-label={t(
                    `Example views (${variant})`,
                    `Beispielansichten (${variant})`,
                  )}
                >
                  <TabsTrigger value="encounter">
                    {t("Encounter", "Begegnung")}
                  </TabsTrigger>
                  <TabsTrigger value="context">
                    {t("Context", "Kontext")}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="encounter">
                  <p className="tab-demo-copy">
                    {t(
                      "Start with what caught your attention.",
                      "Beginne mit dem, was dir aufgefallen ist.",
                    )}
                  </p>
                </TabsContent>
                <TabsContent value="context">
                  <p className="tab-demo-copy">
                    {t(
                      "Add a place or a note when it helps.",
                      "Ergänze einen Ort oder eine Notiz, wenn es hilft.",
                    )}
                  </p>
                </TabsContent>
              </Tabs>
            </Example>
          ))}
        </>
      );
    case "dialog":
      return (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button>{t("Open dialog", "Dialog öffnen")}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {t("Keep the encounter.", "Halte die Begegnung fest.")}
                </DialogTitle>
                <DialogDescription>
                  {t(
                    "This example stays in your browser. Nothing is uploaded.",
                    "Dieses Beispiel bleibt in deinem Browser. Nichts wird hochgeladen.",
                  )}
                </DialogDescription>
              </DialogHeader>
              <UncertaintyNotice />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t("Cancel", "Abbrechen")}</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={() => setSaved(true)}>
                    {t("Save example", "Beispiel speichern")}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DiscoveryFeedback visible={saved} />
        </>
      );
    case "sheet":
      return (
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
                {t("There is more to notice.", "Es gibt mehr zu entdecken.")}
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
      );
    case "tooltip":
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label={t("About this example", "Über dieses Beispiel")}
            >
              <Info aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {t(
              "Example content stays in this browser session.",
              "Beispielinhalte bleiben in dieser Browsersitzung.",
            )}
          </TooltipContent>
        </Tooltip>
      );
    case "brand":
      return (
        <div className="demo-fields">
          <Brand />
          <Brand product="Atlas" />
          <Brand product="Species" />
        </div>
      );
    case "brand-mark":
      return (
        <div className="button-row">
          {[24, 48, 96].map((size) => (
            <BrandMark
              key={size}
              width={size}
              height={size}
              label={`Standkreis · ${size}px`}
            />
          ))}
        </div>
      );
    case "discovery-feedback":
      return (
        <>
          <div className="button-row">
            <Button onClick={() => setSaved(true)}>
              <Check aria-hidden="true" />
              {t("Save example", "Beispiel speichern")}
            </Button>
            <Button variant="outline" onClick={() => setSaved(false)}>
              {t("Reset example", "Beispiel zurücksetzen")}
            </Button>
          </div>
          <DiscoveryFeedback visible={saved} />
        </>
      );
    case "identification-action":
      return (
        <>
          <IdentificationAction onClick={() => setSaved(true)} />
          <p role="status" className="small-note">
            {saved
              ? t(
                  "Ready for the application's capture flow. This example has no camera or identification service.",
                  "Bereit für die Aufnahmefunktion der Anwendung. Dieses Beispiel hat keine Kamera und keinen Bestimmungsdienst.",
                )
              : t(
                  "A quietly available starting point.",
                  "Ein ruhig verfügbarer Einstieg.",
                )}
          </p>
        </>
      );
    case "uncertainty-notice":
      return (
        <>
          <UncertaintyNotice />
          <UncertaintyNotice
            title={t(
              "A little more context may help",
              "Etwas mehr Kontext kann helfen",
            )}
            action={
              <Button variant="outline" asChild>
                <DocLink href="/components/textarea">
                  {t("Explore optional notes", "Optionale Notizen ansehen")}
                </DocLink>
              </Button>
            }
          >
            {t(
              "Keep what you noticed, even when a name is still missing.",
              "Bewahre deine Beobachtung, auch wenn der Name noch fehlt.",
            )}
          </UncertaintyNotice>
        </>
      );
    default:
      return null;
  }
}

export function ComponentDocs({
  locale,
  slug,
}: {
  locale: Locale;
  slug?: string;
}) {
  const t: Translate = (en, de) => (locale === "de" ? de : en);
  const details = componentDetails(t);
  const current = componentCatalog.find((item) => item.slug === slug);
  if (slug && !current)
    return (
      <div className="component-intro">
        <h1 tabIndex={-1}>
          {t("Component not found", "Komponente nicht gefunden")}
        </h1>
        <p>
          {t(
            "Choose an available component from the library.",
            "Wähle eine verfügbare Komponente aus der Bibliothek.",
          )}
        </p>
        <Button asChild variant="outline">
          <DocLink href="/components">
            {t("All components", "Alle Komponenten")}
          </DocLink>
        </Button>
      </div>
    );
  if (!current)
    return (
      <>
        <div className="component-intro">
          <span className="eyebrow">@standkreis/ui · 0.1.0</span>
          <h1 tabIndex={-1}>
            {t(
              "Build from a shared foundation.",
              "Auf einer gemeinsamen Grundlage bauen.",
            )}
          </h1>
          <p>
            {t(
              "Familiar controls for every room in Standkreis. Explore each component, try its states and bring the same behaviour into your application.",
              "Vertraute Bedienelemente für jeden Raum in Standkreis. Entdecke jede Komponente, probiere ihre Zustände aus und nutze dasselbe Verhalten in deiner Anwendung.",
            )}
          </p>
          <div className="button-row">
            <Button asChild>
              <DocLink href="/components/button">
                {t("Explore components", "Komponenten entdecken")}
                <ArrowRight aria-hidden="true" />
              </DocLink>
            </Button>
            <Button asChild variant="outline">
              <DocLink href="/brand">
                {t("Visit the brand guide", "Markenrichtlinien ansehen")}
              </DocLink>
            </Button>
          </div>
        </div>
        <section
          className="component-doc-section"
          aria-labelledby="setup-title"
        >
          <h2 className="docs-heading" id="setup-title">
            {t("Getting started", "Erste Schritte")}
          </h2>
          <p className="docs-copy">
            {t(
              "Install the archive built from this repository. This version is not published to npm. React 19 and React DOM 19 are peer dependencies.",
              "Installiere das Archiv aus diesem Repository. Diese Version ist nicht auf npm veröffentlicht. React 19 und React DOM 19 sind Peer-Abhängigkeiten.",
            )}
          </p>
          <pre tabIndex={0} aria-label={t("Code example", "Codebeispiel")}>
            <code>{`# In the design-system repository\nnpm ci\nnpm run build\nnpm pack --workspace @standkreis/ui --pack-destination .\n\n# In your application\nnpm install /path/to/standkreis-ui-0.1.0.tgz`}</code>
          </pre>
          <p className="docs-copy">
            {t(
              "Import the bundled styles once and wrap your app in the provider. Fonts are optional; the compiled stylesheet includes a base reset. No Tailwind setup is required.",
              "Importiere die gebündelten Styles einmal und umschließe deine App mit dem Provider. Schriften sind optional; das kompilierte Stylesheet enthält einen Basis-Reset. Ein Tailwind-Setup ist nicht erforderlich.",
            )}
          </p>
          <pre tabIndex={0} aria-label={t("Code example", "Codebeispiel")}>
            <code>{`import '@standkreis/ui/fonts.css';\nimport '@standkreis/ui/styles.css';\nimport { StandkreisProvider, Button } from '@standkreis/ui';\n\nexport function App() {\n  return (\n    <StandkreisProvider locale="${locale}">\n      <Button onClick={() => console.log('Explore')}>\n        ${t("Explore", "Entdecken")}\n      </Button>\n    </StandkreisProvider>\n  );\n}`}</code>
          </pre>
          <a
            className="docs-text-link"
            href="https://github.com/Standkreis/design-system/blob/main/docs/INTEGRATION.md"
          >
            {t(
              "Full integration guidance",
              "Vollständige Integrationsanleitung",
            )}{" "}
            →
          </a>
        </section>
        {(["primitive", "pattern"] as const).map((group) => (
          <section
            key={group}
            className="component-doc-section"
            aria-labelledby={`${group}-title`}
          >
            <h2 className="docs-heading" id={`${group}-title`}>
              {group === "primitive"
                ? t("Components", "Komponenten")
                : t("Standkreis patterns", "Standkreis-Muster")}
            </h2>
            <p className="docs-copy">
              {group === "primitive"
                ? t(
                    "shadcn/ui primitives, adapted through shared tokens and variants.",
                    "shadcn/ui-Grundelemente, angepasst über gemeinsame Tokens und Varianten.",
                  )
                : t(
                    "Our identity and considerate discovery behaviour, ready to reuse.",
                    "Unsere Identität und achtsames Entdecken, bereit zur Wiederverwendung.",
                  )}
            </p>
            <div className="component-directory">
              {componentCatalog
                .filter((item) => item.group === group)
                .map((item) => (
                  <Card key={item.slug} variant="outline" asChild>
                    <DocLink href={`/components/${item.slug}`}>
                      <CardHeader>
                        <CardTitle>
                          {item.name}
                          <ArrowRight size={16} aria-hidden="true" />
                        </CardTitle>
                        <CardDescription>
                          {details[item.slug].description}
                        </CardDescription>
                      </CardHeader>
                    </DocLink>
                  </Card>
                ))}
            </div>
          </section>
        ))}
      </>
    );
  const detail = details[current.slug];
  const index = componentCatalog.indexOf(current);
  const source =
    current.slug === "brand" || current.slug === "brand-mark"
      ? "brand/brand"
      : `components/${current.slug}`;
  return (
    <article className="component-page">
      <div className="component-intro">
        <span className="eyebrow">
          {current.group === "primitive"
            ? "shadcn/ui"
            : t("Standkreis pattern", "Standkreis-Muster")}
        </span>
        <h1 tabIndex={-1}>{current.name}</h1>
        <p>{detail.description}</p>
        <a
          className="docs-text-link"
          href={`https://github.com/Standkreis/design-system/blob/main/packages/ui/src/${source}.tsx`}
        >
          {t("View source", "Quelltext ansehen")}{" "}
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
      <section
        className="component-doc-section"
        aria-labelledby="preview-title"
      >
        <div className="docs-section-label">
          <h2 className="docs-heading" id="preview-title">
            {t("Preview", "Vorschau")}
          </h2>
          <Badge variant="outline">
            {t("Live component", "Interaktive Komponente")}
          </Badge>
        </div>
        <Card className="component-preview" variant="outline">
          <CardContent>
            <Demo slug={current.slug} t={t} />
          </CardContent>
        </Card>
        <p className="small-note">
          {t(
            "Examples are local to this page. No data is sent or stored. Use the header to compare light, dark and German labels.",
            "Beispiele bleiben auf dieser Seite. Es werden keine Daten gesendet oder gespeichert. Vergleiche helle, dunkle und deutsche Ansichten über die Kopfzeile.",
          )}
        </p>
      </section>
      <section className="component-doc-section" aria-labelledby="usage-title">
        <h2 className="docs-heading" id="usage-title">
          {t("Usage", "Verwendung")}
        </h2>
        <pre tabIndex={0} aria-label={t("Code example", "Codebeispiel")}>
          <code>{detail.code}</code>
        </pre>
      </section>
      <section className="component-doc-section" aria-labelledby="api-title">
        <h2 className="docs-heading" id="api-title">
          {t("API essentials", "Wichtige API-Eigenschaften")}
        </h2>
        <div
          className="api-table-scroll"
          tabIndex={0}
          role="region"
          aria-label={t("API table", "API-Tabelle")}
        >
          <table className="api-table">
            <thead>
              <tr>
                <th scope="col">{t("Prop / part", "Prop / Teil")}</th>
                <th scope="col">{t("Values", "Werte")}</th>
                <th scope="col">{t("Behaviour", "Verhalten")}</th>
              </tr>
            </thead>
            <tbody>
              {detail.props.map(([prop, values, description]) => (
                <tr key={prop}>
                  <th scope="row">
                    <code>{prop}</code>
                  </th>
                  <td>
                    <code>{values}</code>
                  </td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small-note">
          {t(
            "Selected props are shown here; package TypeScript declarations and source document the complete API.",
            "Hier stehen ausgewählte Eigenschaften; die TypeScript-Deklarationen und der Quelltext dokumentieren die vollständige API.",
          )}
        </p>
      </section>
      <section
        className="component-doc-section"
        aria-labelledby="guidance-title"
      >
        <h2 className="docs-heading" id="guidance-title">
          {t("Usage & accessibility", "Verwendung & Barrierefreiheit")}
        </h2>
        <ul className="component-guidance">
          {detail.guidance.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
      <nav
        className="component-pagination"
        aria-label={t("Adjacent components", "Benachbarte Komponenten")}
      >
        {index > 0 ? (
          <Button variant="outline" asChild>
            <DocLink href={`/components/${componentCatalog[index - 1].slug}`}>
              ← {componentCatalog[index - 1].name}
            </DocLink>
          </Button>
        ) : (
          <span />
        )}
        {index < componentCatalog.length - 1 && (
          <Button variant="outline" asChild>
            <DocLink href={`/components/${componentCatalog[index + 1].slug}`}>
              {componentCatalog[index + 1].name} →
            </DocLink>
          </Button>
        )}
      </nav>
    </article>
  );
}
