import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.querySelector("#root");

if (!rootElement) {
  throw new Error("Missing root element on DOM");
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <h1>test</h1>
  </StrictMode>,
);
