import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@composables": path.resolve(__dirname, "src/composables"),
            "@components": path.resolve(__dirname, "src/components"),
            "@stores": path.resolve(__dirname, "src/store"),
        },
    },
});
