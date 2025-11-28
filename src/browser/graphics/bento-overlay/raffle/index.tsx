import { FrostyCard } from "@/browser/components/frosty-card";
import type { RaffleHappeningNow } from "@/types/happening-now.raffle";
import { useReplicant } from "@nodecg/react-hooks";
import { AnimatePresence } from "motion/react";

const variants = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const BentoRaffle: React.FC = () => {
  const [raffle] = useReplicant<RaffleHappeningNow>("happening-now.raffle");

  return (
    <AnimatePresence>
      {raffle ? (
        <FrostyCard
          variants={variants}
          initial="exit"
          animate="animate"
          exit="exit"
          className="ml-auto w-[300px] flex flex-col gap-4 pt-4"
        >
          <div className="w-full rounded-sm overflow-clip">
            <img src={raffle.photo} />
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-bold text-base text-text-medium">
              Sorteio agora
            </div>

            <div className="text-2xl font-bold">{raffle.name}</div>
          </div>
        </FrostyCard>
      ) : undefined}
    </AnimatePresence>
  );
};
