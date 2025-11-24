import { render } from "@/browser/render";
import { StrictMode } from "react";
import { LowerThirdPanel } from "./lower-third";
import "./interval-scene.scss";
import { splitAccentText } from "@/browser/lib/splitAccentText";
import { Timer } from "@/browser/components/timer";
import { useReplicant } from "@nodecg/react-hooks";
import type { IntervalSceneInformation } from "@/types/information.interval-scene";
import type { IntervalSceneTimer } from "@/types/timer.interval-scene";

const IntervalScene: React.FC = () => {
  const [intervalTimer] = useReplicant<IntervalSceneTimer>(
    "timer.interval-scene",
  );
  const [sceneInformation] = useReplicant<IntervalSceneInformation>(
    "information.interval-scene",
  );

  return (
    <div className="scene">
      <div className="scene__content">
        <div className="scene__content__title">
          {splitAccentText(sceneInformation?.title ?? "").map((section) => (
            <span data-type={section.type}>{section.text}</span>
          ))}
        </div>
        <div className="scene__content__clock">
          <div className="scene__content__clock__timer">
            <Timer endsAt={intervalTimer ?? undefined} />
          </div>
          <div className="scene__content__clock__description">
            {sceneInformation?.description}
          </div>
        </div>
      </div>

      <LowerThirdPanel />
    </div>
  );
};

render(
  <StrictMode>
    <IntervalScene />
  </StrictMode>,
);
