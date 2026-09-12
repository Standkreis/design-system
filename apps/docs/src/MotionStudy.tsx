import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  BrandMark,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DiscoveryFeedback,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  type Locale,
} from "@standkreis/ui";

export function MotionStudy({ locale }: { locale: Locale }) {
  const t = (en: string, de: string) => (locale === "de" ? de : en);
  const [saved, setSaved] = useState(false);
  return (
    <>
      <div className="motion-timings">
        {[
          [
            "--motion-fast",
            "160 ms",
            t("Small responses", "Kleine Reaktionen"),
            t(
              "Hover, focus and control feedback.",
              "Hover, Fokus und Rückmeldungen von Bedienelementen.",
            ),
          ],
          [
            "--motion-base",
            "240 ms",
            t("Changes of state", "Zustandswechsel"),
            t(
              "A new selection or a gentle reveal.",
              "Eine neue Auswahl oder ein sanftes Einblenden.",
            ),
          ],
          [
            "--motion-panel",
            "360 ms",
            t("Changes of context", "Kontextwechsel"),
            t(
              "A panel or a deliberate camera move.",
              "Ein Fenster oder eine bewusste Kamerabewegung.",
            ),
          ],
        ].map(([token, timing, title, description]) => (
          <Card key={token} variant="outline">
            <CardHeader>
              <CardDescription>{title}</CardDescription>
              <CardTitle className="motion-duration">{timing}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <code className="small-note">{token}</code>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="motion-examples">
        <Card>
          <CardHeader>
            <CardTitle>
              {t("A quiet acknowledgement", "Eine ruhige Bestätigung")}
            </CardTitle>
            <CardDescription>
              {t(
                "Feedback appears after your action and stays available. No confetti, countdown or pressure to continue.",
                "Eine Rückmeldung erscheint nach deiner Aktion und bleibt verfügbar. Kein Konfetti, Countdown oder Druck weiterzumachen.",
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="motion-example-content">
            <div className="button-row">
              <Button onClick={() => setSaved(true)}>
                <Check aria-hidden="true" />
                {t("Try acknowledgement", "Bestätigung ausprobieren")}
              </Button>
              <Button variant="ghost" onClick={() => setSaved(false)}>
                {t("Reset", "Zurücksetzen")}
              </Button>
            </div>
            <DiscoveryFeedback visible={saved}>
              {t(
                "Example complete. Go at your pace.",
                "Beispiel abgeschlossen. In deinem Tempo.",
              )}
            </DiscoveryFeedback>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              {t("A deliberate change of focus", "Ein bewusster Fokuswechsel")}
            </CardTitle>
            <CardDescription>
              {t(
                "A detail panel enters smoothly. Closing it restores your focus. Reduced motion removes the transition.",
                "Ein Detailfenster öffnet sich sanft. Beim Schließen kehrt dein Fokus zurück. Reduzierte Bewegung entfernt den Übergang.",
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  {t("Try a transition", "Übergang ausprobieren")}
                  <ArrowRight aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    {t("Room to look closer", "Raum zum genauen Hinsehen")}
                  </SheetTitle>
                  <SheetDescription>
                    {t(
                      "You opened this view. Escape or Close brings you back to the same place.",
                      "Du hast diese Ansicht geöffnet. Escape oder Schließen bringt dich an denselben Ort zurück.",
                    )}
                  </SheetDescription>
                </SheetHeader>
                <div className="sheet-body">
                  <BrandMark width={80} height={80} />
                  <p>
                    {t(
                      "Motion should explain where you are going, then get out of the way.",
                      "Bewegung sollte erklären, wohin du gehst, und dann in den Hintergrund treten.",
                    )}
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>
      </div>
      <p className="pattern-note">
        {t(
          "Use the shared easing curve: a quick response that settles gently, without bounce. Smooth page scrolling follows the browser's timing. Honour reduced motion, keep focus visible and never animate the logo or rotate a 3D view without an action.",
          "Nutze die gemeinsame Bewegungskurve: eine schnelle Reaktion, die sanft ausläuft, ohne Nachfedern. Sanftes Scrollen folgt dem Timing des Browsers. Respektiere reduzierte Bewegung, halte den Fokus sichtbar und animiere weder Logo noch 3D-Ansicht ohne eine Aktion.",
        )}{" "}
        <code>cubic-bezier(0.22, 1, 0.36, 1)</code>
      </p>
    </>
  );
}
