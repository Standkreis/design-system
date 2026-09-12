import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: { outDir: "dist" },
  server: {
    fs: {
      allow: [
        path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../.."),
      ],
    },
  },
});
