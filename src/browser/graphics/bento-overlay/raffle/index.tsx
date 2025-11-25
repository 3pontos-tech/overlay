import { FrostyCard } from "@/browser/components/frosty-card";

export const BentoRaffle: React.FC = () => {
  return (
    <FrostyCard className="w-[300px] flex flex-col gap-4">
      <div className="w-full">
        <img src="https://picsum.photos/270/130" />
      </div>

      <div className="font-bold text-base text-text-medium"></div>

      <div className="text-2xl font-bold"></div>
    </FrostyCard>
  );
};
