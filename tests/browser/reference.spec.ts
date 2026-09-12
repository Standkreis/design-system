import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("canonical brand, mobile layout, colours and accessible landmarks", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.locator('.site-header [data-slot="brand-mark"] circle'),
  ).toHaveAttribute("r", "5");
  await expect(page.locator("#identity a[download]")).toHaveCount(1);
  await expect(page.locator("#identity button")).toHaveCount(0);
  for (const theme of ["Light", "Dark"]) {
    await page.getByRole("combobox", { name: "Appearance" }).click();
    await page.getByRole("option", { name: theme, exact: true }).click();
    await expect(
      page.getByRole("listbox", { includeHidden: true }),
    ).toHaveCount(0);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(page.viewportSize()!.width);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});

test("identification dialog respects keyboard focus and acknowledges a deliberate save", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByTestId("identify").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("dialog").getByText("Identification still open"),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("identify")).toBeFocused();
  await page.getByTestId("identify").click();
  await page
    .getByRole("button", { name: "Save without identification" })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator(".application-bottom [role=status]")).toContainText(
    "Encounter saved",
  );
});

test("German labels, sheet focus and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to German" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await page.getByTestId("open-sheet").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Schließen", exact: true }),
  ).toBeVisible();
  const motion = await page
    .locator("[data-slot=sheet-content]")
    .evaluate((el) => ({
      animation: getComputedStyle(el).animationName,
      transition: getComputedStyle(el).transitionDuration,
    }));
  expect(motion).toEqual({ animation: "none", transition: "0s" });
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("open-sheet")).toBeFocused();
  await page.reload();
  await expect(page.getByTestId("identify")).toHaveText("Eine Art bestimmen");
});

test("system theme follows device and manual choice persists", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("combobox", { name: "Appearance" }).click();
  await page.getByRole("option", { name: "Light", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.emulateMedia({ colorScheme: "light" });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});

test("form controls and application tabs operate without data services", async ({
  page,
}) => {
  const remote: string[] = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:4383/")) remote.push(r.url());
  });
  await page.goto("/");
  await page.getByLabel("Encounter name").fill("A quiet walk");
  await page.getByLabel("What did you notice?").fill("A new detail.");
  await page.getByRole("checkbox").check();
  await expect(page.getByRole("checkbox")).toBeChecked();
  await page.getByRole("switch").uncheck();
  await expect(page.getByRole("switch")).not.toBeChecked();
  await page.getByRole("tab", { name: "Species", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Inspect a detail" }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Community", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "What could this place become?" }),
  ).toBeVisible();
  expect(remote).toEqual([]);
});

test("photographic landing loads locally and remains usable in German", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero-photograph")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".hero-photograph")
        .evaluate((img: HTMLImageElement) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
  await page
    .getByRole("link", { name: "Explore the foundations", exact: true })
    .click();
  await expect(page).toHaveURL(/#identity$/);
  await page.getByRole("button", { name: "Switch to German" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Der Natur näher.",
  );
  for (const photo of await page.locator("#imagery img").all()) {
    await photo.scrollIntoViewIfNeeded();
    await expect
      .poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
  }
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(page.viewportSize()!.width);
});

test("shared typography matches package-only styles in both themes", async ({
  page,
}) => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(
    new URL("../../packages/ui/dist/styles.css", import.meta.url),
    "utf8",
  );
  await page.goto("/");
  await page.getByTestId("identify").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  for (const theme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: theme });
    await expect
      .poll(() =>
        page.locator("html").evaluate((el) => el.classList.contains("dark")),
      )
      .toBe(theme === "dark");
    await page.evaluate(() =>
      Promise.all(
        document
          .getAnimations()
          .map((animation) => animation.finished.catch(() => {})),
      ),
    );
    const comparisons = await page.evaluate((css) => {
      const frame = document.createElement("iframe");
      document.body.append(frame);
      const doc = frame.contentDocument!;
      doc.documentElement.className = document.documentElement.className;
      const style = doc.createElement("style");
      style.textContent = css;
      doc.head.append(style);
      const values = (node: Element) => {
        const s = node.ownerDocument.defaultView!.getComputedStyle(node);
        return {
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          marginBottom: s.marginBottom,
          color: s.color,
        };
      };
      try {
        return [
          '[data-slot="dialog-title"]',
          '[data-slot="dialog-content"] [data-slot="uncertainty-notice"] h3',
        ].map((selector) => {
          const original = document.querySelector(selector)!;
          const notice = original.closest('[data-slot="uncertainty-notice"]');
          const context = (notice ?? original).cloneNode(true) as Element;
          doc.body.append(context);
          const copy = notice ? context.querySelector("h3")! : context;

          return {
            selector,
            preview: values(original),
            standalone: values(copy),
          };
        });
      } finally {
        frame.remove();
      }
    }, css);
    for (const result of comparisons)
      expect(result.preview, result.selector).toEqual(result.standalone);
  }
});

test("shared surfaces respond to radius tokens and inverse buttons carry their own focus style", async ({
  page,
}) => {
  await page.goto("/");
  const radii = await page.evaluate(() => {
    const selectors = [
      ".field-card",
      ".logo-primary",
      ".logo-inverse",
      ".application-example",
      ".type-specimen",
      ".principle-grid article",
    ];
    const sample = () =>
      selectors.map((selector) => {
        const node = document.querySelector(selector)!;
        return {
          selector,
          slot: node.getAttribute("data-slot"),
          radius: parseFloat(getComputedStyle(node).borderRadius),
        };
      });
    const before = sample();
    document.documentElement.style.setProperty("--radius", "2rem");
    const after = sample();
    document.documentElement.style.removeProperty("--radius");
    return { before, after };
  });
  radii.after.forEach((value, i) => {
    expect(value.slot, value.selector).toBe("card");
    expect(value.radius - radii.before[i].radius, value.selector).toBe(16);
  });
  const hero = page.getByRole("link", {
    name: "Explore the foundations",
    exact: true,
  });
  await expect(hero).toHaveAttribute("data-variant", "inverse");
  await expect(hero).toHaveAttribute("data-shape", "pill");
  await page.keyboard.press("Tab");
  await hero.focus();
  await expect(hero).toBeFocused();
  await expect(hero).toHaveCSS("outline-style", "solid");
  await expect(hero).toHaveCSS("outline-color", "rgb(255, 255, 255)");
  await expect(hero).toHaveCSS("outline-width", "2px");
});
