import { useEffect, useId, useRef, useState } from "react";
import { RotateCcw, RotateCw, Layers, Scan } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Switch,
  type Locale,
} from "@standkreis/ui";
import { projectLandscape } from "./spatial-geometry";

function useCamera(yaw: number, pitch: number) {
  const [camera, setCamera] = useState({ yaw, pitch });
  const current = useRef(camera);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const origin = current.current;
    if (origin.yaw === yaw && origin.pitch === pitch) return;
    const start = performance.now();
    const duration =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--motion-panel",
        ),
      ) || 360;
    let frame = 0;
    const update = () => {
      const progress = media.matches
        ? 1
        : Math.min((performance.now() - start) / duration, 1);
      // Invert x on the shared cubic-bezier(0.22, 1, 0.36, 1) curve.
      let low = 0,
        high = 1;
      for (let i = 0; i < 14; i++) {
        const at = (low + high) / 2;
        const x =
          3 * (1 - at) ** 2 * at * 0.22 +
          3 * (1 - at) * at ** 2 * 0.36 +
          at ** 3;
        if (x < progress) low = at;
        else high = at;
      }
      const ease = progress === 1 ? 1 : 1 - (1 - (low + high) / 2) ** 3;
      current.current = {
        yaw: origin.yaw + (yaw - origin.yaw) * ease,
        pitch: origin.pitch + (pitch - origin.pitch) * ease,
      };
      setCamera(current.current);
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frame);
  }, [yaw, pitch]);
  return camera;
}

export function SpatialStudy({ locale }: { locale: Locale }) {
  const t = (en: string, de: string) => (locale === "de" ? de : en);
  const [yaw, setYaw] = useState(-0.45);
  const [top, setTop] = useState(false);
  const [canopy, setCanopy] = useState(true);
  const camera = useCamera(yaw, top ? Math.PI / 2 : 0.65);
  const id = useId();
  const polygons = projectLandscape(camera.yaw, camera.pitch, canopy);
  return (
    <>
      <Card className="spatial-example" variant="outline">
        <div className="spatial-stage">
          <Badge variant="secondary" className="spatial-caption">
            {t(
              "Illustrative area · low-poly study",
              "Illustrative Fläche · Low-Poly-Studie",
            )}
          </Badge>
          <svg
            viewBox="0 0 900 600"
            role="img"
            aria-labelledby={`${id}-title ${id}-description`}
            data-testid="spatial-study"
          >
            <title id={`${id}-title`}>
              {t("A small forest garden in 3D", "Ein kleiner Waldgarten in 3D")}
            </title>
            <desc id={`${id}-description`}>
              {t(
                "A generic landscape with five trees, shrubs, a footpath and visible soil layers. This is an illustration, not a measured location or a species model.",
                "Eine generische Landschaft mit fünf Bäumen, Sträuchern, einem Fußweg und sichtbaren Bodenschichten. Dies ist eine Illustration, kein vermessener Ort und kein Artenmodell.",
              )}
            </desc>
            {polygons.map((face) => (
              <polygon
                key={face.id}
                points={face.points}
                fill={face.fill}
                stroke={face.fill}
                strokeWidth={0.4}
                strokeLinejoin="round"
              />
            ))}
          </svg>
        </div>
        <CardContent className="spatial-controls">
          <div className="button-row">
            <Button
              variant="outline"
              size="icon"
              aria-label={t("Rotate left", "Nach links drehen")}
              onClick={() => setYaw(yaw - Math.PI / 6)}
            >
              <RotateCcw aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label={t("Rotate right", "Nach rechts drehen")}
              onClick={() => setYaw(yaw + Math.PI / 6)}
            >
              <RotateCw aria-hidden="true" />
            </Button>
            <Button
              variant={top ? "secondary" : "outline"}
              aria-pressed={top}
              onClick={() => setTop(!top)}
            >
              <Scan aria-hidden="true" />
              {t("Top view", "Draufsicht")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setYaw(
                  (current) =>
                    current +
                    Math.atan2(
                      Math.sin(-0.45 - current),
                      Math.cos(-0.45 - current),
                    ),
                );
                setTop(false);
                setCanopy(true);
              }}
            >
              {t("Reset view", "Ansicht zurücksetzen")}
            </Button>
          </div>
          <Label className="control-label" htmlFor={`${id}-canopy`}>
            <Switch
              id={`${id}-canopy`}
              checked={canopy}
              onCheckedChange={setCanopy}
            />
            <Layers aria-hidden="true" size={16} />
            {t("Tree crowns", "Baumkronen")}
          </Label>
        </CardContent>
      </Card>
      <p className="pattern-note">
        {t(
          "Turn the view or look from above. Hide the crowns to reveal the ground. The scene stays still until you act; every control works with a keyboard. This original geometric study uses no location data.",
          "Drehe die Ansicht oder schaue von oben. Blende die Kronen aus, um den Boden zu sehen. Die Szene bleibt bis zu deiner Aktion ruhig; alle Bedienelemente funktionieren per Tastatur. Diese eigenständige geometrische Studie nutzt keine Standortdaten.",
        )}
      </p>
      <div className="spatial-guidance">
        {[
          [
            t("Form & material", "Form & Material"),
            t(
              "Faceted organic shapes, matte surfaces and a small natural palette. Use visible soil layers and a clear silhouette to make an area readable. Reserve teal for selection and interface controls.",
              "Facettierte organische Formen, matte Flächen und eine kleine natürliche Palette. Nutze sichtbare Bodenschichten und eine klare Silhouette, um eine Fläche lesbar zu machen. Reserviere Teal für Auswahl und Bedienelemente.",
            ),
          ],
          [
            t("Light & composition", "Licht & Komposition"),
            t(
              "Soft directional light, quiet shadows and an elevated overview. Leave breathing room around the subject. The surrounding canvas follows light and dark mode; the scene's materials keep their meaning.",
              "Weiches gerichtetes Licht, ruhige Schatten und eine erhöhte Übersicht. Lass dem Motiv Raum. Die umgebende Fläche folgt dem hellen und dunklen Modus; die Materialien der Szene behalten ihre Bedeutung.",
            ),
          ],
          [
            t("Interaction & access", "Interaktion & Zugang"),
            t(
              "Offer an obvious reset, useful viewpoints and labelled layers. Do not autoplay, capture page scrolling or rely on dragging alone. Keep text alternatives and essential information available if a renderer fails.",
              "Biete ein klares Zurücksetzen, hilfreiche Blickwinkel und beschriftete Ebenen. Kein Autoplay, kein Abfangen des Seitenscrollens und keine ausschließliche Drag-Bedienung. Halte Textalternativen und wesentliche Informationen bei einem Renderer-Ausfall verfügbar.",
            ),
          ],
          [
            t("Detail follows purpose", "Detail folgt dem Zweck"),
            t(
              "Low-poly suits places and possibilities. Species anatomy can need precise geometry; a globe needs geographic clarity. Share controls, lighting principles and honest labels without forcing every model into the same level of detail.",
              "Low-Poly eignet sich für Orte und Möglichkeiten. Artenanatomie kann präzise Geometrie brauchen; ein Globus benötigt geografische Klarheit. Teile Bedienelemente, Lichtprinzipien und ehrliche Beschriftungen, ohne allen Modellen denselben Detailgrad aufzuzwingen.",
            ),
          ],
        ].map(([title, description]) => (
          <Card key={title} variant="soft">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
}
