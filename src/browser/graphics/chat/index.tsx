import { render } from "@/browser/render";
import type { TalkHappeningNow } from "@/types/happening-now.talk";
import { useReplicant } from "@nodecg/react-hooks";
import { StrictMode } from "react";

const LowerThirdPanel: React.FC = () => {
  const [talk] = useReplicant<TalkHappeningNow>("happening-now.talk");

  return (
    <div>
      <p className="text-amber-800">{JSON.stringify(talk, null, 2)}</p>
    </div>
  );
};

render(
  <StrictMode>
    <LowerThirdPanel />
  </StrictMode>,
);
