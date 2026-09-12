import { spawnSync } from "node:child_process";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const result = spawnSync(
  path.join(root, "node_modules/.bin/shadcn"),
  ["add", ...process.argv.slice(2), "--cwd", "packages/ui"],
  { cwd: root, stdio: "inherit" },
);
if (result.status !== 0) process.exit(result.status ?? 1);
// Package-local CLI targets use source aliases; emitted code uses package exports.
for (const file of await readdir(
  path.join(root, "packages/ui/src/components"),
)) {
  if (!file.endsWith(".tsx")) continue;
  const target = path.join(root, "packages/ui/src/components", file);
  let source = await readFile(target, "utf8");
  source = source
    .replace(/from (["'])cn\1/g, 'from "@standkreis/ui/lib/utils"')
    .replace(/from (["'])@\/(components|lib)\//g, "from $1@standkreis/ui/$2/");
  if (!/^['"]use client['"]/.test(source))
    source = '"use client";\n\n' + source;
  await writeFile(target, source);
}
console.log(
  "Review new components for Standkreis tokens, motion, touch targets and translated labels before delivery.",
);
