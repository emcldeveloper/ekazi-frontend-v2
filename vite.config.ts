import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import sitemap from "vite-plugin-sitemap";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticRoutes = [
  "/",
  "/cv-builder",
  "/salary-calculator",
  "/jobs",
  "/login",
  "/register",
  "/employers",
  "/candidates",
  "/about",
  "/pricelists",
  "/articles",
  "/contact",
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: "https://www.ekazi.co.tz",
      dynamicRoutes: staticRoutes,
      // we'll add dynamic job routes next
    }),
  ],
  server: {
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
