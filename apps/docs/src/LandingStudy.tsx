import { ArrowRight, Leaf, Sprout } from "lucide-react";
import { BrandMark, Button, type Locale } from "@standkreis/ui";

export function LandingStudy({ locale }: { locale: Locale }) {
  const t = (en: string, de: string) => (locale === "de" ? de : en);
  return (
    <div className="landing-study">
      <section
        className="landscape-hero"
        id="overview"
        aria-labelledby="landing-title"
      >
        <img
          className="hero-photograph"
          src="/images/river-landscape.webp"
          srcSet="/images/river-landscape-small.webp 960w, /images/river-landscape.webp 1920w"
          sizes="(max-width: 1600px) 100vw, 1552px"
          width="1920"
          height="950"
          fetchPriority="high"
          alt={t(
            "A river curves between sunlit meadows and woodland.",
            "Ein Fluss schlängelt sich zwischen sonnigen Wiesen und Wald.",
          )}
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span className="eyebrow">
            <BrandMark width={22} height={22} />
            {t(
              "Standkreis / a shared design language",
              "Standkreis / eine gemeinsame Designsprache",
            )}
          </span>
          <h1 className="editorial-heading" id="landing-title">
            {t("Closer to nature.", "Der Natur näher.")}
            <br />
            {t("Closer together.", "Einander näher.")}
          </h1>
          <p>
            {t(
              "Follow your curiosity. Get to know the life around you. Shape a thriving place, together.",
              "Folge deiner Neugier. Lerne das Leben um dich herum kennen. Gestaltet gemeinsam einen lebendigen Ort.",
            )}
          </p>
          <div className="hero-actions">
            <Button asChild size="lg" variant="inverse" shape="pill">
              <a href="#identity">
                {t("Explore the foundations", "Die Grundlagen entdecken")}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <a className="hero-text-link" href="#imagery">
              {t("Our visual approach", "Unser visueller Ansatz")}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <a className="hero-detail" href="#applications">
            <img
              src="/images/ferns-small.webp"
              width="1200"
              height="1800"
              alt=""
            />
            <span>
              <small>{t("A world within reach", "Eine Welt ganz nah")}</small>
              <strong>
                {t("Begin with a closer look", "Beginne mit einem Blick")}
              </strong>
            </span>
            <ArrowRight aria-hidden="true" size={18} />
          </a>
          <p>
            {t(
              "One place. Many ways to participate.",
              "Ein Ort. Viele Wege mitzumachen.",
            )}
            <br />
            <span>
              {t(
                "Identity · imagery · shared components",
                "Identität · Bildsprache · gemeinsame Komponenten",
              )}
            </span>
          </p>
        </div>
      </section>
      <section className="landing-story" aria-labelledby="story-title">
        <div className="story-heading">
          <span className="eyebrow">
            {t("Made for the living world", "Für eine lebendige Welt")}
          </span>
          <h2 className="editorial-heading" id="story-title">
            {t("It begins with curiosity.", "Es beginnt mit Neugier.")}
            <br />
            <span>
              {t("It grows through care.", "Es wächst durch Fürsorge.")}
            </span>
          </h2>
        </div>
        <div className="story-pair">
          <figure className="care-photograph">
            <img
              src="/images/planting.webp"
              srcSet="/images/planting-small.webp 600w, /images/planting.webp 1200w"
              sizes="(max-width: 600px) calc(100vw - 56px), 320px"
              width="1200"
              height="1800"
              loading="lazy"
              alt={t(
                "Gloved hands gently place a young plant into garden soil.",
                "Behandschuhte Hände setzen eine junge Pflanze behutsam in Gartenerde.",
              )}
            />
            <figcaption>
              <Sprout size={17} aria-hidden="true" />
              {t(
                "Small acts. Living places.",
                "Kleine Schritte. Lebendige Orte.",
              )}
            </figcaption>
          </figure>
          <div className="story-copy">
            <Leaf size={26} strokeWidth={1.5} aria-hidden="true" />
            <h3 className="editorial-heading">
              {t(
                "From noticing a leaf to caring for a place.",
                "Vom Entdecken eines Blattes zur Fürsorge für einen Ort.",
              )}
            </h3>
            <p>
              {t(
                "Standkreis helps people explore nature and shape thriving ecosystems together. Our applications share a calm, familiar language that makes room for real places and the people who care for them.",
                "Standkreis hilft Menschen, Natur zu erkunden und gemeinsam lebendige Ökosysteme zu gestalten. Unsere Anwendungen teilen eine ruhige, vertraute Sprache. Sie lässt Raum für echte Orte und die Menschen, die sich um sie kümmern.",
              )}
            </p>
            <Button asChild>
              <a href="#applications">
                {t(
                  "Discover the shared foundation",
                  "Die gemeinsame Grundlage entdecken",
                )}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ImageryStudy({ locale }: { locale: Locale }) {
  const t = (en: string, de: string) => (locale === "de" ? de : en);
  const images = [
    {
      file: "river-landscape",
      author: "Aleksandr Isaychev",
      url: "https://unsplash.com/photos/VQJD4kBfq0s",
      title: t("The whole place", "Der ganze Ort"),
      copy: t(
        "Water, woodland and open land. Wide views give individual encounters their context.",
        "Wasser, Wald und offene Landschaft. Weite Blicke geben einzelnen Begegnungen ihren Zusammenhang.",
      ),
      alt: t(
        "A winding river bordered by meadows and woodland.",
        "Ein gewundener Fluss zwischen Wiesen und Wald.",
      ),
      width: 1920,
      height: 950,
    },
    {
      file: "ferns",
      author: "Teemu Paananen",
      url: "https://unsplash.com/photos/OOE4xAnBhKo",
      title: t("The small details", "Die kleinen Details"),
      copy: t(
        "Natural textures reward a closer look. Keep the colours of the living world intact.",
        "Natürliche Strukturen laden zum Hinschauen ein. Die Farben der lebendigen Welt bleiben erhalten.",
      ),
      alt: t(
        "Layers of green fern fronds in light and shadow.",
        "Grüne Farnwedel in Licht und Schatten.",
      ),
      width: 1200,
      height: 1800,
    },
    {
      file: "planting",
      author: "Jonathan Kemper",
      url: "https://unsplash.com/photos/CbZh3kaPxrE",
      title: t("The human connection", "Die menschliche Verbindung"),
      copy: t(
        "Show care through real activity: planting, observing, learning and growing food.",
        "Fürsorge wird im Tun sichtbar: pflanzen, beobachten, lernen und Lebensmittel anbauen.",
      ),
      alt: t(
        "A gardener holding a seedling and soil in gloved hands.",
        "Eine Person hält mit Gartenhandschuhen eine Jungpflanze und Erde.",
      ),
      width: 1200,
      height: 1800,
    },
  ];
  return (
    <>
      <div className="imagery-grid">
        {images.map((photo) => (
          <figure key={photo.file}>
            <img
              src={`/images/${photo.file}.webp`}
              srcSet={`/images/${photo.file}-small.webp ${photo.file === "river-landscape" ? 960 : photo.file === "planting" ? 600 : 480}w, /images/${photo.file}.webp ${photo.width}w`}
              sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 850px) 30vw, 340px"
              width={photo.width}
              height={photo.height}
              loading="lazy"
              alt={photo.alt}
            />
            <figcaption>
              <h3 className="editorial-heading">{photo.title}</h3>
              <p>{photo.copy}</p>
              <a href={photo.url}>
                {photo.author} / Unsplash
                <ArrowRight size={12} aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="imagery-guidance">
        <div>
          <span className="eyebrow">
            {t("From the inspiration", "Aus der Inspiration")}
          </span>
          <h3 className="editorial-heading">
            {t(
              "Let the image set the mood.",
              "Das Bild gibt die Stimmung vor.",
            )}
          </h3>
          <p>
            {t(
              "Large photographs, quiet neutral surfaces, white hero typography and a generous editorial rhythm. Teal gives deliberate actions a familiar home.",
              "Große Fotografien, ruhige neutrale Flächen, weiße Schrift im Aufmacher und ein großzügiger Rhythmus. Türkis macht bewusste Aktionen vertraut.",
            )}
          </p>
        </div>
        <div>
          <span className="eyebrow">
            {t("For Standkreis", "Für Standkreis")}
          </span>
          <h3 className="editorial-heading">
            {t("Keep the invitation honest.", "Eine ehrliche Einladung.")}
          </h3>
          <p>
            {t(
              "Use real scenes without invented impact figures or endorsements. Keep controls predictable, text readable and motion in response to people. These photographs are visual references, not documented Standkreis projects.",
              "Echte Szenen ohne erfundene Wirkungszahlen oder Empfehlungen. Bedienelemente bleiben vertraut, Text lesbar und Bewegung reagiert auf Menschen. Diese Fotos sind visuelle Referenzen und zeigen keine dokumentierten Standkreis-Projekte.",
            )}
          </p>
        </div>
      </div>
    </>
  );
}
