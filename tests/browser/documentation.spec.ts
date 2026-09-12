import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdirSync } from "node:fs";

// Derive coverage from the public component files, not the documentation catalog.
const slugs = [
  ...readdirSync(new URL("../../packages/ui/src/components/", import.meta.url))
    .filter((name) => name.endsWith(".tsx"))
    .map((name) => name.replace(".tsx", "")),
  "brand",
  "brand-mark",
];

for (const slug of slugs) {
  test(`${slug} has a direct documentation page with usable previews in both themes`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/components/${slug}`);
    const name = slug
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(name);
    await expect(page.locator(".landscape-hero")).toHaveCount(0);
    await expect(page.locator(".component-preview")).toBeVisible();
    await expect(page.locator(".component-page pre code")).toContainText(
      "@standkreis/ui",
    );
    await expect(page.getByRole("table")).toBeVisible();
    for (const colorScheme of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      await expect
        .poll(() =>
          page.locator("html").evaluate((el) => el.classList.contains("dark")),
        )
        .toBe(colorScheme === "dark");
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(page.viewportSize()!.width);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test("area navigation, component sidebar, history and language work together", async ({
  page,
}) => {
  await page.goto("/brand");
  await page
    .getByRole("navigation", { name: "Design system areas" })
    .getByRole("link", { name: "Components", exact: true })
    .click();
  await expect(page).toHaveURL(/\/components$/);
  await expect(page.locator(".landscape-hero")).toHaveCount(0);
  const mobile = page.viewportSize()!.width < 850;
  if (mobile)
    await page.getByRole("button", { name: "Browse components" }).click();
  await page
    .getByRole("navigation", { name: "Component documentation" })
    .filter({ visible: true })
    .getByRole("link", { name: "Button", exact: true })
    .click();
  await expect(page).toHaveURL(/\/components\/button$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Button");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  if (!mobile)
    await expect(
      page.locator('.component-navigation a[aria-current="page"]'),
    ).toHaveText("Button");
  await page.getByRole("button", { name: "Switch to German" }).click();
  await page.getByRole("combobox", { name: "Darstellung" }).click();
  await page.getByRole("option", { name: "Dunkel", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Vorschau", exact: true }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.goBack();
  await expect(page).toHaveURL(/\/components$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/components\/button$/);
  await page
    .getByRole("navigation", { name: "Designsystem-Bereiche" })
    .getByRole("link", { name: "Marke", exact: true })
    .click();
  await expect(page).toHaveURL(/\/brand$/);
  await expect(page.locator(".hero-photograph")).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Markendokumentation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Komponentendokumentation" }),
  ).toHaveCount(0);
});

test("component examples support keyboard interaction and local feedback", async ({
  page,
}) => {
  await page.goto("/components/select");
  await page.getByRole("combobox", { name: "Example place" }).focus();
  await page.keyboard.press("Space");
  await expect(page.getByRole("listbox")).toBeVisible();
  await expect(
    page.getByRole("option", { name: "Garden", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("option", { name: "Woodland", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("combobox", { name: "Example place" }),
  ).toContainText("Woodland");
  await page.goto("/components/tabs");
  const tabs = page.getByRole("tablist").first();
  await tabs.getByRole("tab", { name: "Encounter", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    tabs.getByRole("tab", { name: "Context", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await page.goto("/components/dialog");
  await page.getByRole("button", { name: "Open dialog" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open dialog" })).toBeFocused();
  await page.getByRole("button", { name: "Open dialog" }).click();
  await page.getByRole("button", { name: "Save example" }).click();
  await expect(page.getByRole("status")).toContainText("Encounter saved");
  await page.goto("/components/discovery-feedback");
  await expect(page.getByRole("status")).toBeEmpty();
  await page.getByRole("button", { name: "Save example" }).click();
  await expect(page.getByRole("status")).toContainText("Encounter saved");
  await page.getByRole("button", { name: "Reset example" }).click();
  await expect(page.getByRole("status")).toBeEmpty();
  await page.goto("/components/unknown");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Component not found",
  );
  await page.getByRole("link", { name: "All components", exact: true }).click();
  await expect(page).toHaveURL(/\/components$/);
});
