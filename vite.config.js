import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import fs from "fs";

const isDev = /* import.meta.env.VITE_ENVIRONMENT === "development" */ true;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@composables": path.resolve(__dirname, "src/composables"),
      "@components": path.resolve(__dirname, "src/components"),
      "@stores": path.resolve(__dirname, "src/store"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  server: isDev
    ? {
        https: {
          key: fs.readFileSync("./certs/localhost-key.pem"),
          cert: fs.readFileSync("./certs/localhost.pem"),
        },
      }
    : {},
});
