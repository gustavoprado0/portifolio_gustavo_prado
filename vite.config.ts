import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const moduleId = id.split("\\").join("/");

          if (moduleId.indexOf("/node_modules/three/") !== -1) return "three-vendor";
        },
      },
    },
  },
});
