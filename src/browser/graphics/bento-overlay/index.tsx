import { render } from "@/browser/render";
import { StrictMode } from "react";
import { BentoLowerThird } from "./lower-third";
import { BentoSpeaker } from "./speaker";
import { BentoRaffle } from "./raffle";
import { motion as m } from "motion/react";

const BentoOverlay = () => {
  return (
    <div className="absolute left-8 bottom-8 w-[1750px] h-fit">
      <m.div layout className="w-full flex gap-4 place-items-end">
        <BentoSpeaker />
        <BentoLowerThird />
        <BentoRaffle />
      </m.div>
    </div>
  );
};

render(
  <StrictMode>
    <BentoOverlay />
  </StrictMode>,
);
