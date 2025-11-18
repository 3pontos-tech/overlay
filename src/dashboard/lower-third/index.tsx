import { useReplicant } from "@nodecg/react-hooks";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { HappeningNow } from "../../types/happening-now.talk";

const LowerThirdPanel: React.FC = () => {
  const [value, setValue] = useReplicant<HappeningNow>("happening-now.talk");

  return <div>
    <p>{JSON.stringify(value, null, 2)}</p>

    <button onClick={() => {
      setValue({
        talk: `Talk name - ${Date.now()}`,
        description: "",
        startsAt: new Date().toISOString(),
        speaker: {
          name: "",
        }
      })
    }}></button>
  </div>
}

const rootElement = document.querySelector("#root");

if (!rootElement) {
  throw new Error("Missing root element on DOM");
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <LowerThirdPanel />
  </StrictMode>,
);
