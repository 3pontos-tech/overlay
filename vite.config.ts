import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import NodeCGPlugin from "vite-plugin-nodecg";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // babel: {
      //   plugins: [["babel-plugin-react-compiler"]],
      // },
    }),
    tailwindcss(),
    NodeCGPlugin({
      srcDir: "./src/browser",
      inputs: {
        "graphics/*/*.{js,ts,tsx}": "./src/browser/template.html",
        "dashboard/*/*.{js,ts,tsx}": "./src/browser/template.html",
      },
    }),
  ],
});
