import { Tag } from "@/browser/components/ui/tag";
import type { TalkHappeningNow } from "@/types/happening-now.talk";
import { useReplicant } from "@nodecg/react-hooks";
import { Clock } from "lucide-react";
import { motion as m, AnimatePresence } from "motion/react";
import "./lower-third.scss";

const variants = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const LowerThirdPanel: React.FC = () => {
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
            <Tag className="lower__tag">
              {talk?.mode === "soon"
                ? "A seguir"
                : talk?.mode === "now"
                  ? "Agora"
                  : undefined}
            </Tag>

            {talk?.talk.startsAt ? (
              <div className="lower__clock">
                <Clock />
                {talk.talk.startsAt}
              </div>
            ) : undefined}

            <div className="lower__title">{talk?.talk.talk}</div>
          </m.div>
        ) : undefined}
      </AnimatePresence>
    </div>
  );
};
