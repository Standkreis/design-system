import { mkdir, rm, copyFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const ui = path.join(root, "packages/ui");
await rm(path.join(ui, "dist"), { recursive: true, force: true });
await mkdir(path.join(ui, "dist"), { recursive: true });
for (const [command, args] of [
  ["tsc", ["-p", "tsconfig.json"]],
  [
    "tailwindcss",
    ["-i", "src/styles/index.css", "-o", "dist/styles.css", "--minify"],
  ],
]) {
  const result = spawnSync(
    path.join(root, "node_modules/.bin", command),
    args,
    { cwd: ui, stdio: "inherit" },
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
}
await copyFile(
  path.join(ui, "src/styles/tokens.css"),
  path.join(ui, "dist/tokens.css"),
);
