import { cn } from "@/browser/lib/utils";
import type { ComponentProps, PropsWithChildren } from "react";
import "./frosty-card.scss";
import { motion as m, motion } from "motion/react";

const _FrostyCard: React.FC<
  PropsWithChildren<ComponentProps<typeof m.div>>
> = ({ className, children, ...props }) => {
  return (
    <m.div
      className={cn(
        "relative py-8 px-4 outline outline-outline-dark bg-card-background/65 text-white backdrop-blur-[32px] overflow-clip rounded-xl",
        className,
      )}
      {...props}
    >
      {children}
      <m.div className="frosty-card__divider"></m.div>
    </m.div>
  );
};

export const FrostyCard = motion.create(_FrostyCard);
