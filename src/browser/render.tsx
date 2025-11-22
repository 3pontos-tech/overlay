import { createRoot } from "react-dom/client";
import { type ReactNode } from "react";
import "./global.css";

export const render = (app: ReactNode) => {
  const rootElement = document.querySelector("#root");

  if (!rootElement) {
    throw new Error("Missing root element on DOM");
  }

  const root = createRoot(rootElement);
  root.render(app);
};
