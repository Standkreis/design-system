import { mkdtemp, writeFile, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const temporary = await mkdtemp(path.join(tmpdir(), "standkreis-package-"));
function run(command, args, cwd = temporary) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
  if (result.status !== 0)
    throw new Error(
      `${command} ${args.join(" ")}\n${result.stdout}\n${result.stderr}`,
    );
  return result.stdout;
}
try {
  const packed = JSON.parse(
    run(
      "npm",
      [
        "pack",
        "--workspace",
        "@standkreis/ui",
        "--ignore-scripts",
        "--json",
        "--pack-destination",
        temporary,
      ],
      root,
    ),
  )[0];
  const contents = packed.files.map((file) => file.path);
  for (const required of [
    "dist/index.js",
    "dist/index.d.ts",
    "dist/styles.css",
    "dist/tokens.css",
    "assets/fonts/fonts.css",
    "assets/fonts/OFL.txt",
    "assets/fonts/TitilliumWeb-Italic.woff2",
    "assets/marks/standkreis-mark.svg",
    "LICENSE",
    "BRAND-USAGE.md",
    "THIRD_PARTY_NOTICES.md",
  ]) {
    if (!contents.includes(required))
      throw new Error(`Package missing ${required}`);
  }
  if (
    contents.filter((file) => file.startsWith("assets/marks/")).join() !==
    "assets/marks/standkreis-mark.svg"
  )
    throw new Error("Package must contain only the canonical Standkreis mark");
  if (contents.some((file) => /\.env|\.jpg|\.png|node_modules/.test(file)))
    throw new Error("Unexpected private/runtime artifacts in package");
  await writeFile(
    path.join(temporary, "package.json"),
    JSON.stringify({
      name: "standkreis-package-consumer",
      private: true,
      type: "module",
      dependencies: {
        "@standkreis/ui": `file:./${packed.filename}`,
        react: "19.3.0",
        "react-dom": "19.3.0",
      },
      devDependencies: { vite: "8.3.0" },
    }),
  );
  run("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund"]);
  await writeFile(
    path.join(temporary, "index.html"),
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Package verification</title></head><body><div id="root"></div><script type="module" src="/main.js"></script></body></html>',
  );
  await writeFile(
    path.join(temporary, "main.js"),
    `import React from 'react';import {createRoot} from 'react-dom/client';import {Button,Brand,Card,CardTitle,StandkreisProvider} from '@standkreis/ui';import '@standkreis/ui/fonts.css';import '@standkreis/ui/styles.css';createRoot(document.getElementById('root')).render(React.createElement(StandkreisProvider,{},React.createElement(Brand,{product:'Atlas'}),React.createElement(Card,{variant:'success',asChild:true},React.createElement('article',{},React.createElement(CardTitle,{asChild:true},React.createElement('h2',{},'Discover')),React.createElement(Button,{variant:'inverse',shape:'pill'},'Explore')))));`,
  );
  run("node", [
    "--input-type=module",
    "-e",
    `import {renderToString} from 'react-dom/server';import {createElement} from 'react';import {Brand,Card} from '@standkreis/ui';import {Button} from '@standkreis/ui/components/button';const html=renderToString(createElement(Brand,{product:'Atlas'}));const card=renderToString(createElement(Card,{asChild:true,variant:'soft'},createElement('article',{},'Place')));if(!card.startsWith('<article')||card.includes('<div'))throw Error('Card semantic composition failed');if(!html.includes('Atlas')||!Button)throw Error('Package exports failed');`,
  ]);
  run(path.join(temporary, "node_modules/.bin/vite"), ["build"]);
  const assets = await readdir(path.join(temporary, "dist/assets"));
  if (assets.filter((file) => file.endsWith(".woff2")).length !== 4)
    throw new Error("Packed font assets did not resolve");
  const cssFile = assets.find((file) => file.endsWith(".css"));
  const css = await readFile(
    path.join(temporary, "dist/assets", cssFile),
    "utf8",
  );
  if (
    !css.includes("--primary") ||
    !css.includes("--inverse-action") ||
    !["info", "success", "error", "warning"].every(
      (status) =>
        css.includes(`--${status}-surface`) &&
        css.includes(`.bg-${status}-surface`),
    ) ||
    !css.includes("prefers-reduced-motion")
  )
    throw new Error("Packed styles did not resolve");
  console.log(
    `Packed consumer passed: ${packed.filename}; ${contents.length} files; ESM, subpath exports, CSS and four fonts resolve without workspace source.`,
  );
} finally {
  await rm(temporary, { recursive: true, force: true });
}
