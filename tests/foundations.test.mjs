import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { BrandMark, Brand } from "../packages/ui/dist/index.js";
import { gatheredRotations } from "../packages/ui/dist/brand/geometry.js";

test("logo has three equal arcs and gaps, with an opening facing right", () => {
  const gaps = gatheredRotations.map(
    (angle, i) => ((gatheredRotations[(i + 1) % 3] - angle + 360) % 360) - 90,
  );
  assert.deepEqual(gaps, [30, 30, 30]);
  const firstArcEnd = -45 + gatheredRotations[0];
  const secondArcStart = -135 + gatheredRotations[1];
  assert.equal((firstArcEnd + secondArcStart) / 2, 0);
  const mark = renderToStaticMarkup(createElement(BrandMark));
  assert.equal((mark.match(/<path /g) || []).length, 3);
  assert.equal((mark.match(/<circle /g) || []).length, 1);
  assert.match(mark, /<circle cx="50" cy="50" r="5"/);
});

test("brand separates product naming and escapes user-provided names", () => {
  const html = renderToStaticMarkup(
    createElement(Brand, { product: "<Atlas & Species>" }),
  );
  assert.match(html, /Standkreis/);
  assert.match(html, /&lt;Atlas &amp; Species&gt;/);
  assert.ok(!html.includes("<Atlas"));
});

test("semantic reading and action pairs maintain contrast in both themes", async () => {
  const css = await readFile(
    new URL("../packages/ui/src/styles/tokens.css", import.meta.url),
    "utf8",
  );
  const luminance = (hex) => {
    const rgb = [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  for (const selector of [":root", ".dark"]) {
    const block = css.slice(css.indexOf(selector));
    const tokens = Object.fromEntries(
      [
        ...block
          .slice(0, block.indexOf("}"))
          .matchAll(/--([\w-]+):\s*(#[\da-f]{6});/g),
      ].map((m) => [m[1], m[2]]),
    );
    for (const [foreground, background] of [
      ["foreground", "background"],
      ["card-foreground", "card"],
      ["muted-foreground", "background"],
      ["muted-foreground", "card"],
      ["primary-foreground", "primary"],
      ["primary-ink", "background"],
      ["primary-ink", "card"],
      ["secondary-foreground", "secondary"],
      ["destructive-foreground", "destructive"],
      ["warning", "warning-surface"],
    ]) {
      const a = luminance(tokens[foreground]),
        b = luminance(tokens[background]);
      const contrast = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      assert.ok(
        contrast >= 4.5,
        `${selector} ${foreground}/${background}: ${contrast}`,
      );
    }
  }
});

test("canonical SVG download matches component paths, rotations and centre", async () => {
  const asset = await readFile(
    new URL("../packages/ui/assets/marks/standkreis-mark.svg", import.meta.url),
    "utf8",
  );
  const rendered = renderToStaticMarkup(createElement(BrandMark));
  const geometry = (text) =>
    [...text.matchAll(/<(?:path|circle)\b[^>]*>/g)].map((m) =>
      m[0].replace(/\s*\/?>$/, ">"),
    );
  assert.deepEqual(geometry(asset), geometry(rendered));
});
