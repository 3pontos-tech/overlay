import { useReplicant } from "@nodecg/react-hooks";
import { StrictMode } from "react";
import type { TalkHappeningNow } from "../../../types/happening-now.talk";
import { render } from "../../render";

const LowerThirdPanel: React.FC = () => {
  const [value] = useReplicant<TalkHappeningNow>("happening-now.talk");

  return (
    <div>
      <p className="text-amber-800">{JSON.stringify(value, null, 2)}</p>
    </div>
  );
};

render(
  <StrictMode>
    <LowerThirdPanel />
  </StrictMode>,
);
