type Detail = {
  description: string;
  code: string;
  props: [string, string, string][];
  guidance: string[];
};
type Translate = (en: string, de: string) => string;

export function componentDetails(t: Translate): Record<string, Detail> {
  const fieldGuidance = [
    t(
      "Use a visible Label linked by htmlFor and id. A placeholder is not a label.",
      "Nutze ein sichtbares Label, verknüpft über htmlFor und id. Ein Platzhalter ersetzt keine Beschriftung.",
    ),
    t(
      "Connect help and error text with aria-describedby. Set aria-invalid when validation fails; explain how to continue.",
      "Verknüpfe Hilfe- und Fehlertexte mit aria-describedby. Setze aria-invalid bei ungültigen Werten und erkläre den nächsten Schritt.",
    ),
  ];
  const overlayGuidance = [
    t(
      "Provide a title and description. Use a Trigger so focus can return to the opening control on close.",
      "Stelle Titel und Beschreibung bereit. Nutze einen Trigger, damit der Fokus beim Schließen zum Auslöser zurückkehren kann.",
    ),
    t(
      "Escape dismisses the overlay. Keep keyboard focus inside while open and test with reduced motion.",
      "Escape schließt das Fenster. Halte den Tastaturfokus währenddessen im Fenster und teste mit reduzierter Bewegung.",
    ),
  ];
  return {
    button: {
      description: t(
        "An obvious next step, with quiet supporting choices.",
        "Ein klarer nächster Schritt mit ruhigen ergänzenden Möglichkeiten.",
      ),
      code: `import { Button } from '@standkreis/ui';\n\n<Button onClick={saveEncounter}>${t("Save encounter", "Begegnung speichern")}</Button>\n<Button variant="outline" onClick={cancel}>${t("Cancel", "Abbrechen")}</Button>\n<Button variant="inverse" shape="pill" asChild>\n  <a href="/explore">${t("Explore", "Entdecken")}</a>\n</Button>`,
      props: [
        [
          "variant",
          "default | secondary | outline | ghost | link | destructive | inverse",
          t(
            "Default: default. Inverse is for dark surfaces and photography.",
            "Standard: default. Inverse eignet sich für dunkle Flächen und Fotografie.",
          ),
        ],
        [
          "size",
          "default | xs | sm | lg | icon | icon-xs | icon-sm | icon-lg",
          t(
            "Default: default (44px minimum height).",
            "Standard: default (mindestens 44px Höhe).",
          ),
        ],
        [
          "shape",
          "rounded | pill",
          t(
            "Default: rounded; independent of size and variant.",
            "Standard: rounded; unabhängig von Größe und Variante.",
          ),
        ],
        [
          "asChild",
          "boolean",
          t(
            "Default: false. Transfers presentation to a single child, such as a link.",
            "Standard: false. Überträgt die Darstellung auf ein einzelnes Kind, etwa einen Link.",
          ),
        ],
        [
          "disabled",
          "boolean",
          t(
            "Disables a native button. Link semantics need separate handling.",
            "Deaktiviert einen nativen Button. Links benötigen eine gesonderte Behandlung.",
          ),
        ],
      ],
      guidance: [
        t(
          "Use one primary action per task. Use links for navigation and buttons for actions.",
          "Nutze eine Hauptaktion pro Aufgabe. Verwende Links zur Navigation und Buttons für Aktionen.",
        ),
        t(
          "Give icon-only controls an accessible name. Prefer default or larger sizes for touch interfaces.",
          "Gib reinen Symbol-Buttons einen zugänglichen Namen. Bevorzuge Standardgrößen oder größere Flächen für Touch-Oberflächen.",
        ),
        t(
          "Keep inverse buttons on dark surfaces so their white keyboard outline remains visible.",
          "Nutze inverse Buttons auf dunklen Flächen, damit ihr weißer Tastaturfokus sichtbar bleibt.",
        ),
      ],
    },
    badge: {
      description: t(
        "A compact label for context or status, without interrupting a task.",
        "Eine kompakte Beschriftung für Kontext oder Status, ohne eine Aufgabe zu unterbrechen.",
      ),
      code: `import { Badge } from '@standkreis/ui';\n\n<Badge>${t("Your observation", "Deine Beobachtung")}</Badge>\n<Badge variant="secondary">${t("Example", "Beispiel")}</Badge>\n<Badge variant="outline">Atlas</Badge>`,
      props: [
        [
          "variant",
          "default | secondary | destructive | outline | ghost | link",
          t(
            "Default: default. Choose by meaning and emphasis.",
            "Standard: default. Wähle nach Bedeutung und Gewichtung.",
          ),
        ],
        [
          "asChild",
          "boolean",
          t(
            "Render through a single child; defaults to a span.",
            "Rendere über ein einzelnes Kind; standardmäßig ein span.",
          ),
        ],
      ],
      guidance: [
        t(
          "Express status in words, not colour alone. Badges do not announce changes automatically.",
          "Drücke den Status in Worten aus, nicht nur in Farbe. Badges kündigen Änderungen nicht automatisch an.",
        ),
        t(
          "Use a Button for an action; a badge is primarily a label.",
          "Nutze einen Button für Aktionen; ein Badge ist in erster Linie eine Beschriftung.",
        ),
      ],
    },
    card: {
      description: t(
        "Related content on a shared surface, from quiet panels to inverse sections.",
        "Zusammengehörige Inhalte auf einer gemeinsamen Fläche, von ruhigen Panels bis zu inversen Abschnitten.",
      ),
      code: `import { Card, CardHeader, CardTitle, CardDescription,\n  CardContent, CardFooter } from '@standkreis/ui';\n\n<Card variant="soft" asChild>\n  <article>\n    <CardHeader>\n      <CardTitle asChild><h3>${t("An encounter", "Eine Begegnung")}</h3></CardTitle>\n      <CardDescription>${t("A moment worth keeping.", "Ein Moment zum Bewahren.")}</CardDescription>\n    </CardHeader>\n    <CardContent>${t("Your observation", "Deine Beobachtung")}</CardContent>\n    <CardFooter>Standkreis</CardFooter>\n  </article>\n</Card>`,
      props: [
        [
          "Card.variant",
          "default | soft | outline | primary | inverse",
          t(
            "Default: default. Surface colours and descriptions follow shared tokens.",
            "Standard: default. Flächenfarben und Beschreibungen folgen gemeinsamen Tokens.",
          ),
        ],
        [
          "Card.asChild",
          "boolean",
          t(
            "Use semantic elements such as article without extra wrappers.",
            "Nutze semantische Elemente wie article ohne zusätzliche Hüllen.",
          ),
        ],
        [
          "CardTitle / CardDescription.asChild",
          "boolean",
          t(
            "Use a heading of the right level or a paragraph.",
            "Nutze eine Überschrift der passenden Ebene oder einen Absatz.",
          ),
        ],
        [
          "CardHeader / CardContent / CardFooter",
          "children, className",
          t(
            "Compose structure; add layout classes only where needed.",
            "Baue die Struktur auf; ergänze Layout-Klassen nur bei Bedarf.",
          ),
        ],
      ],
      guidance: [
        t(
          "Use shared variants before adding page-specific backgrounds, borders or radii.",
          "Nutze gemeinsame Varianten, bevor du seitenspezifische Hintergründe, Rahmen oder Radien ergänzt.",
        ),
        t(
          "Choose the heading level from the document structure. A Card is not interactive by default.",
          "Wähle die Überschriftenebene anhand der Dokumentstruktur. Eine Card ist standardmäßig nicht interaktiv.",
        ),
      ],
    },
    input: {
      description: t(
        "A single line of text with a visible label and helpful validation.",
        "Eine Textzeile mit sichtbarer Beschriftung und hilfreicher Validierung.",
      ),
      code: `import { Input, Label } from '@standkreis/ui';\n\n<Label htmlFor="name">${t("Encounter name", "Name der Begegnung")}</Label>\n<Input id="name" value={name}\n  onChange={(event) => setName(event.target.value)} />`,
      props: [
        [
          "value / onChange",
          "string / event handler",
          t(
            "Standard controlled input behaviour; defaultValue is also supported.",
            "Standardverhalten eines gesteuerten Inputs; defaultValue wird ebenfalls unterstützt.",
          ),
        ],
        [
          "type",
          "HTML input type",
          t(
            "Choose the appropriate keyboard and input behaviour.",
            "Wähle die passende Tastatur und das Eingabeverhalten.",
          ),
        ],
        [
          "disabled / aria-invalid",
          "boolean",
          t(
            "Disabled and validation states share library styling.",
            "Deaktivierte und ungültige Zustände nutzen die Bibliotheks-Styles.",
          ),
        ],
      ],
      guidance: fieldGuidance,
    },
    textarea: {
      description: t(
        "Space for a detail, a question or a story at your own pace.",
        "Raum für ein Detail, eine Frage oder eine Geschichte in deinem Tempo.",
      ),
      code: `import { Textarea, Label } from '@standkreis/ui';\n\n<Label htmlFor="note">${t("What did you notice?", "Was ist dir aufgefallen?")}</Label>\n<Textarea id="note" value={note}\n  onChange={(event) => setNote(event.target.value)} />`,
      props: [
        [
          "value / onChange",
          "string / event handler",
          t(
            "Native textarea value and change event.",
            "Nativer Textarea-Wert und Änderungsereignis.",
          ),
        ],
        [
          "rows / maxLength",
          "number",
          t(
            "Optional native sizing and length constraints.",
            "Optionale native Größen- und Längenbegrenzung.",
          ),
        ],
        [
          "disabled / aria-invalid",
          "boolean",
          t(
            "Show availability and validation state.",
            "Zeige Verfügbarkeit und Validierungszustand.",
          ),
        ],
      ],
      guidance: [
        ...fieldGuidance,
        t(
          "Keep optional notes optional. Do not reward longer entries or pressure people to write.",
          "Lass optionale Notizen optional. Belohne keine längeren Einträge und dränge niemanden zum Schreiben.",
        ),
      ],
    },
    label: {
      description: t(
        "A readable, clickable name for a form control.",
        "Ein lesbarer, anklickbarer Name für ein Formularelement.",
      ),
      code: `import { Label, Input } from '@standkreis/ui';\n\n<Label htmlFor="place">${t("Place name", "Ortsname")}</Label>\n<Input id="place" />`,
      props: [
        [
          "htmlFor",
          "string",
          t(
            "Must match the associated control's id.",
            "Muss der id des zugehörigen Bedienelements entsprechen.",
          ),
        ],
        [
          "children",
          "ReactNode",
          t(
            "Visible, concise description of the control.",
            "Sichtbare, kurze Beschreibung des Bedienelements.",
          ),
        ],
      ],
      guidance: [
        t(
          "Keep labels visible even when a value has been entered.",
          "Halte Beschriftungen sichtbar, auch wenn ein Wert eingegeben wurde.",
        ),
        t(
          "Each control needs a unique id; clicking the label should focus or toggle that control.",
          "Jedes Bedienelement braucht eine eindeutige id; ein Klick auf die Beschriftung sollte es fokussieren oder umschalten.",
        ),
      ],
    },
    checkbox: {
      description: t(
        "An independent choice that can be selected or cleared.",
        "Eine unabhängige Auswahl, die aktiviert oder entfernt werden kann.",
      ),
      code: `import { Checkbox, Label } from '@standkreis/ui';\n\n<Label htmlFor="private">${t("Keep private", "Privat halten")}</Label>\n<Checkbox id="private" checked={isPrivate}\n  onCheckedChange={(value) => setPrivate(value === true)} />`,
      props: [
        [
          "checked / defaultChecked",
          "boolean | 'indeterminate'",
          t(
            "Controlled or initial selection state.",
            "Gesteuerter oder anfänglicher Auswahlzustand.",
          ),
        ],
        [
          "onCheckedChange",
          "(value) => void",
          t(
            "Receives the checked state, not a DOM event.",
            "Erhält den Auswahlzustand, kein DOM-Ereignis.",
          ),
        ],
        [
          "disabled / name / required",
          "native-like form props",
          t(
            "Form participation and availability.",
            "Formularteilnahme und Verfügbarkeit.",
          ),
        ],
      ],
      guidance: [
        t(
          "Associate a visible Label and make its surrounding click area comfortable. Space toggles the focused checkbox.",
          "Verknüpfe ein sichtbares Label und gestalte die Klickfläche ausreichend groß. Die Leertaste schaltet die fokussierte Checkbox um.",
        ),
        t(
          "Use indeterminate only for a partially selected group; explain what is selected.",
          "Nutze indeterminate nur für teilweise ausgewählte Gruppen; erkläre die Auswahl.",
        ),
      ],
    },
    switch: {
      description: t(
        "An on/off setting whose meaning stays clear in either state.",
        "Eine Ein/Aus-Einstellung, deren Bedeutung in beiden Zuständen klar bleibt.",
      ),
      code: `import { Switch, Label } from '@standkreis/ui';\n\n<Label htmlFor="place">${t("Include a place", "Einen Ort einschließen")}</Label>\n<Switch id="place" checked={includePlace}\n  onCheckedChange={setIncludePlace} />`,
      props: [
        [
          "checked / defaultChecked",
          "boolean",
          t(
            "Controlled or initial on/off state.",
            "Gesteuerter oder anfänglicher Ein/Aus-Zustand.",
          ),
        ],
        [
          "onCheckedChange",
          "(checked: boolean) => void",
          t("Receives the next state.", "Erhält den nächsten Zustand."),
        ],
        [
          "size",
          "default | sm",
          t(
            "Default: default. Label area supplies a comfortable touch target.",
            "Standard: default. Die Label-Fläche bietet eine angenehme Touch-Fläche.",
          ),
        ],
        [
          "disabled",
          "boolean",
          t(
            "Prevents changes to the setting.",
            "Verhindert Änderungen der Einstellung.",
          ),
        ],
      ],
      guidance: [
        t(
          "Use a stable label that describes the setting, not an instruction that changes with its state.",
          "Nutze eine stabile Beschriftung der Einstellung, keine mit dem Zustand wechselnde Anweisung.",
        ),
        t(
          "Use a Switch for an immediate setting, a Checkbox for an independent form choice.",
          "Nutze einen Switch für eine unmittelbare Einstellung, eine Checkbox für eine unabhängige Formularauswahl.",
        ),
      ],
    },
    select: {
      description: t(
        "Choose one value from a labelled set of options.",
        "Wähle einen Wert aus einer beschrifteten Liste von Optionen.",
      ),
      code: `import { Label, Select, SelectTrigger, SelectValue,\n  SelectContent, SelectItem } from '@standkreis/ui';\n\n<Label htmlFor="place">${t("Place", "Ort")}</Label>\n<Select value={place} onValueChange={setPlace}>\n  <SelectTrigger id="place"><SelectValue /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="garden">${t("Garden", "Garten")}</SelectItem>\n    <SelectItem value="woodland">${t("Woodland", "Wald")}</SelectItem>\n  </SelectContent>\n</Select>`,
      props: [
        [
          "Select.value / defaultValue",
          "string",
          t(
            "Controlled or initial selected item value.",
            "Gesteuerter oder anfänglicher Wert der ausgewählten Option.",
          ),
        ],
        [
          "Select.onValueChange",
          "(value: string) => void",
          t("Receives the selected value.", "Erhält den ausgewählten Wert."),
        ],
        [
          "SelectItem.value",
          "non-empty string",
          t(
            "Unique identifier for each option.",
            "Eindeutige Kennung für jede Option.",
          ),
        ],
        [
          "SelectValue.placeholder",
          "ReactNode",
          t(
            "Shown when no value is selected.",
            "Wird ohne ausgewählten Wert angezeigt.",
          ),
        ],
      ],
      guidance: [
        t(
          "Label the trigger and keep option names clear. Arrow keys and typing help navigate the list.",
          "Beschrifte den Auslöser und benenne Optionen klar. Pfeiltasten und Texteingabe helfen bei der Navigation.",
        ),
        t(
          "Use a dedicated search pattern for very large option sets; this primitive is not a searchable combobox.",
          "Nutze für sehr große Auswahllisten ein eigenes Suchmuster; dieses Grundelement ist keine durchsuchbare Combobox.",
        ),
      ],
    },
    separator: {
      description: t(
        "A quiet division between related groups of content.",
        "Eine ruhige Trennung zwischen zusammengehörigen Inhaltsgruppen.",
      ),
      code: `import { Separator } from '@standkreis/ui';\n\n<Separator />\n// Give a vertical separator a container with a defined height.\n<Separator orientation="vertical" />`,
      props: [
        [
          "orientation",
          "horizontal | vertical",
          t(
            "Default: horizontal. Vertical separators need a defined parent height.",
            "Standard: horizontal. Vertikale Trennlinien benötigen eine definierte Elternhöhe.",
          ),
        ],
        [
          "decorative",
          "boolean",
          t(
            "Default: true. Set false for a meaningful semantic separator.",
            "Standard: true. Setze false für eine bedeutungstragende semantische Trennung.",
          ),
        ],
      ],
      guidance: [
        t(
          "Use spacing before adding extra dividers. A separator does not replace a section heading.",
          "Nutze zuerst Abstände, bevor du weitere Trennlinien ergänzt. Eine Trennlinie ersetzt keine Abschnittsüberschrift.",
        ),
      ],
    },
    tabs: {
      description: t(
        "Related views within one context, with clear keyboard navigation.",
        "Verwandte Ansichten in einem Kontext mit klarer Tastaturnavigation.",
      ),
      code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@standkreis/ui';\n\n<Tabs defaultValue="encounter">\n  <TabsList aria-label="${t("Encounter views", "Begegnungsansichten")}">\n    <TabsTrigger value="encounter">${t("Encounter", "Begegnung")}</TabsTrigger>\n    <TabsTrigger value="context">${t("Context", "Kontext")}</TabsTrigger>\n  </TabsList>\n  <TabsContent value="encounter">${t("Observation", "Beobachtung")}</TabsContent>\n  <TabsContent value="context">${t("Place and notes", "Ort und Notizen")}</TabsContent>\n</Tabs>`,
      props: [
        [
          "Tabs.value / defaultValue",
          "string",
          t(
            "Match a trigger and its content by value.",
            "Verknüpfe Auslöser und Inhalt über den Wert.",
          ),
        ],
        [
          "Tabs.onValueChange",
          "(value: string) => void",
          t(
            "Control the selected panel when needed.",
            "Steuere bei Bedarf das ausgewählte Panel.",
          ),
        ],
        [
          "Tabs.orientation",
          "horizontal | vertical",
          t(
            "Default: horizontal; sets layout and keyboard direction.",
            "Standard: horizontal; legt Layout und Tastaturrichtung fest.",
          ),
        ],
        [
          "TabsList.variant",
          "default | line",
          t(
            "Default: default. Line offers a lighter treatment.",
            "Standard: default. Line bietet eine leichtere Darstellung.",
          ),
        ],
      ],
      guidance: [
        t(
          "Use tabs for views within a page, links for navigation between documentation pages.",
          "Nutze Tabs für Ansichten innerhalb einer Seite, Links für die Navigation zwischen Dokumentationsseiten.",
        ),
        t(
          "Label the tab list. Arrow keys move between triggers; maintain a visible selected state.",
          "Beschrifte die Tab-Liste. Pfeiltasten wechseln zwischen Auslösern; halte den ausgewählten Zustand sichtbar.",
        ),
      ],
    },
    dialog: {
      description: t(
        "A focused task in a modal window, opened deliberately.",
        "Eine fokussierte Aufgabe in einem bewusst geöffneten modalen Fenster.",
      ),
      code: `import { Button, Dialog, DialogTrigger, DialogContent,\n  DialogHeader, DialogTitle, DialogDescription,\n  DialogFooter, DialogClose } from '@standkreis/ui';\n\n<Dialog>\n  <DialogTrigger asChild><Button>${t("Open", "Öffnen")}</Button></DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>${t("Keep the encounter.", "Halte die Begegnung fest.")}</DialogTitle>\n      <DialogDescription>${t("Add context at your pace.", "Ergänze Kontext in deinem Tempo.")}</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose asChild><Button>${t("Done", "Fertig")}</Button></DialogClose>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`,
      props: [
        [
          "Dialog.open / defaultOpen",
          "boolean",
          t(
            "Controlled or initial visibility.",
            "Gesteuerte oder anfängliche Sichtbarkeit.",
          ),
        ],
        [
          "Dialog.onOpenChange",
          "(open: boolean) => void",
          t(
            "Observe open/close requests.",
            "Reagiere auf Öffnen und Schließen.",
          ),
        ],
        [
          "DialogTrigger / DialogClose.asChild",
          "boolean",
          t(
            "Compose with shared Button without nested buttons.",
            "Kombiniere mit dem gemeinsamen Button ohne verschachtelte Buttons.",
          ),
        ],
        [
          "DialogContent.showCloseButton",
          "boolean",
          t(
            "Default: true. Close label follows the provider locale.",
            "Standard: true. Die Schließen-Beschriftung folgt der Provider-Sprache.",
          ),
        ],
      ],
      guidance: overlayGuidance,
    },
    sheet: {
      description: t(
        "Supporting detail at the edge of the page, with a way back.",
        "Ergänzende Details am Seitenrand mit einem Weg zurück.",
      ),
      code: `import { Button, Sheet, SheetTrigger, SheetContent,\n  SheetHeader, SheetTitle, SheetDescription } from '@standkreis/ui';\n\n<Sheet>\n  <SheetTrigger asChild>\n    <Button variant="outline">${t("Open detail", "Detail öffnen")}</Button>\n  </SheetTrigger>\n  <SheetContent side="right">\n    <SheetHeader>\n      <SheetTitle>${t("A closer look", "Ein genauerer Blick")}</SheetTitle>\n      <SheetDescription>${t("Supporting context for this encounter.", "Ergänzender Kontext zu dieser Begegnung.")}</SheetDescription>\n    </SheetHeader>\n  </SheetContent>\n</Sheet>`,
      props: [
        [
          "Sheet.open / onOpenChange",
          "boolean / (open) => void",
          t(
            "Control the open state, or use an uncontrolled trigger.",
            "Steuere den geöffneten Zustand oder nutze einen ungesteuerten Auslöser.",
          ),
        ],
        [
          "SheetContent.side",
          "top | right | bottom | left",
          t(
            "Default: right. Select by context and available space.",
            "Standard: right. Wähle nach Kontext und verfügbarem Platz.",
          ),
        ],
        [
          "SheetTrigger / SheetClose.asChild",
          "boolean",
          t(
            "Compose with the shared Button or a link.",
            "Kombiniere mit dem gemeinsamen Button oder einem Link.",
          ),
        ],
      ],
      guidance: [
        ...overlayGuidance,
        t(
          "Use for supporting context or mobile navigation; keep the current task recognisable.",
          "Nutze Sheets für ergänzenden Kontext oder mobile Navigation; halte die aktuelle Aufgabe erkennbar.",
        ),
      ],
    },
    tooltip: {
      description: t(
        "Brief supplementary help on hover or keyboard focus.",
        "Kurze ergänzende Hilfe bei Hover oder Tastaturfokus.",
      ),
      code: `import { Button, TooltipProvider, Tooltip,\n  TooltipTrigger, TooltipContent } from '@standkreis/ui';\n\n<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger asChild>\n      <Button variant="outline">${t("About", "Info")}</Button>\n    </TooltipTrigger>\n    <TooltipContent>${t("This example stays local.", "Dieses Beispiel bleibt lokal.")}</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`,
      props: [
        [
          "TooltipProvider.delayDuration",
          "number (ms)",
          t(
            "Default: 0. Configure once around the relevant UI.",
            "Standard: 0. Konfiguriere einmal um die betreffende Oberfläche.",
          ),
        ],
        [
          "TooltipTrigger.asChild",
          "boolean",
          t(
            "Use a focusable control with its own accessible name.",
            "Nutze ein fokussierbares Element mit eigenem zugänglichem Namen.",
          ),
        ],
        [
          "TooltipContent.side / sideOffset",
          "top | right | bottom | left / number",
          t(
            "Placement and distance; offset defaults to 0.",
            "Platzierung und Abstand; Standardabstand ist 0.",
          ),
        ],
      ],
      guidance: [
        t(
          "Never hide essential instructions in a tooltip. Touch users must be able to complete the task without it.",
          "Verstecke nie wesentliche Anweisungen in einem Tooltip. Touch-Nutzende müssen die Aufgabe ohne ihn erledigen können.",
        ),
        t(
          "Keep content short and non-interactive. The trigger still needs a visible label or aria-label.",
          "Halte Inhalte kurz und nicht interaktiv. Der Auslöser braucht weiterhin eine sichtbare Beschriftung oder aria-label.",
        ),
      ],
    },
    brand: {
      description: t(
        "The Standkreis wordmark, with an optional room name.",
        "Die Standkreis-Wortmarke mit optionalem Raumnamen.",
      ),
      code: `import { Brand } from '@standkreis/ui';\n\n<Brand />\n<Brand product="Atlas" />\n<a href="/"><Brand product="Atlas" /></a>`,
      props: [
        [
          "product",
          "string",
          t(
            "Optional product name next to Standkreis.",
            "Optionaler Produktname neben Standkreis.",
          ),
        ],
        [
          "className",
          "string",
          t(
            "Layout adjustments; inherits the current text colour.",
            "Layout-Anpassungen; übernimmt die aktuelle Textfarbe.",
          ),
        ],
      ],
      guidance: [
        t(
          "Use the same identity across applications. Atlas is settled; other product names remain working titles.",
          "Nutze dieselbe Identität in allen Anwendungen. Atlas steht fest; andere Produktnamen bleiben Arbeitstitel.",
        ),
        t(
          "The mark is decorative beside the wordmark. Wrap Brand in a link when it navigates home.",
          "Das Zeichen ist neben der Wortmarke dekorativ. Umschließe Brand mit einem Link, wenn es zur Startseite führt.",
        ),
      ],
    },
    "brand-mark": {
      description: t(
        "Three equal arcs and a central dot: the selected Gathered circle.",
        "Drei gleiche Bögen und ein zentraler Punkt: der gewählte Gathered circle.",
      ),
      code: `import { BrandMark } from '@standkreis/ui';\n\n<BrandMark width={48} height={48} />\n<BrandMark width={48} height={48} label="Standkreis" />`,
      props: [
        [
          "label",
          "string",
          t(
            "Omitted: decorative, aria-hidden. Provided: named image.",
            "Ohne: dekorativ, aria-hidden. Mit: benanntes Bild.",
          ),
        ],
        [
          "width / height",
          "SVG dimensions",
          t(
            "Default: 32 × 32. Keep proportions square.",
            "Standard: 32 × 32. Halte die Proportionen quadratisch.",
          ),
        ],
      ],
      guidance: [
        t(
          "Keep all three arcs, equal gaps and the central dot. One opening faces directly right.",
          "Bewahre alle drei Bögen, gleiche Abstände und den zentralen Punkt. Eine Öffnung zeigt direkt nach rechts.",
        ),
        t(
          "Do not animate the mark as a loader. Use a label only when the mark communicates identity on its own.",
          "Animiere das Zeichen nicht als Ladeindikator. Nutze eine Beschriftung nur, wenn das Zeichen allein die Identität vermittelt.",
        ),
      ],
    },
    "discovery-feedback": {
      description: t(
        "A quiet acknowledgement after a deliberate action.",
        "Eine ruhige Bestätigung nach einer bewussten Aktion.",
      ),
      code: `import { useState } from 'react';\nimport { Button, DiscoveryFeedback } from '@standkreis/ui';\n\nfunction Example() {\n  const [saved, setSaved] = useState(false);\n  return <>\n    <Button onClick={() => setSaved(true)}>${t("Save example", "Beispiel speichern")}</Button>\n    <DiscoveryFeedback visible={saved} />\n  </>;\n}`,
      props: [
        [
          "visible",
          "boolean",
          t(
            "Default: false. Toggle after a successful action.",
            "Standard: false. Schalte nach einer erfolgreichen Aktion um.",
          ),
        ],
        [
          "children",
          "ReactNode",
          t(
            "Optional confirmation; defaults to the translated saved message.",
            "Optionale Bestätigung; standardmäßig die übersetzte Speichermeldung.",
          ),
        ],
      ],
      guidance: [
        t(
          "Keep the component mounted and toggle visible so its polite live region can announce the update.",
          "Lass die Komponente eingebunden und schalte visible um, damit die höfliche Live-Region die Änderung ankündigen kann.",
        ),
        t(
          "Confirm only completed actions. Do not use this for streaks, rankings or engagement reminders.",
          "Bestätige nur abgeschlossene Aktionen. Nutze dies nicht für Streaks, Ranglisten oder Nutzungserinnerungen.",
        ),
      ],
    },
    "identification-action": {
      description: t(
        "A clearly labelled invitation to identify an unfamiliar species.",
        "Eine klar beschriftete Einladung, eine unbekannte Art zu bestimmen.",
      ),
      code: `import { IdentificationAction } from '@standkreis/ui';\n\n<IdentificationAction onClick={openCapture} />\n// The application supplies openCapture and identification services.`,
      props: [
        [
          "Button props",
          "onClick, variant, size, disabled, …",
          t(
            "Uses the shared Button API and focus treatment.",
            "Nutzt die gemeinsame Button-API und Fokusdarstellung.",
          ),
        ],
        [
          "children",
          "ReactNode",
          t(
            "Optional label; defaults to the provider's EN/DE identification label.",
            "Optionale Beschriftung; standardmäßig die EN/DE-Bestimmungsbeschriftung des Providers.",
          ),
        ],
      ],
      guidance: [
        t(
          "Keep identification easy to reach in Atlas. The library provides the control, not a camera or identification service.",
          "Halte die Bestimmung in Atlas leicht erreichbar. Die Bibliothek liefert das Bedienelement, keine Kamera und keinen Bestimmungsdienst.",
        ),
        t(
          "Retain the visible text label. Handle permission, capture and uncertain results in the application.",
          "Bewahre die sichtbare Textbeschriftung. Behandle Berechtigungen, Aufnahme und unsichere Ergebnisse in der Anwendung.",
        ),
      ],
    },
    "uncertainty-notice": {
      description: t(
        "An honest explanation of uncertainty, with an optional next step.",
        "Eine ehrliche Erklärung von Unsicherheit mit optionalem nächsten Schritt.",
      ),
      code: `import { UncertaintyNotice, Button } from '@standkreis/ui';\n\n<UncertaintyNotice />\n<UncertaintyNotice\n  title="${t("A name is still missing", "Ein Name fehlt noch")}"\n  action={<Button variant="outline" onClick={addNote}>${t("Add a note", "Notiz ergänzen")}</Button>}\n>\n  ${t("You can keep the observation without an identification.", "Du kannst die Beobachtung ohne Bestimmung bewahren.")}\n</UncertaintyNotice>`,
      props: [
        [
          "title",
          "ReactNode",
          t(
            "Optional heading; defaults to translated uncertainty copy.",
            "Optionale Überschrift; standardmäßig übersetzter Unsicherheitstext.",
          ),
        ],
        [
          "children",
          "ReactNode",
          t(
            "Explanation; defaults to encouraging EN/DE guidance.",
            "Erklärung; standardmäßig ermutigende EN/DE-Hinweise.",
          ),
        ],
        [
          "action",
          "ReactNode",
          t(
            "Optional supported next step, placed below the explanation.",
            "Optionaler unterstützter nächster Schritt unter der Erklärung.",
          ),
        ],
      ],
      guidance: [
        t(
          "This is a labelled section, not an urgent alert. Make uncertainty clear without suggesting failure.",
          "Dies ist ein beschrifteter Abschnitt, kein dringender Alarm. Verdeutliche Unsicherheit, ohne ein Scheitern zu suggerieren.",
        ),
        t(
          "Only show evidence-backed alternatives and actions the application supports. Do not promise future community identification or uploads.",
          "Zeige nur belegte Alternativen und unterstützte Aktionen. Versprich keine zukünftige Community-Bestimmung oder Uploads.",
        ),
      ],
    },
  };
}
