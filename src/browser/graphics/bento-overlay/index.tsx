import { render } from "@/browser/render";
import { StrictMode } from "react";
import { BentoLowerThird } from "./lower-third";
import { BentoSpeaker } from "./speaker";

const BentoOverlay = () => {
  return (
    <div className="absolute left-8 bottom-8 h-fit">
      <div className="flex gap-4 place-items-end">
        <BentoSpeaker />
        <BentoLowerThird />
      </div>
    </div>
  );
};

render(
  <StrictMode>
    <BentoOverlay />
  </StrictMode>,
);
