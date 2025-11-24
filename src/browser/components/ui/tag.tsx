import { cn } from "@/browser/lib/utils";
import type { ComponentProps, PropsWithChildren } from "react";

export const Tag: React.FC<ComponentProps<"div"> & PropsWithChildren> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "max-h-5 px-3 py-1 flex gap-2 items-center font-space-grotesk font-bold text-xs bg-white text-black rounded-full w-fit",
        className,
      )}
      {...props}
    ></div>
  );
};
