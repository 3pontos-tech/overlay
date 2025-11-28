import { LowerThird } from "@/browser/components/lower-third";
import type { TalkHappeningNow } from "@/types/happening-now.talk";
import { useReplicant } from "@nodecg/react-hooks";
import { motion as m, AnimatePresence } from "motion/react";

const variants = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const BentoLowerThird: React.FC = () => {
  const [talk] = useReplicant<TalkHappeningNow>("happening-now.talk");

  return (
    <AnimatePresence>
      {talk ? (
        <m.div
          key="lower-third"
          variants={variants}
          initial="exit"
          animate="animate"
          exit="exit"
          className="max-w-[580px] p-8 bg-card-background/65 backdrop-blur-[32px] overflow-clip rounded-xl flex flex-col gap-2"
        >
          <LowerThird key="lower-third-info" />
        </m.div>
      ) : undefined}
    </AnimatePresence>
  );
};
