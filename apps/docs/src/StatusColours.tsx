import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  type Locale,
} from "@standkreis/ui";

export function StatusColours({ locale }: { locale: Locale }) {
  const t = (en: string, de: string) => (locale === "de" ? de : en);
  const states = [
    {
      variant: "info",
      title: t("Info", "Info"),
      Icon: Info,
      example: t(
        "You can add a location later.",
        "Du kannst später einen Ort ergänzen.",
      ),
    },
    {
      variant: "success",
      title: t("Success", "Erfolg"),
      Icon: CircleCheck,
      example: t("Encounter saved.", "Begegnung gespeichert."),
    },
    {
      variant: "error",
      title: t("Error", "Fehler"),
      Icon: CircleX,
      example: t(
        "Upload failed. Try again.",
        "Upload fehlgeschlagen. Versuche es erneut.",
      ),
    },
    {
      variant: "warning",
      title: t("Warning", "Warnung"),
      Icon: TriangleAlert,
      example: t("Identification still open.", "Bestimmung noch offen."),
    },
  ] as const;
  return (
    <div className="status-colours">
      <h3 className="docs-heading">{t("UI states", "UI-Zustände")}</h3>
      <div className="status-colour-grid">
        {states.map(({ variant, title, Icon, example }) => (
          <Card key={variant} variant={variant} asChild>
            <article aria-label={title}>
              <CardHeader>
                <CardTitle asChild>
                  <h4 className="status-colour-title">
                    <Icon size={20} aria-hidden="true" />
                    {title}
                  </h4>
                </CardTitle>
              </CardHeader>
              <CardContent className="status-colour-content">
                <CardDescription>{example}</CardDescription>
                <div className="status-token-pair">
                  <code>--{variant}</code>
                  <code>--{variant}-surface</code>
                </div>
              </CardContent>
            </article>
          </Card>
        ))}
      </div>
      <p className="small-note">
        {t(
          "Message examples. Always pair color with an icon or text. Warnings can express uncertainty; errors mean an action failed. Destructive actions such as deletion use the separate destructive token.",
          "Nachrichtenbeispiele. Kombiniere Farbe immer mit einem Icon oder Text. Warnungen können Unsicherheit ausdrücken; Fehler bedeuten, dass eine Aktion fehlgeschlagen ist. Destruktive Aktionen wie Löschen nutzen den separaten destructive-Token.",
        )}
      </p>
    </div>
  );
}
