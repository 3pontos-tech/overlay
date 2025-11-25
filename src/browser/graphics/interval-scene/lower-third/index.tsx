import type { TalkHappeningNow } from "@/types/happening-now.talk";
import { useReplicant } from "@nodecg/react-hooks";
import { motion as m, AnimatePresence } from "motion/react";
import { LowerThird } from "@/browser/components/lower-third";

const variants = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const IntervalLowerThird: React.FC = () => {
  const [talk] = useReplicant<TalkHappeningNow>("happening-now.talk");

  return (
    <div className="widget">
      <AnimatePresence>
        {talk ? (
          <m.div
            key="lower-third"
            variants={variants}
            initial="exit"
            animate="animate"
            exit="exit"
            className="lower"
          >
            <LowerThird />
          </m.div>
        ) : undefined}
      </AnimatePresence>
    </div>
  );
};
