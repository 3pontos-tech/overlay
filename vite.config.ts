import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import NodeCGPlugin from "./vite-nodecg";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    NodeCGPlugin({
      bundleName: "3p-stream-kit",
      graphics: ["./src/browser/graphics/*/*.{js,ts,tsx}"],
      dashboard: ["./src/browser/dashboard/*/*.{js,ts,tsx}"],
      template: "./src/browser/template.html",
    }),
    react({
      // babel: {
      //   plugins: [["babel-plugin-react-compiler"]],
      // },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
