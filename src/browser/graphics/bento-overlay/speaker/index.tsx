import { FrostyCard } from "@/browser/components/frosty-card";
import type { TalkHappeningNow } from "@/types/happening-now.talk";
import { useReplicant } from "@nodecg/react-hooks";
import { AnimatePresence } from "motion/react";

const variants = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const BentoSpeaker: React.FC = () => {
  const [talk] = useReplicant<TalkHappeningNow>("happening-now.talk");

  return (
    <AnimatePresence>
      {talk ? (
        <FrostyCard
          key="speaker"
          initial="exit"
          animate="animate"
          exit="exit"
          variants={variants}
          className="w-[300px] flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1 ">
            <div
              className="size-15 rounded-full outline outline-outline-dark mb-3 bg-cover"
              style={{
                backgroundImage: talk?.talk.speaker.photo
                  ? `url(${talk?.talk.speaker.photo})`
                  : undefined,
              }}
            ></div>
            <div className="text-base font-ld">{talk?.talk.speaker.name}</div>
            <div className="text-base font-bold text-text-medium">
              {talk?.talk.speaker.company}
            </div>
          </div>

          {/*<div className="text-2xl font-bold">Um texto muito loco mesmo</div>*/}

          {/*<div className="text-text-medium"></div>*/}
        </FrostyCard>
      ) : undefined}
    </AnimatePresence>
  );
};
