import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("brand variants, mobile layout, colours and accessible landmarks", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Shared centre" }).click();
  await expect(
    page.locator('.site-header [data-slot="brand-mark"]'),
  ).toHaveAttribute("data-variant", "dot");
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
