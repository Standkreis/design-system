import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Flower2,
  Globe2,
  Leaf,
  MapPin,
  ScanLine,
  Sprout,
  Users,
  Droplets,
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  UncertaintyNotice,
  type Locale,
} from "@standkreis/ui";
import { ImageryStudy } from "./LandingStudy";
import { DocLink } from "./navigation";
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

export function BrandGuide({ locale }: { locale: Locale }) {
  const t = (en: string, de: string) => (locale === "de" ? de : en);
  const [saved, setSaved] = useState(false);
  const [room, setRoom] = useState("atlas");
  const save = () => setSaved(true);
  return (
    <>
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
                          {t("Room for understanding", "Raum zum Verstehen")}
                        </SheetTitle>
                        <SheetDescription>
                          {t(
                            "An illustrative interface example, not a scientific model. Applications provide the evidence and specialised viewer.",
                            "Ein illustratives Oberflächenbeispiel, kein wissenschaftliches Modell. Anwendungen liefern Belege und den spezialisierten Viewer.",
                          )}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="sheet-body">
                        <Flower2 size={90} strokeWidth={1} aria-hidden="true" />
                        <p>
                          <i>Malus domestica</i>
                        </p>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                <Card variant="soft" className="field-card">
                  <Flower2 size={140} strokeWidth={0.9} aria-hidden="true" />
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
            <small>{t("One shared centre", "Eine gemeinsame Mitte")}</small>
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
            ["brand-turquoise", t("Brand / teal 500", "Marke / Teal 500")],
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
        title={t("Life brings the colour.", "Das Leben bringt die Farbe.")}
        description={t(
          "A landscape, a small detail, a moment of care. Photography gives the shared identity warmth and a sense of place.",
          "Eine Landschaft, ein kleines Detail, ein Moment der Fürsorge. Fotografie gibt der gemeinsamen Identität Wärme und ein Gefühl für den Ort.",
        )}
      >
        <ImageryStudy locale={locale} />
      </Section>

      <Section
        id="patterns"
        number="04"
        title={t("Helpful through uncertainty.", "Hilfreich bei Unsicherheit.")}
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
          <Card variant="soft">
            <CardHeader>
              <CardTitle>{t("At your pace", "In deinem Tempo")}</CardTitle>
              <CardDescription>
                {t(
                  "Motion responds to you. It never asks you to come back.",
                  "Bewegung reagiert auf dich. Sie fordert dich nie zum Zurückkommen auf.",
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="small-note">
                {t(
                  "Keep transitions brief, preserve focus and respect reduced motion. No ambient loops, streaks or daily reminders.",
                  "Halte Übergänge kurz, bewahre den Fokus und respektiere reduzierte Bewegung. Keine Dauerschleifen, Streaks oder täglichen Erinnerungen.",
                )}
              </p>
              <Button asChild variant="link">
                <DocLink href="/components/discovery-feedback">
                  {t(
                    "Explore the interaction patterns",
                    "Interaktionsmuster ansehen",
                  )}
                  <ArrowRight aria-hidden="true" />
                </DocLink>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        id="guidance"
        number="05"
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
              t("Show real places and people", "Zeige echte Orte und Menschen"),
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
                    <Symbol size={25} strokeWidth={1.65} aria-hidden="true" />
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
    </>
  );
}
