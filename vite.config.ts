import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import NodeCGPlugin from "vite-plugin-nodecg";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    NodeCGPlugin({
      // srcDir: "./src",
      inputs: {
        "graphics/*/*.{js,ts,tsx}": "./src/template.html",
        "dashboard/*/*.{js,ts,tsx}": "./src/template.html",
      },
    }),
  ],
});
