import { Tag } from "@/browser/components/ui/tag";
import type { TalkHappeningNow } from "@/types/happening-now.talk";
import { useReplicant } from "@nodecg/react-hooks";
import { Clock } from "lucide-react";
import "./lower-third.scss";

export const LowerThird: React.FC = () => {
  const [talk] = useReplicant<TalkHappeningNow>("happening-now.talk");

  return (
    <>
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
    </>
  );
};
